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
import airbnbHeroImg from '../../assets/images/Airbnb.png';
import competitiveAnalysisImg from '../../assets/images/competitive-nalysis.png';
import journeyMapImg from '../../assets/images/User-journeymap.png';
import screenerImg from '../../assets/images/airbnb-screener.png';
import discussionGuide1Img from '../../assets/images/airbnb-discussion-guide-1.jpg';
import discussionGuide2Img from '../../assets/images/airbnb-discussion-guide-2.jpg';
import airbnbMockupAllImg from '../../assets/images/airbnb-mockup.png';

/* =========================================================
   CONTENT (edit text here, layout stays the same)
   ========================================================= */

const NAV_SECTIONS = [
  { id: 'ab-overview', label: 'Overview' },
  { id: 'ab-problem', label: 'Problem' },
  { id: 'ab-process', label: 'Process' },
  { id: 'ab-competitive', label: 'Competitors' },
  { id: 'ab-interviews', label: 'Interviews' },
  { id: 'ab-insights', label: 'Insights' },
  { id: 'ab-persona', label: 'Persona' },
  { id: 'ab-journey', label: 'Journey map' },
  { id: 'ab-solution', label: 'Solution' },
  { id: 'ab-outcome', label: 'Outcome' },
  { id: 'ab-reflection', label: 'Reflection' },
];

const OVERVIEW = [
  { label: 'Problem', text: 'New travellers explored Airbnb but left before booking. They could not trust what they saw.' },
  { label: 'Approach', text: 'Competitive analysis, 10 user interviews, personas and a journey map.' },
  { label: 'Solution', text: 'Trust-building features: verified badges, comparison, guided matching and guest photos.' },
  { label: 'My role', text: 'UX research and UI design in a five-person academic team.' },
];

const PROCESS = [
  { num: '01', title: 'Benchmark', q: 'What do competitors do that Airbnb does not?', method: 'Competitive analysis', output: '6 product gaps' },
  { num: '02', title: 'Listen', q: 'Where does a traveller’s confidence break?', method: '10 user interviews', output: '6 key insights' },
  { num: '03', title: 'Map', q: 'When exactly do users give up?', method: 'Personas & journey map', output: 'Drop-off at Decision' },
  { num: '04', title: 'Design', q: 'What would make booking feel safe?', method: 'Hi-fi mobile screens', output: '7 interventions' },
];

const GAPS = [
  { icon: '⚖️', title: 'No comparison feature', text: 'Listings cannot be compared side by side, a standard in hotel booking.' },
  { icon: '🗺️', title: 'Location hidden until booked', text: 'The exact location only appears after paying. Competitors do not do this.' },
  { icon: '🛁', title: 'Sparse listing cards', text: 'Beds and bathrooms need a click into every listing.' },
  { icon: '🔍', title: 'No search history', text: 'Previous searches are not saved, so users start over every visit.' },
  { icon: '🏷️', title: 'No loyalty programme', text: 'Both competitors reward bookings. Airbnb offers nothing similar.' },
  { icon: '📋', title: 'Icon-heavy navigation', text: 'Inconsistent labels confuse first-time users.' },
];

const SCREENER = [
  'Aged between 18 and 40',
  'Booked accommodation online recently',
  'Has used platforms like Airbnb, VRBO or Booking.com',
  'Has booked a group trip or a first-time trip',
  'Was involved in choosing and paying for the stay',
];

const GUIDE = [
  'Tell me about the last time you booked accommodation.',
  'How did you begin your search?',
  'What information helped you create a shortlist?',
  'What made a listing feel trustworthy or untrustworthy?',
  'Was there a point where you hesitated or left?',
  'How did you compare different options?',
  'What did you need to know before paying?',
  'Sketch your ideal booking process.',
];

const INTERVIEW_LINKS = [
  { name: 'Interview 1', note: 'Group traveller', url: 'https://drive.google.com/file/d/1Vl1GN-76x2HKyPoRKb_-2PUIJqCKB2Cy/view' },
  { name: 'Interview 2', note: 'Group traveller', url: 'https://drive.google.com/file/d/1QhBB0tsgS0Px0YA0V-ZTvkF2e-d48IOC/view' },
];

// step = index of the walkthrough screen that answers this insight
const INSIGHTS = [
  { title: 'Verification they could trust', text: 'Users stopped short of booking when a listing had no verified label.', phase: 'Decision', step: 5 },
  { title: 'Real reviews, not curated ones', text: '“I don’t trust a 4.9 from 12 reviews.” Users wanted guest photos, not just stars.', phase: 'Decision', step: 6 },
  { title: 'Price clarity and comparison', text: 'Price changes between preview and checkout sent users to competitors.', phase: 'Exploration', step: 3 },
  { title: 'Group booking clarity', text: 'Group planners could not see bed and bathroom setups upfront.', phase: 'Exploration', step: 0 },
  { title: 'Location confidence', text: 'Not knowing the area before booking was a dealbreaker for safety.', phase: 'Decision', step: 4 },
  { title: 'Reachable help', text: 'Unanswered pre-booking questions killed trust in the stay.', phase: 'Decision', step: 5 },
];

const PERSONAS = [
  {
    name: 'Priyank Shah',
    meta: '26 · UX student · Toronto',
    icon: '🧳',
    bio: 'International student who travels with friends every 6 months and usually books for the whole group.',
    scenario: 'Plans a group trip and pays for everyone, so he must be sure the stay is safe, accurate and within budget.',
    goals: ['Find a stay that fits the group budget', 'Share options to agree as a group', 'Check safety before paying'],
    needs: ['Verified listings', 'Accurate pricing', 'Complete listing info', 'Real-time help', 'Ideas based on mood'],
  },
  {
    name: 'Mahak Patel',
    meta: '26 · UX student · Toronto',
    icon: '🗺️',
    bio: 'Plans trips well in advance, adapts quickly when plans change and likes sharing experiences online.',
    scenario: 'Organises trips with friends and needs flexible check-in, clear cancellation rules and up-to-date descriptions.',
    goals: ['Plan an itinerary early', 'Keep bookings flexible', 'Get around easily during the trip'],
    needs: ['Verified listings', 'Accurate pricing', 'Up-to-date descriptions', 'Affordable stays', 'Transparent reservations'],
  },
];

