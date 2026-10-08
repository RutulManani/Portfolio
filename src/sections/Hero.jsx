import { useEffect, useState } from 'react';
import ParticleField from '../components/ParticleField';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import './Hero.css';

const ROLES = [
  'UX Designer',
  'Researcher',
  'Prototyper',
  'Systems Thinker',
  'Storyteller',
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!mounted) return;
    const current = ROLES[roleIdx];
    let timeout;

    if (!deleting && typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 70);
    } else if (!deleting && typed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), 35);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [typed, deleting, mounted, roleIdx]);

  const lines = ['I design where', 'complexity lives.'];

  return (
    <section id="hero" className="hero-section">
      {/* Particle network background */}
      <div className="hero-bg">
        <ParticleField />
      </div>

      {/* Two-column layout: content left, profile card right */}
      <div className="hero-grid">
        {/* Main content — left */}
        <div className="hero-content">
          {/* Typing role */}
          <div
            className="hero-typed"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.6s 0.5s',
            }}
          >
            <span className="hero-typed-prompt">{'>'}</span>{' '}
            <span className="hero-typed-text">{typed}</span>
            <span className="hero-typed-caret">|</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            {lines.map((line, i) => (
              <span key={i} className="mask-line">
                <span
                  className="mask-text"
                  style={{
                    transitionDelay: `${0.3 + i * 0.18}s`,
                    transform: mounted ? 'translateY(0)' : 'translateY(110%)',
                  }}
                >
                  {i === 1 ? (
                    <span className="hero-title-accent">{line}</span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <div
            className="hero-subtitle"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '1.1s',
            }}
          >
            <p>
              Rutul is a product designer specializing in{' '}
              <strong>AI-driven applications</strong> and{' '}
              <strong>B2B SaaS</strong>, with a track record across{' '}
              <strong>Insurtech, HR tech, and early-stage startups</strong>
            </p>
          </div>
        </div>

        {/* Profile card — right */}
        <div
          className="hero-profile-card"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.2s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.2s',
          }}
        >
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}