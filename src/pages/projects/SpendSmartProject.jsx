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
import spendsmartHeroImg from '../../assets/images/SpendSmart.png';
import spendsmartExpenseFormImg from '../../assets/images/spendsmart-expense-form.png';
import spendsmartChallengesImg from '../../assets/images/spendsmart-challenges.png';
import spendsmartBadgesImg from '../../assets/images/spendsmart-badges.png';
import spendsmartReportsImg from '../../assets/images/spendsmart-reports.png';
import spendsmartAdminImg from '../../assets/images/spendsmart-admin.png';
import spendsmartWireframesImg from '../../assets/images/spendsmart-wireframes.png';
import spendsmartPrototypeImg from '../../assets/images/spendsmart-prototype.png';
import spendsmartTestingImg from '../../assets/images/spendsmart-testing.png';

/* =========================================================
   CONTENT (edit text here, layout stays the same)
   ========================================================= */

const NAV_SECTIONS = [
  { id: 'ss-overview', label: 'Overview' },
  { id: 'ss-problem', label: 'Problem' },
  { id: 'ss-process', label: 'Process' },
  { id: 'ss-users', label: 'Users' },
  { id: 'ss-loop', label: 'Core idea' },
  { id: 'ss-walkthrough', label: 'Walkthrough' },
  { id: 'ss-evolution', label: 'Design evolution' },
  { id: 'ss-testing', label: 'Testing' },
  { id: 'ss-tech', label: 'Tech' },
  { id: 'ss-impact', label: 'Impact' },
  { id: 'ss-reflection', label: 'Reflection' },
];

const OVERVIEW = [
  { label: 'Problem', text: 'Students overspend when stressed or bored. Trackers show what was spent, never why.' },
  { label: 'Solution', text: 'Tag every expense with a mood and turn better habits into a daily game.' },
  { label: 'My role', text: 'Research, UX/UI design, usability testing and full-stack MERN development.' },
  { label: 'Impact', text: '83% task completion and 4.0/5 ease in testing. 3 key issues fixed before coding.' },
];

const PROCESS = [
  { num: '01', title: 'Define', week: 'Wk 1–2', text: 'User stories ranked Must / Should / Nice-to-have.', output: 'Requirements doc' },
  { num: '02', title: 'Design', week: 'Wk 2–3', text: 'Lo-fi wireframes to hi-fi Figma prototype.', output: 'Clickable prototype' },
  { num: '03', title: 'Test', week: 'Wk 4', text: '5 think-aloud sessions on 4 key tasks.', output: '3 priority fixes' },
  { num: '04', title: 'Build', week: 'Wk 5–7', text: 'REST API, JWT auth, React UI, game logic.', output: 'Working app' },
  { num: '05', title: 'Ship', week: 'Wk 8', text: 'Admin tools, polish and deployment.', output: 'Live MVP' },
];

const PERSONAS = [
  {
    icon: '👩‍🎓',
    name: 'Amira',
    role: 'International student',
    goal: 'Stay within a tight monthly budget.',
    pain: 'Buys coffee and snacks when stressed, then regrets it.',
    need: 'See the pattern and get a reason to stop.',
  },
  {
    icon: '👨‍🏫',
    name: 'Sam',
    role: 'Instructor / Admin',
    goal: 'Help students build better money habits.',
    pain: 'No visibility into what drives student spending.',
    need: 'Curate challenges and see anonymised trends.',
  },
];

const LOOP = [
  { icon: '🎯', title: 'Pick a challenge', text: 'Start the day with one small goal, like "Cook a meal instead of eating out".' },
  { icon: '😊', title: 'Log with a mood', text: 'Every purchase gets an amount, a category and how you felt.' },
  { icon: '⚡', title: 'Earn or lose points', text: '+10 points for positive moods, −10 for negative ones. Feelings now have a visible cost.' },
  { icon: '🏆', title: 'Streaks & badges', text: 'Keep a daily streak and collect badges from Common to Legendary, then come back tomorrow.' },
];

const MOODS = [
  { key: 'Happy', emoji: '😊', pts: 10 },
  { key: 'Excited', emoji: '🤩', pts: 10 },
  { key: 'Neutral', emoji: '😐', pts: 0 },
  { key: 'Sad', emoji: '😢', pts: -10 },
  { key: 'Stressed', emoji: '😣', pts: -10 },
];

const WALKTHROUGH = [
  {
    label: 'Pick a challenge',
    img: spendsmartChallengesImg,
    goal: 'Commit to one small money goal for today.',
    decision: 'Logging stays locked until a challenge starts, so every expense counts toward a goal.',
    notes: [
      { x: 27, y: 25, t: 'Rules up front: +10 points for positive moods, −10 for negative.' },
      { x: 30, y: 58, t: '5 preset challenges, curated by admins.' },
      { x: 62, y: 87, t: 'A clear nudge explains why logging is locked.' },
    ],
  },
  {
    label: 'Log with mood',
    img: spendsmartExpenseFormImg,
    goal: 'Record a purchase in seconds.',
    decision: 'Mood sits right beside amount and category: a core field, not an optional note.',
    notes: [
      { x: 72, y: 43, t: 'Mood is a core field, right next to the amount.' },
      { x: 18, y: 30, t: '24-hour countdown adds gentle urgency.' },
      { x: 14, y: 36, t: 'Streak counter rewards coming back daily.' },
      { x: 72, y: 81, t: 'Button lights up only once a challenge is live.' },
    ],
  },
  {
    label: 'Earn badges',
    img: spendsmartBadgesImg,
    goal: 'Feel progress, not just see numbers.',
    decision: 'Rarity tiers turn one-off wins into a collection worth growing.',
    notes: [
      { x: 31, y: 45, t: 'Each badge shows what you did, points earned and the date.' },
      { x: 62, y: 83, t: 'Common → Rare → Epic → Legendary gives long-term goals.' },
      { x: 12, y: 34, t: 'Progress bar fills as you complete the challenge.' },
    ],
  },
  {
    label: 'Spot patterns',
    img: spendsmartReportsImg,
    goal: 'Understand where money and moods go.',
    decision: 'A mood label sits beside every expense, so emotional patterns are visible at a glance.',
    notes: [
      { x: 50, y: 35, t: 'Totals at a glance: entries, total spent, average.' },
      { x: 18, y: 47, t: 'Filter by category, sort by date.' },
      { x: 12, y: 60, t: 'Mood shown with every expense, so patterns jump out.' },
      { x: 88, y: 57, t: 'Edit or delete any entry.' },
    ],
  },
  {
    label: 'Admin tools',
    img: spendsmartAdminImg,
    goal: 'Keep challenges fresh for every student.',
    decision: 'A separate, clearly labelled admin area with one tab per content type.',
    notes: [
      { x: 58, y: 5, t: '"Admin" label in the nav: never confused with the user view.' },
      { x: 50, y: 31, t: 'One tab each for users, challenges, categories and badges.' },
      { x: 50, y: 62, t: 'Colour-coded counts for a quick health check.' },
    ],
  },
];

const EVOLUTION = [
  'Kept the two-column core: challenge on the left, logging on the right.',
  'Dark theme with a lime accent keeps focus on the next action.',
  'Added helper text explaining how points work.',
];

