import { useEffect, useRef } from 'react';
import './Threads.css';

/* ----------------------------------------------------------------
   Threads: reads left to right like a process.
   - left: the threads are knotted (the messy problem)
   - middle: they comb out (design)
   - right: they run straight and parallel (the clear product)
   - one accent thread (the user) runs all the way through
   The pointer combs the knot locally. Labels under the canvas name
   the three stages so the idea lands without explanation.
   Static for viewers who prefer reduced motion.
   ---------------------------------------------------------------- */

const smooth = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// deterministic random so the knot looks the same on every load
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const STAGES = ['Messy problem', 'Design', 'Clear product'];

export default function Threads() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cv = canvasRef.current;
    const ctx = cv.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = 1;
    let lines = [];
    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    let pointer = null;
    const comb = { x: -9999, a: 0 }; // smoothed pointer influence

    function setup() {
      const r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      const N = W < 640 ? 16 : 24;
      const rand = rng(7);
      lines = [];
      for (let i = 0; i < N; i++) {
        lines.push({
          i,
          phase: [rand() * 6.28, rand() * 6.28, rand() * 6.28],
          amp: [0.55 + rand() * 0.5, 0.25 + rand() * 0.35, 0.12 + rand() * 0.2],
          speed: 0.6 + rand() * 0.8,
          accent: i === Math.round(N * 0.62),
        });
      }
    }

    function frame(now) {
      raf = 0;
      const t = reduce ? 0 : (now - t0) / 1000;
      if (pointer) {
        comb.x += (pointer[0] - comb.x) * 0.18;
        comb.a += (1 - comb.a) * 0.08;
      } else {
        comb.a += (0 - comb.a) * 0.06;
      }

      const css = getComputedStyle(document.documentElement);
      const ink = css.getPropertyValue('--text').trim() || '#eee';
      const accent = css.getPropertyValue('--accent').trim() || '#ff4d4d';

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const N = lines.length;
      const band = Math.min(H * 0.62, 240);
      const gap = band / (N - 1);
      const top = (H - band) / 2;
      const cy = H / 2;
      const stepX = W < 640 ? 6 : 8;
      // knotted on the left third, combed out through the middle, straight on the right
      const a = W * 0.3;
      const b = W * 0.7;

      for (const ln of lines) {
        const ys = top + ln.i * gap;
        ctx.beginPath();
        for (let x = -stepX; x <= W + stepX; x += stepX) {
          let env = 1 - smooth(a, b, x);
          if (comb.a > 0.01) {
            const cdx = (x - comb.x) / 110;
            env *= 1 - 0.85 * comb.a * Math.exp(-cdx * cdx * 0.5);
          }
          const wob =
            ln.amp[0] * Math.sin(x * 0.0105 + ln.phase[0] + t * 0.35 * ln.speed) +
            ln.amp[1] * Math.sin(x * 0.023 + ln.phase[1] - t * 0.5 * ln.speed) +
            ln.amp[2] * Math.sin(x * 0.051 + ln.phase[2] + t * 0.8);
          const y = ys + env * ((cy - ys) * 0.9 + wob * band * 0.4);
          if (x === -stepX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        if (ln.accent) {
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.95;
          ctx.lineWidth = 1.6;
        } else {
          ctx.strokeStyle = ink;
          ctx.globalAlpha = 0.28;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const settling = comb.a > 0.005 && comb.a < 0.995;
      if (visible && (!reduce || settling || pointer)) raf = requestAnimationFrame(frame);
    }
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      pointer = [e.clientX - r.left, e.clientY - r.top];
      if (comb.x < -1000) comb.x = pointer[0];
      kick();
    };
    const onLeave = () => { pointer = null; kick(); };
    const onResize = () => { setup(); kick(); };

    setup();
    kick();

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(wrap);
    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    const mo = new MutationObserver(kick);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <figure ref={wrapRef} className="threads">
      <canvas ref={canvasRef} aria-hidden="true" />
      <figcaption className="lp-wrap threads-stages">
        {STAGES.map((s, i) => (
          <span key={s}>
            <b>{String(i + 1).padStart(2, '0')}</b> {s}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
