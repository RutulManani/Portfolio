import { Quote } from 'lucide-react';
import { useRevealClass } from '../hooks/useReveal';
import { TESTIMONIALS } from '../data/content';
import './Testimonials.css';

function Card({ t }) {
  return (
    <article className="testimonial-card" data-cursor="hover">
      <div className="testimonial-card-body">
        <Quote size={20} className="testimonial-quote-icon" />
        <p className="testimonial-quote-text">{t.quote}</p>
      </div>

      <div className="testimonial-card-footer">
        <span className="testimonial-avatar">{t.initials}</span>
        <div className="testimonial-meta">
          <p className="testimonial-name">{t.name}</p>
          <p className="testimonial-role">
            {t.role} · {t.company}
          </p>
        </div>
      </div>

      <div className="testimonial-accent-line" />
    </article>
  );
}

export default function Testimonials() {
  const head = useRevealClass('reveal');
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="testimonials-section">
      {/* Header */}
      <div
        ref={head.ref}
        className={head.className + ' testimonials-header'}
      >
        <div className="testimonials-label">
          <span className="testimonials-label-accent">Testimonials</span>
          <span className="testimonials-label-line" />
          <span className="testimonials-label-muted">
            From the people I worked with
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div className="testimonials-marquee-wrapper">
        {/* Edge fades */}
        <div className="testimonials-fade testimonials-fade-left" />
        <div className="testimonials-fade testimonials-fade-right" />

        <div className="testimonials-marquee-track marquee-track">
          {doubled.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}