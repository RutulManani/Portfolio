import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

/** A custom cursor with a dot + smooth-following ring. Grows on hoverable elements. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const target = e.target;
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], input, textarea')
      );
    };
    const onLeave = () => setHidden(true);

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: hidden ? 0 : 1,
        }}
      >
        <div
          className="cursor-dot-inner"
          style={{ width: hovering ? 0 : 6, height: hovering ? 0 : 6 }}
        />
      </div>
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          opacity: hidden ? 0 : 1,
        }}
      >
        <div
          className="cursor-ring-inner"
          style={{
            width: hovering ? 56 : 32,
            height: hovering ? 56 : 32,
            backgroundColor: hovering ? 'var(--accent-tint)' : 'transparent',
          }}
        />
      </div>
    </>
  );
}