export const DESIGNER = {
  name: 'Rutul Manani',
  role: 'UX/UI Designer & Front-End Developer',
  tagline: 'I turn complex problems into human-centered digital experiences.',
  location: 'Toronto, Canada',
  email: 'rutulmanani18@gmail.com',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rutulmanani/' },
    { label: 'Behance', href: 'https://www.behance.net/rutulmanandb9b' },
    { label: 'GitHub', href: 'https://github.com/RutulManani' },
  ],
};

export const TESTIMONIALS = [
  {
    quote:
      'Rutul was essential in shaping our AI-powered home screen experience at Vosyn. He brings strong visual clarity, usability, and innovation to every project. He is Collaborative, reliable, and forward-thinking and I would gladly recommend him to any team.',
    name: 'LJ Huang',
    role: 'Associate Product Director',
    company: 'Vosyn',
    initials: 'LJ',
  },
  {
    quote:
      'He consistently delivered high-quality work on time. His attention to detail and clever problem-solving stood out—he always went above and beyond, offering multiple creative directions. His proactive mindset made a significant impact on our projects.',
    name: 'Asma Bessayadia',
    role: 'Team Supervisor',
    company: 'Vosyn',
    initials: 'AB',
  },
  {
    quote:
      'Rutul worked with us as a UI/UX Designer for 20 months. He is passionate, creative, and diligent, with strong communication, time management, and all required UX skills. Always ready to help and actively contributes in team meetings. I wholeheartedly recommend him.',
    name: 'Maahir Shah',
    role: 'Director',
    company: 'Clarion Insurance Broking Services',
    initials: 'MS',
  },
  {
    quote:
      'Rutul consistently impressed me with his dedication, creativity, and passion for user-centred design. He has strong command of Figma, Adobe Creative Suite, and Solidworks, and communicates effectively to match client needs. I enthusiastically recommend him as a top-tier UI/UX designer.',
    name: 'Prof. Mukhtiyar Hussein Shaikh',
    role: 'Head of Department, Product Design',
    company: 'GLS Institute of Design',
    initials: 'MS',
  },
  {
    quote:
      'He is the designer other designers ask for feedback. His critiques are sharp, kind, and always make the work better. The research work Rutul did for our booking flow in the academic project uncovered issues we had been missing for years.',
    name: 'Priyank Shah',
    role: 'Teammate',
    company: 'Humber College',
    initials: 'PS',
  },
];

/* ============================================================
   JOURNEY
   ============================================================ */

export const JOURNEY = [
  {
    year: '2012',
    title: 'The First Sketch',
    place: 'Ahmedabad, India',
    text: 'A young boy started sketching cars on the backs of his notebooks and pulling apart small toys to see what was inside. Curiosity, before any word for design existed.',
  },
  {
    year: '2018',
    title: 'The Industrial Design Foundation',
    place: 'GLS University, Ahmedabad',
    text: 'Joined GLS University to learn design in real terms — thinking in systems, materials, and human factors. Discovered that good design solves problems before they become visible.',
  },
  {
    year: '2020',
    title: 'The Healthcare Challenge',
    place: 'Pune, India',
    text: 'Designed Docmigo, a hospital management app for Indian clinics, as a graduation project. Learned that designing for healthcare means designing for errors that become errors in care.',
  },
  {
    year: '2022',
    title: 'The First Professional Role',
    place: 'Clarion Insurance, India',
    text: 'Joined the insurance industry as a UX designer and later grew into a UX/UI Lead over two years. Learned that complexity is often a symptom of unclear thinking, not inherent difficulty.',
  },
  {
    year: '2024',
    title: 'The Pivot to Digital',
    place: 'Humber College, Toronto',
    text: 'Pursued a post-graduate program in UX Design — sharpening research, interaction, and systems thinking for a North American product context, and bridging craft with technical intent.',
  },
  {
    year: '2025',
    title: 'The Bridge to Code',
    place: 'Humber College, Toronto',
    text: 'Continued into web development to learn how the other half builds. Now I can prototype in code, speak the engineers\' language, and design systems that ship the way they were intended.',
  },
  {
    year: '2026',
    title: 'The AI Era',
    place: 'Toronto & Everywhere',
    text: 'Multiple internships across Vosyn, Workland, and PM Accelerator — designing for AI, recruiting, and SaaS platforms. Now I bridge design and development to craft end-to-end experiences that are as functional as they are beautiful.',
  },
];

/* ============================================================
   PROJECTS — the landing page's Work section renders these
   in array order. Add or reorder to change what appears.
   ============================================================ */

