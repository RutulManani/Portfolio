import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Nav.css';

export default function Nav({ theme, onToggleTheme }) {
  // True once the page has scrolled past ~12px — drives the blur bar
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goWork = () => {
    if (!isHome) {
      navigate('/', { state: { scrollToProjects: true } });
      return;
    }
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goHome = () => {
    if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate('/');
  };

  return (
    <header className={`nav-header${scrolled ? ' scrolled' : ''}`}>
      <button onClick={goHome} className="nav-logo" aria-label="Rutul Manani, go to home">
        <span className="nav-logo-word">
          Rutul Manani
          <span className="nav-logo-dot" aria-hidden="true">.</span>
        </span>
      </button>

      <nav className="nav-links nav-links--always" aria-label="Main">
        <button onClick={goWork} className="nav-link">Work</button>
        <Link
          to="/about"
          className="nav-link"
          aria-current={location.pathname === '/about' ? 'page' : undefined}
        >
          About
        </Link>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </nav>
    </header>
  );
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="nav-theme-toggle"
    >
      <Sun
        size={16}
        className="nav-theme-icon"
        style={{
          opacity: theme === 'dark' ? 0 : 1,
          transform: theme === 'dark' ? 'rotate(-90deg) scale(0.5)' : 'rotate(0) scale(1)',
          color: 'var(--accent)',
        }}
      />
      <Moon
        size={16}
        className="nav-theme-icon"
        style={{
          opacity: theme === 'dark' ? 1 : 0,
          transform: theme === 'dark' ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0.5)',
          color: 'var(--accent)',
        }}
      />
    </button>
  );
}
