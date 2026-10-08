import { useRevealClass } from '../hooks/useReveal';
import SkillBoard from '../components/SkillBoard/SkillBoard';
import Gallery from '../components/Gallery/Gallery';
import { ABOUT_STATS } from '../data/content';
import Journey from '../sections/Journey';
import './About.css';

export default function About() {
  const hero = useRevealClass('reveal');

  return (
    <div className="about-page">
      {/* About + Skill board */}
      <section id="about" className="about-section">
        <div className="about-grid">
          {/* Left: sticky summary */}
          <div className="about-summary">
            <div ref={hero.ref} className={hero.className}>
              <div className="about-label">
                <span className="about-label-accent">About me</span>
                <span className="about-label-line" />
                <span className="about-label-muted">Ctrl + Me</span>
              </div>

              <h2 className="about-title">
                I design the quiet parts that make products{' '}
                <span className="about-title-accent">feel easy.</span>
              </h2>

              <p className="about-description">
                I'm a Toronto-based UX/UI designer and front-end developer
                working where research meets craft. I start with{' '}
                <mark className="about-mark">
                  real conversations
                  <span className="about-mark-dot" aria-hidden="true" />
                  <span role="tooltip" className="about-mark-tooltip">
                    the secret sauce
                  </span>
                </mark>
                , then build systems that keep teams fast and interfaces calm,
                from first sketch to final pixel.
              </p>

              <dl className="about-stats">
                {ABOUT_STATS.map((s) => (
                  <div key={s.label} className="about-stat">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="about-stat-value">{s.value}</dd>
                    <dd className="about-stat-label" aria-hidden="true">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right: skill board */}
          <div className="about-board">
            <SkillBoard />
          </div>
        </div>
      </section>

      {/* Journey Section — updated content */}
      <Journey />

      {/* Gallery Section — new */}
      <Gallery />
    </div>
  );
}