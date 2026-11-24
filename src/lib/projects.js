/* ============================================================
   Projects on the home page (Selected work).
   name  = product
   org   = who it was for
   title = what was done, as the headline
   summary = one or two short sentences on what was done and its impact
   tags  = two domain tags a recruiter can match to a job post
   fit   = 'inset' floats a screenshot on the coloured ground,
           'cover' fills the tile with a mockup photo
   ============================================================ */

export const projects = [
  {
    id: 'veritas',
    title: 'Simplified complex workflow',
    summary:
      'Rebuilt a multi-insurer broker site around one clear path to a quote, cutting checkout from 25 steps to 11.',
    name: 'Veritas',
    org: 'Clarion Fintech',
    tags: ['Insurtech', 'B2B'],
    tone: 'veritas',
    fit: 'inset',
    image: require('../assets/images/veritas-home-hero.jpg'),
    alt: 'Veritas insurance homepage with product categories and a quote prompt',
    link: '/projects/6',
  },
  {
    id: 'locus',
    title: 'Design system for an AI decision platform',
    summary:
      'A token-driven library of 70+ components behind an AI tool that turns team threads into cited decisions. 17 of 25 interviewees asked for early access.',
    name: 'Locus AI',
    org: 'PM Accelerator',
    tags: ['AI', '0 → 1'],
    tone: 'locus',
    fit: 'inset',
    image: require('../assets/images/Locus.png'),
    alt: 'Locus AI design system: buttons, inputs, pricing cards, calendar and logo',
    link: '/projects/5',
  },
  {
    id: 'spendsmart',
    title: 'Gamified budgeting web app',
    summary:
      'A mood-aware expense tracker with challenges and badges, designed and built in 8 weeks. 83% task completion in usability tests.',
    name: 'SpendSmart',
    org: 'Humber College',
    tags: ['Fintech', 'MERN'],
    tone: 'spend',
    fit: 'cover',
    image: require('../assets/images/SpendSmart.png'),
    alt: 'SpendSmart landing page on a tablet',
    link: '/projects/4',
  },
  {
    id: 'airbnb',
    title: 'Small changes, big trust',
    summary:
      '10 interviews showed guests leave right before booking because they can\'t trust listings. Verified listings and dated photos fix that, with no redesign needed.',
    name: 'Airbnb',
    org: 'Humber College',
    tags: ['Research', 'Marketplace'],
    tone: 'airbnb',
    fit: 'cover',
    image: require('../assets/images/Airbnb.png'),
    alt: 'Two phones showing Airbnb listing concepts with verified-guest details',
    link: '/projects/1',
  },
];
