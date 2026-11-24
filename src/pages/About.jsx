import { useState } from 'react';
import { PenTool, Code2, Music } from 'lucide-react';
import SectionHead from '../components/SectionHead/SectionHead';
import SkillBoard from '../components/SkillBoard/SkillBoard';
import Gallery from '../components/Gallery/Gallery';
import { EXPERIENCE } from '../data/content';
import portrait from '../assets/images/portrait-about.jpg';
import './About.css';

/* A cricket ball: the one trait lucide has no icon for */
function CricketBall({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M5.2 8.4c4.2 1 8.4 5.2 9.4 10.6" />
      <path d="M9.4 4.9c4.2 1 8.4 5.2 9.4 10.6" />
      <path d="M7.4 6.6c4.2 1 8.4 5.2 9.4 10.6" strokeDasharray="0.1 2.4" strokeWidth="2.6" />
    </svg>
  );
}

/* What I'm made of: each badge on the photo ring matches a highlighted
   phrase in the intro. Hovering either one lights up the other. */
const TRAITS = [
  { key: 'design', label: 'Designing for users and the business', Icon: PenTool, angle: -50 },
  { key: 'code', label: 'Front-end development', Icon: Code2, angle: 5 },
  { key: 'music', label: 'Music lover', Icon: Music, angle: 60 },
  { key: 'cricket', label: 'Cricket enthusiast', Icon: CricketBall, angle: 115 },
];

const FACTS = [
  { value: '3+', label: 'years designing software' },
  { value: '10+', label: 'products shipped' },
  { value: '5', label: 'design systems built' },
];

export default function About() {
  const [active, setActive] = useState(null);
  const on = (key) => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(key),
    onBlur: () => setActive(null),
  });
  const trait = (key, text) => (
    <strong className={`ab-trait${active === key ? ' is-on' : ''}`} tabIndex={0} {...on(key)}>
      {text}
    </strong>
  );

  return (
    <div className="about-page">
      {/* Intro: who I am on the left (sticky), skill board on the right */}
      <section className="ab-hero">
        <div className="lp-wrap ab-hero-grid">
          <div className="ab-hero-text">
            <p className="ab-kicker">About me</p>

            <div className="ab-avatar">
              <span className="ab-ring" aria-hidden="true" />
              <img src={portrait} alt="Rutul Manani" width="152" height="152" />
              {TRAITS.map(({ key, label, Icon, angle }) => (
                <span
                  key={key}
                  className={`ab-badge${active === key ? ' is-on' : ''}`}
                  style={{ '--a': `${angle}deg` }}
                  role="img"
                  aria-label={label}
                  tabIndex={0}
                  {...on(key)}
                >
                  <Icon size={18} />
                  <span className="ab-tip" aria-hidden="true">{label}</span>
                </span>
              ))}
            </div>

            <h1 className="ab-title">
              Curious first, <em>pixel&#8209;perfect later.</em>
            </h1>
            <p className="ab-lead">
              I start every project with conversations, because the real problem is rarely the one in
              the brief. Then I map the mess, cut it down to what {trait('design', 'users and the business')}{' '}
              actually need, and prototype until it holds up in testing. My industrial design roots
              taught me to respect constraints, and knowing {trait('code', 'front-end development')} means
              my designs survive the trip to production.
            </p>
          </div>

          <div className="ab-board">
            <SkillBoard />
          </div>
        </div>

        <div className="lp-wrap">
          <dl className="ab-facts">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Experience: company, role, dates. Nothing else. */}
      <section className="lp-block">
        <div className="lp-wrap">
          <SectionHead title="Experience" />
          <ol className="ab-xp">
            {EXPERIENCE.map((x) => (
              <li key={x.company}>
                <h3 className="ab-company">{x.company}</h3>
                <span className="ab-role">{x.title}</span>
                <span className="ab-when">{x.when}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sketchbook */}
      <Gallery />
    </div>
  );
}