export const PROJECTS = [
  {
    id: '4',
    title: 'SpendSmart',
    category: 'Mood-aware gamified expense tracker for students.',
    image: require('../assets/images/SpendSmart.png'),
    tags: ['Full Stack', 'MERN', 'Gamification'],
    stat: '95% task completion',
    link: '/projects/4',
  },
  {
    id: '3',
    title: 'Docmigo Hospital App',
    category: 'Streamlined hospital operations with a communication app',
    image: require('../assets/images/Docmigo.png'),
    tags: ['UX Research', 'Stakeholder Interviews', 'Healthcare'],
    stat: '91% problem-solution fit',
    link: '/projects/3',
  },
  {
    id: '1',
    title: 'Airbnb UX Research',
    category: 'Improved booking experience through comprehensive UX research',
    image: require('../assets/images/Airbnb.png'),
    tags: ['User Interviews', 'Journey Mapping', 'Competitive Analysis'],
    stat: '10 user interviews',
    link: '/projects/1',
  },
  {
    id: '2',
    title: 'Byblos Restaurant',
    category: 'Redesigned ordering experience with seamless online system',
    image: require('../assets/images/Byblos.png'),
    tags: ['Wireframing', 'Rapid Prototyping', 'User Testing'],
    stat: '2.1× conversion lift',
    link: '/projects/2',
  },
  {
    id: '5',
    title: 'Locus AI',
    category: 'Memory layer that turns scattered team decisions into a searchable record',
    image: require('../assets/images/Locus.png'),
    tags: ['AI', '0→1 Product', 'Design System'],
    stat: '17/25 early-access signups',
    link: '/projects/5',
  },
];

export const PRINCIPLES = [
  {
    title: 'Research is a posture',
    text: 'Not a phase. I stay curious the whole way through—in interviews, in prototypes, in the fifth round of revisions.',
  },
  {
    title: 'Clarity is kindness',
    text: 'Every removed element is a small act of respect for someone\'s attention. I design toward less, relentlessly.',
  },
  {
    title: 'Motion has meaning',
    text: 'Animation isn\'t decoration. It teaches the system\'s logic and makes the invisible relationships visible.',
  },
  {
    title: 'Errors in the interface become errors in care',
    text: 'Every design pattern must be evaluated for failure mode, not just success state. This is especially true in healthcare.',
  },
];

/* ============================================================
   SKILL BOARD DATA
   ============================================================ */

export const SKILL_CATEGORIES = ['Research', 'Craft', 'Systems'];

export const SKILL_BOARD_ITEMS = [
  { id: 'interviews',     name: 'User interviews',    category: 'Research', note: '200+ hours listening' },
  { id: 'interaction',    name: 'Interaction design', category: 'Craft',    note: 'Flows that feel obvious' },
  { id: 'design-systems', name: 'Design systems',     category: 'Systems',  note: 'Built 3 from scratch' },
  { id: 'usability',      name: 'Usability testing',  category: 'Research', note: 'Moderated & remote' },
  { id: 'prototyping',    name: 'Prototyping',        category: 'Craft',    note: 'Figma, Framer, code' },
  { id: 'a11y',           name: 'Accessibility',      category: 'Systems',  note: 'WCAG 2.2 AA by default' },
  { id: 'journeys',       name: 'Journey mapping',    category: 'Research', note: 'Finding the real gaps' },
  { id: 'visual',         name: 'Visual design',      category: 'Craft',    note: 'Type-led, calm UI' },
  { id: 'tokens',         name: 'Design tokens',      category: 'Systems',  note: 'One source of truth' },
  { id: 'synthesis',      name: 'Synthesis',          category: 'Research', note: 'Mess into insight' },
  { id: 'motion',         name: 'Motion',             category: 'Craft',    note: 'Purposeful, never loud' },
  { id: 'handoff',        name: 'Dev handoff',        category: 'Systems',  note: 'Engineers say thanks' },
];

export const ABOUT_STATS = [
  { value: '4+', label: 'years designing' },
  { value: '20+', label: 'products shipped' },
  { value: '3',  label: 'design systems built' },
];

/* ============================================================
   LEGACY SKILL STRINGS — Work section marquee
   ============================================================ */

export const SKILLS = [
  'UX Research',
  'Figma',
  'Usability Testing',
  'User Flows',
  'Wireframing',
  'Prototyping',
  'Product Design',
  'User Interviews',
  'Information Architecture',
  'Interaction Design',
  'Design Systems',
  'AI-Assisted Design',
  'Accessibility (WCAG 2.1 AA)',
  'DesignOps',
  'Service Design',
  'Conversational UI',
  'Cross-Platform Design',
  'Design Thinking',
  'Micro-interactions',
  'Heuristic Evaluation',
  'Data Synthesis',
];