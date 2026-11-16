import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  animate,
} from 'framer-motion';
import '../../components/ProjectDetail.css';
// Images
import locusDashboardImg from '../../assets/images/Locus.png';
import locusConnectImg from '../../assets/images/locus-connect.png';
import locusSyncImg from '../../assets/images/locus-sync.png';
import locusFindImg from '../../assets/images/locus-home.png';
import locusAskImg from '../../assets/images/locus-detail.png';
import locusExplorerImg from '../../assets/images/locus-decision-log.png';
import locusPulseImg from '../../assets/images/locus-pulse.png';

/* =========================================================
   CONTENT (edit text here, layout stays the same)
   ========================================================= */

const OVERVIEW = [
  { icon: '💬', label: 'Problem', text: 'Team decisions get buried in Slack, Notion and email. Days later nobody can find them.' },
  { icon: '🧭', label: 'What I designed', text: 'Onboarding, four product surfaces and the design system behind them.' },
  { icon: '🧩', label: 'System', text: '70 components and 180+ variants, built on shared tokens.' },
];

const STATS = [
  { to: 94, suffix: '%', label: 'of PMs and designers lose a key decision a few times a year' },
  { to: 44, suffix: '%', label: 'lose one at least once a month' },
  { to: 25, prefix: 'n=', label: 'people interviewed by the product team' },
];

const ONBOARDING = [
  { title: 'Connect your tools', text: 'Read-only access to Slack, Notion and Gmail in one click. No new workflow.', img: locusConnectImg },
  { title: 'Locus captures what matters', text: 'AI reads team chat and tags each message as a Decision, Action item or Blocker.', img: locusSyncImg },
  { title: 'Find any decision in seconds', text: 'Search in plain language. Every result links back to the original thread.', img: locusFindImg },
];

const JOURNEY = [
  {
    when: 'Monday, 9:00',
    title: 'See what got captured',
    text: 'The Dashboard opens with an Ask bar, today’s counts of decisions, action items and blockers, and which sources are connected.',
    detail: 'A disconnected Gmail shows in red, so missing data is never silent.',
    img: locusDashboardImg,
  },
  {
    when: 'Mid-meeting',
    title: 'Ask, don’t dig',
    text: '“What did we decide about the Q3 timeline?” returns plain-language answers instead of a pile of links.',
    detail: 'Every answer ends with its source channel and date.',
    img: locusAskImg,
  },
  {
    when: 'Before a review',
    title: 'Audit every decision',
    text: 'Memory Explorer lists everything, filterable by type, with a source and status on every row.',
    detail: 'Old decisions are marked Superseded, not deleted, so the history stays honest.',
    img: locusExplorerImg,
  },
  {
    when: 'Every Monday',
    title: 'The week in one minute',
    text: 'Team Pulse summarises the week: top decisions, open action items and active blockers.',
    detail: 'A “Useful?” thumbs up or down lets the team tune what the digest shows.',
    img: locusPulseImg,
  },
];

const TOKENS = [
  { name: 'Brand primary', hex: '#4338CA' },
  { name: 'Brand subtle', hex: '#DDD6FE' },
  { name: 'Accent lime', hex: '#E0FF82' },
  { name: 'Text primary', hex: '#18181B' },
  { name: 'Text secondary', hex: '#6B7280' },
  { name: 'Success', hex: '#15803D' },
  { name: 'Warning', hex: '#B45309' },
  { name: 'Danger', hex: '#991B1B' },
];

const PLAYGROUND = {
  'Decision row': ['Default', 'Expanded', 'Flagging', 'Flagged'],
  'Type pill': ['Decision', 'Action item', 'Blocker'],
  'Status pill': ['Current', 'Confirmed', 'Superseded'],
  'Source card': ['Active', 'Disconnected', 'Add new'],
  Button: ['Primary', 'Secondary', 'No border', 'Delete', 'Flag'],
};

const PLAYGROUND_NOTES = {
  'Decision row': 'The core unit of Locus. AI made this claim, so the row shows who, where, and how confident, and lets people flag it.',
  'Type pill': 'One colour per type, used everywhere: the feed, the log and the weekly Pulse.',
  'Status pill': 'Decisions change. Superseded keeps the old answer visible instead of deleting it.',
  'Source card': 'Connection health is always visible, because a broken source means missing memory.',
  Button: '9 button types, each with default and hover, so every screen uses the same set.',
};

