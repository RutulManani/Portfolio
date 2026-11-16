import { Link } from 'react-router-dom';
import { useRevealClass } from '../hooks/useReveal';
import { projects } from '../lib/projects';
import XrayLens from '../components/XrayLens/XrayLens';
import './Work.css';

/* The SVG filter applied to the blueprint copy of each image.
   Kept inline so it's guaranteed to be in the DOM before the
   overlay tries to reference it. */
function BlueprintFilter() {
  return (
    <svg aria-hidden="true" className="work-filter">
      <filter id="xray-blueprint" colorInterpolationFilters="sRGB">
        <feColorMatrix type="saturate" values="0" />
        <feConvolveMatrix
          order="3"
          kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1"
          preserveAlpha="true"
        />
        <feComponentTransfer>
          <feFuncR type="linear" slope="5" />
          <feFuncG type="linear" slope="5" />
          <feFuncB type="linear" slope="5" />
        </feComponentTransfer>
        <feColorMatrix
          type="matrix"
          values="0.55 0 0 0 0.03  0 0.75 0 0 0.12  0 0 0.85 0 0.32  0 0 0 0 1"
        />
      </filter>
    </svg>
  );
}

export default function Work() {
  const head = useRevealClass('reveal');

  return (
    <section id="work" className="work-section">
      <BlueprintFilter />

      <div className="work-container">
        {/* Header */}
        <div ref={head.ref} className={head.className + ' work-header'}>
          <div className="work-label">
            <span className="work-label-accent">Selected Works</span>
            <span className="work-label-line" />
            <span className="work-label-muted">What I've made</span>
          </div>
        </div>

        {/* Sticky stack of project cards */}
        <ol className="work-stack">
          {projects.map((project, i) => (
            <li
              key={project.id}
              className="work-stack__item"
              style={{ top: `calc(5rem + ${i * 1.5}rem)` }}
            >
              <article className="work-card">
                {/* Left: text column */}
                <div className="work-card__text">
                  <div className="work-card__meta">
                    <span>
                      <span className="work-card__index">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {` / ${String(projects.length).padStart(2, '0')}`}
                    </span>
                  </div>

                  <div className="work-card__title-block">
                    <p className="work-card__kind">{project.kind}</p>
                    <h3 className="work-card__title">{project.name}</h3>
                  </div>

                  <p className="work-card__summary">{project.summary}</p>

                  <div className="work-card__footer">
                    <div className="work-card__metric">
                      <span className="work-card__metric-value">
                        {project.metric.value}
                      </span>
                      <span className="work-card__metric-label">
                        {project.metric.label}
                      </span>
                    </div>

                    <Link
                      to={project.link}
                      className="work-card__cta"
                      data-cursor="hover"
                    >
                      View case study
                    </Link>
                  </div>
                </div>

                {/* Right: x-ray lens */}
                <div className="work-card__lens">
                  <XrayLens
                    src={project.image}
                    alt={project.alt}
                    name={project.name}
                  />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}