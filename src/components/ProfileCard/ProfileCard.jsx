import { useRef, useState } from 'react';
import { ArrowUpRight, MapPin, Briefcase, ChevronsLeftRight } from 'lucide-react';
import { DESIGNER } from '../../data/content';
import portraitImg from '../../assets/images/portrait.jpeg';
import './ProfileCard.css';

/* ----------------------------------------------------------------
   Profile card data — reads from your existing DESIGNER object
   where it can, with sensible fallbacks for the fields that
   don't exist on it yet.
   ---------------------------------------------------------------- */
const CARD = {
  name: DESIGNER.name || 'Rutul Manani',
  role: DESIGNER.role || 'UX/UI Designer',
  location: DESIGNER.location || 'Toronto, Canada',
  experience: '3+ yrs',
  status: 'Open to new projects',
  bio:
    "I turn messy problems into calm, usable products. Currently shaping AI-driven tools people actually enjoy opening.",
  skills: ['Research', 'Interaction', 'Design Systems', 'Prototyping'],
};

/* Small annotation tag used in the wireframe layer */
function Annotation({ children, className = '' }) {
  return (
    <span className={`profile-card__annotation ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

/* One card — variant is either "final" or "wire" */
function Card({ variant = 'final' }) {
  const isWire = variant === 'wire';
  const line = isWire ? 'profile-card__wire-line' : '';

  return (
    <article
      className={`profile-card ${isWire ? 'profile-card--wire' : ''}`}
      aria-hidden={isWire || undefined}
    >
      {/* Header: avatar + name */}
      <header className="profile-card__header">
        <div
          className={`profile-card__avatar ${
            isWire ? 'profile-card__avatar--wire' : ''
          }`}
        >
          {isWire ? (
            <>
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <line x1="0" y1="0" x2="64" y2="64" stroke="currentColor" strokeWidth="1.5" />
                <line x1="64" y1="0" x2="0" y2="64" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <Annotation style={{ top: '-8px', left: '50%' }}>64×64</Annotation>
            </>
          ) : (
            <img src={portraitImg} alt={`Portrait of ${CARD.name}`} />
          )}
        </div>

        <div className="profile-card__name-block">
          <h3 className="profile-card__name">
            <span className={line}>{CARD.name}</span>
          </h3>
          <p className="profile-card__role">
            <span className={line}>{CARD.role}</span>
          </p>
        </div>
      </header>

      {/* Status pill */}
      <div className="profile-card__status">
        <span className="profile-card__status-dot" aria-hidden="true" />
        <span className={line}>{CARD.status}</span>
      </div>

      {/* Bio */}
      <p className="profile-card__bio">
        <span className={line}>{CARD.bio}</span>
      </p>

      {/* Skills */}
      <ul className="profile-card__skills" aria-label="Skills">
        {CARD.skills.map((skill) => (
          <li key={skill} className="profile-card__skill">
            <span className={line}>{skill}</span>
          </li>
        ))}
      </ul>

      {/* Meta */}
      <dl className="profile-card__meta">
        <div className="profile-card__meta-item">
          <Briefcase size={14} aria-hidden="true" />
          <dt className="sr-only">Experience</dt>
          <dd style={{ margin: 0 }}>
            <span className={line}>{CARD.experience} in UX</span>
          </dd>
        </div>
        <div className="profile-card__meta-item">
          <MapPin size={14} aria-hidden="true" />
          <dt className="sr-only">Location</dt>
          <dd style={{ margin: 0 }}>
            <span className={line}>{CARD.location}</span>
          </dd>
        </div>
      </dl>

      {/* CTA */}
      <div className="profile-card__cta">
        <span className={line}>View case studies</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------
   The slider — drag horizontally to reveal wireframe ⇄ final
   ---------------------------------------------------------------- */
export default function ProfileCard() {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(52);

  const updateFromPointer = (clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (draggingRef.current) updateFromPointer(e.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - step));
    else if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + step));
    else if (e.key === 'Home') setPosition(0);
    else if (e.key === 'End') setPosition(100);
    else return;
    e.preventDefault();
  };

  return (
    <div className="profile-card-wrapper">
      <div className="profile-card-labels">
        <span>Final</span>
        <span>Lo-fi</span>
      </div>

      <div
        ref={containerRef}
        className="profile-card-slider"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        {/* Bottom layer: final card */}
        <Card variant="final" />

        {/* Top layer: wireframe card, clipped to the right of `position` */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 0 0 ${position}%)`,
          }}
        >
          <Card variant="wire" />
        </div>

        {/* Divider + handle */}
        <div
          className="profile-card__divider"
          style={{ left: `${position}%` }}
        >
          <div
            className="profile-card__percent"
            aria-hidden="true"
          >
            {Math.round(position)}% hi-fi
          </div>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Reveal wireframe or final design"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(100 - position)}% wireframe`}
            onKeyDown={handleKeyDown}
            className="profile-card__handle"
          >
            <ChevronsLeftRight size={18} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}