const PRINCIPLES = [
  { t: 'Design every state', d: 'Hover, expanded, flagging, flagged, empty and disconnected, not just the happy path.' },
  { t: 'Show the AI’s confidence', d: 'Extracted decisions carry a confidence score and a source, so people can check them.' },
  { t: 'Correct, don’t delete', d: 'Flag and Superseded keep the record honest when the AI or the team gets it wrong.' },
];

const REFLECTION = [
  { t: 'Designing for AI changes the job', d: 'The interface has to earn trust for a claim it didn’t make itself. Confidence, sources and flagging became core, not extras.' },
  { t: 'What I’d do next', d: 'Finish empty and error states, run usability tests on the flagging flow, and hand off with documented components.' },
];

/* =========================================================
   SMALL BUILDING BLOCKS
   ========================================================= */

const EASE = [0.22, 1, 0.36, 1];

const Reveal = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

const CountUp = ({ to, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{prefix}{Math.round(val)}{suffix}</span>;
};

const SectionLabel = ({ children }) => (
  <div className="section-label"><span className="step-num">{children}</span></div>
);

const BrowserFrame = ({ children, label }) => (
  <div className="browser">
    <div className="browser-bar">
      <span /><span /><span />
      <em>{label}</em>
    </div>
    <div className="browser-body">{children}</div>
  </div>
);

/* ---------- Live components (rebuilt from the Figma library) ---------- */

const TypePill = ({ type }) => {
  const cls = { Decision: 'decision', 'Action item': 'action', Blocker: 'blocker' }[type];
  return <span className={`lc-pill ${cls}`}>{type}</span>;
};

const StatusPill = ({ status }) => (
  <span className={`lc-pill status-${status.toLowerCase()}`}>{status}</span>
);

const LcButton = ({ kind, children, onClick }) => {
  const cls = { Primary: 'primary', Secondary: 'secondary', 'No border': 'ghost', Delete: 'delete', Flag: 'primary', Flagged: 'primary' }[kind];
  return (
    <button className={`lc-btn ${cls}`} onClick={onClick}>
      {(kind === 'Flag' || kind === 'Flagged') && <span aria-hidden="true">⚑</span>}
      {kind === 'Delete' && <span aria-hidden="true">🗑</span>}
      {children || kind}
    </button>
  );
};

const SourceCard = ({ state }) => {
  if (state === 'Add new') return <div className="lc-source add">+ Add New Source</div>;
  const active = state === 'Active';
  return (
    <div className="lc-source">
      <span className="lc-logo">#</span>
      <div>
        <strong>Slack</strong>
        <small>Synced today 9:00 am</small>
      </div>
      <span className={`lc-dot ${active ? 'ok' : 'bad'}`}>{active ? 'Active' : 'Disconnected'}</span>
    </div>
  );
};

const DecisionRow = ({ state, setState }) => {
  const open = state !== 'Default';
  return (
    <div className={`lc-row ${open ? 'open' : ''}`}>
      <button className="lc-row-head" onClick={() => setState(open ? 'Default' : 'Expanded')} aria-expanded={open}>
        <TypePill type="Decision" />
        <span className="lc-sum">Adopt PostgreSQL for the context layer</span>
        <span className="lc-src">Slack #engineering</span>
        <StatusPill status="Current" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="lc-row-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <dl>
              <dt>Participants</dt><dd>@jwest, @priya, @mtanaka</dd>
              <dt>Source</dt><dd>Notion · #product-planning · Mar 12, 9:41am</dd>
              <dt>Confidence</dt><dd>0.92 · confirmed decision</dd>
            </dl>
            <div className="lc-actions">
              <LcButton kind="Secondary">View Original</LcButton>
              {state === 'Flagged'
                ? <LcButton kind="Flagged" onClick={() => setState('Expanded')}>Flagged</LcButton>
                : <LcButton kind="Flag" onClick={() => setState('Flagging')}>Flag</LcButton>}
            </div>
            <AnimatePresence>
              {state === 'Flagging' && (
                <motion.div
                  className="lc-flag"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <p>Why are you flagging this?</p>
                  <div className="lc-chips">
                    {['Inaccurate', 'Outdated', 'Other'].map((c) => <span key={c}>{c}</span>)}
                  </div>
                  <div className="lc-actions end">
                    <LcButton kind="Secondary" onClick={() => setState('Expanded')}>Cancel</LcButton>
                    <LcButton kind="Primary" onClick={() => setState('Flagged')}>Submit Flag</LcButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================
   PAGE
   ========================================================= */

const LocusProject = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Lightbox
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  // Onboarding story (auto-advances, pauses on hover)
  const STORY_MS = 4500;
  const [story, setStory] = useState(0);
  const [storyPaused, setStoryPaused] = useState(false);
  const storyRef = useRef(null);
  const storyInView = useInView(storyRef, { margin: '-20% 0px -20% 0px' });
  useEffect(() => {
    if (reduce || storyPaused || !storyInView) return;
    const t = setTimeout(() => setStory((s) => (s + 1) % ONBOARDING.length), STORY_MS);
    return () => clearTimeout(t);
  }, [story, storyPaused, storyInView, reduce]);
  const storyRunning = !reduce && !storyPaused && storyInView;

  // Follow-one-decision scroll story
  const [jStep, setJStep] = useState(0);
  const stepRefs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setJStep(Number(e.target.dataset.idx)); });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Playground
  const [comp, setComp] = useState('Decision row');
  const [variant, setVariant] = useState('Expanded');
  const pickComp = (c) => { setComp(c); setVariant(c === 'Decision row' ? 'Expanded' : PLAYGROUND[c][0]); };

  // Token copy
  const [copied, setCopied] = useState(null);
  const copyHex = (hex) => {
    try { navigator.clipboard && navigator.clipboard.writeText(hex); } catch (e) { /* ignore */ }
    setCopied(hex);
    setTimeout(() => setCopied(null), 1400);
  };

  const handleBackToProjects = () => navigate('/', { state: { scrollToProjects: true } });

  const renderComponent = () => {
    switch (comp) {
      case 'Decision row': return <DecisionRow state={variant} setState={setVariant} />;
      case 'Type pill': return <TypePill type={variant} />;
      case 'Status pill': return <StatusPill status={variant} />;
      case 'Source card': return <SourceCard state={variant} />;
      default: return <LcButton kind={variant} />;
    }
  };

  return (
    <div className="airbnb-project locus-project">
      <style jsx="true">{`
        /* ================= Tokens ================= */
        .locus-project {
          --project-accent: #8b80ff;
          --project-accent-dim: rgba(139, 128, 255, 0.14);
          --project-lime: #e0ff82;
          --project-text: #f0f0f0;
          --project-text-secondary: #b3b3b3;
          --project-bg: #0f0f0f;
          --project-bg-secondary: #1a1a1a;
          --project-border: rgba(255, 255, 255, 0.08);
          overflow-x: clip;
        }
        [data-theme="light"] .locus-project {
          --project-accent: #4338ca;
          --project-accent-dim: rgba(67, 56, 202, 0.1);
          --project-lime: #3d4700;
          --project-bg: #f5f5f5;
          --project-bg-secondary: #ffffff;
          --project-text: #1a1a1a;
          --project-text-secondary: #4a4a4a;
          --project-border: rgba(0, 0, 0, 0.08);
        }

        /* ================= Hero ================= */
        .hero-image-full { width: 100%; height: 70vh; max-height: 800px; overflow: hidden; }
        .hero-image-full img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
        .hero-content-wrapper { padding: 4rem 5% 2rem; max-width: 1200px; margin: 0 auto; }
        .project-hero-custom h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
          color: var(--project-text);
          margin-bottom: 1.5rem; max-width: 900px;
        }
        .project-hero-custom h1 em { color: var(--project-accent); font-style: italic; font-weight: 800; }
        .hero-sub { font-size: 1.15rem; color: var(--project-text-secondary); max-width: 680px; line-height: 1.7; margin-bottom: 2.5rem; font-family: var(--font-body); }
        .hero-meta {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem; padding-top: 2rem; border-top: 1px solid var(--project-border);
        }
        .meta-item label {
          display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--project-accent); margin-bottom: 0.5rem;
        }
        .meta-item p { font-size: 0.95rem; color: var(--project-text-secondary); line-height: 1.5; }

        /* ================= Sections ================= */
        .section-custom { padding: 6rem 5%; max-width: 1200px; margin: 0 auto; }
        .section-full-custom {
          padding: 6rem 5%;
          background: var(--project-bg-secondary);
          border-top: 1px solid var(--project-border);
          border-bottom: 1px solid var(--project-border);
        }
        .section-full-custom .inner { max-width: 1200px; margin: 0 auto; }
        .section-label { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; }
        .step-num { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--project-accent); }
        .step-num::before {
          content: ''; display: inline-block; width: 24px; height: 2px;
          background: var(--project-accent); margin-right: 0.6rem; vertical-align: middle;
        }
        h2.section-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700; letter-spacing: -0.02em; line-height: 1.2;
          margin-bottom: 1rem; color: var(--project-text); max-width: 22ch;
        }
        .section-lead { font-size: 1.1rem; color: var(--project-text-secondary); line-height: 1.7; max-width: 60ch; margin-bottom: 2.5rem; font-family: var(--font-body); }
        .section-lead strong { color: var(--project-text); font-weight: 600; }
        .card {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 14px; padding: 1.6rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .section-full-custom .card { background: var(--project-bg); }
        .card.hover:hover { transform: translateY(-4px); border-color: var(--project-accent); }
        .eyebrow { display: block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--project-accent); margin-bottom: 0.6rem; }
        .card h3 { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; color: var(--project-text); margin-bottom: 0.4rem; }
        .card p { font-size: 0.93rem; color: var(--project-text-secondary); line-height: 1.6; }

        /* ================= Overview + stats ================= */
        .overview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .overview-icon { font-size: 1.8rem; display: block; margin-bottom: 0.8rem; }
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 1rem; }
        .stat-big { font-family: var(--font-heading); font-size: clamp(2.8rem, 6vw, 4.2rem); font-weight: 700; color: var(--project-accent); line-height: 1; margin-bottom: 0.6rem; }
        .stat-cap { font-size: 0.92rem; color: var(--project-text-secondary); line-height: 1.5; max-width: 26ch; }
        .credit { margin-top: 2rem; font-size: 0.8rem; color: var(--project-text-secondary); }

        /* ================= Browser frame ================= */
        .browser {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid var(--project-border);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
        }
        .browser-bar { display: flex; align-items: center; gap: 6px; padding: 0.65rem 0.9rem; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; }
        .browser-bar span { width: 10px; height: 10px; border-radius: 50%; background: #d1d5db; }
        .browser-bar em { margin-left: 0.6rem; font-style: normal; font-size: 0.75rem; color: #6b7280; font-family: var(--font-body); }
        .browser-body { position: relative; line-height: 0; background: #fff; cursor: zoom-in; }
        .browser-body img { width: 100%; height: auto; display: block; }

        /* ================= Onboarding story ================= */
        .story { display: grid; grid-template-columns: 1fr 1.6fr; gap: 3rem; align-items: center; }
        .story-steps { display: grid; gap: 0.8rem; }
        .story-step {
          text-align: left;
          padding: 1.1rem 1.2rem;
          border-radius: 12px;
          border: 1px solid var(--project-border);
          background: transparent;
          cursor: pointer;
          font-family: var(--font-body);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .story-step strong { display: block; color: var(--project-text); font-size: 1rem; margin-bottom: 0.3rem; }
        .story-step span { display: block; color: var(--project-text-secondary); font-size: 0.88rem; line-height: 1.5; }
        .story-step.active { border-color: var(--project-accent); background: var(--project-accent-dim); }
        .story-bar { height: 3px; border-radius: 3px; background: var(--project-border); margin-top: 0.9rem; overflow: hidden; }
        .story-bar > div { height: 100%; background: var(--project-accent); transform-origin: 0 50%; }

        /* ================= Follow one decision ================= */
        .follow { display: grid; grid-template-columns: 1fr 1.35fr; gap: 3rem; align-items: start; }
        .follow-steps { display: grid; gap: 0; }
        .follow-step { min-height: 62vh; display: flex; flex-direction: column; justify-content: center; padding: 1rem 0; opacity: 0.35; transition: opacity 0.4s ease; }
        .follow-step.active { opacity: 1; }
        .follow-step .when { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--project-lime); margin-bottom: 0.6rem; }
        .follow-step h3 { font-family: var(--font-heading); font-size: 1.6rem; color: var(--project-text); margin-bottom: 0.8rem; }
        .follow-step p { font-size: 1rem; color: var(--project-text-secondary); line-height: 1.7; margin-bottom: 0.8rem; max-width: 42ch; }
        .follow-step .detail { font-size: 0.9rem; color: var(--project-text); border-left: 2px solid var(--project-accent); padding-left: 0.9rem; }
        .follow-step .inline-shot { display: none; margin-top: 1rem; }
        .follow-sticky { position: sticky; top: 18vh; }
        .follow-progress { display: flex; gap: 6px; margin-top: 1rem; justify-content: center; }
        .follow-progress span { width: 28px; height: 4px; border-radius: 4px; background: var(--project-border); transition: background 0.3s ease; }
        .follow-progress span.on { background: var(--project-accent); }

        /* ================= Design system ================= */
        .sys-stats { display: flex; flex-wrap: wrap; gap: 2.5rem; margin-bottom: 2.5rem; }
        .sys-stats div { font-size: 0.85rem; color: var(--project-text-secondary); }
        .sys-stats strong { display: block; font-family: var(--font-heading); font-size: 2.4rem; color: var(--project-text); line-height: 1; margin-bottom: 0.3rem; }
        .tokens { display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.6rem; margin-bottom: 3rem; }
        .token {
          border: 1px solid var(--project-border);
          border-radius: 12px; overflow: hidden;
          background: var(--project-bg);
          cursor: pointer; padding: 0; text-align: left;
          font-family: var(--font-body);
          transition: transform 0.2s ease;
        }
        .token:hover { transform: translateY(-3px); }
        .token .sw { height: 64px; }
        .token .meta { padding: 0.55rem 0.65rem; }
        .token strong { display: block; font-size: 0.72rem; color: var(--project-text); }
        .token small { font-size: 0.7rem; color: var(--project-text-secondary); }
        .playground {
          display: grid; grid-template-columns: 280px 1fr;
          border: 1px solid var(--project-border);
          border-radius: 16px; overflow: hidden;
          min-height: 420px;
        }
        .props { background: var(--project-bg); padding: 1.3rem; border-right: 1px solid var(--project-border); }
        .props-title { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--project-text-secondary); margin-bottom: 0.7rem; }
        .comp-list { display: grid; gap: 2px; margin-bottom: 1.5rem; }
        .comp-item {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.55rem 0.7rem; border-radius: 8px;
          border: none; background: transparent; cursor: pointer;
          color: var(--project-text-secondary); font-size: 0.88rem; font-family: var(--font-body); text-align: left;
        }
        .comp-item::before { content: '◇'; color: var(--project-accent); }
        .comp-item:hover { background: var(--project-accent-dim); color: var(--project-text); }
        .comp-item.active { background: var(--project-accent); color: #fff; }
        .comp-item.active::before { content: '◆'; color: #fff; }
        .prop-row label { display: block; font-size: 0.75rem; color: var(--project-text-secondary); margin-bottom: 0.4rem; }
        .seg { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .seg button {
          padding: 0.4rem 0.7rem; border-radius: 7px;
          border: 1px solid var(--project-border);
          background: transparent; color: var(--project-text-secondary);
          font-size: 0.78rem; font-family: var(--font-body); cursor: pointer;
          transition: all 0.2s ease;
        }
        .seg button:hover { border-color: var(--project-accent); color: var(--project-text); }
        .seg button.on { background: var(--project-text); color: var(--project-bg); border-color: var(--project-text); }
        .canvas {
          position: relative;
          background-color: #f4f4f8;
          background-image: radial-gradient(#d4d4dc 1px, transparent 1px);
          background-size: 18px 18px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 2.5rem 1.5rem 4.5rem;
        }
        .canvas-stage { width: 100%; display: flex; justify-content: center; }
        .canvas-note {
          position: absolute; left: 1rem; right: 1rem; bottom: 1rem;
          font-size: 0.82rem; line-height: 1.5; color: #374151;
          background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
          padding: 0.65rem 0.85rem;
          font-family: var(--font-body);
        }
        .canvas-tag {
          position: absolute; top: 0.8rem; left: 0.9rem;
          font-size: 0.7rem; color: #4338ca; font-weight: 600;
          font-family: var(--font-body);
        }
        .principles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-top: 2rem; }

        /* ---------- Locus component styles (Figma tokens) ---------- */
        .lc-pill {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 999px;
          font-size: 12px; font-weight: 500; line-height: 17px;
          font-family: Inter, system-ui, sans-serif; white-space: nowrap;
        }
        .lc-pill.decision { background: #ddd6fe; color: #4338ca; }
        .lc-pill.action { background: #e0ff82; color: #3d4700; }
        .lc-pill.blocker { background: #fee2e2; color: #991b1b; }
        .lc-pill.status-current { background: #f2efff; color: #4338ca; }
        .lc-pill.status-confirmed { background: #e0ff82; color: #3d4700; }
        .lc-pill.status-superseded { background: #e5e7eb; color: #5b6472; }
        .lc-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 10px;
          font-size: 13px; font-weight: 500;
          font-family: Inter, system-ui, sans-serif;
          cursor: pointer; border: 1px solid transparent;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .lc-btn.primary { background: #4338ca; color: #fff; }
        .lc-btn.primary:hover { background: #3730a3; }
        .lc-btn.secondary { background: #fff; color: #4338ca; border-color: #e5e7eb; }
        .lc-btn.secondary:hover { border-color: #4338ca; }
        .lc-btn.ghost { background: transparent; color: #4338ca; }
        .lc-btn.ghost:hover { background: #f2efff; }
        .lc-btn.delete { background: #fee2e2; color: #991b1b; }
        .lc-btn.delete:hover { background: #fecaca; }
        .lc-source {
          width: 300px; display: grid; grid-template-columns: 36px 1fr auto; gap: 12px; align-items: center;
          background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 14px 16px;
          font-family: Inter, system-ui, sans-serif;
        }
        .lc-source strong { display: block; font-size: 14px; color: #18181b; }
        .lc-source small { font-size: 12px; color: #6b7280; }
        .lc-source.add { display: block; text-align: center; color: #4338ca; font-size: 13px; font-weight: 500; border-style: dashed; }
        .lc-logo { width: 36px; height: 36px; border-radius: 10px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #4a154b; }
        .lc-dot { font-size: 12px; font-weight: 500; display: inline-flex; align-items: center; gap: 5px; }
        .lc-dot::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
        .lc-dot.ok { color: #15803d; }
        .lc-dot.bad { color: #991b1b; }
        .lc-row { width: 100%; max-width: 640px; background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
        .lc-row-head {
          width: 100%; display: grid; grid-template-columns: auto 1fr auto auto; gap: 14px; align-items: center;
          padding: 14px 16px; background: #fff; border: none; cursor: pointer; text-align: left;
          transition: background 0.2s ease;
        }
        .lc-row-head:hover { background: #f3f4f6; }
        .lc-row.open .lc-row-head { border-bottom: 1px solid #e5e7eb; }
        .lc-sum { font-size: 14px; color: #18181b; }
        .lc-src { font-size: 12px; color: #6b7280; }
        .lc-row-body { overflow: hidden; }
        .lc-row-body dl { display: grid; grid-template-columns: 110px 1fr; gap: 8px 12px; padding: 14px 16px 4px; margin: 0; }
        .lc-row-body dt { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: #9ca3af; }
        .lc-row-body dd { margin: 0; font-size: 13px; color: #374151; }
        .lc-actions { display: flex; gap: 8px; padding: 12px 16px 16px; }
        .lc-actions.end { justify-content: flex-end; padding: 10px 0 0; }
        .lc-flag { margin: 0 16px 16px; padding: 14px; border: 1px solid #e5e7eb; border-radius: 12px; }
        .lc-flag p { font-size: 13px; color: #18181b; margin: 0 0 10px; }
        .lc-chips { display: flex; gap: 8px; }
        .lc-chips span { font-size: 12px; color: #6b7280; border: 1px solid #e5e7eb; border-radius: 999px; padding: 4px 12px; }

        /* ================= Reflection ================= */
        .reflect-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }

        /* ================= Lightbox ================= */
        .lightbox {
          position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88); z-index: 2000;
          display: flex; align-items: center; justify-content: center; padding: 4vh 4vw; cursor: zoom-out;
        }
        .lightbox img { max-width: 100%; max-height: 92vh; border-radius: 10px; }
        .lightbox-close { position: absolute; top: 1.2rem; right: 1.5rem; background: none; border: none; color: #fff; font-size: 1.6rem; cursor: pointer; }

        /* ================= Responsive ================= */
        @media (max-width: 1024px) {
          .story, .follow { grid-template-columns: 1fr; }
          .follow-sticky { display: none; }
          .follow-step { min-height: 0; opacity: 1; padding: 1.5rem 0; }
          .follow-step .inline-shot { display: block; }
          .tokens { grid-template-columns: repeat(4, 1fr); }
          .playground { grid-template-columns: 1fr; }
          .props { border-right: none; border-bottom: 1px solid var(--project-border); }
          .canvas { padding: 2.8rem 1rem 1rem; }
          .canvas-note { position: static; margin-top: 1.2rem; }
        }
        @media (max-width: 768px) {
          .section-custom, .section-full-custom { padding: 4rem 5%; }
          .hero-image-full { height: 42vh; }
          .hero-content-wrapper { padding: 2rem 5% 1.5rem; }
          .overview-grid, .stats-row, .principles, .reflect-grid { grid-template-columns: 1fr; }
          .tokens { grid-template-columns: repeat(2, 1fr); }
          .lc-row-head { grid-template-columns: auto 1fr; }
          .lc-src, .lc-row-head .status-current { display: none; }
          .lc-row-body dl { grid-template-columns: 1fr; gap: 2px; }
          .lc-row-body dd { margin-bottom: 8px; }
          .lc-source { width: 100%; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <motion.div
        className="hero-image-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <img src={locusDashboardImg} alt="Locus AI dashboard" />
      </motion.div>

      <section className="project-hero-custom">
        <div className="hero-content-wrapper">
          <Reveal><h1>A memory for every decision your team <em>makes</em></h1></Reveal>
          <Reveal delay={0.1}>
            <p className="hero-sub">
              Locus AI reads your team’s Slack, Notion and Gmail, pulls out the decisions, action items and blockers,
              and makes them searchable. I designed the product experience and the design system behind it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-meta">
              <div className="meta-item"><label>Role</label><p>UX/UI Designer</p></div>
              <div className="meta-item"><label>Program</label><p>PM Accelerator, Cohort 9</p></div>
              <div className="meta-item"><label>Team</label><p>2 PMs, 2 designers</p></div>
              <div className="meta-item"><label>Stage</label><p>0→1, pre-launch</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="section-custom" style={{ paddingTop: '3rem' }}>
        <Reveal><SectionLabel>Overview · 30-second read</SectionLabel></Reveal>
        <div className="overview-grid">
          {OVERVIEW.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08}>
              <div className="card hover" style={{ height: '100%' }}>
                <span className="overview-icon">{o.icon}</span>
                <span className="eyebrow">{o.label}</span>
                <p>{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <div className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>01 · The Problem</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">A decision made on Tuesday is gone by Friday</h2></Reveal>
          <Reveal>
            <p className="section-lead">
              Teams decide things in chat, then lose them. <strong>The same debate happens twice</strong>, and new
              hires spend their first week asking questions nobody has time to answer.
            </p>
          </Reveal>
          <div className="stats-row">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="stat-big"><CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} /></div>
                <p className="stat-cap">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <p className="credit">Research by the product team before I joined; shown for context.</p>
        </div>
      </div>

      {/* ================= HOW IT WORKS (story) ================= */}
      <section className="section-custom">
        <Reveal><SectionLabel>02 · How Locus Works</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Three steps, zero new habits</h2></Reveal>
        <Reveal><p className="section-lead">Locus works in the background. The onboarding explains it in three steps.</p></Reveal>
        <div
          ref={storyRef}
          className="story"
          onMouseEnter={() => setStoryPaused(true)}
          onMouseLeave={() => setStoryPaused(false)}
        >
          <div className="story-steps">
            {ONBOARDING.map((s, i) => (
              <button key={s.title} className={`story-step ${story === i ? 'active' : ''}`} onClick={() => setStory(i)}>
                <strong>{i + 1}. {s.title}</strong>
                <span>{s.text}</span>
                <div className="story-bar">
                  <motion.div
                    key={`${story}-${storyRunning}`}
                    initial={{ scaleX: i < story ? 1 : 0 }}
                    animate={{ scaleX: i < story ? 1 : i === story ? (storyRunning ? 1 : 0.5) : 0 }}
                    transition={{ duration: i === story && storyRunning ? STORY_MS / 1000 : 0.3, ease: 'linear' }}
                  />
                </div>
              </button>
            ))}
          </div>
          <BrowserFrame label="locus.ai · onboarding">
            <AnimatePresence mode="wait">
              <motion.img
                key={story}
                src={ONBOARDING[story].img}
                alt={ONBOARDING[story].title}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightbox({ src: ONBOARDING[story].img, alt: ONBOARDING[story].title })}
              />
            </AnimatePresence>
          </BrowserFrame>
        </div>
      </section>

      {/* ================= FOLLOW ONE DECISION (scroll story) ================= */}
      <div className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>03 · The Product</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">One decision, four surfaces</h2></Reveal>
          <Reveal><p className="section-lead">Follow the team’s <strong>Q3 timeline decision</strong> through a normal week. Scroll to move through it.</p></Reveal>
          <div className="follow">
            <div className="follow-steps">
              {JOURNEY.map((s, i) => (
                <div
                  key={s.title}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  data-idx={i}
                  className={`follow-step ${jStep === i ? 'active' : ''}`}
                >
                  <span className="when">{s.when}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <p className="detail">{s.detail}</p>
                  <div className="inline-shot">
                    <BrowserFrame label={s.title}>
                      <img src={s.img} alt={s.title} onClick={() => setLightbox({ src: s.img, alt: s.title })} />
                    </BrowserFrame>
                  </div>
                </div>
              ))}
            </div>
            <div className="follow-sticky">
              <BrowserFrame label={`locus.ai · ${JOURNEY[jStep].title}`}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={jStep}
                    src={JOURNEY[jStep].img}
                    alt={JOURNEY[jStep].title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    onClick={() => setLightbox({ src: JOURNEY[jStep].img, alt: JOURNEY[jStep].title })}
                  />
                </AnimatePresence>
              </BrowserFrame>
              <div className="follow-progress" aria-hidden="true">
                {JOURNEY.map((s, i) => <span key={s.title} className={jStep === i ? 'on' : ''} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESIGN SYSTEM ================= */}
      <section className="section-custom">
        <Reveal><SectionLabel>04 · Design System</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Every state designed, not just the happy path</h2></Reveal>
        <Reveal>
          <p className="section-lead">
            I built Locus as a component library in Figma, with tokens for colour, type, spacing and radius.
            <strong> Try the components below</strong>: they are rebuilt from the Figma file with the same tokens.
          </p>
        </Reveal>

        <Reveal>
          <div className="sys-stats">
            <div><strong><CountUp to={70} /></strong>components</div>
            <div><strong><CountUp to={180} suffix="+" /></strong>variants</div>
            <div><strong><CountUp to={9} /></strong>button types</div>
            <div><strong><CountUp to={6} /></strong>states for a decision row</div>
          </div>
        </Reveal>

        <Reveal>
          <div className="tokens">
            {TOKENS.map((t) => (
              <button key={t.hex} className="token" onClick={() => copyHex(t.hex)} aria-label={`Copy ${t.hex}`}>
                <div className="sw" style={{ background: t.hex }} />
                <div className="meta">
                  <strong>{t.name}</strong>
                  <small>{copied === t.hex ? 'Copied ✓' : t.hex}</small>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="playground">
            <div className="props">
              <div className="props-title">Components</div>
              <div className="comp-list">
                {Object.keys(PLAYGROUND).map((c) => (
                  <button key={c} className={`comp-item ${comp === c ? 'active' : ''}`} onClick={() => pickComp(c)}>{c}</button>
                ))}
              </div>
              <div className="props-title">Properties</div>
              <div className="prop-row">
                <label>{comp === 'Decision row' ? 'State' : comp === 'Button' ? 'Type' : 'Variant'}</label>
                <div className="seg">
                  {PLAYGROUND[comp].map((v) => (
                    <button key={v} className={variant === v ? 'on' : ''} onClick={() => setVariant(v)}>{v}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="canvas">
              <span className="canvas-tag">◆ {comp} / {variant}</span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={comp}
                  className="canvas-stage"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderComponent()}
                </motion.div>
              </AnimatePresence>
              <p className="canvas-note">
                {PLAYGROUND_NOTES[comp]}
                {comp === 'Decision row' && ' Click the row or the Flag button to try it.'}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="principles">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="card hover" style={{ height: '100%' }}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= REFLECTION ================= */}
      <div className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>05 · Reflection</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">What I’m taking with me</h2></Reveal>
          <div className="reflect-grid">
            {REFLECTION.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.1}>
                <div className="card" style={{ height: '100%' }}>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="project-navigation" style={{ padding: '4rem 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={handleBackToProjects} className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          <span>Back to Projects</span>
        </button>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/projects/4" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            <span>Previous: SpendSmart</span>
          </Link>
          <Link to="/projects/1" className="btn btn-primary">
            <span>Next: Airbnb</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
          >
            <button className="lightbox-close" aria-label="Close" onClick={() => setLightbox(null)}>✕</button>
            <motion.img src={lightbox.src} alt={lightbox.alt} initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocusProject;