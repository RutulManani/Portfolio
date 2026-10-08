import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useRevealClass } from '../hooks/useReveal';
import { DESIGNER } from '../data/content';
import './Contact.css';

/** Contact: the invitation to start something together. */
export default function Contact() {
  const head = useRevealClass('reveal');
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg">
        <div className="contact-bg-blob animate-float-slow" />
      </div>

      <div className="contact-container">
        <div ref={head.ref} className={head.className}>

          <h2 className="contact-title">
            Let's design the{' '}
            <span className="contact-title-accent">next chapter</span>{' '}
            together.
          </h2>

        </div>

        {/* Email button */}
        <div className="contact-actions">
          <a
            href={`mailto:${DESIGNER.email}`}
            data-cursor="hover"
            className="contact-email-btn"
          >
            {DESIGNER.email}
            <ArrowUpRight
              size={20}
              className="contact-email-arrow"
            />
          </a>
        </div>
      </div>
    </section>
  );
}