const TEST_RESULTS = [
  { task: 'View / edit expense', completion: 100, ease: 4.5, time: '55s', errors: 0 },
  { task: 'Log new expense', completion: 90, ease: 3.9, time: '90s', errors: 1 },
  { task: 'Sign up & log in', completion: 80, ease: 4.1, time: '68s', errors: 2 },
  { task: 'Admin dashboard', completion: 60, ease: 3.6, time: '155s', errors: 3 },
];

const FINDINGS = [
  {
    area: 'Sign-up & login',
    found: 'No "Forgot password" or "Confirm password". Testers expected both, causing 2 errors.',
    fixed: 'Added both fields to the authentication flow.',
  },
  {
    area: 'Admin dashboard',
    found: 'Weakest task (60%). Admin looked too similar to the user view.',
    fixed: 'Labelled admin nav, distinct colours and one tab per content type.',
  },
  {
    area: 'Mood input',
    found: 'Some testers did not understand why mood mattered.',
    fixed: 'Helper text and a tooltip explaining the value, while keeping it quick.',
  },
];

const IMPACT = [
  { to: 83, suffix: '%', label: 'Average task completion' },
  { to: 4.0, decimals: 1, suffix: '/5', label: 'Average ease rating' },
  { to: 4, suffix: ' of 5', label: 'Testers would use it often' },
  { to: 3, suffix: '', label: 'UX issues fixed before coding' },
];


/* =========================================================
   SMALL BUILDING BLOCKS
   ========================================================= */

const EASE = [0.22, 1, 0.36, 1];

