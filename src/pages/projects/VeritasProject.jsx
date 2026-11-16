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
// Images (exported from the Veritas Figma files)
import coverImg from '../../assets/images/veritas-cover.jpg';
import iaBeforeImg from '../../assets/images/veritas-ia-before.jpg';
import iaAfterImg from '../../assets/images/veritas-ia-after.jpg';
import homeHeroImg from '../../assets/images/veritas-home-hero.jpg';
import homeFullImg from '../../assets/images/veritas-home-full.jpg';
import motorImg from '../../assets/images/veritas-motor.jpg';

/* =========================================================
   CONTENT (edit text here, layout stays the same)
   ========================================================= */

const HEADLINE = [
  { from: 2, to: 1, label: 'headers' },
  { from: 12, to: 0, label: 'dead ends in public navigation' },
  { from: 25, to: 11, label: 'steps from landing to payment' },
  { from: 14, to: 6, label: 'steps to the first price' },
];

const OVERVIEW = [
  { label: 'Context', text: 'Veritas is an Indian insurance broker selling motor, health, business and life cover from 25+ insurers, mostly through advisors.' },
  { label: 'Problem', text: 'The website had grown feature by feature. Public pages, advisor tools and internal systems were tangled into one structure.' },
  { label: 'What I did', text: 'Mapped the whole site with its owners, simplified the structure, and designed the new website from that map.' },
];

const BRIEF = [
  { n: '01', t: 'Map what exists', d: 'Sit with every owner and document each page, tab, form and flow as it works today.' },
  { n: '02', t: 'Simplify it', d: 'Turn the map into a structure a first-time buyer understands without help.' },
  { n: '03', t: 'Update it', d: 'Reshape it around what the business needs next, as the blueprint for the redesign.' },
];

const AUDIENCES = [
  { icon: '🛒', who: 'Customers', want: 'A price, proof they can trust the company, a person to talk to.', door: 'Public site', doorSub: 'veritasins.com' },
  { icon: '🤝', who: 'Future advisors', want: 'What the role is, what they can earn, how to sign up.', door: 'Recruitment site', doorSub: 'pos.veritasins.com' },
  { icon: '🧰', who: 'Working advisors', want: 'Their tools: statements, renewals, claims, reports. No marketing.', door: 'Behind login', doorSub: 'Internal system + app' },
];

const REQUIREMENTS = [
  { id: 'R1', t: 'Sell to two audiences', d: 'Convert buyers and recruit advisors without one blocking the other.' },
  { id: 'R2', t: 'Lead before quote', d: 'Name, mobile, email and OTP before any price.', fixed: true },
  { id: 'R3', t: 'Only show what works', d: 'Nothing in navigation without a working destination.' },
  { id: 'R4', t: 'Operations behind login', d: 'Internal tools are not public menu items.' },
  { id: 'R5', t: 'Always offer a human', d: 'Every page can request an advisor callback.' },
  { id: 'R6', t: 'Earn trust fast', d: 'Partners, ratings and numbers visible without hunting.' },
  { id: 'R7', t: 'Servicing in the app', d: 'Renewals and claims live in the Android app.' },
  { id: 'R8', t: 'Room to grow', d: 'New products slot in without redesigning navigation.' },
];

const FINDINGS = [
  { n: 12, t: 'dead ends on the public site', d: '“Coming soon” product tabs, service tabs leading nowhere, and a quote option that did nothing.' },
  { n: 2, t: 'headers for one website', d: 'One for company content, one for advisor services. Each team called theirs “the header”.' },
  { n: 12, t: 'internal tools in a public menu', d: 'Payment statements and quotation trackers sat under “Our Services”, where customers expect products.' },
  { n: 6, t: 'product journeys mapped twice', d: 'An advisor version and a customer version with near-identical steps.' },
  { n: 25, t: 'steps from landing to payment', d: '13 of them, including a nine-field form, came before the first price.' },
  { n: 3, t: 'audiences behind one door', d: 'Buyers, future advisors and working advisors all sorting through the same menus.' },
];

const MOVES = [
  { n: 1, t: 'Give each audience its own door', before: 'One structure for buyers, future advisors and working advisors.', after: 'Main site for buyers, a recruitment site for future advisors, the internal system and app for advisors.', req: ['R1', 'R4'] },
  { n: 2, t: 'Navigate by product', before: 'Two headers, six product tabs, three “coming soon” placeholders.', after: 'One product bar: Motor, Health, SME, Life. Car + two-wheeler became Motor.', req: ['R3', 'R8'] },
  { n: 3, t: 'Lead first, details later', before: '13 steps and a nine-field form before the first price.', after: 'One gate with four fields. Everything else moved after the price.', req: ['R2'] },
  { n: 4, t: 'One way to reach a human', before: 'A support page, a second contact tab, two tabs leading nowhere.', after: 'One Request a Callback form, from the header and every product page.', req: ['R5'] },
  { n: 5, t: 'Fold content into the page', before: 'About Us, Mission, Vision, User Guide and Partners as separate pages.', after: 'Sections of the homepage. Compliance moved to the footer.', req: ['R6', 'R7'] },
];

const SURFACES = [
  { t: 'Public site', job: 'Sells', d: 'One header, one product bar, a homepage and one shared product-page template.', tone: 'pub' },
  { t: 'Recruitment site', job: 'Signs up advisors', d: 'Explains the advisor role and handles sign-up. Nothing else.', tone: 'rec' },
  { t: 'Behind login', job: 'Runs operations', d: 'Statements, renewals, claims and reports for working advisors.', tone: 'ops' },
];

