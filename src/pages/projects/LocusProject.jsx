import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../components/ProjectDetail.css'

// Import all Locus images
// Replace these paths with your actual saved image files
import locusHeroImg from '../../assets/images/Locus.png'
import locusConnectImg from '../../assets/images/Locus.png'
import locusSyncImg from '../../assets/images/Locus.png'
import locusHomeImg from '../../assets/images/Locus.png'
import locusDecisionLogImg from '../../assets/images/Locus.png'
import locusPulseImg from '../../assets/images/Locus.png'
import locusDetailImg from '../../assets/images/Locus.png'

const LocusProject = () => {
  const navigate = useNavigate()
  const [visibleSections, setVisibleSections] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document
      .querySelectorAll('[data-section]')
      .forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleBackToProjects = () => {
    navigate('/', { state: { scrollToProjects: true } })
  }

  const scopeItems = [
    {
      tag: 'Home',
      description:
        'Designed the ask-anything search and the daily capture feed, so a new decision from Slack shows up with the same weight as an answer to a direct question.'
    },
    {
      tag: 'Decision Log',
      description:
        'Designed the searchable table and the citation detail view — every row expands into source, participants, and a confidence score, so nothing reads as a guess.'
    },
    {
      tag: 'Team Pulse',
      description:
        'Designed the Monday digest that summarizes a week of decisions, action items, and blockers into something worth reading in under a minute.'
    },
    {
      tag: 'System',
      description:
        'Locked the brand system — palette, type pairing, component rules — and built the interactive onboarding flow, from the empty first-connect screen to first sync.'
    }
  ]

  const screens = [
    {
      step: 'Onboarding',
      title: 'Connect workspaces',
      caption: 'One-click OAuth into Slack, Notion, Gmail.',
      image: locusConnectImg
    },
    {
      step: 'Onboarding',
      title: 'First sync',
      caption: 'Reads recent messages, classifies decisions in the background.',
      image: locusSyncImg
    },
    {
      step: 'Surface 01',
      title: 'Home',
      caption: 'Ask a question, or scan what got captured today.',
      image: locusHomeImg
    },
    {
      step: 'Surface 02',
      title: 'Decision Log',
      caption: 'Every decision, action item, and blocker, filterable and cited.',
      image: locusDecisionLogImg
    },
    {
      step: 'Surface 03',
      title: 'Team Pulse',
      caption: 'The week synthesized, new every Monday.',
      image: locusPulseImg
    }
  ]

  const callouts = [
    {
      label: 'Confidence score',
      text: 'Every extraction ships with a number, not a false sense of certainty. Below 0.85, we designed for the row to say so.'
    },
    {
      label: 'Participants, named',
      text: 'Pulled straight from the thread — no "someone decided," always a name.'
    },
    {
      label: 'Source, one click away',
      text: 'The row opens onto the original Slack or Notion thread. Nothing is presented as memory without a way to check it.'
    },
    {
      label: 'Flag, not delete',
      text: 'If the extraction is wrong, a person can flag it rather than silently lose it — the same discipline the product asks of its data.'
    }
  ]

  const signals = [
    {
      value: '17/25',
      caption: 'interviewees asked to be on the early access list'
    },
    {
      value: '10×',
      caption:
        'cheaper per month running Haiku as a triage pass before Sonnet extracts'
    },
    {
      value: '>95%',
      caption:
        'recall target set for the triage step — a dropped decision is unrecoverable'
    }
  ]

  return (
    <div className='locus-project'>
      <style jsx='true'>{`
        /* Light mode support for Locus project */
        [data-theme="light"] .locus-project {
          --project-bg: #f5f5f5;
          --project-bg-secondary: #ffffff;
          --project-text: #1a1a1a;
          --project-text-secondary: #4a4a4a;
          --project-border: rgba(0, 0, 0, 0.08);
        }

        [data-theme="light"] .locus-project .body-text {
          color: #4a4a4a;
        }

        [data-theme="light"] .locus-project .body-text strong {
          color: #1a1a1a;
        }

        [data-theme="light"] .locus-project .hero-sub {
          color: #4a4a4a;
        }

        [data-theme="light"] .locus-project .meta-item p {
          color: #4a4a4a;
        }

        [data-theme="light"] .locus-project .project-hero-custom h1 {
          color: #1a1a1a;
        }

        [data-theme="light"] .locus-project .scope-card-custom {
          background: #f5f5f5;
        }

        [data-theme="light"] .locus-project .scope-card-custom p {
          color: #4a4a4a;
        }

        [data-theme="light"] .locus-project .film-cell figcaption {
          color: #4a4a4a;
        }

        [data-theme="light"] .locus-project .film-cell figcaption .step {
          color: var(--project-accent);
        }

        [data-theme="light"] .locus-project .callout-list li {
          color: #4a4a4a;
          border-color: rgba(0, 0, 0, 0.08);
        }

        [data-theme="light"] .locus-project .callout-list li b {
          color: var(--project-accent);
        }

        [data-theme="light"] .locus-project .signal-cap {
          color: #4a4a4a;
        }

        [data-theme="light"] .locus-project .disclaimer {
          color: #4a4a4a;
          border-color: rgba(0, 0, 0, 0.08);
        }

        [data-theme="light"] .locus-project .reflect-card-custom {
          background: #f5f5f5;
        }

        [data-theme="light"] .locus-project .reflect-card-custom p {
          color: #4a4a4a;
        }

        [data-theme="light"] .locus-project .swatch span {
          color: rgba(255, 255, 255, 0.9);
        }

        [data-theme="light"] .locus-project .type-card {
          background: #f5f5f5;
          border-color: rgba(0, 0, 0, 0.08);
        }

        [data-theme="light"] .locus-project .type-card .label {
          color: #6a6a6a;
        }

        [data-theme="light"] .locus-project .type-card .sample {
          color: #1a1a1a;
        }

        .locus-project {
          --project-accent: #6d5ae6;
          --project-accent-light: #8a7aed;
          --project-accent-dim: rgba(109, 90, 230, 0.1);
          --project-lime: #c7f035;
          --project-navy: #0f1a2e;
          --project-text: #f0f0f0;
          --project-text-secondary: #b3b3b3;
          --project-bg: #0f0f0f;
          --project-bg-secondary: #1a1a1a;
          --project-border: rgba(255, 255, 255, 0.08);
        }

        /* Hero Image */
        .hero-image-full {
          width: 100%;
          margin: 0 auto;
          height: 70vh;
          max-height: 800px;
          overflow: hidden;
        }

        .hero-image-full img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Hero Content */
        .hero-content-wrapper {
          padding: 4rem 5% 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .project-hero-custom h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--project-text);
          margin-bottom: 1.5rem;
          max-width: 900px;
        }

        .project-hero-custom h1 em {
          color: var(--project-accent);
          font-style: italic;
          font-weight: 800;
        }

        .hero-sub {
          font-size: 1.1rem;
          color: var(--project-text-secondary);
          max-width: 800px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          font-family: var(--font-body);
        }

        .hero-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          padding-top: 2rem;
          border-top: 1px solid var(--project-border);
        }

        .meta-item label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--project-accent);
          margin-bottom: 0.5rem;
        }

        .meta-item p {
          font-size: 0.95rem;
          color: var(--project-text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .hero-content-wrapper {
            padding: 2rem 5% 1.5rem;
          }
          .project-hero-custom h1 {
            font-size: 2.2rem;
            margin-bottom: 1rem;
          }
          .hero-sub {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .project-hero-custom h1 {
            font-size: 1.8rem;
          }
        }

        /* Hero Banner */
        .hero-banner-custom {
          background: var(--project-bg-secondary);
          width: 100%;
          padding: 4rem 5%;
          border-top: 1px solid var(--project-border);
          border-bottom: 1px solid var(--project-border);
          position: relative;
          overflow: hidden;
        }

        .hero-banner-inner {
          display: flex;
          align-items: center;
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .locus-logo-wrap {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          background: var(--project-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(109, 90, 230, 0.3);
        }

        .locus-logo-wrap svg {
          width: 40px;
          height: 40px;
          fill: white;
        }

        .hero-banner-text {
          color: var(--project-text);
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          font-weight: 500;
          font-style: italic;
          line-height: 1.4;
          max-width: 42ch;
          opacity: 0.9;
        }

        .hero-banner-text strong {
          font-style: normal;
          font-weight: 700;
          color: var(--project-accent);
        }

        /* Section Styling */
        .section-custom {
          padding: 6rem 5%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-full-custom {
          padding: 6rem 5%;
          background: var(--project-bg-secondary);
          border-top: 1px solid var(--project-border);
          border-bottom: 1px solid var(--project-border);
        }

        .section-full-custom .inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }

        .step-num {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--project-accent);
        }

        .step-num::before {
          content: '';
          display: inline-block;
          width: 24px;
          height: 2px;
          background: var(--project-accent);
          margin-right: 0.6rem;
          vertical-align: middle;
        }

        h2.section-heading {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--project-text);
        }

        .body-text {
          font-size: 1.05rem;
          color: var(--project-text-secondary);
          line-height: 1.8;
          max-width: 68ch;
          margin-bottom: 1.2rem;
          font-family: var(--font-body);
        }

        .body-text strong {
          color: var(--project-text);
          font-weight: 600;
        }

        /* Big Stat */
        .stat-big-custom {
          font-family: var(--font-heading);
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 700;
          color: var(--project-accent);
          line-height: 0.9;
          margin: 1.5rem 0 0.5rem;
        }

        .stat-big-custom small {
          font-size: 0.4em;
          vertical-align: super;
        }

        /* Scope Grid */
        .scope-grid-custom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .scope-card-custom {
          background: var(--project-bg);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .scope-card-custom:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
        }

        .scope-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--project-accent);
          margin-bottom: 1rem;
        }

        .scope-card-custom p {
          font-size: 0.95rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        /* Brand Swatches */
        .swatches {
          display: flex;
          gap: 0;
          margin: 2.5rem 0;
          border: 1px solid var(--project-border);
          border-radius: 8px;
          overflow: hidden;
        }

        .swatch {
          flex: 1;
          height: 120px;
          position: relative;
        }

        .swatch span {
          position: absolute;
          bottom: 12px;
          left: 14px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
          font-family: var(--font-body);
        }

        /* Type Pair */
        .type-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .type-card {
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
          background: var(--project-bg);
        }

        .type-card .label {
          font-size: 0.8rem;
          color: var(--project-text-secondary);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .type-card .sample {
          font-size: 1.8rem;
          line-height: 1.2;
          color: var(--project-text);
        }

        .type-card.serifsample .sample {
          font-family: 'Instrument Serif', 'Syne', serif;
          font-style: italic;
        }

        .type-card.sanssample .sample {
          font-family: var(--font-body);
          font-weight: 600;
        }

        /* Filmstrip */
        .flow-label {
          font-size: 0.95rem;
          color: var(--project-text-secondary);
          margin-bottom: 2rem;
        }

        .flow-label b {
          color: var(--project-text);
        }

        .filmstrip {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.2rem;
          margin: 2rem 0;
        }

        .film-cell figure {
          margin: 0;
        }

        .film-cell img {
          width: 100%;
          height: auto;
          display: block;
          border: 1px solid var(--project-border);
          border-radius: 8px;
          transition: transform 0.4s ease, border-color 0.4s ease;
        }

        .film-cell img:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
        }

        .film-cell figcaption {
          margin-top: 1rem;
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--project-text-secondary);
        }

        .film-cell figcaption .step {
          display: block;
          font-size: 0.7rem;
          color: var(--project-accent);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        /* Spotlight */
        .spotlight {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
          margin-top: 2.5rem;
        }

        .spotlight img {
          width: 100%;
          height: auto;
          border: 1px solid var(--project-border);
          border-radius: 8px;
          display: block;
        }

        .callout-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .callout-list li {
          padding: 1.2rem 0;
          border-top: 1px solid var(--project-border);
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--project-text-secondary);
        }

        .callout-list li:last-child {
          border-bottom: 1px solid var(--project-border);
        }

        .callout-list li b {
          color: var(--project-accent);
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        /* Signals */
        .signal-row {
          display: flex;
          gap: 4rem;
          margin-top: 3rem;
          flex-wrap: wrap;
        }

        .signal-num {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: var(--project-lime);
          line-height: 1;
          font-weight: 700;
        }

        .signal-cap {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          max-width: 220px;
          margin-top: 0.75rem;
          line-height: 1.5;
        }

        .disclaimer {
          margin-top: 3.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--project-border);
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          max-width: 600px;
          line-height: 1.6;
        }

        /* Reflection */
        .reflect-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .reflect-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
        }

        .reflect-card-custom h4 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--project-text);
          margin-bottom: 0.8rem;
        }

        .reflect-card-custom p {
          font-size: 0.95rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        /* Mockup Full */
        .mockup-full-container {
          width: 100%;
          margin: 2rem 0;
        }

        .mockup-full-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--project-border);
        }

        /* Fade In */
        .fade-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .filmstrip {
            grid-template-columns: repeat(2, 1fr);
          }
          .spotlight {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .hero-banner-inner {
            flex-direction: column;
            text-align: center;
          }
          .scope-grid-custom {
            grid-template-columns: 1fr;
          }
          .type-pair {
            grid-template-columns: 1fr;
          }
          .reflect-grid {
            grid-template-columns: 1fr;
          }
          .signal-row {
            gap: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .filmstrip {
            grid-template-columns: 1fr;
          }
          .swatches {
            flex-direction: column;
          }
          .swatch {
            height: 80px;
          }
        }
      `}</style>

      {/* Hero Section - Image Only */}
      <section
        className='fade-section'
        data-section='hero'
        style={
          visibleSections.hero ? { opacity: 1, transform: 'translateY(0)' } : {}
        }
      >
        <div className='hero-image-full'>
          <img src={locusHeroImg} alt='Locus AI - Case Study' />
        </div>
      </section>

      {/* Hero Content - Below Image */}
      <section
        className='project-hero-custom fade-section'
        data-section='hero-content'
        style={
          visibleSections['hero-content']
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='hero-content-wrapper'>
          <h1>
            Giving an AI memory layer a face people would <em>trust.</em>
          </h1>
          <p className='hero-sub'>
            Locus AI turns scattered Slack, Notion, and Gmail threads into a
            searchable record of what a team actually decided. I designed the
            three surfaces people would live in, and the system that holds them
            together.
          </p>

          <div className='hero-meta'>
            <div className='meta-item'>
              <label>Role</label>
              <p>UX/UI Designer</p>
            </div>
            <div className='meta-item'>
              <label>Company</label>
              <p>PM Accelerator, Cohort 9</p>
            </div>
            <div className='meta-item'>
              <label>Team</label>
              <p>2 PMs, 2 designers</p>
            </div>
            <div className='meta-item'>
              <label>Stage</label>
              <p>0→1, pre-launch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <div
        className='hero-banner-custom fade-section'
        data-section='banner'
        style={
          visibleSections.banner
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='hero-banner-inner'>
          <div className='locus-logo-wrap'>
            <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M16 4 L28 16 L16 28 L4 16 Z'
                fill='white'
                opacity='0.9'
              />
              <circle cx='16' cy='16' r='5' fill='#0F1A2E' />
            </svg>
          </div>
          <p className='hero-banner-text'>
            "A decision made in Slack on Tuesday is{' '}
            <strong>gone by Friday.</strong> Teams already had the tools to
            talk. What they didn't have was a place where a decision, once made,
            stayed findable."
          </p>
        </div>
      </div>

      {/* The Problem Section */}
      <section
        className='section-custom fade-section'
        data-section='problem'
        style={
          visibleSections.problem
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>The Problem</span>
        </div>
        <h2 className='section-heading'>
          A decision made in Slack on Tuesday is gone by Friday.
        </h2>
        <p className='body-text'>
          Teams already had the tools to talk. What they didn't have was a
          place where a decision, once made, stayed findable — with who made
          it, why, and what it replaced. So the same argument happened twice,
          and new hires spent week one asking questions nobody had time to
          answer.
        </p>

        <div className='stat-row' style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <div>
            <div className='stat-big-custom'>
              94<small>%</small>
            </div>
            <p
              className='body-text'
              style={{ maxWidth: '240px', fontSize: '0.9rem', marginTop: '0.5rem' }}
            >
              of the PMs and designers we interviewed lose a key decision a few
              times a year
            </p>
          </div>
          <div>
            <div className='stat-big-custom'>
              44<small>%</small>
            </div>
            <p
              className='body-text'
              style={{ maxWidth: '240px', fontSize: '0.9rem', marginTop: '0.5rem' }}
            >
              lose one at least every month — often the same decision,
              re-litigated
            </p>
          </div>
          <div>
            <div className='stat-big-custom'>n=25</div>
            <p
              className='body-text'
              style={{ maxWidth: '240px', fontSize: '0.9rem', marginTop: '0.5rem' }}
            >
              PMs and designers interviewed by the product team before I joined
              the design
            </p>
          </div>
        </div>
      </section>

      {/* What I Designed Section */}
      <div
        className='section-full-custom fade-section'
        data-section='scope'
        style={
          visibleSections.scope
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>What I Designed</span>
          </div>
          <h2 className='section-heading'>
            Three surfaces, one system, built to be trusted at a glance.
          </h2>
          <p className='body-text'>
            The product team had already validated the problem and shaped a
            two-model pipeline (Claude Haiku triages, Sonnet extracts) that
            turns raw messages into structured decisions. My job was to give
            that pipeline a face — something a PM would open every morning and
            trust without double-checking.
          </p>

          <div className='scope-grid-custom'>
            {scopeItems.map((item, index) => (
              <div key={index} className='scope-card-custom'>
                <div className='scope-tag'>{item.tag}</div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand System Section */}
      <div
        className='section-full-custom fade-section'
        data-section='brand'
        style={
          visibleSections.brand
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>Brand System</span>
          </div>
          <h2 className='section-heading'>
            A memory product needed to feel calm, not clever.
          </h2>
          <p className='body-text'>
            Everything else in this space performs intelligence with gradients
            and motion. Locus needed to feel like the one steady thing in a
            noisy stack — closer to a ledger than a dashboard.
          </p>

          <div className='swatches'>
            <div className='swatch' style={{ background: '#0F1A2E' }}>
              <span>Navy · #0F1A2E</span>
            </div>
            <div className='swatch' style={{ background: '#6D5AE6' }}>
              <span>Memory Violet · #6D5AE6</span>
            </div>
            <div className='swatch' style={{ background: '#C7F035' }}>
              <span style={{ color: '#0F1A2E' }}>Electric Lime · #C7F035</span>
            </div>
            <div className='swatch' style={{ background: '#F3F2EE' }}>
              <span style={{ color: '#0F1A2E' }}>Paper · #F3F2EE</span>
            </div>
          </div>

          <div className='type-pair'>
            <div className='type-card serifsample'>
              <div className='label'>Headlines — Instrument Serif</div>
              <div className='sample'>
                Decisions,
                <br />
                never lost.
              </div>
            </div>
            <div className='type-card sanssample'>
              <div className='label'>Interface — Inter</div>
              <div className='sample'>
                Decision · Action item · Blocker
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Five Screens Section */}
      <section
        className='section-custom fade-section'
        data-section='screens'
        style={
          visibleSections.screens
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>The Five Screens</span>
        </div>
        <h2 className='section-heading'>
          From first connect to a searchable memory.
        </h2>
        <p className='flow-label'>
          Two flows, in order: <b>onboarding</b> gets a workspace connected,
          then the <b>three core surfaces</b> are where the team lives day to
          day.
        </p>

        <div className='filmstrip'>
          {screens.map((screen, index) => (
            <div key={index} className='film-cell'>
              <figure>
                <img src={screen.image} alt={screen.title} />
                <figcaption>
                  <span className='step'>{screen.step}</span>
                  {screen.title} — {screen.caption}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </section>

      {/* Close-Up Section */}
      <section
        className='section-custom fade-section'
        data-section='detail'
        style={
          visibleSections.detail
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>Close-Up</span>
        </div>
        <h2 className='section-heading'>
          A decision is only useful if you can check it.
        </h2>

        <div className='spotlight'>
          <img src={locusDetailImg} alt='Decision Log detail with citation' />
          <ul className='callout-list'>
            {callouts.map((callout, index) => (
              <li key={index}>
                <b>{callout.label}</b>
                {callout.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What the Research Showed */}
      <div
        className='section-full-custom fade-section'
        data-section='research'
        style={
          visibleSections.research
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>What the Research Showed</span>
          </div>
          <h2 className='section-heading'>
            The team had already done the hard part before I designed a pixel.
          </h2>
          <p className='body-text'>
            This research was run by the product team ahead of my work — I'm
            including it because it's what the design decisions above were
            answering to.
          </p>

          <div className='signal-row'>
            {signals.map((signal, index) => (
              <div key={index}>
                <div className='signal-num'>{signal.value}</div>
                <div className='signal-cap'>{signal.caption}</div>
              </div>
            ))}
          </div>

          <p className='disclaimer'>
            Numbers sourced from the team's Voice-of-Customer study (n=25) and
            product architecture docs. Shown for context on what the design
            needed to hold up against, not as a claim of personal research or
            shipped-product impact.
          </p>
        </div>
      </div>

      {/* Looking Back */}
      <section
        className='section-custom fade-section'
        data-section='reflection'
        style={
          visibleSections.reflection
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>Looking Back</span>
        </div>
        <h2 className='section-heading'>What I'd pick up next.</h2>

        <div className='reflect-grid'>
          <div className='reflect-card-custom'>
            <h4>Left unfinished</h4>
            <p>
              Empty states, error states, and the Figma-to-engineering handoff
              were still open when the cohort wrapped. Those are the next
              things I'd design.
            </p>
          </div>
          <div className='reflect-card-custom'>
            <h4>What stuck with me</h4>
            <p>
              Designing for something an AI extracts, not something a person
              types, changes the job — the interface has to earn trust for a
              claim it didn't make itself.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div
        className='project-navigation'
        style={{ padding: '5rem 5%', maxWidth: '1200px', margin: '0 auto' }}
      >
        <button onClick={handleBackToProjects} className='btn btn-secondary'>
          <i className='fas fa-arrow-left'></i>
          <span>Back to Projects</span>
        </button>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to='/projects/4' className='btn btn-secondary'>
            <i className='fas fa-arrow-left'></i>
            <span>Previous: SpendSmart</span>
          </Link>
          <Link to='/projects/1' className='btn btn-primary'>
            <span>Next: Airbnb</span>
            <i className='fas fa-arrow-right'></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LocusProject