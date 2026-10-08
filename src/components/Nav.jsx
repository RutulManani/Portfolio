import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScroll';
import './Nav.css';

// Only "Work" remains — no Home, no Contact, no Praise
const SECTIONS = [
  { id: 'work', label: 'Work' },
];

export default function Nav({ theme, onToggleTheme }) {
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  // Tracks which nav link was clicked — resets on navigation
  const [activeClick, setActiveClick] = useState(null);
  // True once the page has scrolled past ~12px — drives the blur bar
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  /* ---- Sticky-blur trigger ---- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Lock body scroll while the mobile menu is open ---- */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setActiveClick(id);

    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const goHome = () => {
    setOpen(false);
    setActiveClick(null);
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="nav-progress">
        <div
          className="nav-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header className={`nav-header${scrolled ? ' scrolled' : ''}`}>
        {/* Logo — text wordmark, acts as home link */}
        <button
          onClick={goHome}
          className="nav-logo"
          data-cursor="hover"
          aria-label="Rutul Manani — go to home"
        >
          <span className="nav-logo-word">
            Rutul Manani
            <span className="nav-logo-dot" aria-hidden="true">.</span>
          </span>
        </button>

        <nav className="nav-links">
          {SECTIONS.map((s) => {
            const isActive = isHome && activeClick === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                data-cursor="hover"
                className="nav-link"
                style={{
                  color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                }}
              >
                {s.label}
                <span
                  className="nav-link-underline"
                  style={{
                    width: isActive ? 'calc(100% - 1.5rem)' : 0,
                  }}
                />
              </button>
            );
          })}

          <Link
            to="/about"
            className="nav-link"
            data-cursor="hover"
            style={{
              color:
                location.pathname === '/about'
                  ? 'var(--text)'
                  : 'var(--text-secondary)',
            }}
          >
            About
            <span
              className="nav-link-underline"
              style={{
                width:
                  location.pathname === '/about'
                    ? 'calc(100% - 1.5rem)'
                    : 0,
              }}
            />
          </Link>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </nav>

        <div className="nav-mobile-controls">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setOpen((o) => !o)}
            className="nav-menu-btn"
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="nav-mobile-menu">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="nav-mobile-link"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {s.label}
            </button>
          ))}
          <Link
            to="/about"
            className="nav-mobile-link"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: `${SECTIONS.length * 0.07}s` }}
          >
            About
          </Link>
        </div>
      )}
    </>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      data-cursor="hover"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="nav-theme-toggle"
    >
      <Sun
        size={16}
        className="nav-theme-icon"
        style={{
          opacity: theme === 'dark' ? 0 : 1,
          transform:
            theme === 'dark'
              ? 'rotate(-90deg) scale(0.5)'
              : 'rotate(0) scale(1)',
          color: 'var(--accent)',
        }}
      />
      <Moon
        size={16}
        className="nav-theme-icon"
        style={{
          opacity: theme === 'dark' ? 1 : 0,
          transform:
            theme === 'dark'
              ? 'rotate(0) scale(1)'
              : 'rotate(90deg) scale(0.5)',
          color: 'var(--accent)',
        }}
      />
    </button>
  );
}