const JOURNEY = [
  { phase: 'Awareness', emoji: '😄', feel: 'Excited', level: 0.68, doing: 'Decides to plan a trip with friends.', pain: 'Few destination ideas; group preferences are hard to manage.', opp: 'Collections of stays by mood and season.' },
  { phase: 'Exploration', emoji: '😊', feel: 'Happy', level: 0.92, doing: 'Browses listings across Airbnb and other sites.', pain: 'Inaccurate prices and no way to compare listings.', opp: 'Verified photos and a compare feature.' },
  { phase: 'Decision', emoji: '😞', feel: 'Disappointed', level: 0.18, doing: 'Narrows to a few stays, reads reviews, asks friends.', pain: 'Unverified listings, unreliable reviews, missing details, unreachable hosts.', opp: 'Verified label, real guest evidence, a travel specialist.', drop: true },
  { phase: 'Booking', emoji: '🤔', feel: 'Curious', level: 0.5, doing: 'Pays on behalf of the whole group.', pain: 'Worries about hidden terms and security.', opp: 'Transparent, secure checkout.' },
  { phase: 'Experience', emoji: '😤', feel: 'Annoyed', level: 0.08, doing: 'Arrives and leaves a review.', pain: 'The property does not match the photos.', opp: 'Platform verification of every listing.' },
];

// All screens come from one board image (airbnb-mockup.png).
// x / y = top-left corner of each phone on that board, in pixels.
const BOARD = { w: 2748, h: 2268, pw: 437, ph: 884 };

const WALKTHROUGH = [
  {
    label: 'Home feed',
    pos: { x: 350, y: 200 },
    phase: 'Exploration',
    insight: '“I have to open 15 listings just to compare basics.”',
    decision: 'Bedrooms, beds, baths and a Verified check sit on every card, with a Compare link and Suggest Me pinned to the top.',
    notes: [
      { x: 14, y: 20, t: 'Suggest Me pinned beside the categories.' },
      { x: 16, y: 29, t: 'Verified check visible before clicking in.' },
      { x: 28, y: 57, t: 'Key specs right on the card.' },
      { x: 78, y: 65, t: 'Compare link on every listing.' },
    ],
  },
  {
    label: 'Suggest Me',
    pos: { x: 887, y: 200 },
    phase: 'Exploration',
    insight: '“I don’t know where to start looking.”',
    decision: 'A short guided form (trip type, guests, style, dates, budget) returns a shortlist instead of thousands of results.',
    notes: [
      { x: 50, y: 20, t: 'Starts with trip type, the biggest filter.' },
      { x: 50, y: 46, t: 'Style or theme preference: stays matched to mood.' },
      { x: 50, y: 68, t: 'Budget upfront avoids price surprises later.' },
      { x: 79, y: 94, t: 'One tap returns tailored matches.' },
    ],
  },
  {
    label: 'Add to compare',
    pos: { x: 1424, y: 200 },
    phase: 'Exploration',
    insight: '“I always check multiple platforms before deciding.”',
    decision: 'After picking a stay, similar listings are suggested to compare, so users never leave Airbnb to compare elsewhere.',
    notes: [
      { x: 50, y: 18, t: 'Comparable listings suggested automatically.' },
      { x: 17, y: 26, t: 'Verified and Superhost tags on the card.' },
      { x: 32, y: 53, t: 'Specs visible without opening the listing.' },
      { x: 80, y: 63, t: 'Add to compare in one tap.' },
    ],
  },
  {
    label: 'Compare',
    pos: { x: 1961, y: 200 },
    phase: 'Decision',
    insight: 'Price differences between preview and checkout sent users to competitors.',
    decision: 'Compare stays side by side across price, features and amenities. Missing items are struck through so gaps stand out.',
    notes: [
      { x: 26, y: 32, t: 'Price, rating and location side by side.' },
      { x: 22, y: 46, t: 'Missing features are struck through.' },
      { x: 68, y: 68, t: 'Amenities compared row by row.' },
      { x: 66, y: 94, t: 'Choose a stay straight from the comparison.' },
    ],
  },
  {
    label: 'Map & area',
    pos: { x: 350, y: 1184 },
    phase: 'Decision',
    insight: 'Users could not judge the neighbourhood before booking.',
    decision: 'Prices on the map, a Verified badge next to the location and a link to nearby attractions, all before booking.',
    notes: [
      { x: 15, y: 19, t: 'Suggest Me is always one tap away.' },
      { x: 33, y: 47, t: 'Prices on the map for quick budget scanning.' },
      { x: 43, y: 79, t: 'Verified badge beside the location name.' },
      { x: 70, y: 93, t: 'Check nearby attractions before booking.' },
    ],
  },
  {
    label: 'Listing details',
    pos: { x: 887, y: 1184 },
    phase: 'Decision',
    insight: '“I don’t book listings without verified labels.”',
    decision: 'Show when each photo was taken, how many guests were satisfied, and offer a travel specialist for questions.',
    notes: [
      { x: 25, y: 35, t: 'Photo date shows how recent the images are.' },
      { x: 50, y: 66, t: 'Guest bookings vs satisfied guests: proof in numbers.' },
      { x: 28, y: 77, t: 'Book a travel specialist for questions.' },
      { x: 76, y: 93, t: 'Clear price next to Reserve.' },
    ],
  },
  {
    label: 'Guest reviews',
    pos: { x: 1424, y: 1184 },
    phase: 'Decision',
    insight: '“I don’t trust a 4.9 from 12 reviews.”',
    decision: 'Guest-uploaded photos, an accuracy score and trip-type tags turn reviews into evidence, not just stars.',
    notes: [
      { x: 72, y: 21, t: 'Accuracy score answers “does it match the photos?”' },
      { x: 50, y: 42, t: 'Search reviews for what matters to you.' },
      { x: 48, y: 55, t: 'Trip-type tag, e.g. Group trip.' },
      { x: 30, y: 74, t: 'Real photos uploaded by past guests.' },
    ],
  },
];

const OUTCOME = [
  { to: 10, suffix: '', label: 'User interviews' },
  { to: 3, suffix: '', label: 'Platforms benchmarked' },
  { to: 6, suffix: '', label: 'Research insights' },
  { to: 7, suffix: '', label: 'Design interventions' },
];

