import { useEffect, useRef } from 'react';
import './ParticleField.css';

/** A mouse-reactive particle network that reads the theme's accent color
 *  from CSS variables so it adapts to light/dark automatically. */
export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles = [];
    const mouse = { x: -999, y: -999 };
    let raf = 0;

    const getAccent = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim();
      return raw || '#ff4d4d';
    };
    const getMuted = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--muted')
        .trim();
      return raw || '#b3b3b3';
    };

    const hexToRgb = (hex) => {
      const m = hex.replace('#', '');
      const n = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
      return {
        r: parseInt(n.slice(0, 2), 16) || 255,
        g: parseInt(n.slice(2, 4), 16) || 77,
        b: parseInt(n.slice(4, 6), 16) || 77,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.floor((w * h) / 16000), 90);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const draw = () => {
      const accent = hexToRgb(getAccent());
      const muted = hexToRgb(getMuted());
      ctx.clearRect(0, 0, w, h);

      const linkDist = 130;
      const mouseDist = 160;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // mouse repulsion
        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < mouseDist && dm > 0) {
          const force = (mouseDist - dm) / mouseDist;
          p.x += (dxm / dm) * force * 1.5;
          p.y += (dym / dm) * force * 1.5;
        }

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},0.55)`;
        ctx.fill();

        // draw links
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${muted.r},${muted.g},${muted.b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // link to mouse
        const dxp = p.x - mouse.x;
        const dyp = p.y - mouse.y;
        const dpm = Math.sqrt(dxp * dxp + dyp * dyp);
        if (dpm < mouseDist) {
          const alpha = (1 - dpm / mouseDist) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('mouseout', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
    />
  );
}