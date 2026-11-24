import { useState } from 'react';
import { DESIGNER } from '../data/content';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

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
    <section id="contact" className="contact">
      <div className="lp-wrap contact-inner">
        <h2 className="contact-title">Let's work together.</h2>
        <div className="contact-links">
          <a className="contact-email" href={`mailto:${DESIGNER.email}`}>
            {DESIGNER.email}
          </a>
          <button type="button" className="contact-copy" onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>
          <a href="https://www.linkedin.com/in/rutulmanani/" target="_blank" rel="noopener noreferrer" className="contact-li">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
