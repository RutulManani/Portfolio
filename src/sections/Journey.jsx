import { useReveal, useRevealClass } from '../hooks/useReveal';
import { JOURNEY } from '../data/content';
import './Journey.css';

/** Journey: a vertical timeline of professional evolution. */
export default function Journey() {
  const head = useRevealClass('reveal');

  return (
    <section id="journey" className="journey-section">
      <div className="journey-bg">
        <div className="journey-bg-blob" />
      </div>

      <div className="journey-container">
        <div ref={head.ref} className={head.className + ' journey-header'}>
          <div className="journey-label">
            <span className="journey-label-accent">The Journey</span>
            <span className="journey-label-line" />
            <span className="journey-label-muted">How I got here</span>
          </div>
          <h2 className="journey-title">
            A transformation in{' '}
            <span className="journey-title-accent">seven movements</span>.
          </h2>
        </div>

        {/* Timeline */}
        <div className="journey-timeline">
          <div className="journey-timeline-line" />

          <div className="journey-timeline-items">
            {JOURNEY.map((item, i) => (
              <TimelineRow key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineRow({ item, index }) {
  const { ref, inView } = useReveal();
  const leftSide = index % 2 === 0;
  const revealBase = leftSide ? 'reveal-left' : 'reveal-right';

  return (
    <div
      ref={ref}
      className={`journey-row ${revealBase} ${inView ? 'in' : ''}`}
    >
      {/* Node */}
      <div className="journey-node">
        <span className="journey-node-pulse animate-pulse-ring" />
        <span className="journey-node-dot" />
      </div>

      <div
        className={`journey-row-content ${leftSide ? 'journey-row-left' : 'journey-row-right'}`}
      >
        <div className="journey-card" data-cursor="hover">
          <div className={`journey-card-header ${leftSide ? 'journey-card-header-right' : ''}`}>
            <span className="journey-card-year">{item.year}</span>
            <span className="journey-card-line" />
          </div>
          <h3 className="journey-card-title">{item.title}</h3>
          <p className="journey-card-place">{item.place}</p>
          <p className="journey-card-text">{item.text}</p>
        </div>
      </div>
    </div>
  );
}