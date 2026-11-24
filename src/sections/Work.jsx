import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHead from '../components/SectionHead/SectionHead';
import { projects } from '../lib/projects';
import './Work.css';

/* ----------------------------------------------------------------
   Selected work: sticky split showcase.
   Left: the projects as a calm list. Right: one large image panel that
   stays put and crossfades to the project being read (on scroll) or
   pointed at (on hover). Phones get the image above each project.
   ---------------------------------------------------------------- */
export default function Work() {
  const [active, setActive] = useState(0);
  const items = useRef([]);

  // the project crossing the middle of the viewport becomes active
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" className="lp-block">
      <div className="lp-wrap">
        <SectionHead title="Selected work" />

        <div className="ws">
          <ol className="ws-list">
            {projects.map((p, i) => (
              <li
                key={p.id}
                ref={(el) => (items.current[i] = el)}
                data-i={i}
                className={`ws-item${active === i ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
              >
                <Link to={p.link} className="ws-link">
                  {/* phones only: image inline */}
                  <span className={`ws-media ws-media--inline ws--${p.tone} ws--${p.fit}`} aria-hidden="true">
                    <img src={p.image} alt="" loading="lazy" />
                  </span>
                  <span className="ws-org">
                    {p.name} · {p.org}
                  </span>
                  <h3 className="ws-name">{p.title}</h3>
                  <p className="ws-line">{p.summary}</p>
                  <ul className="ws-tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <span className="ws-cta">
                    View case study <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="ws-stage" aria-hidden="true">
            {projects.map((p, i) => (
              <span
                key={p.id}
                className={`ws-media ws--${p.tone} ws--${p.fit}${active === i ? ' is-active' : ''}`}
              >
                <img src={p.image} alt="" />
              </span>
            ))}
            <span className="ws-count">
              {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
