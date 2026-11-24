import { useRef, useState } from 'react';
import SectionHead from '../components/SectionHead/SectionHead';
import { TESTIMONIALS } from '../data/content';
import './Testimonials.css';

const ORDER = ['Maahir Shah', 'LJ Huang', 'Asma Bessayadia'];
const PEOPLE = [...TESTIMONIALS].sort((a, b) => ORDER.indexOf(a.name) - ORDER.indexOf(b.name));

/* Bold the phrase that says what Rutul actually did. */
function Quote({ text, highlight }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <strong>{highlight}</strong>
      {text.slice(i + highlight.length)}
    </>
  );
}

/* One full recommendation at a time; pick a person with the tabs
   (click, or arrow keys once a tab has focus). No autoplay. */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const t = PEOPLE[active];

  const onKey = (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + PEOPLE.length) % PEOPLE.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="testimonials" className="lp-block">
      <div className="lp-wrap">
        <SectionHead title="Testimonials" />

        <div className="tq-people" role="tablist" aria-label="Choose a recommendation" onKeyDown={onKey}>
          {PEOPLE.map((p, i) => (
            <button
              key={p.name}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`tq-tab-${i}`}
              aria-selected={i === active}
              aria-controls="tq-panel"
              tabIndex={i === active ? 0 : -1}
              className={`tq-person${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="tq-avatar" aria-hidden="true">{p.initials}</span>
              <span className="tq-who">
                <span className="tq-name">{p.name}</span>
                <span className="tq-role">
                  {p.role}, {p.company}
                </span>
              </span>
            </button>
          ))}
        </div>

        <blockquote
          key={active}
          id="tq-panel"
          role="tabpanel"
          aria-labelledby={`tq-tab-${active}`}
          className="tq-quote"
        >
          <p>
            <Quote text={t.quote} highlight={t.highlight} />
          </p>
        </blockquote>
      </div>
    </section>
  );
}