const OUTCOME = [
  { from: 2, to: 1, label: 'headers' },
  { from: 12, to: 0, label: 'dead ends' },
  { from: 3, to: 1, label: 'ways to ask for help' },
  { from: 25, to: 11, label: 'steps to payment' },
  { from: 14, to: 6, label: 'steps to first price' },
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

const CountUp = ({ to, from = 0, duration = 1.4 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const c = animate(from, to, { duration, ease: 'easeOut', onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, to, from, duration, reduce]);
  return <span ref={ref}>{Math.round(val).toLocaleString('en-US')}</span>;
};

// "25 → 11": old number struck through, new number counts down from it
const BeforeAfter = ({ from, to, label, big }) => (
  <div className={`ba ${big ? 'big' : ''}`}>
    <div className="ba-nums">
      <span className="ba-from">{from}</span>
      <span className="ba-arrow">→</span>
      <span className="ba-to"><CountUp from={from} to={to} duration={1.2} /></span>
    </div>
    <p>{label}</p>
  </div>
);

const SectionLabel = ({ children }) => (
  <div className="section-label"><span className="step-num">{children}</span></div>
);

const Frame = ({ title, children, onExpand }) => (
  <div className="frame">
    <div className="frame-bar">
      <span /><span /><span />
      <em>{title}</em>
      {onExpand && (
        <button className="expand-btn" onClick={onExpand} aria-label={`Enlarge ${title}`}>
          <i className="fas fa-expand"></i>
        </button>
      )}
    </div>
    <div className="frame-body">{children}</div>
  </div>
);

/* ---------- Live forms (rebuilt from the shipped design) ---------- */

const LeadForm = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="vf">
      <div className="vf-head">
        <strong>Fill your details</strong>
        <span>Motor insurance</span>
      </div>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" className="vf-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="vf-check">✓</span>
            <strong>Prices are next</strong>
            <p>Vehicle details come after the customer has seen a price.</p>
            <button className="vf-link" onClick={() => { setDone(false); setOtpSent(false); }}>Try again</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={(e) => { e.preventDefault(); if (otpSent) setDone(true); else setOtpSent(true); }} exit={{ opacity: 0 }}>
            <input placeholder="Full name" aria-label="Full name" />
            <input placeholder="Mobile number" aria-label="Mobile number" />
            <input placeholder="Email" aria-label="Email" />
            <AnimatePresence>
              {otpSent && (
                <motion.input
                  placeholder="One-time passcode"
                  aria-label="One-time passcode"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 42 }}
                />
              )}
            </AnimatePresence>
            <button type="submit" className="vf-btn">{otpSent ? 'Get Quote' : 'Get OTP'}</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

const CallbackForm = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="vf">
      <div className="vf-head">
        <strong>Request a Callback</strong>
        <span>Opens from every page</span>
      </div>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="sent" className="vf-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="vf-check">☎</span>
            <strong>An advisor will call you</strong>
            <p>One form replaced a support page, a contact tab and two dead tabs.</p>
            <button className="vf-link" onClick={() => setSent(false)}>Try again</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }} exit={{ opacity: 0 }}>
            <input placeholder="Name" aria-label="Name" />
            <input placeholder="Mobile" aria-label="Mobile" />
            <input placeholder="Email" aria-label="Email" />
            <textarea placeholder="Comments" aria-label="Comments" rows={2} />
            <button type="submit" className="vf-btn">Submit</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================
   PAGE
   ========================================================= */

