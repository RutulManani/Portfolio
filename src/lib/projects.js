/* ============================================================
   Project data for the Work section's x-ray card stack.
   Shaped like the reference: id, name, kind, year, role,
   summary, metric, tags, image, alt.
   ============================================================ */

export const projects = [
  {
    id: 'spendsmart',
    name: 'SpendSmart',
    kind: 'Web · Fintech · Full-stack',
    year: '2025',
    role: 'Full-stack developer & UX/UI designer',
    summary:
      'A mood-aware, gamified expense tracker for students. Linked every purchase to an emotional state, then used daily challenges and badges to turn mindful spending into something students actually wanted to open.',
    metric: { value: '95%', label: 'task completion across usability tests' },
    tags: ['Full Stack', 'MERN', 'Gamification'],
    image: require('../assets/images/SpendSmart.png'),
    alt: 'SpendSmart dashboard with balance, mood-tagged expenses and a daily challenge card',
    link: '/projects/4',
  },
  {
    id: 'docmigo',
    name: 'Docmigo',
    kind: 'Mobile · Healthcare',
    year: '2024',
    role: 'UX researcher & designer, graphic designer',
    summary:
      'A hospital management app for small and mid-sized Indian clinics. Designed two clearly separated flows — one for doctors, one for receptionists — so a single mis-tap never touched a prescription.',
    metric: { value: '91%', label: 'problem-solution fit from clinic surveys' },
    tags: ['UX Research', 'Stakeholder Interviews', 'Healthcare'],
    image: require('../assets/images/Docmigo.png'),
    alt: 'Docmigo mobile screens showing appointment queue, patient profile and e-prescription',
    link: '/projects/3',
  },
  {
    id: 'airbnb',
    name: 'Airbnb UX Research',
    kind: 'Web · Travel · Research',
    year: '2023',
    role: 'UX researcher & UI designer',
    summary:
      'Rebuilt trust in the Airbnb booking journey. Ten user interviews and a full journey map revealed the real problem wasn’t navigation — it was confidence. Solutions targeted the decision phase where users were leaving.',
    metric: { value: '10', label: 'user interviews + full journey map' },
    tags: ['User Interviews', 'Journey Mapping', 'Competitive Analysis'],
    image: require('../assets/images/Airbnb.png'),
    alt: 'Airbnb research artefacts including journey map, competitive analysis and verified listing mockups',
    link: '/projects/1',
  },
  {
    id: 'byblos',
    name: 'Byblos Restaurant',
    kind: 'Web & Mobile · Hospitality',
    year: '2022',
    role: 'UI/UX designer',
    summary:
      'Turned a static menu board into a full ordering platform. Added delivery and pickup, redesigned the menu hierarchy, and streamlined checkout into one forgiving flow that works on a phone at lunchtime.',
    metric: { value: '2.1×', label: 'conversion lift after redesign' },
    tags: ['Wireframing', 'Rapid Prototyping', 'User Testing'],
    image: require('../assets/images/Byblos.png'),
    alt: 'Byblos restaurant web and mobile mockups with menu categories, item cards and checkout',
    link: '/projects/2',
  },
  {
    id: 'locus',
    name: 'Locus AI',
    kind: 'Web · AI · 0 → 1',
    year: '2026',
    role: 'UX/UI designer',
    summary:
      'A memory layer for teams: it turns scattered Slack, Notion and Gmail threads into a searchable record of what was actually decided. Designed the three surfaces people live in and the system that holds them together.',
    metric: { value: '17/25', label: 'interviewees asked to join early access' },
    tags: ['AI', '0 → 1 Product', 'Design System'],
    image: require('../assets/images/Locus.png'),
    alt: 'Locus AI decision log with cited rows, confidence scores and a weekly pulse summary',
    link: '/projects/5',
  },
    {
    id: 'veritas',
    name: 'Untangling Veritas',
    kind: 'Web · Insurance · Information Architecture',
    year: '2022',
    role: 'UX/UI design lead',
    summary:
      'I mapped an insurance broker’s entire website with the people who ran it, then cut it down to the structure that is live today.',
    metric: { value: '25 → 11', label: 'steps from landing to payment' },
    tags: ['Information Architecture', 'UX Strategy', 'Web Design', 'Stakeholder Mapping'],
    image: require('../assets/images/veritas-cover.jpg'),
    alt: 'Untangling Veritas cover: a tangled site map simplified into a clean structure',
    link: '/projects/6',
  }
];