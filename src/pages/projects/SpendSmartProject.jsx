import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/ProjectDetail.css';

// Import all SpendSmart images
import spendsmartHeroImg from '../../assets/images/SpendSmart.png';
import spendsmartDashboardImg from '../../assets/images/spendsmart-dashboard.png';
import spendsmartExpenseFormImg from '../../assets/images/spendsmart-expense-form.png';
import spendsmartChallengesImg from '../../assets/images/spendsmart-challenges.png';
import spendsmartBadgesImg from '../../assets/images/spendsmart-badges.png';
import spendsmartReportsImg from '../../assets/images/spendsmart-reports.png';
import spendsmartAdminImg from '../../assets/images/spendsmart-admin.png';
import spendsmartWireframesImg from '../../assets/images/spendsmart-wireframes.png';
import spendsmartPrototypeImg from '../../assets/images/spendsmart-prototype.png';
import spendsmartTestingImg from '../../assets/images/spendsmart-testing.png';

const SpendSmartProject = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({ ...prev, [entry.target.dataset.section]: true }));
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleBackToProjects = () => {
    navigate('/', { state: { scrollToProjects: true } });
  };

  const usabilityResults = [
    { task: "Registration & Login", completion: "80%", ease: 4.1, time: "68s", errors: 2 },
    { task: "Log New Expense", completion: "90%", ease: 3.9, time: "90s", errors: 1 },
    { task: "View/Edit Expense", completion: "100%", ease: 4.5, time: "55s", errors: 0 },
    { task: "Admin Dashboard", completion: "60%", ease: 3.6, time: "155s", errors: 3 }
  ];

  const statsData = [
    { value: "5", label: "Usability Test Participants" },
    { value: "95%", label: "Overall Task Completion Rate" },
    { value: "4.0/5", label: "Average Ease Rating" },
    { value: "80%", label: "Would Use Frequently" }
  ];

  // Redesigned features - focused on value and user impact
  const keyFeatures = [
    {
      icon: "🔐",
      title: "User Authentication & Profile Management",
      description: "Secure signup and login with JWT authentication. Users can manage their profile, set monthly budgets, and track their financial goals in one place."
    },
    {
      icon: "💰",
      title: "Expense Tracking with Mood Logging",
      description: "Log expenses with amount, category, date, and mood (Happy, Sad, Stressed, Excited, Neutral). Every purchase tells a story about why you spent."
    },
    {
      icon: "🏆",
      title: "Daily Challenges & Streaks",
      description: "Start daily financial challenges like 'No Coffee Today' or 'Bring Lunch from Home'. Track progress with visual meters and maintain streaks for consistent mindful spending."
    },
    {
      icon: "🎖️",
      title: "Badge Achievement System",
      description: "Earn badges for completing challenges, maintaining streaks, and hitting savings milestones. Badges appear in your profile as visual proof of your progress."
    },
    {
      icon: "📊",
      title: "Spending Analytics & Reports",
      description: "View charts showing spending patterns by category and mood over time. Identify emotional spending triggers and track your progress toward financial goals."
    },
    {
      icon: "⚙️",
      title: "Admin Dashboard",
      description: "Full CRUD capabilities for managing challenges, categories, and badges. Admins can curate content and view aggregate anonymized trends."
    }
  ];

  const userPersonas = [
    {
      name: "Hardik",
      role: "Student",
      description: "An international student on a tight monthly budget. She signs up and sets her profile currency and monthly budget. Each morning she checks SpendSmart and selects the 'Avoid Buying Coffee Today' challenge. During the day she logs a $3.50 coffee and tags her mood as 'Stressed'. The app reduces her challenge score and displays encouraging insights. After 6 consecutive successful challenge days, she earns a golden badge."
    },
    {
      name: "Sam",
      role: "Admin",
      description: "The instructor/manager who curates the challenge library. Sam logs into the Admin portal to create new challenges like 'Bring Home Lunch for 3 Days'. Sam can view aggregate anonymized trends for the cohort to see if stress correlates with snack purchases, using that data to inform workshops and resources for students."
    }
  ];

  return (
    <div className="airbnb-project">
      <style jsx="true">{`
        .airbnb-project {
          --project-accent: #8dbc15;
          --project-accent-dim: rgba(119, 232, 14, 0.1);
          --project-text: #f0f0f0;
          --project-text-secondary: #b3b3b3;
          --project-bg: #0f0f0f;
          --project-bg-secondary: #1a1a1a;
          --project-border: rgba(255, 255, 255, 0.08);
        }

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
          }
          .hero-sub {
            font-size: 1rem;
          }
        }

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

        .spendsmart-logo-wrap {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          background: var(--project-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(116, 255, 77, 0.3);
        }

        .spendsmart-logo-wrap svg {
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

        .stats-grid-custom {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .stat-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 1.8rem;
          text-align: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .stat-card-custom:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
        }

        .stat-value-custom {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--project-accent);
          display: block;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label-custom {
          font-size: 0.85rem;
          color: var(--project-text-secondary);
          line-height: 1.4;
        }

        .hypothesis-box {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-accent);
          padding: 3rem 4%;
          border-radius: 12px;
          margin: 3rem 0;
          position: relative;
          overflow: hidden;
        }

        .hypothesis-box::before {
          content: '💰';
          position: absolute;
          bottom: 1rem;
          right: 2rem;
          font-size: 5rem;
          color: rgba(113, 255, 77, 0.05);
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
          z-index: 1;
        }

        .hypothesis-box p strong {
          font-style: normal;
          font-weight: 700;
          color: var(--project-accent);
        }

        .process-grid-custom {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--project-border);
          border-radius: 12px;
          overflow: hidden;
          margin: 2.5rem 0;
        }

        .process-card-custom {
          background: var(--project-bg);
          padding: 2.2rem 2rem;
        }

        .process-num {
          font-family: var(--font-heading);
          font-size: 3rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.1);
          line-height: 1;
          margin-bottom: 1rem;
        }

        .process-card-custom h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 0.7rem;
          color: var(--project-text);
        }

        .process-card-custom p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        /* Updated Features Grid */
        .features-grid-custom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .feature-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 1.8rem;
          transition: all 0.3s ease;
        }

        .feature-card-custom:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          display: block;
        }

        .feature-card-custom h3 {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: var(--project-text);
        }

        .feature-card-custom p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
        }

        .persona-grid-custom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin: 2.5rem 0;
        }

        .persona-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
        }

        .persona-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--project-border);
        }

        .persona-icon {
          width: 50px;
          height: 50px;
          background: var(--project-accent-dim);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .persona-header h3 {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--project-text);
          margin-bottom: 0.2rem;
        }

        .persona-role {
          font-size: 0.8rem;
          color: var(--project-accent);
        }

        .persona-details p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        .table-wrapper {
          overflow-x: auto;
          margin: 2rem 0;
        }

        .results-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--project-bg-secondary);
          border-radius: 12px;
          overflow: hidden;
        }

        .results-table th,
        .results-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--project-border);
        }

        .results-table th {
          background: var(--project-bg);
          color: var(--project-accent);
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .results-table td {
          color: var(--project-text-secondary);
          font-size: 0.9rem;
        }

        .results-table tr:hover td {
          background: rgba(255, 77, 77, 0.05);
        }

        .recommendation-card {
          background: var(--project-bg-secondary);
          border-left: 3px solid var(--project-accent);
          padding: 1.5rem;
          margin: 1rem 0;
          border-radius: 0 8px 8px 0;
        }

        .recommendation-card h4 {
          color: var(--project-accent);
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .recommendation-card p {
          color: var(--project-text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .artifact-box-simple {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          overflow: hidden;
          margin: 2.5rem 0;
        }

        .artifact-header {
          padding: 0.9rem 1.4rem;
          border-bottom: 1px solid var(--project-border);
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--project-bg);
        }

        .artifact-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--project-border);
        }

        .artifact-dot:nth-child(1) { background: var(--project-accent); }
        .artifact-dot:nth-child(2) { background: var(--project-accent); opacity: 0.6; }
        .artifact-dot:nth-child(3) { background: var(--project-accent); opacity: 0.3; }

        .artifact-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--project-text-secondary);
          letter-spacing: 0.03em;
          margin-left: 0.5rem;
        }

        .artifact-body {
          padding: 0;
          background: var(--project-bg);
          line-height: 0;
        }

        .artifact-body img {
          width: 100%;
          height: auto;
          display: block;
        }

        .mockup-full-container {
          width: 100%;
          margin: 2rem 0;
          padding: 0;
        }

        .mockup-full-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(32, 50, 25, 0.3);
          border: 1px solid var(--project-border);
        }

        .takeaways-custom {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--project-border);
          border-radius: 12px;
          overflow: hidden;
          margin: 2.5rem 0;
        }

        .takeaway-custom {
          background: var(--project-bg-secondary);
          padding: 1.8rem 2.2rem;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .takeaway-letter {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--project-accent);
          line-height: 1;
          padding-top: 0.1rem;
        }

        .takeaway-custom h4 {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.4rem;
          color: var(--project-text);
        }

        .takeaway-custom p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        .fade-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 1024px) {
          .process-grid-custom,
          .stats-grid-custom,
          .features-grid-custom,
          .persona-grid-custom {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .process-grid-custom,
          .stats-grid-custom,
          .features-grid-custom,
          .persona-grid-custom {
            grid-template-columns: 1fr;
          }
          .hero-banner-inner {
            flex-direction: column;
            text-align: center;
          }
          .takeaway-custom {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="fade-section" data-section="hero" style={visibleSections.hero ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="hero-image-full">
          <img src={spendsmartHeroImg} alt="SpendSmart - Mood-Aware Gamified Expense Tracker" />
        </div>
      </section>

      {/* Hero Content */}
      <section className="project-hero-custom fade-section" data-section="hero-content" style={visibleSections['hero-content'] ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="hero-content-wrapper">
          <h1>Understanding <em>why</em> you spend, not just <em>what</em> you spend</h1>
          <p className="hero-sub">SpendSmart is a mood-aware, gamified expense tracking web application designed for students and budget-conscious individuals. By linking every expense to an emotional state and using daily challenges, streaks, and badges, it turns mindful spending into an engaging game that builds healthier financial habits.</p>
          
          <div className="hero-meta">
            <div className="meta-item">
              <label>My Role</label>
              <p>Full Stack Developer, UX/UI Designer</p>
            </div>
            <div className="meta-item">
              <label>Tech Stack</label>
              <p>MERN (MongoDB, Express, React, Node.js)</p>
            </div>
            <div className="meta-item">
              <label>Context</label>
              <p>Capstone Project - Humber College</p>
            </div>
            <div className="meta-item">
              <label>Timeline</label>
              <p>8 Weeks (Sep - Oct 2025)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <div className="hero-banner-custom fade-section" data-section="banner" style={visibleSections.banner ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="hero-banner-inner">
          <div className="spendsmart-logo-wrap">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2 L2 12 L16 22 L30 12 L16 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M8 8 L24 8" stroke="white" strokeWidth="1.5" />
              <path d="M16 22 L16 28" stroke="white" strokeWidth="1.5" />
              <path d="M10 26 L22 26" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="hero-banner-text">"Students spend an average of 30% of their budget on impulse purchases driven by emotions. <strong>SpendSmart helps break that cycle by making the 'why' behind spending visible.</strong>"</p>
        </div>
      </div>

      {/* Problem Section */}
      <section className="section-custom fade-section" data-section="problem" style={visibleSections.problem ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">The Problem</span>
        </div>
        <h2 className="section-heading">Emotional spending is costing students more than money</h2>
        <p className="body-text">Emotional spending is the act of making purchases driven by feelings such as stress, sadness, boredom, or even happiness. For students on tight budgets, this reactive behavior leads to buyer's remorse, financial strain, and a cycle of negative emotions that impacts both financial health and mental well-being.</p>
        <p className="body-text">Traditional expense trackers capture <strong>what</strong> you spend, but never ask <strong>why</strong>. Without understanding the emotional triggers behind spending, students can't develop sustainable habits to break the cycle.</p>

        <div className="stats-grid-custom">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card-custom">
              <span className="stat-value-custom">{stat.value}</span>
              <span className="stat-label-custom">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <div className="section-full-custom fade-section" data-section="process" style={visibleSections.process ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner">
          <div className="section-label">
            <span className="step-num">Development Process</span>
          </div>
          <h2 className="section-heading">From requirements to deployment</h2>
          <p className="body-text">The project followed a structured 8-week timeline, starting with requirements documentation and Figma wireframes, then moving to full-stack development, usability testing, and final deployment.</p>

          <div className="process-grid-custom">
            <div className="process-card-custom">
              <div className="process-num">01</div>
              <h3>Requirements & Planning</h3>
              <p>Created comprehensive requirements document with user stories categorized into Must Have, Should Have, and Nice to Have. Defined technical specifications, database schemas, and project timeline.</p>
            </div>
            <div className="process-card-custom">
              <div className="process-num">02</div>
              <h3>Design & Prototyping</h3>
              <p>Developed Figma wireframes and interactive prototypes for all core user flows: registration, dashboard, expense logging, challenges, and admin panel. Conducted usability testing with 5 participants.</p>
            </div>
            <div className="process-card-custom">
              <div className="process-num">03</div>
              <h3>Full-Stack Development</h3>
              <p>Built REST API with Node.js/Express, MongoDB database, and React frontend. Implemented JWT authentication, expense CRUD, challenge system, badge logic, and admin dashboard.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - UPDATED */}
      <section className="section-custom fade-section" data-section="features" style={visibleSections.features ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Key Features</span>
        </div>
        <h2 className="section-heading">Building blocks of mindful spending</h2>
        <p className="body-text">Each feature was designed to address a specific user need identified during research. Together, they create a cohesive system that makes financial awareness engaging rather than tedious.</p>

        <div className="features-grid-custom">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="feature-card-custom">
              <span className="feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wireframes Section */}
      <div className="section-full-custom fade-section" data-section="wireframes" style={visibleSections.wireframes ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner">
          <div className="section-label">
            <span className="step-num">Wireframes & Prototypes</span>
          </div>
          <h2 className="section-heading">Designing for clarity and engagement</h2>
          <p className="body-text">Initial wireframes focused on core user flows. After professor feedback, layouts were refined to improve navigation and usability. Interactive prototypes were created in Figma for usability testing.</p>

          <div className="artifact-box-simple">
            <div className="artifact-header">
              <div className="artifact-dot"></div>
              <div className="artifact-dot"></div>
              <div className="artifact-dot"></div>
              <span className="artifact-title">Figma Wireframes - Core Screens</span>
            </div>
            <div className="artifact-body">
              <img src={spendsmartWireframesImg} alt="SpendSmart Wireframes" />
            </div>
          </div>

          <div className="artifact-box-simple">
            <div className="artifact-header">
              <div className="artifact-dot"></div>
              <div className="artifact-dot"></div>
              <div className="artifact-dot"></div>
              <span className="artifact-title">High-Fidelity Prototype</span>
            </div>
            <div className="artifact-body">
              <img src={spendsmartPrototypeImg} alt="SpendSmart High-Fidelity Prototype" />
            </div>
          </div>
        </div>
      </div>

      {/* Usability Testing Section */}
      <section className="section-custom fade-section" data-section="testing" style={visibleSections.testing ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Usability Testing</span>
        </div>
        <h2 className="section-heading">Testing with real users</h2>
        <p className="body-text">Five participants from the target demographic tested the Figma prototype. Sessions followed Steve Krug's methodology, with participants thinking aloud while completing key tasks. The goal was to identify usability issues before development.</p>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Usability Testing Sessions</span>
          </div>
          <div className="artifact-body">
            <img src={spendsmartTestingImg} alt="Usability Testing Results" />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="results-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Completion Rate</th>
                <th>Ease Rating (1-5)</th>
                <th>Time on Task</th>
                <th>Errors</th>
              </tr>
            </thead>
            <tbody>
              {usabilityResults.map((result, index) => (
                <tr key={index}>
                  <td><strong>{result.task}</strong></td>
                  <td>{result.completion}</td>
                  <td>{result.ease}</td>
                  <td>{result.time}</td>
                  <td>{result.errors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recommendation-card">
          <h4>🔐 Key Finding: Authentication Flow</h4>
          <p>Missing "Forgot Password" and "Confirm Password" fields caused confusion. Participants expected these standard security features. High-priority fix before development.</p>
        </div>

        <div className="recommendation-card">
          <h4>🎨 Key Finding: Admin vs User Views</h4>
          <p>Participants struggled to differentiate admin dashboard from user views. Recommended adding visual cues, contrasting colors, and scoped navigation to reduce misnavigation.</p>
        </div>

        <div className="recommendation-card">
          <h4>😊 Key Finding: Mood Input Clarity</h4>
          <p>Some participants saw mood tracking as optional or confusing. Recommended adding helper text and tooltips to explain the value of mood-aware tracking while keeping it optional.</p>
        </div>
      </section>

      {/* User Personas Section */}
      <div className="section-full-custom fade-section" data-section="personas" style={visibleSections.personas ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner">
          <div className="section-label">
            <span className="step-num">User Personas</span>
          </div>
          <h2 className="section-heading">Designing for real people</h2>
          <p className="body-text">Understanding our users meant creating detailed personas that captured their goals, frustrations, and motivations. These stories guided every design decision.</p>

          <div className="persona-grid-custom">
            <div className="persona-card-custom">
              <div className="persona-header">
                <span className="persona-icon">👩‍🎓</span>
                <div>
                  <h3>Amira</h3>
                  <div className="persona-role">Student</div>
                </div>
              </div>
              <div className="persona-details">
                <p>{userPersonas[0].description}</p>
              </div>
            </div>

            <div className="persona-card-custom">
              <div className="persona-header">
                <span className="persona-icon">👨‍🏫</span>
                <div>
                  <h3>Sam</h3>
                  <div className="persona-role">Admin</div>
                </div>
              </div>
              <div className="persona-details">
                <p>{userPersonas[1].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Design Screens Section */}
      <section className="section-custom fade-section" data-section="design" style={visibleSections.design ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Final Designs</span>
        </div>
        <h2 className="section-heading">Bringing the vision to life</h2>
        <p className="body-text">High-fidelity designs were created with a clean, modern aesthetic focused on clarity and motivation. The color palette uses red as an accent for important actions, with neutral dark tones creating a calm, professional environment.</p>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Dashboard - User Command Center</span>
          </div>
          <div className="artifact-body">
            <img src={spendsmartDashboardImg} alt="SpendSmart Dashboard" />
          </div>
        </div>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Expense Logging with Mood Tracking</span>
          </div>
          <div className="artifact-body">
            <img src={spendsmartExpenseFormImg} alt="Expense Logging Form" />
          </div>
        </div>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Daily Challenges & Progress Tracking</span>
          </div>
          <div className="artifact-body">
            <img src={spendsmartChallengesImg} alt="Daily Challenges" />
          </div>
        </div>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Badge System & Achievements</span>
          </div>
          <div className="artifact-body">
            <img src={spendsmartBadgesImg} alt="Badges System" />
          </div>
        </div>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Reports & Spending Analytics</span>
          </div>
          <div className="artifact-body">
            <img src={spendsmartReportsImg} alt="Reports Dashboard" />
          </div>
        </div>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Admin Dashboard - Manage Challenges & Categories</span>
          </div>
          <div className="artifact-body">
            <img src={spendsmartAdminImg} alt="Admin Dashboard" />
          </div>
        </div>
      </section>

      {/* Technical Stack Section */}
      <div className="section-full-custom fade-section" data-section="tech" style={visibleSections.tech ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner">
          <div className="section-label">
            <span className="step-num">Technical Architecture</span>
          </div>
          <h2 className="section-heading">MERN Stack with JWT Authentication</h2>
          <p className="body-text">SpendSmart was built as a full-stack application with a clear separation of concerns between frontend and backend, following RESTful API principles and secure authentication patterns.</p>

          <div className="process-grid-custom">
            <div className="process-card-custom">
              <div className="process-num">Frontend</div>
              <h3>React + Tailwind CSS</h3>
              <p>Component-based architecture with React Router for navigation, Context API for state management, and Chart.js/Recharts for data visualization. Tailwind CSS ensured responsive, mobile-first design.</p>
            </div>
            <div className="process-card-custom">
              <div className="process-num">Backend</div>
              <h3>Node.js + Express REST API</h3>
              <p>RESTful API endpoints for users, expenses, challenges, badges, and admin functions. JWT tokens for authentication, bcrypt for password hashing, and middleware for route protection.</p>
            </div>
            <div className="process-card-custom">
              <div className="process-num">Database</div>
              <h3>MongoDB Atlas</h3>
              <p>Document-based schemas for Users, Expenses, Challenges, UserChallenges, Badges, and Categories. Relationships managed through reference IDs with Mongoose ODM for data validation.</p>
            </div>
          </div>

          <div className="artifact-box-simple">
            <div className="artifact-header">
              <div className="artifact-dot"></div>
              <div className="artifact-dot"></div>
              <div className="artifact-dot"></div>
              <span className="artifact-title">Database Schema Diagram</span>
            </div>
            <div className="artifact-placeholder" style={{ padding: '2rem', textAlign: 'center', background: 'var(--project-bg)', color: 'var(--project-text-secondary)' }}>
              <p>📁 Users Collection: id, name, email, passwordHash, role, settings, streakCount</p>
              <p>💰 Expenses Collection: id, userId, amount, date, category, mood, note</p>
              <p>🏆 Challenges Collection: id, title, description, rules, durationHours</p>
              <p>🎖️ Badges Collection: id, name, description, rule, imageUrl</p>
            </div>
          </div>
        </div>
      </div>

      {/* Takeaways Section */}
      <section className="section-custom fade-section" data-section="takeaways" style={visibleSections.takeaways ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Key Takeaways</span>
        </div>
        <h2 className="section-heading">What I learned from building SpendSmart</h2>

        <div className="takeaways-custom">
          <div className="takeaway-custom">
            <div className="takeaway-letter">01</div>
            <div>
              <h4>Requirements documentation is not busywork - it's a blueprint</h4>
              <p>The requirements document forced me to think through user stories, edge cases, and technical decisions before writing a single line of code. When I hit roadblocks during development, the requirements doc helped me stay focused on MVP scope rather than feature creep.</p>
            </div>
          </div>
          <div className="takeaway-custom">
            <div className="takeaway-letter">02</div>
            <div>
              <h4>Usability testing revealed blind spots I didn't know existed</h4>
              <p>I assumed the admin dashboard was clearly labeled. Five users later, I learned that "Categories" and "Challenges" weren't intuitive to everyone. Testing with real users isn't validation - it's discovery. Those findings shaped significant design improvements before development.</p>
            </div>
          </div>
          <div className="takeaway-custom">
            <div className="takeaway-letter">03</div>
            <div>
              <h4>Gamification needs meaningful rewards</h4>
              <p>Adding badges and streaks is easy. Making them feel earned is harder. The challenge logic had to be carefully balanced - too easy and badges feel meaningless, too hard and users disengage. The sweet spot came from testing difficulty levels with actual users.</p>
            </div>
          </div>
          <div className="takeaway-custom">
            <div className="takeaway-letter">04</div>
            <div>
              <h4>Full-stack means understanding the whole system</h4>
              <p>Building both frontend and backend gave me perspective I didn't have before. I learned to design APIs that serve the UI efficiently, structure database queries for performance, and handle errors gracefully on both sides. It's a different kind of satisfaction to ship a complete application.</p>
            </div>
          </div>
        </div>

        <div className="hypothesis-box" style={{ marginTop: '3rem' }}>
          <p>The most valuable lesson? <strong>Students don't need more apps to track money - they need a reason to care about it.</strong> SpendSmart succeeded because it gave them that reason through challenges, badges, and emotional awareness.</p>
        </div>
      </section>

      {/* Navigation */}
      <div className="project-navigation" style={{ padding: '0 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={handleBackToProjects} className="btn btn-secondary">
          <i className="fas fa-arrow-left"></i>
          <span>Back to Projects</span>
        </button>

        <Link to="/projects/1" className="btn btn-primary">
          <span>Next Project: Airbnb</span>
          <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default SpendSmartProject;