const Reveal = ({ children, delay = 0, className, y = 24 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    transition={{ duration: 0.6, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

const CountUp = ({ to, decimals = 0, suffix = '', prefix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const controls = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
};

const SectionLabel = ({ children }) => (
  <div className="section-label"><span className="step-num">{children}</span></div>
);

const FrameHeader = ({ title, onExpand }) => (
  <div className="artifact-header">
    <div className="artifact-dot"></div>
    <div className="artifact-dot"></div>
    <div className="artifact-dot"></div>
    <span className="artifact-title">{title}</span>
    {onExpand && (
      <button className="expand-btn" onClick={onExpand} aria-label={`Enlarge ${title}`}>
        <i className="fas fa-expand"></i>
      </button>
    )}
  </div>
);

/* =========================================================
   PAGE
   ========================================================= */

const SpendSmartProject = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  // Active section for side nav
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  // Lightbox
  const [lightbox, setLightbox] = useState(null);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  // Core loop (auto-cycles until the user interacts)
  const [loopIndex, setLoopIndex] = useState(0);
  const [loopPaused, setLoopPaused] = useState(false);
  useEffect(() => {
    if (reduce || loopPaused) return;
    const t = setInterval(() => setLoopIndex((i) => (i + 1) % LOOP.length), 2800);
    return () => clearInterval(t);
  }, [reduce, loopPaused]);

  // Mood demo
  const [score, setScore] = useState(50);
  const [lastMood, setLastMood] = useState(null);
  const [toastKey, setToastKey] = useState(0);
  const pickMood = (m) => {
    setScore((s) => Math.max(0, Math.min(100, s + m.pts)));
    setLastMood(m);
    setToastKey((k) => k + 1);
  };
  const resetDemo = () => { setScore(50); setLastMood(null); };

  // Walkthrough
  const [step, setStep] = useState(0);
  const [activeNote, setActiveNote] = useState(0);
  const goStep = (i) => { setStep(i); setActiveNote(0); };
  const current = WALKTHROUGH[step];

  const handleBackToProjects = () => navigate('/', { state: { scrollToProjects: true } });

  return (
    <div className="airbnb-project">
      <style jsx="true">{`
        /* ================= Tokens ================= */
        .airbnb-project {
          --project-accent: #8dbc15;
          --project-accent-bright: #b4ff00;
          --project-accent-dim: rgba(141, 188, 21, 0.12);
          --project-danger: #ff6b6b;
          --project-text: #f0f0f0;
          --project-text-secondary: #b3b3b3;
          --project-bg: #0f0f0f;
          --project-bg-secondary: #1a1a1a;
          --project-border: rgba(255, 255, 255, 0.08);
          overflow-x: clip;
        }
        [data-theme="light"] .airbnb-project {
          --project-bg: #f5f5f5;
          --project-bg-secondary: #ffffff;
          --project-text: #1a1a1a;
          --project-text-secondary: #4a4a4a;
          --project-border: rgba(0, 0, 0, 0.08);
          --project-accent: #6f9a00;
          --project-accent-bright: #6f9a00;
          --project-danger: #d93a3a;
        }
        [data-theme="light"] .airbnb-project .process-num { color: rgba(0, 0, 0, 0.12); }
        [data-theme="light"] .airbnb-project .hotspot-tip { background: #1a1a1a; color: #fff; }
        [data-theme="light"] .airbnb-project .lightbox { background: rgba(255,255,255,0.92); }

        /* ================= Side nav ================= */
        .side-nav {
          position: fixed;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: none;
          flex-direction: column;
          gap: 0.35rem;
        }
        @media (min-width: 1560px) { .side-nav { display: flex; } }
        .side-nav button {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          background: none;
          border: none;
          padding: 0.3rem 0;
          cursor: pointer;
          color: var(--project-text-secondary);
          font-size: 0.75rem;
          font-family: var(--font-body);
          text-align: left;
        }
        .side-nav .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--project-border);
          border: 1px solid var(--project-text-secondary);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .side-nav .lbl {
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .side-nav:hover .lbl,
        .side-nav button.active .lbl { opacity: 1; transform: translateX(0); }
        .side-nav button.active { color: var(--project-text); }
        .side-nav button.active .dot {
          background: var(--project-accent);
          border-color: var(--project-accent);
          transform: scale(1.4);
          box-shadow: 0 0 0 4px var(--project-accent-dim);
        }

        /* ================= Hero ================= */
        .hero-image-full {
          width: 100%;
          height: 70vh;
          max-height: 800px;
          overflow: hidden;
        }
        .hero-image-full img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .hero-content-wrapper {
          padding: 4rem 5% 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .project-hero-custom h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4.5rem);
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
          font-size: 1.15rem;
          color: var(--project-text-secondary);
          max-width: 680px;
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

        /* ================= Sections ================= */
        .section-custom {
          padding: 6rem 5%;
          max-width: 1200px;
          margin: 0 auto;
          scroll-margin-top: 80px;
        }
        .section-full-custom {
          padding: 6rem 5%;
          background: var(--project-bg-secondary);
          border-top: 1px solid var(--project-border);
          border-bottom: 1px solid var(--project-border);
          scroll-margin-top: 80px;
        }
        .section-full-custom .inner { max-width: 1200px; margin: 0 auto; }
        .section-label { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; }
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
          width: 24px; height: 2px;
          background: var(--project-accent);
          margin-right: 0.6rem;
          vertical-align: middle;
        }
        h2.section-heading {
          font-family: var(--font-heading);
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: var(--project-text);
          max-width: 22ch;
        }
        .section-lead {
          font-size: 1.1rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
          max-width: 60ch;
          margin-bottom: 2.5rem;
          font-family: var(--font-body);
        }
        .section-lead strong { color: var(--project-text); font-weight: 600; }

        /* ================= Shared card ================= */
        .card {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 14px;
          padding: 1.6rem;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .section-full-custom .card { background: var(--project-bg); }
        .card.hover:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }
        .eyebrow {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--project-accent);
          margin-bottom: 0.6rem;
        }
        .card h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--project-text);
          margin-bottom: 0.5rem;
        }
        .card p {
          font-size: 0.93rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
        }

        /* ================= Overview ================= */
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }
        .overview-icon { font-size: 1.8rem; display: block; margin-bottom: 0.8rem; }

        /* ================= Problem: compare ================= */
        .compare-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1.5rem;
          align-items: stretch;
        }
        .compare-card { display: flex; flex-direction: column; gap: 1rem; }
        .compare-card.highlight { border-color: var(--project-accent); box-shadow: 0 0 0 4px var(--project-accent-dim); }
        .expense-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.1rem;
          border-radius: 10px;
          background: var(--project-bg);
          border: 1px solid var(--project-border);
        }
        .section-full-custom .expense-row { background: var(--project-bg-secondary); }
        .expense-row .name { display: flex; align-items: center; gap: 0.7rem; color: var(--project-text); font-weight: 600; }
        .expense-row .amt { color: var(--project-text); font-weight: 700; font-family: var(--font-heading); }
        .chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .chip {
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          border: 1px solid var(--project-border);
          color: var(--project-text-secondary);
          background: var(--project-bg);
        }
        .chip.accent { border-color: var(--project-accent); color: var(--project-accent); background: var(--project-accent-dim); }
        .chip.danger { border-color: var(--project-danger); color: var(--project-danger); background: rgba(255, 107, 107, 0.08); }
        .compare-arrow {
          align-self: center;
          font-size: 1.6rem;
          color: var(--project-accent);
        }
        .compare-caption {
          margin-top: 2rem;
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2.4vw, 1.6rem);
          font-style: italic;
          color: var(--project-text);
        }
        .compare-caption strong { color: var(--project-accent); font-style: normal; }

        /* ================= HMW banner ================= */
        .hero-banner-custom {
          background: var(--project-bg-secondary);
          padding: 4rem 5%;
          border-top: 1px solid var(--project-border);
          border-bottom: 1px solid var(--project-border);
        }
        .hero-banner-inner {
          display: flex;
          align-items: center;
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .spendsmart-logo-wrap {
          flex-shrink: 0;
          width: 80px; height: 80px;
          background: var(--project-accent);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 20px rgba(141, 188, 21, 0.35);
          font-size: 2rem;
        }
        .hero-banner-text {
          color: var(--project-text);
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2.5vw, 2rem);
          font-weight: 500;
          font-style: italic;
          line-height: 1.4;
          max-width: 42ch;
        }
        .hero-banner-text strong { font-style: normal; font-weight: 700; color: var(--project-accent); }

        /* ================= Process timeline ================= */
        .timeline { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.2rem; }
        .timeline-track {
          position: absolute;
          top: 22px; left: 22px; right: calc((100% - 4.8rem) / 5 - 22px);
          height: 2px;
          background: var(--project-border);
        }
        .timeline-fill {
          position: absolute;
          inset: 0;
          background: var(--project-accent);
          transform-origin: 0 50%;
        }
        .timeline-step { position: relative; }
        .timeline-node {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--project-bg);
          border: 2px solid var(--project-accent);
          color: var(--project-accent);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          font-family: var(--font-heading);
          margin-bottom: 1.2rem;
          position: relative;
          z-index: 1;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .timeline-step:hover .timeline-node { background: var(--project-accent); color: #0f0f0f; }
        .timeline-week {
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--project-text-secondary); margin-bottom: 0.3rem;
        }
        .timeline-step h3 { font-family: var(--font-heading); font-size: 1.2rem; color: var(--project-text); margin-bottom: 0.4rem; }
        .timeline-step p { font-size: 0.88rem; color: var(--project-text-secondary); line-height: 1.55; }
        .timeline-output { margin-top: 0.6rem; font-size: 0.8rem !important; font-weight: 600; color: var(--project-accent) !important; }
        .timeline-output::before { content: '→ '; }

        /* ================= Personas ================= */
        .persona-grid-custom { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .persona-header {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.2rem; padding-bottom: 1rem;
          border-bottom: 1px solid var(--project-border);
        }
        .persona-icon {
          width: 50px; height: 50px;
          background: var(--project-accent-dim);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
        }
        .persona-role { font-size: 0.8rem; color: var(--project-accent); }
        .persona-rows { display: grid; gap: 0.7rem; }
        .persona-row { display: grid; grid-template-columns: 64px 1fr; gap: 0.8rem; font-size: 0.92rem; line-height: 1.5; }
        .persona-row b { color: var(--project-accent); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; padding-top: 0.15rem; }
        .persona-row span { color: var(--project-text-secondary); }

        /* ================= Core loop ================= */
        .loop-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .loop-diagram {
          position: relative;
          width: 100%;
          max-width: 420px;
          aspect-ratio: 1;
          margin: 0 auto;
        }
        .loop-diagram svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .loop-ring { fill: none; stroke: var(--project-border); stroke-width: 2; }
        .loop-ring-anim {
          fill: none;
          stroke: var(--project-accent);
          stroke-width: 2;
          stroke-dasharray: 6 10;
          animation: loopSpin 18s linear infinite;
          transform-origin: 50% 50%;
        }
        @keyframes loopSpin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .loop-ring-anim { animation: none; } }
        .loop-center {
          position: absolute;
          inset: 32%;
          border-radius: 50%;
          background: var(--project-accent-dim);
          border: 1px solid var(--project-accent);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 0.5rem;
        }
        .loop-center strong { font-family: var(--font-heading); color: var(--project-text); font-size: 1rem; line-height: 1.2; }
        .loop-center span { font-size: 0.72rem; color: var(--project-text-secondary); margin-top: 0.2rem; }
        .loop-node {
          position: absolute;
          width: 76px; height: 76px;
          margin: -38px 0 0 -38px;
          border-radius: 50%;
          background: var(--project-bg-secondary);
          border: 2px solid var(--project-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
          cursor: pointer;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .loop-node:hover { transform: scale(1.06); }
        .loop-node.active {
          border-color: var(--project-accent);
          transform: scale(1.12);
          box-shadow: 0 0 0 6px var(--project-accent-dim), 0 0 30px rgba(141, 188, 21, 0.3);
        }
        .loop-node .n {
          position: absolute;
          top: -6px; right: -6px;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--project-accent);
          color: #0f0f0f;
          font-size: 0.7rem;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .loop-steps { display: grid; gap: 0.8rem; }
        .loop-step {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 1rem;
          text-align: left;
          padding: 1.1rem 1.2rem;
          border-radius: 12px;
          border: 1px solid var(--project-border);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }
        .loop-step .idx {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid var(--project-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700;
          color: var(--project-text-secondary);
          transition: all 0.3s ease;
        }
        .loop-step .ls-title { display: block; color: var(--project-text); font-size: 1rem; font-weight: 600; margin-bottom: 0.2rem; }
        .loop-step .ls-text { display: block; color: var(--project-text-secondary); font-size: 0.88rem; line-height: 1.5; max-height: 0; overflow: hidden; opacity: 0; transition: all 0.4s ease; }
        .loop-step.active { border-color: var(--project-accent); background: var(--project-accent-dim); }
        .loop-step.active .idx { background: var(--project-accent); color: #0f0f0f; border-color: var(--project-accent); }
        .loop-step.active .ls-text { max-height: 120px; opacity: 1; margin-top: 0.2rem; }

        /* ================= Mood demo ================= */
        .demo {
          margin-top: 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
        }
        .demo-panel { position: relative; overflow: hidden; }
        .demo-title { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
        .demo-title span { font-size: 0.8rem; color: var(--project-text-secondary); }
        .reset-btn {
          background: none; border: 1px solid var(--project-border);
          color: var(--project-text-secondary);
          border-radius: 999px; padding: 0.3rem 0.8rem; font-size: 0.75rem; cursor: pointer;
          transition: all 0.2s ease;
        }
        .reset-btn:hover { border-color: var(--project-accent); color: var(--project-accent); }
        .mood-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; margin: 1.2rem 0 1.5rem; }
        .mood-chip {
          display: flex; align-items: center; gap: 0.45rem;
          padding: 0.6rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--project-border);
          background: var(--project-bg);
          color: var(--project-text);
          font-size: 0.9rem;
          cursor: pointer;
          font-family: var(--font-body);
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .section-full-custom .mood-chip { background: var(--project-bg-secondary); }
        .mood-chip:hover { border-color: var(--project-accent); }
        .mood-chip.selected { border-color: var(--project-accent); background: var(--project-accent-dim); }
        .score-row { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 0.5rem; }
        .score-row span { font-size: 0.85rem; color: var(--project-text-secondary); }
        .score-value { font-family: var(--font-heading); font-size: 2rem; font-weight: 700; color: var(--project-accent); }
        .score-bar { height: 10px; border-radius: 999px; background: var(--project-border); overflow: hidden; }
        .score-bar > div { height: 100%; background: var(--project-accent); border-radius: 999px; }
        .demo-toast {
          position: absolute;
          top: 1rem; right: 1rem;
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.9rem;
          pointer-events: none;
        }
        .demo-toast.pos { background: var(--project-accent); color: #0f0f0f; }
        .demo-toast.neg { background: var(--project-danger); color: #fff; }
        .demo-toast.zero { background: var(--project-border); color: var(--project-text); }
        .demo-feedback { margin-top: 1rem; font-size: 0.88rem; color: var(--project-text-secondary); min-height: 1.4em; }

        /* ================= Walkthrough ================= */
        .wt-tabs {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          scrollbar-width: none;
        }
        .wt-tabs::-webkit-scrollbar { display: none; }
        .wt-tab {
          position: relative;
          flex-shrink: 0;
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.7rem 1.1rem;
          border-radius: 999px;
          border: 1px solid var(--project-border);
          background: transparent;
          color: var(--project-text-secondary);
          font-size: 0.9rem;
          font-family: var(--font-body);
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .wt-tab:hover { color: var(--project-text); border-color: var(--project-accent); }
        .wt-tab.active { color: #0f0f0f; border-color: var(--project-accent); }
        .wt-tab .pill-bg { position: absolute; inset: 0; border-radius: 999px; background: var(--project-accent); z-index: 0; }
        .wt-tab > span { position: relative; z-index: 1; }
        .wt-tab .k {
          width: 22px; height: 22px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 700;
          border: 1px solid currentColor;
        }
        .wt-body { display: grid; grid-template-columns: 1.7fr 1fr; gap: 2rem; align-items: start; }
        .wt-shot { position: relative; }
        .wt-image-wrap { position: relative; line-height: 0; background: var(--project-bg); }
        .wt-image-wrap img { width: 100%; height: auto; display: block; }
        .hotspot {
          position: absolute;
          width: 28px; height: 28px;
          margin: -14px 0 0 -14px;
          border-radius: 50%;
          border: none;
          background: var(--project-accent-bright);
          color: #0f0f0f;
          font-weight: 700;
          font-size: 0.78rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
          z-index: 2;
          transition: transform 0.2s ease;
          line-height: 1;
        }
        .hotspot:hover, .hotspot.is-active { transform: scale(1.18); }
        .hotspot-ring {
          position: absolute; inset: -6px;
          border-radius: 50%;
          border: 2px solid var(--project-accent-bright);
          animation: pulse 2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes pulse {
          0% { transform: scale(0.7); opacity: 0.9; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .hotspot-ring { animation: none; opacity: 0.5; } }
        .hotspot-tip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 12px);
          transform: translateX(-50%) translateY(4px);
          width: max-content;
          max-width: 240px;
          padding: 0.6rem 0.8rem;
          border-radius: 8px;
          background: #ffffff;
          color: #111;
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 1.4;
          text-align: left;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .hotspot.tip-below .hotspot-tip { bottom: auto; top: calc(100% + 12px); }
        .hotspot.tip-left .hotspot-tip { left: auto; right: -8px; transform: translateY(4px); }
        .hotspot.tip-right .hotspot-tip { left: -8px; transform: translateY(4px); }
        .hotspot.is-active .hotspot-tip { opacity: 1; transform: translateX(-50%) translateY(0); }
        .hotspot.tip-left.is-active .hotspot-tip,
        .hotspot.tip-right.is-active .hotspot-tip { transform: translateY(0); }
        .wt-side { display: flex; flex-direction: column; gap: 1rem; }
        .wt-side .card { padding: 1.3rem; }
        .wt-notes { display: grid; gap: 0.5rem; }
        .wt-note {
          display: grid; grid-template-columns: 26px 1fr; gap: 0.7rem;
          align-items: start;
          text-align: left;
          padding: 0.7rem 0.8rem;
          border-radius: 10px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          font-family: var(--font-body);
          color: var(--project-text-secondary);
          font-size: 0.88rem;
          line-height: 1.5;
          transition: all 0.2s ease;
        }
        .wt-note .k {
          width: 24px; height: 24px; border-radius: 50%;
          background: var(--project-border);
          color: var(--project-text);
          font-size: 0.72rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
        }
        .wt-note:hover { border-color: var(--project-border); }
        .wt-note.active { border-color: var(--project-accent); background: var(--project-accent-dim); color: var(--project-text); }
        .wt-note.active .k { background: var(--project-accent-bright); color: #0f0f0f; }
        .wt-nav { display: flex; gap: 0.6rem; }
        .wt-nav button {
          flex: 1;
          padding: 0.7rem;
          border-radius: 10px;
          border: 1px solid var(--project-border);
          background: transparent;
          color: var(--project-text);
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }
        .wt-nav button:hover:not(:disabled) { border-color: var(--project-accent); color: var(--project-accent); }
        .wt-nav button:disabled { opacity: 0.35; cursor: default; }
        .wt-hint { font-size: 0.78rem; color: var(--project-text-secondary); margin-top: 0.8rem; }

        /* ================= Artifact frame ================= */
        .artifact-box-simple {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          overflow: hidden;
        }
        .artifact-header {
          padding: 0.8rem 1.2rem;
          border-bottom: 1px solid var(--project-border);
          display: flex; align-items: center; gap: 0.6rem;
          background: var(--project-bg);
        }
        .section-full-custom .artifact-header { background: var(--project-bg-secondary); }
        .artifact-dot { width: 10px; height: 10px; border-radius: 50%; }
        .artifact-dot:nth-child(1) { background: var(--project-accent); }
        .artifact-dot:nth-child(2) { background: var(--project-accent); opacity: 0.6; }
        .artifact-dot:nth-child(3) { background: var(--project-accent); opacity: 0.3; }
        .artifact-title {
          font-size: 0.8rem; font-weight: 600;
          color: var(--project-text-secondary);
          letter-spacing: 0.03em;
          margin-left: 0.5rem;
        }
        .expand-btn {
          margin-left: auto;
          background: none; border: none;
          color: var(--project-text-secondary);
          cursor: pointer;
          font-size: 0.85rem;
          padding: 0.2rem 0.4rem;
          border-radius: 6px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .expand-btn:hover { color: var(--project-accent); background: var(--project-accent-dim); }
        .artifact-body { line-height: 0; background: var(--project-bg); }
        .artifact-body img { width: 100%; height: auto; display: block; }

        /* ================= Evolution ================= */
        .evo-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center; }
        .evo-tag {
          display: inline-block;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--project-text-secondary);
          margin-bottom: 0.7rem;
        }
        .evo-tag.accent { color: var(--project-accent); }
        .evo-arrow {
          width: 48px; height: 48px; border-radius: 50%;
          background: var(--project-accent);
          color: #0f0f0f;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; font-weight: 700;
        }
        .evo-list { list-style: none; padding: 0; margin: 2rem 0 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .evo-list li { display: flex; gap: 0.7rem; font-size: 0.92rem; color: var(--project-text-secondary); line-height: 1.55; }
        .evo-list li::before { content: '✓'; color: var(--project-accent); font-weight: 700; }

        /* ================= Testing ================= */
        .method-strip { display: grid; grid-template-columns: repeat(3, 1fr) 1.4fr; gap: 1rem; margin-bottom: 3rem; align-items: stretch; }
        .method-item { text-align: left; }
        .method-item .big { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 700; color: var(--project-accent); line-height: 1; display: block; margin-bottom: 0.4rem; }
        .method-shot { padding: 0; overflow: hidden; position: relative; cursor: zoom-in; }
        .method-shot img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .method-shot:hover img { transform: scale(1.05); }
        .method-shot span {
          position: absolute; left: 0.7rem; bottom: 0.7rem;
          font-size: 0.72rem; font-weight: 600;
          background: rgba(0, 0, 0, 0.7); color: #fff;
          padding: 0.3rem 0.6rem; border-radius: 6px;
        }
        .sub-heading {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          color: var(--project-text);
          margin: 0 0 1.2rem;
        }
        .bars { display: grid; gap: 1.1rem; margin-bottom: 3.5rem; }
        .bar-row { display: grid; grid-template-columns: 180px 1fr 70px; gap: 1rem; align-items: center; }
        .bar-row .task { color: var(--project-text); font-size: 0.92rem; font-weight: 600; }
        .bar-row .meta { display: block; font-size: 0.75rem; color: var(--project-text-secondary); font-weight: 400; margin-top: 0.15rem; }
        .bar-track { height: 12px; border-radius: 999px; background: var(--project-border); overflow: hidden; }
        .bar-fill { height: 100%; border-radius: 999px; background: var(--project-accent); transform-origin: 0 50%; }
        .bar-fill.low { background: var(--project-danger); }
        .bar-pct { font-family: var(--font-heading); font-weight: 700; color: var(--project-text); text-align: right; }
        .findings-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .finding-card { display: flex; flex-direction: column; gap: 1rem; }
        .finding-top { display: flex; align-items: center; gap: 0.7rem; }
        .finding-top .ico { font-size: 1.4rem; }
        .finding-block label {
          display: block;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 0.35rem;
        }
        .finding-block.found label { color: var(--project-danger); }
        .finding-block.fixed label { color: var(--project-accent); }
        .finding-divider { display: flex; align-items: center; gap: 0.6rem; color: var(--project-accent); font-size: 0.9rem; }
        .finding-divider::before, .finding-divider::after { content: ''; flex: 1; height: 1px; background: var(--project-border); }

        /* ================= Tech ================= */
        .arch { display: grid; grid-template-columns: 1fr 90px 1fr 90px 1fr; align-items: center; margin-bottom: 2rem; }
        .arch-node { text-align: center; }
        .arch-node .ico { font-size: 1.8rem; display: block; margin-bottom: 0.6rem; }
        .arch-link { position: relative; height: 2px; }
        .arch-link::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(90deg, var(--project-accent) 0 8px, transparent 8px 16px);
          background-size: 32px 2px;
          animation: flow 1.2s linear infinite;
        }
        @keyframes flow { to { background-position: 32px 0; } }
        @media (prefers-reduced-motion: reduce) { .arch-link::before { animation: none; } }
        .arch-link span {
          position: absolute;
          left: 50%; top: -1.6rem;
          transform: translateX(-50%);
          font-size: 0.68rem; font-weight: 600;
          color: var(--project-accent);
          white-space: nowrap;
          letter-spacing: 0.05em;
        }
        .tech-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-top: 0.9rem; }

        /* ================= Impact ================= */
        .stats-grid-custom { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
        .stat-card-custom { text-align: center; padding: 2rem 1.2rem; }
        .stat-value-custom {
          font-family: var(--font-heading);
          font-size: 2.6rem; font-weight: 700;
          color: var(--project-accent);
          display: block; line-height: 1;
          margin-bottom: 0.6rem;
        }
        .stat-label-custom { font-size: 0.88rem; color: var(--project-text-secondary); line-height: 1.4; }
        .impact-note { margin-top: 1.2rem; font-size: 0.8rem; color: var(--project-text-secondary); }

        /* ================= Reflection ================= */
        .reflect-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .reflect-col h3 { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.2rem; }
        .reflect-item { padding: 1rem 0; border-top: 1px solid var(--project-border); }
        .reflect-item:first-of-type { border-top: none; padding-top: 0; }
        .reflect-item h4 { color: var(--project-text); font-size: 0.98rem; margin-bottom: 0.3rem; }
        .reflect-item p { font-size: 0.9rem; }
        .hypothesis-box {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-accent);
          padding: 3rem 4%;
          border-radius: 14px;
          margin-top: 3rem;
          position: relative;
          overflow: hidden;
        }
        .hypothesis-box::before {
          content: '';
          position: absolute;
          bottom: 1rem; right: 2rem;
          font-size: 5rem;
          opacity: 0.08;
          line-height: 1;
          pointer-events: none;
        }
        .hypothesis-box p {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          font-weight: 500;
          font-style: italic;
          line-height: 1.45;
          max-width: 52ch;
          color: var(--project-text);
          position: relative;
        }
        .hypothesis-box p strong { font-style: normal; font-weight: 700; color: var(--project-accent); }

        /* ================= Lightbox ================= */
        .lightbox {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.88);
          z-index: 2000;
          display: flex; align-items: center; justify-content: center;
          padding: 4vh 4vw;
          cursor: zoom-out;
        }
        .lightbox img { max-width: 100%; max-height: 92vh; border-radius: 10px; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .lightbox-close {
          position: absolute; top: 1.2rem; right: 1.5rem;
          background: none; border: none; color: #fff; font-size: 1.6rem; cursor: pointer;
        }

        /* ================= Responsive ================= */
        @media (max-width: 1024px) {
          .overview-grid, .stats-grid-custom { grid-template-columns: repeat(2, 1fr); }
          .timeline { grid-template-columns: repeat(3, 1fr); row-gap: 2.5rem; }
          .timeline-track { display: none; }
          .loop-wrap, .demo, .wt-body { grid-template-columns: 1fr; }
          .findings-grid { grid-template-columns: 1fr; }
          .method-strip { grid-template-columns: repeat(3, 1fr); }
          .method-shot { grid-column: 1 / -1; aspect-ratio: 16 / 7; }
          .evo-list { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .section-custom, .section-full-custom { padding: 4rem 5%; }
          .hero-image-full { height: 45vh; }
          .hero-content-wrapper { padding: 2rem 5% 1.5rem; }
          .overview-grid, .stats-grid-custom, .persona-grid-custom, .reflect-grid { grid-template-columns: 1fr; }
          .timeline { grid-template-columns: 1fr 1fr; }
          .compare-grid, .evo-grid { grid-template-columns: 1fr; }
          .compare-arrow, .evo-arrow { transform: rotate(90deg); justify-self: center; margin: 0 auto; }
          .hero-banner-inner { flex-direction: column; text-align: center; gap: 1.5rem; }
          .bar-row { grid-template-columns: 1fr 52px; }
          .bar-row .task { grid-column: 1 / -1; }
          .arch { grid-template-columns: 1fr; gap: 0; }
          .arch-link { height: 48px; width: 2px; margin: 0 auto; }
          .arch-link::before { background: repeating-linear-gradient(180deg, var(--project-accent) 0 8px, transparent 8px 16px); background-size: 2px 32px; }
          .arch-link span { top: 50%; left: 1rem; transform: translateY(-50%); }
          .hotspot-tip { display: none; }
          .hotspot { width: 22px; height: 22px; margin: -11px 0 0 -11px; font-size: 0.68rem; }
          .method-strip { grid-template-columns: 1fr 1fr 1fr; }
          .method-item .big { font-size: 1.7rem; }
        }
      `}</style>

      {/* Side navigation (large screens) */}
      <nav className="side-nav" aria-label="Case study sections">
        {NAV_SECTIONS.map((s) => (
          <button
            key={s.id}
            className={activeSection === s.id ? 'active' : ''}
            onClick={() => scrollTo(s.id)}
            aria-current={activeSection === s.id ? 'true' : undefined}
          >
            <span className="dot" />
            <span className="lbl">{s.label}</span>
          </button>
        ))}
      </nav>

      {/* ================= HERO ================= */}
      <motion.div
        className="hero-image-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <img src={spendsmartHeroImg} alt="SpendSmart, a mood-aware gamified expense tracker" />
      </motion.div>

      <section className="project-hero-custom">
        <div className="hero-content-wrapper">
          <Reveal>
            <h1>Understanding <em>why</em> you spend, not just <em>what</em> you spend</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="hero-sub">
              SpendSmart is a mood-aware expense tracker that turns mindful spending into a daily game.
              I designed, tested and built it end to end in 8 weeks.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-meta">
              <div className="meta-item"><label>My Role</label><p>UX/UI Designer & Full-Stack Developer</p></div>
              <div className="meta-item"><label>Tools</label><p>Figma, React, Node.js, Express, MongoDB</p></div>
              <div className="meta-item"><label>Context</label><p>Capstone Project, Humber College</p></div>
              <div className="meta-item"><label>Timeline</label><p>8 weeks · Sep – Oct 2025</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section id="ss-overview" className="section-custom" style={{ paddingTop: '3rem' }}>
        <Reveal><SectionLabel>Overview · 30-second read</SectionLabel></Reveal>
        <div className="overview-grid">
          {OVERVIEW.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08}>
              <div className="card hover" style={{ height: '100%' }}>
                <span className="eyebrow">{o.label}</span>
                <p>{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <div id="ss-problem" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>01 · The Problem</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">Trackers answer "what". Nobody asks "why".</h2></Reveal>
          <Reveal>
            <p className="section-lead">
              Students on tight budgets often buy things because they feel <strong>stressed, bored or excited</strong>.
              Without seeing the feeling behind a purchase, they can't change the habit.
            </p>
          </Reveal>

          <div className="compare-grid">
            <Reveal className="card compare-card">
              <span className="eyebrow" style={{ color: 'var(--project-text-secondary)' }}>A typical tracker</span>
              <div className="expense-row">
                <span className="name">☕ Coffee</span>
                <span className="amt">$3.50</span>
              </div>
              <p>You know what you spent. That's it.</p>
            </Reveal>
            <motion.div
              className="compare-arrow"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >→</motion.div>
            <Reveal className="card compare-card highlight" delay={0.2}>
              <span className="eyebrow">SpendSmart</span>
              <div className="expense-row">
                <span className="name">☕ Coffee</span>
                <span className="amt">$3.50</span>
              </div>
              <motion.div
                className="chips"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
              >
                {[
                  { c: 'chip', t: '😣 Stressed' },
                  { c: 'chip danger', t: '−10 points' },
                  { c: 'chip accent', t: '🎯 Challenge: No coffee today' },
                ].map((x) => (
                  <motion.span
                    key={x.t}
                    className={x.c}
                    variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  >
                    {x.t}
                  </motion.span>
                ))}
              </motion.div>
              <p>You see why it happened, and what it cost your goal.</p>
            </Reveal>
          </div>
          <Reveal>
            <p className="compare-caption">Same purchase. <strong>Now you know why.</strong></p>
          </Reveal>
        </div>
      </div>

      {/* ================= HMW ================= */}
      <div className="hero-banner-custom">
        <Reveal className="hero-banner-inner">
          <div className="spendsmart-logo-wrap" aria-hidden="true">💭</div>
          <p className="hero-banner-text">
            How might we help students <strong>see the feeling behind each purchase</strong> and make saving feel rewarding instead of restrictive?
          </p>
        </Reveal>
      </div>

      {/* ================= PROCESS ================= */}
      <section id="ss-process" className="section-custom">
        <Reveal><SectionLabel>02 · Process</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">From idea to live app in 8 weeks</h2></Reveal>
        <Reveal><p className="section-lead">I tested the design with real users <strong>before</strong> writing code, so fixes were cheap.</p></Reveal>
        <div className="timeline">
          <div className="timeline-track" aria-hidden="true">
            <motion.div
              className="timeline-fill"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </div>
          {PROCESS.map((p, i) => (
            <Reveal key={p.num} className="timeline-step" delay={0.15 + i * 0.15}>
              <div className="timeline-node">{p.num}</div>
              <div className="timeline-week">{p.week}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <p className="timeline-output">{p.output}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= USERS ================= */}
      <div id="ss-users" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>03 · Users</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">Designed for two people</h2></Reveal>
          <div className="persona-grid-custom">
            {PERSONAS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className="card hover" style={{ height: '100%' }}>
                  <div className="persona-header">
                    <span className="persona-icon">{p.icon}</span>
                    <div>
                      <h3 style={{ marginBottom: '0.1rem' }}>{p.name}</h3>
                      <div className="persona-role">{p.role}</div>
                    </div>
                  </div>
                  <div className="persona-rows">
                    <div className="persona-row"><b>Goal</b><span>{p.goal}</span></div>
                    <div className="persona-row"><b>Pain</b><span>{p.pain}</span></div>
                    <div className="persona-row"><b>Needs</b><span>{p.need}</span></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CORE LOOP + DEMO ================= */}
      <section id="ss-loop" className="section-custom">
        <Reveal><SectionLabel>04 · The Core Idea</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">One simple daily loop</h2></Reveal>
        <Reveal><p className="section-lead">Every feature in SpendSmart supports one of these four steps. <strong>Tap a step</strong> to explore.</p></Reveal>

        <div className="loop-wrap" onMouseEnter={() => setLoopPaused(true)} onMouseLeave={() => setLoopPaused(false)}>
          <Reveal>
            <div className="loop-diagram">
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="loop-ring" cx="50" cy="50" r="38" />
                <circle className="loop-ring-anim" cx="50" cy="50" r="38" />
              </svg>
              <div className="loop-center">
                <strong>Mindful spending</strong>
                <span>repeat daily</span>
              </div>
              {LOOP.map((l, i) => {
                const angle = (i / LOOP.length) * 2 * Math.PI - Math.PI / 2;
                const x = 50 + 38 * Math.cos(angle);
                const y = 50 + 38 * Math.sin(angle);
                return (
                  <button
                    key={l.title}
                    className={`loop-node ${loopIndex === i ? 'active' : ''}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    onClick={() => { setLoopIndex(i); setLoopPaused(true); }}
                    aria-label={`Step ${i + 1}: ${l.title}`}
                  >
                    {l.icon}
                    <span className="n">{i + 1}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
          <div className="loop-steps">
            {LOOP.map((l, i) => (
              <button
                key={l.title}
                className={`loop-step ${loopIndex === i ? 'active' : ''}`}
                onClick={() => { setLoopIndex(i); setLoopPaused(true); }}
              >
                <span className="idx">{i + 1}</span>
                <span>
                  <span className="ls-title">{l.title}</span>
                  <span className="ls-text">{l.text}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood → points demo */}
        <div className="demo">
          <Reveal>
            <span className="eyebrow">Try it yourself</span>
            <h3 className="sub-heading" style={{ marginBottom: '0.6rem' }}>How a feeling becomes a score</h3>
            <p className="section-lead" style={{ marginBottom: 0 }}>
              You just bought a <strong>$3.50 coffee</strong>. Pick how you felt and watch the challenge score react.
              This is the mechanic that makes emotions visible.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="card demo-panel">
              <div className="demo-title">
                <strong style={{ color: 'var(--project-text)' }}>☕ Coffee · $3.50</strong>
                <button className="reset-btn" onClick={resetDemo}>Reset</button>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--project-text-secondary)' }}>How did you feel?</span>
              <div className="mood-chips" role="group" aria-label="Choose a mood">
                {MOODS.map((m) => (
                  <motion.button
                    key={m.key}
                    className={`mood-chip ${lastMood?.key === m.key ? 'selected' : ''}`}
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ y: -2 }}
                    onClick={() => pickMood(m)}
                  >
                    <span>{m.emoji}</span>{m.key}
                  </motion.button>
                ))}
              </div>
              <div className="score-row">
                <span>Challenge score</span>
                <motion.span
                  key={score}
                  className="score-value"
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {score}
                </motion.span>
              </div>
              <div className="score-bar">
                <motion.div animate={{ width: `${score}%` }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} />
              </div>
              <p className="demo-feedback" aria-live="polite">
                {!lastMood && 'Pick a mood to log this purchase.'}
                {lastMood && lastMood.pts > 0 && 'Nice: positive spending earns points toward your badge.'}
                {lastMood && lastMood.pts < 0 && 'Emotional spending costs points. Notice the trigger.'}
                {lastMood && lastMood.pts === 0 && 'Neutral: no change. Logged for your history.'}
              </p>
              <AnimatePresence>
                {lastMood && (
                  <motion.span
                    key={toastKey}
                    className={`demo-toast ${lastMood.pts > 0 ? 'pos' : lastMood.pts < 0 ? 'neg' : 'zero'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    {lastMood.pts > 0 ? `+${lastMood.pts}` : lastMood.pts} pts
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= WALKTHROUGH ================= */}
      <div id="ss-walkthrough" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>05 · Product Walkthrough</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">The finished app, step by step</h2></Reveal>
          <Reveal><p className="section-lead">Follow one user's day. Each screen shows the <strong>user goal</strong>, the <strong>design decision</strong> behind it, and numbered details to explore.</p></Reveal>

          <Reveal>
            <div className="wt-tabs" role="tablist">
              {WALKTHROUGH.map((w, i) => (
                <button
                  key={w.label}
                  role="tab"
                  aria-selected={step === i}
                  className={`wt-tab ${step === i ? 'active' : ''}`}
                  onClick={() => goStep(i)}
                >
                  {step === i && (
                    <motion.span layoutId="wt-pill" className="pill-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="k">{i + 1}</span>
                  <span>{w.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="wt-body">
            <div className="wt-shot">
              <div className="artifact-box-simple">
                <FrameHeader
                  title={`Step ${step + 1} · ${current.label}`}
                  onExpand={() => setLightbox({ src: current.img, alt: current.label })}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    className="wt-image-wrap"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <img src={current.img} alt={`SpendSmart: ${current.label}`} />
                    {current.notes.map((n, i) => {
                      const tipClass = n.y < 22 ? 'tip-below' : '';
                      const sideClass = n.x > 70 ? 'tip-left' : n.x < 25 ? 'tip-right' : '';
                      return (
                        <motion.button
                          key={i}
                          className={`hotspot ${tipClass} ${sideClass} ${activeNote === i ? 'is-active' : ''}`}
                          style={{ left: `${n.x}%`, top: `${n.y}%` }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 300, damping: 18 }}
                          onMouseEnter={() => setActiveNote(i)}
                          onFocus={() => setActiveNote(i)}
                          onClick={() => setActiveNote(i)}
                          aria-label={`Detail ${i + 1}: ${n.t}`}
                        >
                          <span className="hotspot-ring" />
                          {i + 1}
                          <span className="hotspot-tip">{n.t}</span>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="wt-hint">Hover or tap the numbers to see the details.</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="wt-side"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="card">
                  <span className="eyebrow">User goal</span>
                  <p style={{ color: 'var(--project-text)', fontWeight: 500 }}>{current.goal}</p>
                </div>
                <div className="card" style={{ borderColor: 'var(--project-accent)' }}>
                  <span className="eyebrow">Design decision</span>
                  <p style={{ color: 'var(--project-text)' }}>{current.decision}</p>
                </div>
                <div className="wt-notes">
                  {current.notes.map((n, i) => (
                    <button
                      key={i}
                      className={`wt-note ${activeNote === i ? 'active' : ''}`}
                      onMouseEnter={() => setActiveNote(i)}
                      onClick={() => setActiveNote(i)}
                    >
                      <span className="k">{i + 1}</span>
                      <span>{n.t}</span>
                    </button>
                  ))}
                </div>
                <div className="wt-nav">
                  <button onClick={() => goStep(step - 1)} disabled={step === 0}>← Previous</button>
                  <button onClick={() => goStep(step + 1)} disabled={step === WALKTHROUGH.length - 1}>Next step →</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= EVOLUTION ================= */}
      <section id="ss-evolution" className="section-custom">
        <Reveal><SectionLabel>06 · Design Evolution</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">From wireframe to interface</h2></Reveal>
        <Reveal><p className="section-lead">I mapped all core screens in low fidelity first, refined them after professor feedback, then built the hi-fi prototype used for testing.</p></Reveal>
        <div className="evo-grid">
          <Reveal>
            <span className="evo-tag">Before · Lo-fi wireframes</span>
            <div className="artifact-box-simple">
              <FrameHeader title="9 core screens" onExpand={() => setLightbox({ src: spendsmartWireframesImg, alt: 'Wireframes' })} />
              <div className="artifact-body"><img src={spendsmartWireframesImg} alt="SpendSmart low-fidelity wireframes" /></div>
            </div>
          </Reveal>
          <motion.div
            className="evo-arrow"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.3 }}
          >→</motion.div>
          <Reveal delay={0.2}>
            <span className="evo-tag accent">After · Hi-fi interface</span>
            <div className="artifact-box-simple">
              <FrameHeader title="Dashboard" onExpand={() => setLightbox({ src: spendsmartPrototypeImg, alt: 'Hi-fi dashboard' })} />
              <div className="artifact-body"><img src={spendsmartPrototypeImg} alt="SpendSmart high-fidelity dashboard" /></div>
            </div>
          </Reveal>
        </div>
        <ul className="evo-list">
          {EVOLUTION.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}><li>{e}</li></Reveal>
          ))}
        </ul>
      </section>

      {/* ================= TESTING ================= */}
      <div id="ss-testing" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>07 · Usability Testing</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">5 users found what I missed</h2></Reveal>
          <Reveal><p className="section-lead">Remote think-aloud sessions (Steve Krug method) on the prototype, <strong>before development started</strong>.</p></Reveal>

          <div className="method-strip">
            {[
              { big: '5', t: 'participants from the target audience' },
              { big: '4', t: 'key tasks per session' },
              { big: '3', t: 'priority issues found' },
            ].map((m, i) => (
              <Reveal key={m.t} delay={i * 0.08} className="card method-item">
                <span className="big"><CountUp to={Number(m.big)} /></span>
                <p>{m.t}</p>
              </Reveal>
            ))}
            <Reveal delay={0.24} className="card method-shot">
              <div
                role="button"
                tabIndex={0}
                style={{ height: '100%' }}
                onClick={() => setLightbox({ src: spendsmartTestingImg, alt: 'Remote testing session' })}
                onKeyDown={(e) => { if (e.key === 'Enter') setLightbox({ src: spendsmartTestingImg, alt: 'Remote testing session' }); }}
              >
                <img src={spendsmartTestingImg} alt="Remote usability testing session" />
                <span>Live session over Zoom</span>
              </div>
            </Reveal>
          </div>

          <Reveal><h3 className="sub-heading">Task completion</h3></Reveal>
          <div className="bars">
            {TEST_RESULTS.map((r, i) => (
              <Reveal key={r.task} delay={i * 0.08}>
                <div className="bar-row">
                  <div className="task">
                    {r.task}
                    <span className="meta">Ease {r.ease}/5 · {r.time} · {r.errors} error{r.errors === 1 ? '' : 's'}</span>
                  </div>
                  <div className="bar-track">
                    <motion.div
                      className={`bar-fill ${r.completion < 70 ? 'low' : ''}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: r.completion / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.1, ease: EASE }}
                    />
                  </div>
                  <span className="bar-pct">{r.completion}%</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal><h3 className="sub-heading">What I found → what I changed</h3></Reveal>
          <div className="findings-grid">
            {FINDINGS.map((f, i) => (
              <Reveal key={f.area} delay={i * 0.1}>
                <div className="card hover finding-card" style={{ height: '100%' }}>
                  <div className="finding-top">
                    <h3 style={{ margin: 0 }}>{f.area}</h3>
                  </div>
                  <div className="finding-block found">
                    <label>Found</label>
                    <p>{f.found}</p>
                  </div>
                  <div className="finding-divider">↓</div>
                  <div className="finding-block fixed">
                    <label>Fixed</label>
                    <p style={{ color: 'var(--project-text)' }}>{f.fixed}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= TECH ================= */}
      <section id="ss-tech" className="section-custom">
        <Reveal><SectionLabel>08 · How I Built It</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Full-stack MERN, built by me</h2></Reveal>
        <Reveal><p className="section-lead">Designing the API and the UI together meant every endpoint was shaped around what a screen actually needs.</p></Reveal>
        <Reveal>
          <div className="arch">
            <div className="card arch-node">
              <h3>React front end</h3>
              <p>React Router, Context API, Tailwind, charts</p>
            </div>
            <div className="arch-link"><span>REST · JWT</span></div>
            <div className="card arch-node">
              <h3>Node + Express API</h3>
              <p>Auth with bcrypt, protected routes, game logic</p>
            </div>
            <div className="arch-link"><span>Mongoose</span></div>
            <div className="card arch-node">
              <h3>MongoDB Atlas</h3>
              <div className="tech-chips">
                {['Users', 'Expenses', 'Challenges', 'Badges', 'Categories'].map((c) => (
                  <span key={c} className="chip accent">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= IMPACT ================= */}
      <div id="ss-impact" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>09 · Impact</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">Results</h2></Reveal>
          <div className="stats-grid-custom">
            {IMPACT.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="card hover stat-card-custom" style={{ height: '100%' }}>
                  <span className="stat-value-custom"><CountUp to={s.to} decimals={s.decimals || 0} suffix={s.suffix} /></span>
                  <span className="stat-label-custom">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="impact-note">Measured in prototype usability testing with 5 participants.</p>
        </div>
      </div>

      {/* ================= REFLECTION ================= */}
      <section id="ss-reflection" className="section-custom">
        <Reveal><SectionLabel>10 · Reflection</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">What I learned</h2></Reveal>
        <Reveal><p className="section-lead" style={{ maxWidth: '760px' }}>Testing in Figma before writing any code paid off. Five testers caught three issues I had missed, and they were much cheaper to fix there. Putting mood right next to the amount made it part of the habit instead of an extra step. Next time I would reward sticking to the challenge rather than a happy mood, because losing points for feeling stressed may push people to log a mood they did not feel.</p></Reveal>
      </section>

      {/* ================= NAVIGATION ================= */}
      <div className="project-navigation" style={{ padding: '0 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={handleBackToProjects} className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          <span>Back to Projects</span>
        </button>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/projects/6" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            <span>Previous: Veritas</span>
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
            <motion.img
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpendSmartProject;