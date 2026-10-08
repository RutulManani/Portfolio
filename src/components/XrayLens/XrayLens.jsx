import { useRef, useState } from 'react';
import { ScanLine } from 'lucide-react';
import './XrayLens.css';

const LENS_RADIUS = 110; // radius in px of the hover lens

/**
 * Renders a single project image, with a blueprint/x-ray overlay
 * that follows the cursor on hover and can be expanded to fill
 * the frame via a button (or press-and-hold on desktop).
 */
export default function XrayLens({ src, alt, name }) {
  const frameRef = useRef(null);
  const readoutRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [full, setFull] = useState(false);

  /* Compute lens center + the coordinate readout */
  function track(e) {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    frame.style.setProperty('--lx', `${x}px`);
    frame.style.setProperty('--ly', `${y}px`);
    if (readoutRef.current) {
      const px = Math.round((x / rect.width) * 1440);
      const py = Math.round((y / rect.height) * 900);
      readoutRef.current.textContent = `X ${px}  Y ${py}`;
    }
  }

  /* Radius string for clip-path */
  const radius = full ? '150%' : hovering ? `${LENS_RADIUS}px` : '0px';

  return (
    <div className="xray">
      <div
        ref={frameRef}
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') setHovering(true);
          track(e);
        }}
        onPointerMove={track}
        onPointerLeave={() => {
          setHovering(false);
          setFull(false);
        }}
        onPointerDown={(e) => {
          track(e);
          if (e.pointerType === 'mouse') setFull(true);
          else setFull((v) => !v);
        }}
        onPointerUp={(e) => {
          if (e.pointerType === 'mouse') setFull(false);
        }}
        className={`xray__frame${hovering ? ' is-hovering' : ''}`}
        style={{ '--lx': '50%', '--ly': '50%' }}
      >
        {/* Base image (final) */}
        <img src={src} alt={alt} draggable={false} />

        {/* Blueprint overlay (same image + filter + grid) */}
        <div
          className="xray__blueprint"
          aria-hidden="true"
          style={{ clipPath: `circle(${radius} at var(--lx, 50%) var(--ly, 50%))` }}
        >
          <img src={src} alt="" draggable={false} />
          <div className="xray__grid-fine" />
          <div className="xray__grid-coarse" />
          <span className="xray__tag-top">{name} / blueprint</span>
          <span className="xray__tag-bottom">1440 × 900 · 8pt grid</span>
        </div>

        {/* The lens ring + readout — only visible while hovering and not expanded */}
        <div
          className={`xray__lens${hovering && !full ? ' is-visible' : ''}`}
          aria-hidden="true"
        >
          <div className="xray__lens-ring" />
          <div className="xray__lens-cross-h" />
          <div className="xray__lens-cross-v" />
          <span ref={readoutRef} className="xray__readout" />
        </div>
      </div>

      {/* The toggle button — always available, works on touch + keyboard */}
      <button
        type="button"
        aria-pressed={full}
        onClick={() => setFull((v) => !v)}
        className="xray__button"
      >
        <ScanLine size={14} aria-hidden="true" />
        {full ? 'Back to final' : 'X-ray it'}
        <span className="sr-only"> — show the {name} blueprint</span>
      </button>
    </div>
  );
}