const NEXT_STEPS = [
  { t: 'Usability-test the new flows', d: 'Test Suggest Me and Compare with first-time and group bookers.' },
  { t: 'Measure what matters', d: 'Track booking completion and time to build a shortlist.' },
  { t: 'Solve group decisions', d: 'A shared shortlist with voting, since groups still decide outside the app.' },
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

const CountUp = ({ to, decimals = 0, suffix = '' }) => {
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
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
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

// Shows one phone from the board image by cropping it with CSS
const INSET = 6; // trims the red board background around each phone
const PhoneCrop = ({ pos, alt }) => {
  const w = BOARD.pw - INSET * 2;
  const h = BOARD.ph - INSET * 2;
  return (
    <div className="phone-crop" style={{ aspectRatio: `${w} / ${h}` }}>
      <img
        src={airbnbMockupAllImg}
        alt={alt}
        style={{
          width: `${(BOARD.w / w) * 100}%`,
          left: `${(-(pos.x + INSET) / w) * 100}%`,
          top: `${(-(pos.y + INSET) / h) * 100}%`,
        }}
      />
    </div>
  );
};

/* =========================================================
   PAGE
   ========================================================= */

const AirbnbProject = () => {
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

  // Interview kit accordion
  const [openKit, setOpenKit] = useState('screener');

  // Persona tabs
  const [persona, setPersona] = useState(0);
  const p = PERSONAS[persona];

  // Journey map
  const [phase, setPhase] = useState(2);
  const j = JOURNEY[phase];

  // Walkthrough
  const [step, setStep] = useState(0);
  const [activeNote, setActiveNote] = useState(0);
  const goStep = (i) => { setStep(i); setActiveNote(0); };
  const current = WALKTHROUGH[step];
  const jumpToFix = (i) => { goStep(i); scrollTo('ab-solution'); };

  const handleBackToProjects = () => navigate('/', { state: { scrollToProjects: true } });

  // Emotion curve geometry (viewBox 1000 x 240)
  const pts = JOURNEY.map((s, i) => ({ x: 100 + i * 200, y: 210 - s.level * 170 }));
  const curve = pts.reduce((d, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${d} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="airbnb-project">
      <style jsx="true">{`
        /* ================= Tokens ================= */
        .airbnb-project {
          --project-accent: #ff385c;
          --project-accent-dim: rgba(255, 56, 92, 0.12);
          --project-good: #00a699;
          --project-good-dim: rgba(0, 166, 153, 0.12);
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
          --project-accent: #e31c5f;
          --project-good: #008a7e;
        }
        [data-theme="light"] .airbnb-project .hotspot-tip { background: #1a1a1a; color: #fff; }
        [data-theme="light"] .airbnb-project .lightbox { background: rgba(255,255,255,0.92); }

        /* ================= Side nav ================= */
        .side-nav {
          position: fixed; left: 24px; top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: none;
          flex-direction: column;
          gap: 0.35rem;
        }
        @media (min-width: 1560px) { .side-nav { display: flex; } }
        .side-nav button {
          display: flex; align-items: center; gap: 0.7rem;
          background: none; border: none;
          padding: 0.3rem 0;
          cursor: pointer;
          color: var(--project-text-secondary);
          font-size: 0.75rem;
          font-family: var(--font-body);
          text-align: left;
        }
        .side-nav .dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--project-border);
          border: 1px solid var(--project-text-secondary);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .side-nav .lbl { opacity: 0; transform: translateX(-6px); transition: all 0.25s ease; white-space: nowrap; }
        .side-nav:hover .lbl, .side-nav button.active .lbl { opacity: 1; transform: translateX(0); }
        .side-nav button.active { color: var(--project-text); }
        .side-nav button.active .dot {
          background: var(--project-accent);
          border-color: var(--project-accent);
          transform: scale(1.4);
          box-shadow: 0 0 0 4px var(--project-accent-dim);
        }

        /* ================= Hero ================= */
        .hero-image-full { width: 100%; height: 70vh; max-height: 800px; overflow: hidden; }
        .hero-image-full img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-content-wrapper { padding: 4rem 5% 2rem; max-width: 1200px; margin: 0 auto; }
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
        .project-hero-custom h1 em { color: var(--project-accent); font-style: italic; font-weight: 800; }
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
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--project-accent);
          margin-bottom: 0.5rem;
        }
        .meta-item p { font-size: 0.95rem; color: var(--project-text-secondary); line-height: 1.5; }

        /* ================= Sections ================= */
        .section-custom { padding: 6rem 5%; max-width: 1200px; margin: 0 auto; scroll-margin-top: 80px; }
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
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
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
        .sub-heading { font-family: var(--font-heading); font-size: 1.3rem; color: var(--project-text); margin: 0 0 1.2rem; }

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
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--project-accent);
          margin-bottom: 0.6rem;
        }
        .eyebrow.good { color: var(--project-good); }
        .eyebrow.muted { color: var(--project-text-secondary); }
        .card h3 { font-family: var(--font-heading); font-size: 1.12rem; font-weight: 600; color: var(--project-text); margin-bottom: 0.5rem; }
        .card p { font-size: 0.93rem; color: var(--project-text-secondary); line-height: 1.6; }
        .chip {
          display: inline-block;
          font-size: 0.75rem; font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          border: 1px solid var(--project-border);
          color: var(--project-text-secondary);
        }
        .chip.accent { border-color: var(--project-accent); color: var(--project-accent); background: var(--project-accent-dim); }
        .chip.good { border-color: var(--project-good); color: var(--project-good); background: var(--project-good-dim); }
        .chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }

        /* ================= Overview ================= */
        .overview-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
        .overview-icon { font-size: 1.8rem; display: block; margin-bottom: 0.8rem; }

        /* ================= Problem ================= */
        .problem-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 2rem; align-items: center; }
        .score-card { display: grid; gap: 1.4rem; }
        .score-row { display: grid; grid-template-columns: 110px 1fr 56px; gap: 1rem; align-items: center; }
        .score-row .name { color: var(--project-text); font-weight: 600; font-size: 0.95rem; }
        .score-track { height: 14px; border-radius: 999px; background: var(--project-border); overflow: hidden; }
        .score-fill { height: 100%; border-radius: 999px; transform-origin: 0 50%; }
        .score-fill.good { background: var(--project-good); }
        .score-fill.bad { background: var(--project-accent); }
        .score-val { font-family: var(--font-heading); font-weight: 700; color: var(--project-text); text-align: right; }
        .score-note { font-size: 0.85rem; color: var(--project-text-secondary); line-height: 1.6; }
        .score-note strong { color: var(--project-text); }
        .quote-big {
          font-family: var(--font-heading);
          font-size: clamp(1.3rem, 2.6vw, 1.9rem);
          font-style: italic;
          line-height: 1.4;
          color: var(--project-text);
          border-left: 3px solid var(--project-accent);
          padding-left: 1.4rem;
        }
        .quote-big strong { color: var(--project-accent); font-style: normal; }

        /* ================= HMW banner ================= */
        .hero-banner-custom {
          background: var(--project-bg-secondary);
          padding: 4rem 5%;
          border-top: 1px solid var(--project-border);
          border-bottom: 1px solid var(--project-border);
        }
        .hero-banner-inner { display: flex; align-items: center; gap: 3rem; max-width: 900px; margin: 0 auto; }
        .airbnb-logo-wrap {
          flex-shrink: 0;
          width: 80px; height: 80px;
          background: var(--project-accent);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 24px rgba(255, 56, 92, 0.35);
        }
        .airbnb-logo-wrap svg { width: 38px; height: 38px; fill: #fff; }
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

        /* ================= Process ================= */
        .process-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; position: relative; }
        .process-step { position: relative; display: flex; flex-direction: column; }
        .process-step .num {
          font-family: var(--font-heading);
          font-size: 2.6rem; font-weight: 700;
          color: var(--project-accent);
          opacity: 0.35;
          line-height: 1;
          margin-bottom: 0.8rem;
          transition: opacity 0.3s ease;
        }
        .process-step:hover .num { opacity: 1; }
        .process-step .q { font-size: 0.92rem; color: var(--project-text); font-style: italic; line-height: 1.5; margin-bottom: 1rem; }
        .process-step .m { font-size: 0.8rem; color: var(--project-text-secondary); margin-top: auto; }
        .process-step .o { font-size: 0.82rem; font-weight: 600; color: var(--project-good); margin-top: 0.3rem; }
        .process-step .o::before { content: '→ '; }
        .process-arrow {
          position: absolute;
          top: 50%; right: -0.95rem;
          transform: translateY(-50%);
          color: var(--project-accent);
          font-size: 1rem;
          z-index: 2;
        }

        /* ================= Competitive ================= */
        .gaps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
        .gap-card { display: grid; grid-template-columns: 40px 1fr; gap: 0.9rem; align-items: start; padding: 1.3rem; }
        .gap-card .ico {
          width: 40px; height: 40px; border-radius: 10px;
          background: var(--project-accent-dim);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
        }
        .gap-card h3 { font-size: 1rem; margin-bottom: 0.25rem; }
        .gap-card p { font-size: 0.86rem; }
        .view-full {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.75rem 1.2rem;
          border-radius: 999px;
          border: 1px solid var(--project-border);
          background: transparent;
          color: var(--project-text);
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 0.88rem;
          transition: all 0.2s ease;
        }
        .view-full:hover { border-color: var(--project-accent); color: var(--project-accent); }

        /* ================= Interviews ================= */
        .method-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2.5rem; }
        .method-item .big {
          font-family: var(--font-heading);
          font-size: 2.2rem; font-weight: 700;
          color: var(--project-accent);
          line-height: 1;
          display: block;
          margin-bottom: 0.4rem;
        }
        .kit-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 2rem; align-items: start; }
        .kit { display: grid; gap: 0.8rem; }
        .kit-item { border: 1px solid var(--project-border); border-radius: 12px; overflow: hidden; background: var(--project-bg); }
        .kit-head {
          width: 100%;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
          padding: 1.1rem 1.3rem;
          background: transparent; border: none;
          color: var(--project-text);
          font-family: var(--font-heading);
          font-size: 1.02rem; font-weight: 600;
          cursor: pointer;
          text-align: left;
        }
        .kit-head .plus { color: var(--project-accent); font-size: 1.2rem; transition: transform 0.3s ease; }
        .kit-item.open .plus { transform: rotate(45deg); }
        .kit-item.open { border-color: var(--project-accent); }
        .kit-body ol, .kit-body ul { margin: 0; padding: 0 1.3rem 1.2rem 2.6rem; color: var(--project-text-secondary); font-size: 0.9rem; line-height: 1.8; }
        .kit-body li::marker { color: var(--project-accent); font-weight: 700; }
        .docs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
        .doc {
          border: 1px solid var(--project-border);
          border-radius: 10px;
          overflow: hidden;
          cursor: zoom-in;
          background: #fff;
          padding: 0;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .doc:hover { transform: translateY(-4px) rotate(-1deg); border-color: var(--project-accent); }
        .doc img { width: 100%; aspect-ratio: 3 / 4; object-fit: cover; object-position: top; display: block; }
        .doc-cap { font-size: 0.75rem; color: var(--project-text-secondary); margin-top: 0.4rem; text-align: center; }
        .audio-links { display: grid; gap: 0.7rem; margin-top: 1.5rem; }
        .audio-link {
          display: flex; align-items: center; gap: 0.9rem;
          padding: 0.9rem 1.1rem;
          border-radius: 12px;
          border: 1px solid var(--project-border);
          background: var(--project-bg);
          color: var(--project-text);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .audio-link:hover { border-color: var(--project-accent); transform: translateX(4px); }
        .audio-link .play {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--project-accent); color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
        }
        .audio-link small { display: block; color: var(--project-text-secondary); font-size: 0.78rem; }
        .audio-link .arrow { margin-left: auto; color: var(--project-text-secondary); }
        .ethics { margin-top: 1rem; font-size: 0.8rem; color: var(--project-text-secondary); line-height: 1.6; }

        /* ================= Insights ================= */
        .insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .insight-card { display: flex; flex-direction: column; gap: 0.7rem; }
        .insight-top { display: flex; align-items: center; justify-content: space-between; }
        .insight-top .ico { font-size: 1.5rem; }
        .fix-btn {
          margin-top: auto;
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: none; border: none; padding: 0.3rem 0;
          color: var(--project-good);
          font-family: var(--font-body);
          font-size: 0.85rem; font-weight: 600;
          cursor: pointer;
        }
        .fix-btn span { transition: transform 0.2s ease; }
        .fix-btn:hover span { transform: translateX(4px); }

        /* ================= Persona ================= */
        .persona-tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
        .p-tab {
          position: relative;
          padding: 0.6rem 1.1rem;
          border-radius: 999px;
          border: 1px solid var(--project-border);
          background: transparent;
          color: var(--project-text-secondary);
          font-family: var(--font-body);
          font-size: 0.9rem;
          cursor: pointer;
        }
        .p-tab.active { color: #fff; border-color: var(--project-accent); }
        .p-tab .pill-bg { position: absolute; inset: 0; border-radius: 999px; background: var(--project-accent); z-index: 0; }
        .p-tab > span { position: relative; z-index: 1; }
        .persona-card { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem; }
        .persona-id { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.2rem; }
        .persona-avatar {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--project-accent-dim);
          border: 2px solid var(--project-accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
        }
        .persona-id h3 { margin: 0; font-size: 1.3rem; }
        .persona-id span { font-size: 0.85rem; color: var(--project-text-secondary); }
        .persona-block { margin-bottom: 1.2rem; }
        .persona-block p { color: var(--project-text); }
        .persona-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; }
        .persona-list li { display: flex; gap: 0.6rem; font-size: 0.92rem; color: var(--project-text-secondary); line-height: 1.5; }
        .persona-list li::before { content: '→'; color: var(--project-accent); }

        /* ================= Journey ================= */
        .curve-wrap { position: relative; height: 260px; margin-bottom: 1rem; }
        .curve-wrap svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .curve-grid { stroke: var(--project-border); stroke-width: 1; }
        .curve-line { fill: none; stroke: var(--project-accent); stroke-width: 3; stroke-linecap: round; }
        .curve-area { fill: url(#abCurveFill); }
        .drop-zone { fill: var(--project-accent-dim); }
        .curve-point {
          position: absolute;
          width: 52px; height: 52px;
          margin: -26px 0 0 -26px;
          border-radius: 50%;
          background: var(--project-bg-secondary);
          border: 2px solid var(--project-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          z-index: 2;
        }
        .curve-point:hover { transform: scale(1.1); }
        .curve-point.active {
          border-color: var(--project-accent);
          transform: scale(1.2);
          box-shadow: 0 0 0 6px var(--project-accent-dim);
        }
        .drop-flag {
          position: absolute;
          transform: translate(-50%, 0);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          background: var(--project-accent); color: #fff;
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          white-space: nowrap;
          z-index: 3;
        }
        .phase-labels { display: grid; grid-template-columns: repeat(5, 1fr); text-align: center; margin-bottom: 1.5rem; }
        .phase-label {
          background: none; border: none;
          font-family: var(--font-body);
          cursor: pointer;
          padding: 0.4rem;
          color: var(--project-text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
        }
        .phase-label small { display: block; font-weight: 400; font-size: 0.75rem; }
        .phase-label.active { color: var(--project-text); border-bottom-color: var(--project-accent); }
        .phase-detail { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .phase-detail .card { padding: 1.3rem; }
        .phase-detail p { color: var(--project-text); }
        .journey-foot { margin-top: 2rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; }

        /* ================= Walkthrough ================= */
        .wt-tabs {
          display: flex; gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 2rem;
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
        .wt-tab.active { color: #fff; border-color: var(--project-accent); }
        .wt-tab .pill-bg { position: absolute; inset: 0; border-radius: 999px; background: var(--project-accent); z-index: 0; }
        .wt-tab > span { position: relative; z-index: 1; }
        .wt-tab .k {
          width: 22px; height: 22px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 700;
          border: 1px solid currentColor;
        }
        .wt-body { display: grid; grid-template-columns: 1fr 1.1fr; gap: 3rem; align-items: center; }
        .stage {
          position: relative;
          border-radius: 20px;
          padding: 2.5rem 1rem;
          background: radial-gradient(circle at 50% 30%, rgba(255, 56, 92, 0.35), rgba(255, 56, 92, 0.05) 65%);
          display: flex; justify-content: center;
          min-height: 620px;
        }
        .phone { position: relative; width: min(300px, 70vw); line-height: 0; }
        .phone-crop {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16% / 8%;
          box-shadow: 0 30px 50px rgba(0, 0, 0, 0.45);
        }
        .phone-crop img { position: absolute; max-width: none; height: auto; display: block; }
        .stage .expand-btn { position: absolute; top: 0.8rem; right: 0.8rem; }
        .hotspot {
          position: absolute;
          width: 26px; height: 26px;
          margin: -13px 0 0 -13px;
          border-radius: 50%;
          border: 2px solid #fff;
          background: var(--project-accent);
          color: #fff;
          font-weight: 700;
          font-size: 0.72rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
          z-index: 2;
          transition: transform 0.2s ease;
          line-height: 1;
        }
        .hotspot:hover, .hotspot.is-active { transform: scale(1.2); }
        .hotspot.is-active { z-index: 5; }
        .hotspot-ring {
          position: absolute; inset: -7px;
          border-radius: 50%;
          border: 2px solid var(--project-accent);
          animation: pulse 2s ease-out infinite;
          pointer-events: none;
        }
        @keyframes pulse { 0% { transform: scale(0.7); opacity: 0.9; } 100% { transform: scale(1.7); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .hotspot-ring { animation: none; opacity: 0.5; } }
        .hotspot-tip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 12px);
          transform: translateX(-50%) translateY(4px);
          width: max-content;
          max-width: 200px;
          padding: 0.55rem 0.75rem;
          border-radius: 8px;
          background: #fff;
          color: #111;
          font-size: 0.78rem;
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
        .hotspot.tip-left.is-active .hotspot-tip, .hotspot.tip-right.is-active .hotspot-tip { transform: translateY(0); }
        .wt-side { display: flex; flex-direction: column; gap: 1rem; }
        .wt-side .card { padding: 1.3rem; }
        .insight-quote { font-family: var(--font-heading); font-size: 1.15rem; font-style: italic; color: var(--project-text) !important; line-height: 1.45; }
        .wt-notes { display: grid; gap: 0.4rem; }
        .wt-note {
          display: grid; grid-template-columns: 26px 1fr; gap: 0.7rem;
          align-items: start;
          text-align: left;
          padding: 0.6rem 0.8rem;
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
        .wt-note.active { border-color: var(--project-accent); background: var(--project-accent-dim); color: var(--project-text); }
        .wt-note.active .k { background: var(--project-accent); color: #fff; }
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
        .all-screens { margin-top: 3.5rem; }

        /* ================= Artifact frame ================= */
        .artifact-box-simple { background: var(--project-bg-secondary); border: 1px solid var(--project-border); border-radius: 12px; overflow: hidden; }
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
        .artifact-title { font-size: 0.8rem; font-weight: 600; color: var(--project-text-secondary); letter-spacing: 0.03em; margin-left: 0.5rem; }
        .expand-btn {
          margin-left: auto;
          background: none; border: none;
          color: var(--project-text-secondary);
          cursor: pointer;
          font-size: 0.85rem;
          padding: 0.3rem 0.5rem;
          border-radius: 6px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .expand-btn:hover { color: var(--project-accent); background: var(--project-accent-dim); }
        .artifact-body { line-height: 0; background: var(--project-bg); cursor: zoom-in; }
        .artifact-body img { width: 100%; height: auto; display: block; }

        /* ================= Outcome ================= */
        .stats-grid-custom { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; margin-bottom: 2.5rem; }
        .stat-card-custom { text-align: center; padding: 2rem 1.2rem; }
        .stat-value-custom {
          font-family: var(--font-heading);
          font-size: 2.8rem; font-weight: 700;
          color: var(--project-accent);
          display: block; line-height: 1;
          margin-bottom: 0.6rem;
        }
        .stat-label-custom { font-size: 0.88rem; color: var(--project-text-secondary); line-height: 1.4; }
        .next-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }

        /* ================= Reflection ================= */
        .takeaways-custom {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--project-border);
          border-radius: 14px;
          overflow: hidden;
        }
        .takeaway-custom { background: var(--project-bg-secondary); padding: 1.8rem; display: grid; grid-template-columns: auto 1fr; gap: 1.2rem; transition: background 0.3s ease; }
        .takeaway-custom:hover { background: var(--project-bg); }
        .takeaway-letter { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; color: var(--project-accent); line-height: 1; }
        .takeaway-custom h4 { font-weight: 600; font-size: 1rem; margin-bottom: 0.4rem; color: var(--project-text); }
        .takeaway-custom p { font-size: 0.9rem; color: var(--project-text-secondary); line-height: 1.65; }
        .hypothesis-box {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-accent);
          padding: 3rem 4%;
          border-radius: 14px;
          margin-top: 3rem;
        }
        .hypothesis-box p {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          font-weight: 500;
          font-style: italic;
          line-height: 1.45;
          max-width: 52ch;
          color: var(--project-text);
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
          overflow: auto;
        }
        .lightbox img { max-width: 100%; max-height: 92vh; border-radius: 10px; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .lightbox-close { position: absolute; top: 1.2rem; right: 1.5rem; background: none; border: none; color: #fff; font-size: 1.6rem; cursor: pointer; }

        /* ================= Responsive ================= */
        @media (max-width: 1024px) {
          .overview-grid, .stats-grid-custom, .process-row, .method-strip { grid-template-columns: repeat(2, 1fr); }
          .process-arrow { display: none; }
          .problem-grid, .kit-grid, .persona-card, .wt-body { grid-template-columns: 1fr; }
          .gaps-grid, .insights-grid { grid-template-columns: repeat(2, 1fr); }
          .next-grid { grid-template-columns: 1fr; }
          .stage { min-height: 0; }
        }
        @media (max-width: 768px) {
          .section-custom, .section-full-custom { padding: 4rem 5%; }
          .hero-image-full { height: 45vh; }
          .hero-content-wrapper { padding: 2rem 5% 1.5rem; }
          .overview-grid, .stats-grid-custom, .gaps-grid, .insights-grid, .phase-detail, .takeaways-custom { grid-template-columns: 1fr; }
          .process-row { grid-template-columns: 1fr; }
          .hero-banner-inner { flex-direction: column; text-align: center; gap: 1.5rem; }
          .score-row { grid-template-columns: 90px 1fr 44px; }
          .curve-wrap { height: 200px; }
          .curve-point { width: 40px; height: 40px; margin: -20px 0 0 -20px; font-size: 1.1rem; }
          .phase-label { font-size: 0.68rem; padding: 0.3rem 0.1rem; }
          .phase-label small { display: none; }
          .hotspot-tip { display: none; }
          .hotspot { width: 22px; height: 22px; margin: -11px 0 0 -11px; font-size: 0.66rem; }
          .takeaway-custom { grid-template-columns: 1fr; gap: 0.5rem; }
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
        <img src={airbnbHeroImg} alt="Airbnb booking journey redesign" />
      </motion.div>

      <section className="project-hero-custom">
        <div className="hero-content-wrapper">
          <Reveal>
            <h1>Rebuilding trust in <em>Airbnb’s</em> booking journey</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="hero-sub">
              New travellers were leaving before they booked. Not because Airbnb was hard to use, but because
              they could not trust what they saw. Here is how we found that out, and what I designed to fix it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hero-meta">
              <div className="meta-item"><label>My Role</label><p>UX Researcher & Designer, UI Designer</p></div>
              <div className="meta-item"><label>Team</label><p>Academic project, 5 people</p></div>
              <div className="meta-item"><label>Methods</label><p>Competitive analysis, interviews, personas, journey map</p></div>
              <div className="meta-item"><label>Target users</label><p>Travellers 18–40 booking group or first trips</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section id="ab-overview" className="section-custom" style={{ paddingTop: '3rem' }}>
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
      <div id="ab-problem" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>01 · The Problem</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">People explored Airbnb, then booked elsewhere</h2></Reveal>
          <Reveal>
            <p className="section-lead">
              The brief: make Airbnb the first choice for authentic travel. Early benchmarking showed users were
              browsing but not booking, and that Airbnb lagged behind competitors on the basics.
            </p>
          </Reveal>
          <div className="problem-grid">
            <Reveal>
              <div className="card score-card">
                <span className="eyebrow muted">Usability heuristics score</span>
                {[
                  { name: 'Booking.com', val: 4.5, cls: 'good' },
                  { name: 'Airbnb', val: 3, cls: 'bad' },
                ].map((s, i) => (
                  <div key={s.name} className="score-row">
                    <span className="name">{s.name}</span>
                    <div className="score-track">
                      <motion.div
                        className={`score-fill ${s.cls}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: s.val / 5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2 + i * 0.2, ease: EASE }}
                      />
                    </div>
                    <span className="score-val"><CountUp to={s.val} decimals={1} />/5</span>
                  </div>
                ))}
                <p className="score-note">The gap was not visual polish. It was <strong>error prevention, feedback and flexibility</strong>.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="quote-big">
                Users weren’t failing because Airbnb was hard to use. <strong>They couldn’t trust what they were seeing.</strong>
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ================= HMW ================= */}
      <div className="hero-banner-custom">
        <Reveal className="hero-banner-inner">
          <div className="airbnb-logo-wrap" aria-hidden="true">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 1C9.37 1 4 6.37 4 13c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12zm0 16.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />
            </svg>
          </div>
          <p className="hero-banner-text">
            How might we give a first-time traveller <strong>enough confidence to book</strong>, with proof rather than promises?
          </p>
        </Reveal>
      </div>

      {/* ================= PROCESS ================= */}
      <section id="ab-process" className="section-custom">
        <Reveal><SectionLabel>02 · Process</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Research first, design second</h2></Reveal>
        <Reveal><p className="section-lead">Every method answered <strong>one specific question</strong>, and each answer shaped the next step.</p></Reveal>
        <div className="process-row">
          {PROCESS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.12} className="card hover process-step">
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p className="q">“{s.q}”</p>
              <span className="m">{s.method}</span>
              <span className="o">{s.output}</span>
              {i < PROCESS.length - 1 && <span className="process-arrow" aria-hidden="true">▶</span>}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= COMPETITIVE ================= */}
      <div id="ab-competitive" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>03 · Competitive Analysis</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">What VRBO and Booking.com do that Airbnb doesn’t</h2></Reveal>
          <Reveal><p className="section-lead">We compared value proposition, business goals, key tasks and Nielsen’s heuristics. <strong>Six gaps</strong> stood out.</p></Reveal>
          <div className="gaps-grid">
            {GAPS.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 0.08}>
                <div className="card hover gap-card" style={{ height: '100%' }}>
                  <span className="ico">{g.icon}</span>
                  <div>
                    <h3>{g.title}</h3>
                    <p>{g.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <button className="view-full" onClick={() => setLightbox({ src: competitiveAnalysisImg, alt: 'Full competitive analysis' })}>
              <i className="fas fa-table"></i> View the full competitive analysis
            </button>
          </Reveal>
        </div>
      </div>

      {/* ================= INTERVIEWS ================= */}
      <section id="ab-interviews" className="section-custom">
        <Reveal><SectionLabel>04 · User Interviews</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Ten conversations about the last trip they booked</h2></Reveal>
        <Reveal><p className="section-lead">Each team member ran interviews with a shared guide. Asking people to <strong>sketch their ideal booking process</strong> revealed gaps they couldn’t put into words.</p></Reveal>

        <div className="method-strip">
          {[
            { big: 10, t: 'participants' },
            { big: 5, t: 'screening criteria' },
            { big: 8, t: 'guide questions' },
            { big: 1, t: 'sketching exercise' },
          ].map((m, i) => (
            <Reveal key={m.t} delay={i * 0.08} className="card method-item">
              <span className="big"><CountUp to={m.big} /></span>
              <p>{m.t}</p>
            </Reveal>
          ))}
        </div>

        <div className="kit-grid">
          <Reveal>
            <div className="kit">
              {[
                { key: 'screener', title: 'Who we talked to', list: SCREENER, ordered: false },
                { key: 'guide', title: 'What we asked', list: GUIDE, ordered: true },
              ].map((k) => {
                const open = openKit === k.key;
                const ListTag = k.ordered ? 'ol' : 'ul';
                return (
                  <div key={k.key} className={`kit-item ${open ? 'open' : ''}`}>
                    <button className="kit-head" onClick={() => setOpenKit(open ? null : k.key)} aria-expanded={open}>
                      {k.title}
                      <span className="plus">+</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          className="kit-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          style={{ overflow: 'hidden' }}
                        >
                          <ListTag>{k.list.map((q) => <li key={q}>{q}</li>)}</ListTag>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <p className="ethics">Participants gave informed consent and could stop at any time.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="eyebrow muted">Research documents</span>
            <div className="docs">
              {[
                { src: screenerImg, cap: 'Screener' },
                { src: discussionGuide1Img, cap: 'Guide, part 1' },
                { src: discussionGuide2Img, cap: 'Guide, part 2' },
              ].map((d) => (
                <div key={d.cap}>
                  <button className="doc" onClick={() => setLightbox({ src: d.src, alt: d.cap })} aria-label={`Open ${d.cap}`}>
                    <img src={d.src} alt={d.cap} />
                  </button>
                  <div className="doc-cap">{d.cap}</div>
                </div>
              ))}
            </div>
            <div className="audio-links">
              {INTERVIEW_LINKS.map((l) => (
                <a key={l.name} className="audio-link" href={l.url} target="_blank" rel="noopener noreferrer">
                  <span className="play">▶</span>
                  <span>
                    {l.name}
                    <small>{l.note} · listen to the recording</small>
                  </span>
                  <span className="arrow">↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= INSIGHTS ================= */}
      <div id="ab-insights" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>05 · Insights</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">It wasn’t a navigation problem. It was a trust problem.</h2></Reveal>
          <Reveal><p className="section-lead"><strong>New users and group bookers</strong> struggled most, at the moment they had to commit. Each insight links to the screen that answers it.</p></Reveal>
          <div className="insights-grid">
            {INSIGHTS.map((it, i) => (
              <Reveal key={it.title} delay={(i % 3) * 0.08}>
                <div className="card hover insight-card" style={{ height: '100%' }}>
                  <div className="insight-top">
                    <span className="chip accent">{it.phase}</span>
                  </div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                  <button className="fix-btn" onClick={() => jumpToFix(it.step)}>
                    See the design <span>→</span>
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PERSONA ================= */}
      <section id="ab-persona" className="section-custom">
        <Reveal><SectionLabel>06 · Personas</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">The group planner who pays for everyone</h2></Reveal>
        <Reveal><p className="section-lead">Both personas book for a group, so <strong>one bad listing lets down the whole trip</strong>.</p></Reveal>
        <Reveal>
          <div className="persona-tabs" role="tablist">
            {PERSONAS.map((x, i) => (
              <button key={x.name} role="tab" aria-selected={persona === i} className={`p-tab ${persona === i ? 'active' : ''}`} onClick={() => setPersona(i)}>
                {persona === i && <motion.span layoutId="ab-persona-pill" className="pill-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span>{x.name}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            className="card persona-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div>
              <div className="persona-id">
                <span className="persona-avatar">{p.icon}</span>
                <div>
                  <h3>{p.name}</h3>
                  <span>{p.meta}</span>
                </div>
              </div>
              <div className="persona-block">
                <span className="eyebrow muted">About</span>
                <p>{p.bio}</p>
              </div>
              <div className="persona-block" style={{ marginBottom: 0 }}>
                <span className="eyebrow muted">Scenario</span>
                <p>{p.scenario}</p>
              </div>
            </div>
            <div>
              <div className="persona-block">
                <span className="eyebrow">Goals</span>
                <ul className="persona-list">{p.goals.map((g) => <li key={g}>{g}</li>)}</ul>
              </div>
              <div className="persona-block" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Unmet needs</span>
                <div className="chips">{p.needs.map((n) => <span key={n} className="chip accent">{n}</span>)}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ================= JOURNEY ================= */}
      <div id="ab-journey" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>07 · Journey Map</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">Confidence collapses at the Decision stage</h2></Reveal>
          <Reveal><p className="section-lead">Users don’t drop off at random. They leave when they need the most confidence and get the least support. <strong>Tap a stage</strong> to explore it.</p></Reveal>

          <Reveal>
            <div className="curve-wrap">
              <svg viewBox="0 0 1000 240" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="abCurveFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff385c" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ff385c" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect className="drop-zone" x="400" y="0" width="200" height="240" rx="12" />
                {[60, 125, 190].map((y) => (
                  <line key={y} className="curve-grid" x1="0" x2="1000" y1={y} y2={y} vectorEffect="non-scaling-stroke" />
                ))}
                <motion.path
                  className="curve-area"
                  d={`${curve} L 900 240 L 100 240 Z`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <motion.path
                  className="curve-line"
                  d={curve}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: EASE }}
                />
              </svg>
              <span className="drop-flag" style={{ left: '50%', top: '4px' }}>Users leave here</span>
              {pts.map((pt, i) => (
                <button
                  key={JOURNEY[i].phase}
                  className={`curve-point ${phase === i ? 'active' : ''}`}
                  style={{ left: `${pt.x / 10}%`, top: `${(pt.y / 240) * 100}%` }}
                  onClick={() => setPhase(i)}
                  aria-label={`${JOURNEY[i].phase}: ${JOURNEY[i].feel}`}
                >
                  {JOURNEY[i].emoji}
                </button>
              ))}
            </div>
            <div className="phase-labels" role="tablist">
              {JOURNEY.map((s, i) => (
                <button key={s.phase} role="tab" aria-selected={phase === i} className={`phase-label ${phase === i ? 'active' : ''}`} onClick={() => setPhase(i)}>
                  {s.phase}
                  <small>{s.feel}</small>
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              className="phase-detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="card">
                <span className="eyebrow muted">What they do</span>
                <p>{j.doing}</p>
              </div>
              <div className="card" style={{ borderColor: 'var(--project-accent)' }}>
                <span className="eyebrow">Pain point</span>
                <p>{j.pain}</p>
              </div>
              <div className="card" style={{ borderColor: 'var(--project-good)' }}>
                <span className="eyebrow good">Opportunity</span>
                <p>{j.opp}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="journey-foot">
            <p className="quote-big" style={{ fontSize: '1.15rem', maxWidth: '60ch' }}>
              The platform asks for commitment <strong>before it has earned trust.</strong>
            </p>
            <button className="view-full" onClick={() => setLightbox({ src: journeyMapImg, alt: 'Full journey map' })}>
              <i className="fas fa-route"></i> View the full journey map
            </button>
          </div>
        </div>
      </div>

      {/* ================= SOLUTION WALKTHROUGH ================= */}
      <section id="ab-solution" className="section-custom">
        <Reveal><SectionLabel>08 · The Solution</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">Earning trust before asking for it</h2></Reveal>
        <Reveal><p className="section-lead">Every screen answers a research insight. Follow the path from <strong>finding a stay</strong> to <strong>trusting it</strong>, and tap the numbers for details.</p></Reveal>

        <Reveal>
          <div className="wt-tabs" role="tablist">
            {WALKTHROUGH.map((w, i) => (
              <button key={w.label} role="tab" aria-selected={step === i} className={`wt-tab ${step === i ? 'active' : ''}`} onClick={() => goStep(i)}>
                {step === i && <motion.span layoutId="ab-wt-pill" className="pill-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="k">{i + 1}</span>
                <span>{w.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="wt-body">
          <div className="stage">
            <button className="expand-btn" onClick={() => setLightbox({ src: airbnbMockupAllImg, alt: 'All Airbnb redesign screens' })} aria-label="See all screens">
              <i className="fas fa-expand"></i>
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="phone"
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -20, rotate: 2 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <PhoneCrop pos={current.pos} alt={`Airbnb redesign: ${current.label}`} />
                {current.notes.map((n, i) => {
                  const tipClass = n.y < 22 ? 'tip-below' : '';
                  const sideClass = n.x > 65 ? 'tip-left' : n.x < 30 ? 'tip-right' : '';
                  return (
                    <motion.button
                      key={i}
                      className={`hotspot ${tipClass} ${sideClass} ${activeNote === i ? 'is-active' : ''}`}
                      style={{ left: `${n.x}%`, top: `${n.y}%` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300, damping: 18 }}
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

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="wt-side"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="chips">
                <span className="chip accent">Fixes: {current.phase} stage</span>
                <span className="chip">Screen {step + 1} of {WALKTHROUGH.length}</span>
              </div>
              <div className="card">
                <span className="eyebrow muted">What users told us</span>
                <p className="insight-quote">{current.insight}</p>
              </div>
              <div className="card" style={{ borderColor: 'var(--project-good)' }}>
                <span className="eyebrow good">Design decision</span>
                <p style={{ color: 'var(--project-text)' }}>{current.decision}</p>
              </div>
              <div className="wt-notes">
                {current.notes.map((n, i) => (
                  <button key={i} className={`wt-note ${activeNote === i ? 'active' : ''}`} onMouseEnter={() => setActiveNote(i)} onClick={() => setActiveNote(i)}>
                    <span className="k">{i + 1}</span>
                    <span>{n.t}</span>
                  </button>
                ))}
              </div>
              <div className="wt-nav">
                <button onClick={() => goStep(step - 1)} disabled={step === 0}>← Previous</button>
                <button onClick={() => goStep(step + 1)} disabled={step === WALKTHROUGH.length - 1}>Next screen →</button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className="all-screens">
          <h3 className="sub-heading">All screens together</h3>
          <div className="artifact-box-simple">
            <FrameHeader title="Hi-fi mobile screens" onExpand={() => setLightbox({ src: airbnbMockupAllImg, alt: 'All Airbnb redesign screens' })} />
            <div className="artifact-body" onClick={() => setLightbox({ src: airbnbMockupAllImg, alt: 'All Airbnb redesign screens' })}>
              <img src={airbnbMockupAllImg} alt="All Airbnb redesign screens" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= OUTCOME ================= */}
      <div id="ab-outcome" className="section-full-custom">
        <div className="inner">
          <Reveal><SectionLabel>09 · Outcome</SectionLabel></Reveal>
          <Reveal><h2 className="section-heading">From research to a trust system</h2></Reveal>
          <Reveal><p className="section-lead">A research-led concept: every one of the seven interventions traces back to a real user insight.</p></Reveal>
          <div className="stats-grid-custom">
            {OUTCOME.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="card hover stat-card-custom" style={{ height: '100%' }}>
                  <span className="stat-value-custom"><CountUp to={s.to} suffix={s.suffix} /></span>
                  <span className="stat-label-custom">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><h3 className="sub-heading">What I would do next</h3></Reveal>
          <div className="next-grid">
            {NEXT_STEPS.map((n, i) => (
              <Reveal key={n.t} delay={i * 0.08}>
                <div className="card hover" style={{ height: '100%' }}>
                  <h3>{n.t}</h3>
                  <p>{n.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ================= REFLECTION ================= */}
      <section id="ab-reflection" className="section-custom">
        <Reveal><SectionLabel>10 · Reflection</SectionLabel></Reveal>
        <Reveal><h2 className="section-heading">What I learned</h2></Reveal>
        <Reveal><p className="section-lead" style={{ maxWidth: '760px' }}>The problem people describe is rarely the real one. Users said they could not find what they wanted, but they found options just fine. They could not trust them enough to book. That taught me trust is a system, not a feature: badges, guest photos, comparison and photo dates only work when they work together.</p></Reveal>
      </section>

      {/* ================= NAVIGATION ================= */}
      <div className="project-navigation" style={{ padding: '0 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={handleBackToProjects} className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          <span>Back to Projects</span>
        </button>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/projects/4" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            <span>Previous: SpendSmart</span>
          </Link>
          <Link to="/projects/5" className="btn btn-primary">
            <span>Next: Locus</span>
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

export default AirbnbProject;