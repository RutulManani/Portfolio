import { useEffect, useState } from 'react';
import { Copy, Check, ArrowUp } from 'lucide-react';
import { DESIGNER } from '../data/content';
import './Footer.css';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rutulmanani/' },
  { label: 'GitHub', href: 'https://github.com/RutulManani' },
  { label: 'Behance', href: 'https://www.behance.net/rutulmanandb9b' },
];

const torontoTime = () =>
  new Intl.DateTimeFormat('en-CA', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Toronto',
  }).format(new Date());

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(torontoTime);

  useEffect(() => {
    const id = setInterval(() => setTime(torontoTime()), 30000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DESIGNER.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      window.location.href = `mailto:${DESIGNER.email}`;
    }
  };

  return (
    <footer id="contact" className="site-footer">
      <div className="lp-wrap">
        <h2 className="ft-title">
          Let's work <em>together.</em>
        </h2>

        <div className="ft-links">
          <span className="ft-mail">
            <a className="ft-pill ft-pill--solid" href={`mailto:${DESIGNER.email}`}>
              {DESIGNER.email}
            </a>
            <button
              type="button"
              className="ft-copy"
              onClick={copy}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              title={copied ? 'Copied' : 'Copy email'}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </span>
          {LINKS.map((l) => (
            <a key={l.label} className="ft-pill" href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>

        <div className="ft-bar">
          <span>© {new Date().getFullYear()} Rutul Manani</span>
          <span>Toronto · {time}</span>
          <button type="button" className="ft-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