const VeritasProject = () => {
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

  // Audience router: 2022 vs after
  const [split, setSplit] = useState(false);

  // Flow race
  const BEFORE_STEPS = 25, BEFORE_PRICE = 14, AFTER_STEPS = 11, AFTER_PRICE = 6;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const raceRef = useRef(null);
  const raceInView = useInView(raceRef, { once: true, margin: '-30% 0px -30% 0px' });
  useEffect(() => {
    if (raceInView && !reduce) { setTick(0); setRunning(true); }
    if (raceInView && reduce) setTick(BEFORE_STEPS);
  }, [raceInView, reduce]);
  useEffect(() => {
    if (!running) return;
    if (tick >= BEFORE_STEPS) { setRunning(false); return; }
    const t = setTimeout(() => setTick((v) => v + 1), 170);
    return () => clearTimeout(t);
  }, [running, tick]);
  const replay = () => { setTick(0); setRunning(true); };

  // Screens gallery filter
  const [moveFilter, setMoveFilter] = useState(null);
  const dim = (moves) => moveFilter !== null && !moves.includes(moveFilter);

  const handleBackToProjects = () => navigate('/', { state: { scrollToProjects: true } });

  const renderRow = (total, price, label) => (
    <div className="race-row">
      <div className="race-label">
        <strong>{label}</strong>
        <span>{Math.min(tick, total)} / {total} steps</span>
      </div>
      <div className="race-track">
        {Array.from({ length: total }).map((_, i) => {
          const step = i + 1;
          const reached = tick >= step;
          const isPrice = step === price;
          const isPay = step === total;
          return (
            <span
              key={i}
              className={`dot ${reached ? 'on' : ''} ${step < price ? 'pre' : ''} ${isPrice ? 'price' : ''} ${isPay ? 'pay' : ''}`}
              title={isPrice ? 'First price' : isPay ? 'Payment' : `Step ${step}`}
            >
              {isPrice && <em className={reached ? 'show' : ''}>₹ First price · step {price}</em>}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="airbnb-project veritas-project">
      <style jsx="true">{`
        /* ================= Tokens ================= */
        .veritas-project {
          --project-accent: #ff7a45;
          --project-accent-dim: rgba(255, 122, 69, 0.13);
          --project-good: #34d399;
          --project-good-dim: rgba(52, 211, 153, 0.12);
          --project-bad: #f87171;
          --project-bad-dim: rgba(248, 113, 113, 0.1);
          --project-text: #f0f0f0;
          --project-text-secondary: #b3b3b3;
          --project-bg: #0f0f0f;
          --project-bg-secondary: #1a1a1a;
          --project-border: rgba(255, 255, 255, 0.08);
          overflow-x: clip;
        }
        [data-theme="light"] .veritas-project {
          --project-accent: #e2581e;
          --project-good: #0f9f6e;
          --project-bad: #d33a3a;
          --project-bg: #f5f5f5;
          --project-bg-secondary: #ffffff;
          --project-text: #1a1a1a;
          --project-text-secondary: #4a4a4a;
          --project-border: rgba(0, 0, 0, 0.08);
        }

        /* ================= Hero ================= */
        .hero-image-full { width: 100%; height: 70vh; max-height: 800px; overflow: hidden; background: #0f1a2c; }
        .hero-image-full img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-content-wrapper { padding: 4rem 5% 2rem; max-width: 1200px; margin: 0 auto; }
        .project-hero-custom h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          font-weight: 700; line-height: 1.1; letter-spacing: -0.02em;
          color: var(--project-text); margin-bottom: 1.5rem; max-width: 900px;
        }
        .project-hero-custom h1 em { color: var(--project-accent); font-style: italic; font-weight: 800; }
        .hero-sub { font-size: 1.15rem; color: var(--project-text-secondary); max-width: 700px; line-height: 1.7; margin-bottom: 2.5rem; font-family: var(--font-body); }
        .hero-meta {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 1.5rem; padding: 2rem 0; border-top: 1px solid var(--project-border); border-bottom: 1px solid var(--project-border);
        }
        .meta-item label { display: block; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--project-accent); margin-bottom: 0.5rem; }
        .meta-item p { font-size: 0.95rem; color: var(--project-text-secondary); line-height: 1.5; }
        .meta-item a { color: var(--project-text); text-decoration: underline; text-underline-offset: 3px; }
        .headline-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; padding-top: 2rem; }

        /* before -> after number */
        .ba-nums { display: flex; align-items: baseline; gap: 0.5rem; font-family: var(--font-heading); font-weight: 700; line-height: 1; margin-bottom: 0.5rem; }
        .ba-from { font-size: 1.5rem; color: var(--project-text-secondary); text-decoration: line-through; text-decoration-color: var(--project-bad); opacity: 0.7; }
        .ba-arrow { font-size: 1.2rem; color: var(--project-text-secondary); }
        .ba-to { font-size: 2.6rem; color: var(--project-accent); }
        .ba.big .ba-to { font-size: 3.2rem; }
        .ba p { font-size: 0.88rem; color: var(--project-text-secondary); line-height: 1.45; max-width: 22ch; }

        /* ================= Sections ================= */
        .section-custom { padding: 6rem 5%; max-width: 1200px; margin: 0 auto; }
        .section-full-custom { padding: 6rem 5%; background: var(--project-bg-secondary); border-top: 1px solid var(--project-border); border-bottom: 1px solid var(--project-border); }
        .section-full-custom .inner { max-width: 1200px; margin: 0 auto; }
        .section-label { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.5rem; }
        .step-num { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--project-accent); }
        .step-num::before { content: ''; display: inline-block; width: 24px; height: 2px; background: var(--project-accent); margin-right: 0.6rem; vertical-align: middle; }
        h2.section-heading {
          font-family: var(--font-heading); font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700; letter-spacing: -0.02em; line-height: 1.2;
          margin-bottom: 1rem; color: var(--project-text); max-width: 22ch;
        }
        .section-lead { font-size: 1.1rem; color: var(--project-text-secondary); line-height: 1.7; max-width: 60ch; margin-bottom: 2.5rem; font-family: var(--font-body); }
        .section-lead strong { color: var(--project-text); font-weight: 600; }
        .sub-heading { font-family: var(--font-heading); font-size: 1.3rem; color: var(--project-text); margin: 3rem 0 1.2rem; }
        .card { background: var(--project-bg-secondary); border: 1px solid var(--project-border); border-radius: 14px; padding: 1.5rem; transition: transform 0.3s ease, border-color 0.3s ease; }
        .section-full-custom .card { background: var(--project-bg); }
        .card.hover:hover { transform: translateY(-4px); border-color: var(--project-accent); }
        .eyebrow { display: block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--project-accent); margin-bottom: 0.6rem; }
        .card h3 { font-family: var(--font-heading); font-size: 1.08rem; font-weight: 600; color: var(--project-text); margin-bottom: 0.4rem; }
        .card p { font-size: 0.92rem; color: var(--project-text-secondary); line-height: 1.6; }
        .chip { display: inline-block; font-size: 0.72rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 999px; border: 1px solid var(--project-border); color: var(--project-text-secondary); }
        .chip.accent { border-color: var(--project-accent); color: var(--project-accent); background: var(--project-accent-dim); }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .overview-icon { font-size: 1.8rem; display: block; margin-bottom: 0.8rem; }
        .brief-num { font-family: var(--font-heading); font-size: 2.2rem; font-weight: 700; color: var(--project-accent); opacity: 0.4; line-height: 1; display: block; margin-bottom: 0.8rem; transition: opacity 0.3s ease; }
        .card:hover .brief-num { opacity: 1; }

        /* ================= Audience router ================= */
        .router-toggle { display: inline-flex; border: 1px solid var(--project-border); border-radius: 999px; padding: 4px; margin-bottom: 2rem; position: relative; }
        .router-toggle button { position: relative; z-index: 1; background: none; border: none; padding: 0.55rem 1.1rem; border-radius: 999px; color: var(--project-text-secondary); font-family: var(--font-body); font-size: 0.88rem; cursor: pointer; }
        .router-toggle button.on { color: #111; }
        .router-toggle .pill { position: absolute; inset: 0; border-radius: 999px; background: var(--project-accent); z-index: -1; }
        .router { display: grid; grid-template-columns: 1fr 120px 1fr; gap: 1rem; align-items: center; }
        .people, .doors { display: grid; gap: 0.9rem; }
        .person { display: grid; grid-template-columns: 44px 1fr; gap: 0.9rem; align-items: center; padding: 1rem 1.1rem; }
        .person .ico { width: 44px; height: 44px; border-radius: 12px; background: var(--project-accent-dim); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
        .person h3 { margin: 0 0 0.2rem; font-size: 1rem; }
        .person p { font-size: 0.84rem; }
        .router-lines { height: 100%; min-height: 260px; }
        .router-lines path { fill: none; stroke: var(--project-accent); stroke-width: 2; }
        .door { padding: 1rem 1.2rem; border-radius: 14px; border: 1px dashed var(--project-border); }
        .door strong { display: block; color: var(--project-text); font-family: var(--font-heading); }
        .door span { font-size: 0.82rem; color: var(--project-text-secondary); }
        .door.one { display: flex; flex-direction: column; justify-content: center; min-height: 260px; border-color: var(--project-bad); background: var(--project-bad-dim); }
        .door.split { border-style: solid; border-color: var(--project-good); background: var(--project-good-dim); }

        /* ================= Requirements ================= */
        .req-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.9rem; }
        .req { padding: 1.1rem 1.2rem; position: relative; }
        .req .id { font-family: var(--font-heading); font-weight: 700; color: var(--project-accent); font-size: 0.9rem; margin-bottom: 0.4rem; display: block; }
        .req h3 { font-size: 0.98rem; }
        .req p { font-size: 0.83rem; }
        .req.fixed { border-color: var(--project-accent); background: var(--project-accent-dim); }
        .req.fixed .lock { position: absolute; top: 0.9rem; right: 1rem; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--project-accent); }

        /* ================= Mapping ================= */
        .map-stats { display: flex; flex-wrap: wrap; gap: 3rem; margin-bottom: 2.5rem; }
        .map-stats div { font-size: 0.88rem; color: var(--project-text-secondary); }
        .map-stats strong { display: block; font-family: var(--font-heading); font-size: clamp(2.6rem, 5vw, 3.6rem); color: var(--project-text); line-height: 1; margin-bottom: 0.4rem; }
        .frame { background: var(--project-bg-secondary); border: 1px solid var(--project-border); border-radius: 14px; overflow: hidden; }
        .frame-bar { display: flex; align-items: center; gap: 6px; padding: 0.7rem 1rem; border-bottom: 1px solid var(--project-border); background: var(--project-bg); }
        .section-full-custom .frame-bar { background: var(--project-bg-secondary); }
        .frame-bar span { width: 10px; height: 10px; border-radius: 50%; background: var(--project-accent); }
        .frame-bar span:nth-child(2) { opacity: 0.6; }
        .frame-bar span:nth-child(3) { opacity: 0.3; }
        .frame-bar em { margin-left: 0.5rem; font-style: normal; font-size: 0.8rem; color: var(--project-text-secondary); font-weight: 600; }
        .expand-btn { margin-left: auto; background: none; border: none; color: var(--project-text-secondary); cursor: pointer; padding: 0.2rem 0.5rem; border-radius: 6px; }
        .expand-btn:hover { color: var(--project-accent); background: var(--project-accent-dim); }
        .frame-body { line-height: 0; position: relative; }
        .frame-body img { width: 100%; height: auto; display: block; cursor: zoom-in; }
        .map-peek { max-height: 520px; overflow: hidden; }
        .map-peek img { margin-top: -31%; }
        .map-peek::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 120px; background: linear-gradient(transparent, var(--project-bg-secondary)); pointer-events: none; }
        .caption { font-size: 0.85rem; color: var(--project-text-secondary); margin-top: 0.8rem; }
        .legend { display: flex; flex-wrap: wrap; gap: 1.2rem; margin-top: 0.8rem; font-size: 0.82rem; color: var(--project-text-secondary); }
        .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 0.4rem; vertical-align: middle; }

        /* ================= Findings ================= */
        .find { display: flex; flex-direction: column; gap: 0.4rem; border-left: 3px solid var(--project-bad); }
        .find .n { font-family: var(--font-heading); font-size: 2.6rem; font-weight: 700; color: var(--project-bad); line-height: 1; }
        .find h3 { margin-bottom: 0.2rem; }

        /* ================= Moves ================= */
        .question { font-family: var(--font-heading); font-size: clamp(1.3rem, 2.6vw, 1.8rem); font-style: italic; color: var(--project-text); border-left: 3px solid var(--project-accent); padding-left: 1.2rem; margin-bottom: 2.5rem; }
        .question strong { color: var(--project-accent); font-style: normal; }
        .moves { display: grid; gap: 0.9rem; }
        .move { display: grid; grid-template-columns: 60px 1.1fr 1fr 1fr; gap: 1.4rem; align-items: center; padding: 1.3rem 1.4rem; }
        .move .num { font-family: var(--font-heading); font-size: 2rem; font-weight: 700; color: var(--project-accent); }
        .move h3 { margin-bottom: 0.5rem; }
        .move .reqs { display: flex; gap: 0.35rem; flex-wrap: wrap; }
        .move .col label { display: block; font-size: 0.66rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.3rem; }
        .move .col.b label { color: var(--project-bad); }
        .move .col.a label { color: var(--project-good); }
        .move .col.b p { text-decoration: line-through; text-decoration-color: rgba(248, 113, 113, 0.5); }
        .move .col.a p { color: var(--project-text); }

        /* ================= Architecture ================= */
        .surfaces { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin-bottom: 2rem; }
        .surface { border-top: 4px solid; }
        .surface.pub { border-top-color: #0f7a5c; }
        .surface.rec { border-top-color: #7c4ddb; }
        .surface.ops { border-top-color: #9ca3af; }
        .surface .job { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--project-text-secondary); }

        /* ================= Flow race ================= */
        .race { padding: 2rem; }
        .race-row + .race-row { margin-top: 2.5rem; }
        .race-label { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.9rem; }
        .race-label strong { color: var(--project-text); font-family: var(--font-heading); }
        .race-label span { font-size: 0.85rem; color: var(--project-text-secondary); font-variant-numeric: tabular-nums; }
        .race-track { display: grid; grid-template-columns: repeat(25, 1fr); gap: 5px; }
        .dot { position: relative; height: 22px; border-radius: 5px; background: var(--project-border); transition: background 0.2s ease, transform 0.2s ease; }
        .dot.on { background: var(--project-text-secondary); }
        .dot.on.pre { background: var(--project-bad); opacity: 0.75; }
        .dot.on.price { background: var(--project-good); transform: scaleY(1.3); }
        .dot.on.pay { background: var(--project-accent); }
        .dot em {
          position: absolute; left: 50%; bottom: calc(100% + 10px); transform: translate(-50%, 6px);
          white-space: nowrap; font-style: normal; font-size: 0.72rem; font-weight: 700;
          color: #052e1f; background: var(--project-good); padding: 0.25rem 0.55rem; border-radius: 6px;
          opacity: 0; transition: all 0.3s ease;
        }
        .dot em.show { opacity: 1; transform: translate(-50%, 0); }
        .race-key { display: flex; flex-wrap: wrap; gap: 1.2rem; margin-top: 2rem; font-size: 0.82rem; color: var(--project-text-secondary); align-items: center; }
        .race-key i { display: inline-block; width: 14px; height: 10px; border-radius: 3px; margin-right: 0.4rem; vertical-align: middle; }
        .replay { margin-left: auto; background: none; border: 1px solid var(--project-border); color: var(--project-text); border-radius: 999px; padding: 0.5rem 1rem; cursor: pointer; font-family: var(--font-body); font-size: 0.85rem; transition: all 0.2s ease; }
        .replay:hover { border-color: var(--project-accent); color: var(--project-accent); }

        /* ================= Screens ================= */
        .filter { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; align-items: center; }
        .filter span { font-size: 0.82rem; color: var(--project-text-secondary); margin-right: 0.3rem; }
        .filter button { border: 1px solid var(--project-border); background: transparent; color: var(--project-text-secondary); border-radius: 999px; padding: 0.45rem 0.9rem; font-family: var(--font-body); font-size: 0.82rem; cursor: pointer; transition: all 0.2s ease; }
        .filter button:hover { border-color: var(--project-accent); color: var(--project-text); }
        .filter button.on { background: var(--project-accent); border-color: var(--project-accent); color: #111; }
        .screens { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.6rem; }
        .screen { transition: opacity 0.35s ease, filter 0.35s ease, transform 0.35s ease; }
        .screen.dim { opacity: 0.18; filter: grayscale(1); transform: scale(0.98); }
        .screen .cap { display: flex; gap: 0.8rem; align-items: flex-start; justify-content: space-between; margin-top: 0.8rem; }
        .screen .cap .chip { white-space: nowrap; flex-shrink: 0; }
        .screen .cap p { font-size: 0.9rem; color: var(--project-text-secondary); line-height: 1.55; }
        .scroll-frame { height: 330px; overflow-y: auto; line-height: 0; cursor: ns-resize; scrollbar-width: thin; }
        .scroll-frame img { cursor: inherit; }
        .scroll-hint { position: absolute; right: 0.8rem; bottom: 0.8rem; font-size: 0.72rem; line-height: 1; background: rgba(0,0,0,0.7); color: #fff; padding: 0.4rem 0.6rem; border-radius: 6px; pointer-events: none; font-family: var(--font-body); }
        .form-stage { background: #fff4ee; padding: 1.6rem; display: flex; justify-content: center; min-height: 330px; align-items: center; line-height: 1.4; }
        .vf { width: 100%; max-width: 330px; background: #fff; border-radius: 14px; padding: 1.2rem; box-shadow: 0 14px 30px rgba(226, 88, 30, 0.15); font-family: Poppins, var(--font-body), sans-serif; }
        .vf-head { margin-bottom: 0.9rem; }
        .vf-head strong { display: block; color: #2b2b2b; font-size: 1.05rem; }
        .vf-head span { font-size: 0.75rem; color: #e2581e; font-weight: 600; }
        .vf form { display: grid; gap: 0.55rem; }
        .vf input, .vf textarea { width: 100%; box-sizing: border-box; border: 1px solid #ece3dd; border-radius: 8px; padding: 0.65rem 0.75rem; font-size: 0.85rem; font-family: inherit; color: #2b2b2b; background: #fff; outline: none; }
        .vf input:focus, .vf textarea:focus { border-color: #ff7a45; }
        .vf-btn { margin-top: 0.3rem; border: none; border-radius: 8px; padding: 0.7rem; color: #fff; font-weight: 600; font-family: inherit; cursor: pointer; background: linear-gradient(90deg, #f7a35c, #ff6a3d); transition: transform 0.15s ease; }
        .vf-btn:active { transform: scale(0.97); }
        .vf-done { text-align: center; padding: 1rem 0; }
        .vf-done strong { display: block; color: #2b2b2b; margin: 0.4rem 0; }
        .vf-done p { font-size: 0.82rem; color: #6b6b6b; }
        .vf-check { display: inline-flex; width: 44px; height: 44px; border-radius: 50%; align-items: center; justify-content: center; background: #ffe8dd; color: #e2581e; font-size: 1.2rem; }
        .vf-link { margin-top: 0.6rem; background: none; border: none; color: #e2581e; font-weight: 600; cursor: pointer; font-family: inherit; }
        .link-card { display: flex; flex-direction: column; justify-content: center; min-height: 330px; padding: 2rem; background: linear-gradient(135deg, rgba(124, 77, 219, 0.25), rgba(124, 77, 219, 0.05)); line-height: 1.5; }
        .link-card strong { font-family: var(--font-heading); font-size: 1.5rem; color: var(--project-text); margin-bottom: 0.6rem; }
        .link-card p { color: var(--project-text-secondary); font-size: 0.92rem; margin-bottom: 1.2rem; }
        .link-card a { align-self: flex-start; color: var(--project-text); border: 1px solid var(--project-border); border-radius: 999px; padding: 0.55rem 1rem; text-decoration: none; font-size: 0.88rem; transition: all 0.2s ease; }
        .link-card a:hover { border-color: var(--project-accent); color: var(--project-accent); }

        /* ================= Outcome ================= */
        .outcome-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.2rem; margin-bottom: 2.5rem; }
        .outcome-row .card { padding: 1.4rem; }
        .proof { display: grid; grid-template-columns: auto 1fr; gap: 1.4rem; align-items: center; border-color: var(--project-good); }
        .proof .tabs { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .proof .tabs span { font-size: 0.78rem; padding: 0.35rem 0.7rem; border-radius: 999px; border: 1px solid var(--project-border); color: var(--project-text-secondary); }
        .proof .tabs span.new { border-color: var(--project-good); color: var(--project-good); background: var(--project-good-dim); }
        .live-links { display: flex; gap: 0.8rem; flex-wrap: wrap; margin-top: 1.5rem; }
        .live-links a { color: var(--project-text); border: 1px solid var(--project-border); border-radius: 999px; padding: 0.55rem 1rem; text-decoration: none; font-size: 0.88rem; transition: all 0.2s ease; }
        .live-links a:hover { border-color: var(--project-accent); color: var(--project-accent); }
        .closing { background: var(--project-bg-secondary); border: 1px solid var(--project-accent); padding: 3rem 4%; border-radius: 14px; margin-top: 3rem; }
        .closing p { font-family: var(--font-heading); font-size: clamp(1.2rem, 2.5vw, 1.7rem); font-style: italic; line-height: 1.45; color: var(--project-text); max-width: 52ch; }
        .closing strong { color: var(--project-accent); font-style: normal; }

        /* ================= Lightbox ================= */
        .lightbox { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.9); z-index: 2000; display: flex; align-items: flex-start; justify-content: center; padding: 4vh 4vw; cursor: zoom-out; overflow: auto; }
        .lightbox img { max-width: min(1400px, 100%); height: auto; border-radius: 10px; }
        .lightbox-close { position: fixed; top: 1.2rem; right: 1.5rem; background: none; border: none; color: #fff; font-size: 1.6rem; cursor: pointer; }

        /* ================= Responsive ================= */
        @media (max-width: 1024px) {
          .headline-row, .req-grid { grid-template-columns: repeat(2, 1fr); }
          .outcome-row { grid-template-columns: repeat(3, 1fr); }
          .move { grid-template-columns: 50px 1fr; }
          .move .col { grid-column: 2; }
          .screens { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .section-custom, .section-full-custom { padding: 4rem 5%; }
          .hero-image-full { height: 38vh; }
          .hero-content-wrapper { padding: 2rem 5% 1.5rem; }
          .grid-3, .surfaces, .req-grid { grid-template-columns: 1fr; }
          .outcome-row { grid-template-columns: 1fr 1fr; }
          .router { grid-template-columns: 1fr; }
          .router-lines { display: none; }
          .door.one { min-height: 0; }
          .race { padding: 1.2rem; }
          .race-track { gap: 3px; }
          .dot { height: 16px; border-radius: 3px; }
          .dot em { font-size: 0.62rem; }
          .dot em { bottom: auto; top: calc(100% + 8px); transform: translate(-50%, -6px); }
          .race-track { margin-bottom: 2.4rem; }
          .race-row + .race-row { margin-top: 1.5rem; }
          .race-row { padding-bottom: 2.2rem; }
          .race-key { margin-top: 0; }
          .proof { grid-template-columns: 1fr; }
          .replay { margin-left: 0; }
        }
      `}</style>

      {/* ================= HERO ================= */}
      <motion.div
        className="hero-image-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
      >
        <img src={coverImg} alt="Untangling Veritas: from a tangled map to a simple structure" />
      </motion.div>

      <section className="project-hero-custom">
        <div className="hero-content-wrapper">
          <Reveal><h1>Untangling <em>Veritas</em></h1></Reveal>
          <Reveal delay={0.1}>
            <p className="hero-sub">
              I simplified an insurance broker’s website, from a 1,011-box map of everything that existed to the clear
              structure that is live today.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-meta">
              <div className="meta-item"><label>Role</label><p>UX/UI Design Lead</p></div>
              <div className="meta-item"><label>Company</label><p>Clarion Insurance Broking (Veritas)</p></div>
              <div className="meta-item"><label>Year</label><p>2022</p></div>
              <div className="meta-item"><label>Tools</label><p>FigJam, Figma</p></div>
              <div className="meta-item"><label>Live</label><p><a href="https://veritasins.com" target="_blank" rel="noopener noreferrer">veritasins.com ↗</a></p></div>
            </div>
          </Reveal>
          <div className="headline-row">
            {HEADLINE.map((h, i) => (
              <Reveal key={h.label} delay={0.25 + i * 0.08}><BeforeAfter {...h} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW + BRIEF ================= */}
      <section className="section-custom" style={{ paddingTop: '3rem' }}>
        <Reveal><SectionLabel>Overview · 30-second read</SectionLabel></Reveal>
        <div className="grid-3">
          {OVERVIEW.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08}>
              <div className="card hover" style={{ height: '100%' }}>
                <span className="eyebrow">{o.label}</span>
                <p>{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal><h3 className="sub-heading">The brief, in three parts</h3></Reveal>
        <div className="grid-3">
          {BRIEF.map((b, i) => (
            <Reveal key={b.n} delay={i * 0.08}>
              <div className="card hover" style={{ height: '100%' }}>
                <span className="brief-num">{b.n}</span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= AUDIENCES ================= */}
      <div className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>01 · Who It Had to Serve</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">Three very different people, one front door</h2></Reveal>
          <Reveal><p className="section-lead">Flip the switch to see the core idea of the project: <strong>give each audience its own door</strong>.</p></Reveal>
          <Reveal>
            <div className="router-toggle" role="tablist">
              {[{ k: false, t: 'In 2022' }, { k: true, t: 'After' }].map((o) => (
                <button key={o.t} role="tab" aria-selected={split === o.k} className={split === o.k ? 'on' : ''} onClick={() => setSplit(o.k)}>
                  {split === o.k && <motion.span layoutId="vr-pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  {o.t}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="router">
            <div className="people">
              {AUDIENCES.map((a, i) => (
                <Reveal key={a.who} delay={i * 0.08}>
                  <div className="card person">
                    <span className="ico">{a.icon}</span>
                    <div>
                      <h3>{a.who}</h3>
                      <p>{a.want}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <svg className="router-lines" viewBox="0 0 120 300" preserveAspectRatio="none" aria-hidden="true">
              {[50, 150, 250].map((y, i) => (
                <motion.path
                  key={y}
                  initial={false}
                  animate={{ d: split ? `M0 ${y} C 60 ${y}, 60 ${y}, 120 ${y}` : `M0 ${y} C 60 ${y}, 60 150, 120 150` }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            <AnimatePresence mode="wait">
              {split ? (
                <motion.div key="split" className="doors" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  {AUDIENCES.map((a) => (
                    <div key={a.door} className="door split">
                      <strong>{a.door}</strong>
                      <span>{a.doorSub}</span>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div key="one" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  <div className="door one">
                    <strong>One tangled website</strong>
                    <span>Public pages, advisor tools and internal systems in one menu. Everyone sorts it out themselves.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ================= REQUIREMENTS ================= */}
      <section className="section-custom">
        <Reveal><SectionLabel>02 · What the Business Needed</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Eight requirements from the stakeholders</h2></Reveal>
        <Reveal><p className="section-lead">Every later decision traces back to one of these. One was <strong>not negotiable</strong>: I could decide when the lead form appeared, not whether.</p></Reveal>
        <div className="req-grid">
          {REQUIREMENTS.map((r, i) => (
            <Reveal key={r.id} delay={(i % 4) * 0.06}>
              <div className={`card hover req ${r.fixed ? 'fixed' : ''}`} style={{ height: '100%' }}>
                {r.fixed && <span className="lock">Fixed</span>}
                <span className="id">{r.id}</span>
                <h3>{r.t}</h3>
                <p>{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= MAPPING + FINDINGS ================= */}
      <div className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>03 · Mapping What Existed</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">For the first time, everyone looked at the same picture</h2></Reveal>
          <Reveal><p className="section-lead">I ran mapping sessions with each owner and put every page, tab, field and step on one board.</p></Reveal>
          <Reveal>
            <div className="map-stats">
              <div><strong><CountUp to={1011} /></strong>boxes</div>
              <div><strong><CountUp to={610} /></strong>connectors</div>
              <div><strong><CountUp to={77} /></strong>stakeholder notes</div>
            </div>
          </Reveal>
          <Reveal>
            <Frame title="The inherited structure, redrawn" onExpand={() => setLightbox({ src: iaBeforeImg, alt: 'Inherited IA' })}>
              <div className="map-peek" onClick={() => setLightbox({ src: iaBeforeImg, alt: 'Inherited IA' })}>
                <img src={iaBeforeImg} alt="The inherited Veritas information architecture" />
              </div>
            </Frame>
            <div className="legend">
              <span><i style={{ background: '#f87171' }} />Dead end</span>
              <span><i style={{ background: '#facc15' }} />Duplicate</span>
              <span><i style={{ background: '#a78bfa' }} />Advisor tool in a public place</span>
              <span style={{ marginLeft: 'auto' }}>Click to see the full map</span>
            </div>
          </Reveal>

          <Reveal><h3 className="sub-heading">Six problems, counted from the map</h3></Reveal>
          <div className="grid-3">
            {FINDINGS.map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) * 0.08}>
                <div className="card hover find" style={{ height: '100%' }}>
                  <span className="n"><CountUp to={f.n} /></span>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FIVE MOVES ================= */}
      <section className="section-custom">
        <Reveal><SectionLabel>04 · Five Moves</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">How the structure got simpler</h2></Reveal>
        <Reveal><p className="question">I asked one question of every box on the map: <strong>who needs this, and when?</strong></p></Reveal>
        <div className="moves">
          {MOVES.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.06}>
              <div className="card hover move">
                <span className="num">{m.n}</span>
                <div>
                  <h3>{m.t}</h3>
                  <div className="reqs">{m.req.map((r) => <span key={r} className="chip accent">{r}</span>)}</div>
                </div>
                <div className="col b"><label>Before</label><p>{m.before}</p></div>
                <div className="col a"><label>After</label><p>{m.after}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SIMPLIFIED ARCHITECTURE ================= */}
      <div className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>05 · The Simplified Architecture</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">Three surfaces, one job each</h2></Reveal>
          <Reveal><p className="section-lead">This is the map the website was designed from, and the structure that is <strong>live today</strong>.</p></Reveal>
          <div className="surfaces">
            {SURFACES.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <div className={`card hover surface ${s.tone}`} style={{ height: '100%' }}>
                  <span className="job">{s.job}</span>
                  <h3 style={{ marginTop: '0.4rem' }}>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Frame title="The simplified structure" onExpand={() => setLightbox({ src: iaAfterImg, alt: 'Simplified IA' })}>
              <div className="map-peek" onClick={() => setLightbox({ src: iaAfterImg, alt: 'Simplified IA' })}>
                <img src={iaAfterImg} alt="The simplified Veritas information architecture" />
              </div>
            </Frame>
            <p className="caption">Click to see the full map.</p>
          </Reveal>
        </div>
      </div>

      {/* ================= FLOW RACE ================= */}
      <section className="section-custom">
        <Reveal><SectionLabel>06 · One Flow, Before and After</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Getting a motor insurance price</h2></Reveal>
        <Reveal><p className="section-lead">The mandatory lead form stayed. Everything else that stood <strong>before the price</strong> moved after it.</p></Reveal>
        <div ref={raceRef} className="card race">
          {renderRow(BEFORE_STEPS, BEFORE_PRICE, 'In 2022')}
          {renderRow(AFTER_STEPS, AFTER_PRICE, 'After')}
          <div className="race-key">
            <span><i style={{ background: 'var(--project-bad)' }} />Steps before seeing a price</span>
            <span><i style={{ background: 'var(--project-good)' }} />First price</span>
            <span><i style={{ background: 'var(--project-accent)' }} />Payment</span>
            <button className="replay" onClick={replay}>↻ Replay</button>
          </div>
        </div>
      </section>

      {/* ================= SCREENS ================= */}
      <div className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>07 · From Map to Screens</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">Each screen is one of the five moves, built</h2></Reveal>
          <Reveal><p className="section-lead">Filter by move to see where it shows up. The two forms are <strong>live</strong>: try them.</p></Reveal>
          <Reveal>
            <div className="filter">
              <span>Show move:</span>
              <button className={moveFilter === null ? 'on' : ''} onClick={() => setMoveFilter(null)}>All</button>
              {MOVES.map((m) => (
                <button key={m.n} className={moveFilter === m.n ? 'on' : ''} onClick={() => setMoveFilter(m.n)}>
                  {m.n} · {m.t.split(' ').slice(0, 3).join(' ')}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="screens">
            <div className={`screen ${dim([1, 2]) ? 'dim' : ''}`}>
              <Frame title="Homepage · header and product bar" onExpand={() => setLightbox({ src: homeHeroImg, alt: 'Homepage' })}>
                <img src={homeHeroImg} alt="Veritas homepage with one header and a product bar" onClick={() => setLightbox({ src: homeHeroImg, alt: 'Homepage' })} />
              </Frame>
              <div className="cap"><p>One header, one product bar. Recruitment and login link out instead of living in the menu.</p><span className="chip accent">Moves 1, 2</span></div>
            </div>
            <div className={`screen ${dim([5]) ? 'dim' : ''}`}>
              <Frame title="Homepage · below the hero">
                <div className="scroll-frame" tabIndex={0} aria-label="Scrollable homepage preview">
                  <img src={homeFullImg} alt="Full Veritas homepage: who we are, numbers, app and partners" />
                </div>
                <span className="scroll-hint">Scroll inside ↕</span>
              </Frame>
              <div className="cap"><p>Who we are, partner numbers, the app and insurers live in one scroll instead of separate pages.</p><span className="chip accent">Move 5</span></div>
            </div>
            <div className={`screen ${dim([2]) ? 'dim' : ''}`}>
              <Frame title="Motor product page" onExpand={() => setLightbox({ src: motorImg, alt: 'Motor page' })}>
                <img src={motorImg} alt="Veritas motor insurance page" onClick={() => setLightbox({ src: motorImg, alt: 'Motor page' })} />
              </Frame>
              <div className="cap"><p>Every product shares one template: one promise, one main action, one way to ask for help.</p><span className="chip accent">Move 2</span></div>
            </div>
            <div className={`screen ${dim([3]) ? 'dim' : ''}`}>
              <Frame title="Fill your details · live">
                <div className="form-stage"><LeadForm /></div>
              </Frame>
              <div className="cap"><p>The only gate before a price: four fields, down from a nine-field form.</p><span className="chip accent">Move 3</span></div>
            </div>
            <div className={`screen ${dim([4]) ? 'dim' : ''}`}>
              <Frame title="Request a Callback · live">
                <div className="form-stage"><CallbackForm /></div>
              </Frame>
              <div className="cap"><p>One form, available from the header and every product page.</p><span className="chip accent">Move 4</span></div>
            </div>
            <div className={`screen ${dim([1]) ? 'dim' : ''}`}>
              <Frame title="Advisor recruitment site">
                <div className="link-card">
                  <strong>A separate site for future advisors</strong>
                  <p>What the role is, what you can earn and how to join, with nothing on it that isn’t for them.</p>
                  <a href="https://pos.veritasins.com" target="_blank" rel="noopener noreferrer">Visit pos.veritasins.com ↗</a>
                </div>
              </Frame>
              <div className="cap"><p>Future advisors no longer have to dig through the customer site.</p><span className="chip accent">Move 1</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= OUTCOME ================= */}
      <section className="section-custom">
        <Reveal><SectionLabel>08 · Outcome</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">The map became veritasins.com, and it still holds</h2></Reveal>
        <div className="outcome-row">
          {OUTCOME.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.06}>
              <div className="card hover" style={{ height: '100%' }}><BeforeAfter {...o} big /></div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="card proof">
            <div>
              <span className="eyebrow" style={{ color: 'var(--project-good)' }}>Proof it scales</span>
              <p style={{ color: 'var(--project-text)', maxWidth: '46ch' }}>
                The product bar was built to take new lines. The Veritas team has since added a fifth as one more tab,
                without changing the header, footer or callback form.
              </p>
            </div>
            <div className="tabs">
              {['Motor', 'Health', 'SME', 'Life'].map((t) => <span key={t}>{t}</span>)}
              <motion.span
                className="new"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 15 }}
              >
                + Sampoorna Suraksha
              </motion.span>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="live-links">
            <a href="https://veritasins.com" target="_blank" rel="noopener noreferrer">veritasins.com ↗</a>
            <a href="https://pos.veritasins.com" target="_blank" rel="noopener noreferrer">pos.veritasins.com ↗</a>
          </div>
        </Reveal>
      </section>

      {/* ================= REFLECTION ================= */}
      <section className="section-custom">
        <Reveal><SectionLabel>09 · Reflection</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">What I learned</h2></Reveal>
        <Reveal><p className="section-lead" style={{ maxWidth: '760px' }}>Simplifying is not removing things. It is understanding them well enough to know what is truly needed, and when. Looking back, I would tree-test the product names with real buyers instead of only agreeing them with stakeholders, and track drop-off on the lead form so the business could decide with data.</p></Reveal>
      </section>

      {/* ================= NAVIGATION ================= */}
      <div className="project-navigation" style={{ padding: '0 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={handleBackToProjects} className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          <span>Back to Projects</span>
        </button>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/projects/5" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            <span>Previous: Locus</span>
          </Link>
          <Link to="/projects/4" className="btn btn-primary">
            <span>Next: SpendSmart</span>
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
            <motion.img src={lightbox.src} alt={lightbox.alt} initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VeritasProject;
