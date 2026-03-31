import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/ProjectDetail.css';

// Import all images
import competitiveAnalysisImg from '../../assets/images/competitive-nalysis.png';
import journeyMapImg from '../../assets/images/User-journeymap.png';
import airbnbHeroImg from '../../assets/images/Airbnb.png';
import screenerImg from '../../assets/images/airbnb-screener.png';
import discussionGuide1Img from '../../assets/images/airbnb-discussion-guide-1.jpg';
import discussionGuide2Img from '../../assets/images/airbnb-discussion-guide-2.jpg';
import airbnbMockupAllImg from '../../assets/images/airbnb-mockup.png';

const AirbnbProject = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Intersection Observer for fade-in effects
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

  const interviewLinks = [
    {
      name: "User Interview 1 - Sarah, 28",
      url: "https://drive.google.com/file/d/1Vl1GN-76x2HKyPoRKb_-2PUIJqCKB2Cy/view"
    },
    {
      name: "User Interview 2 - Michael, 35",
      url: "https://drive.google.com/file/d/1QhBB0tsgS0Px0YA0V-ZTvkF2e-d48IOC/view"
    }
  ];

  return (
    <div className="airbnb-project">
      {/* Custom styles specific to Airbnb project */}
      <style jsx="true">{`
        .airbnb-project {
          --project-accent: #FF385C;
          --project-accent-dim: rgba(255, 77, 77, 0.1);
          --project-text: #f0f0f0;
          --project-text-secondary: #b3b3b3;
          --project-bg: #0f0f0f;
          --project-bg-secondary: #1a1a1a;
          --project-border: rgba(255, 255, 255, 0.08);
        }

        /* Hero Image - Full width, controlled height */
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

        /* Hero Content - Below image */
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

        .airbnb-logo-wrap {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          background: var(--project-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(255, 77, 77, 0.3);
        }

        .airbnb-logo-wrap svg {
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

        /* Hypothesis Box */
        .hypothesis-box {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-accent);
          color: var(--project-text);
          padding: 3rem 4%;
          border-radius: 12px;
          margin: 3rem 0;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(255, 77, 77, 0.1);
        }

        .hypothesis-box::before {
          content: '"';
          position: absolute;
          top: -1rem;
          left: 1rem;
          font-family: var(--font-heading);
          font-size: 12rem;
          color: rgba(255, 77, 77, 0.1);
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

        /* Process Grid */
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

        /* Findings Grid */
        .findings-grid-custom {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .finding-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 10px;
          padding: 1.8rem;
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .finding-card-custom:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
        }

        .finding-card-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: var(--project-accent);
          border-radius: 3px 0 0 3px;
        }

        .finding-icon {
          font-size: 1.5rem;
          margin-bottom: 0.9rem;
          display: block;
        }

        .finding-card-custom h4 {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          color: var(--project-text);
        }

        .finding-card-custom p {
          font-size: 0.88rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
        }

        /* Artifact Box - Simple no interaction */
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

        /* Research Documents - Single Combined Box */
        .research-documents-box {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          overflow: hidden;
          margin: 2rem 0;
        }

        .research-documents-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--project-border);
          background: var(--project-bg);
        }

        .research-documents-header h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--project-text);
          margin: 0;
        }

        .research-documents-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          background: var(--project-border);
        }

        .research-document-item {
          background: var(--project-bg);
          padding: 1rem;
        }

        .research-document-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 8px;
          border: 1px solid var(--project-border);
        }

        .research-document-caption {
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: var(--project-text-secondary);
          text-align: center;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .research-documents-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Interview Links */
        .interview-links {
          display: flex;
          gap: 1.5rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .interview-link {
          flex: 1;
          min-width: 250px;
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 8px;
          padding: 1.2rem 1.5rem;
          text-decoration: none;
          color: var(--project-text);
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .interview-link:hover {
          border-color: var(--project-accent);
          transform: translateY(-2px);
          background: var(--project-bg);
        }

        .interview-link-icon {
          font-size: 1.5rem;
          color: var(--project-accent);
        }

        .interview-link-content {
          flex: 1;
        }

        .interview-link-title {
          font-weight: 600;
          margin-bottom: 0.2rem;
        }

        .interview-link-subtitle {
          font-size: 0.8rem;
          color: var(--project-text-secondary);
        }

        .interview-link-arrow {
          font-size: 1.2rem;
          color: var(--project-text-secondary);
          transition: transform 0.3s ease;
        }

        .interview-link:hover .interview-link-arrow {
          transform: translateX(4px);
          color: var(--project-accent);
        }

        /* Journey Map */
        .journey-phases-custom {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          margin: 2.5rem 0;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--project-border);
        }

        .phase {
          padding: 1.5rem 1rem;
          background: var(--project-bg-secondary);
        }

        .phase:not(:last-child) {
          border-right: 1px solid var(--project-border);
        }

        .phase-name {
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          color: var(--project-text);
        }

        .phase-emotion {
          font-size: 1.3rem;
          margin-bottom: 0.6rem;
        }

        .phase-feeling {
          font-size: 0.78rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
        }

        .phase-pain {
          font-size: 0.78rem;
          color: var(--project-text-secondary);
          line-height: 1.5;
        }

        .phase.awareness .phase-feeling { color: #ff4d4d; }
        .phase.exploration .phase-feeling { color: #ff8080; }
        .phase.decision .phase-feeling { color: #ff3333; }
        .phase.booking .phase-feeling { color: #ff6666; }
        .phase.experience .phase-feeling { color: #ff4d4d; }

        /* Solutions Grid */
        .solutions-grid-custom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--project-border);
          border-radius: 12px;
          overflow: hidden;
          margin: 2.5rem 0;
        }

        .solution-card-custom {
          background: var(--project-bg);
          padding: 2.5rem 2.2rem;
        }

        .solution-card-custom.accent {
          background: var(--project-accent);
        }

        .solution-card-custom.accent h3,
        .solution-card-custom.accent p {
          color: white;
        }

        .solution-num {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--project-accent);
          margin-bottom: 1rem;
        }

        .solution-card-custom.accent .solution-num {
          color: rgba(255, 255, 255, 0.7);
        }

        .solution-card-custom h3 {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 0.8rem;
          color: var(--project-text);
        }

        .solution-card-custom p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        .solution-tag {
          display: inline-block;
          margin-top: 1.2rem;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          border-radius: 2rem;
          background: var(--project-accent-dim);
          color: var(--project-accent);
          letter-spacing: 0.03em;
          border: 1px solid rgba(255, 77, 77, 0.2);
        }

        .solution-card-custom.accent .solution-tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Full Width Mockup */
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
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--project-border);
        }

        .section-full-custom .inner.wide {
          max-width: 100%;
          padding: 0;
        }

        /* Takeaways */
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

        /* Pull Quote */
        .pull-quote-custom {
          border-left: 3px solid var(--project-accent);
          padding: 1rem 1.8rem;
          margin: 2rem 0;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 500;
          font-style: italic;
          color: var(--project-text);
          line-height: 1.6;
          max-width: 56ch;
          background: var(--project-bg-secondary);
          border-radius: 0 8px 8px 0;
        }

        /* Fade In Animation */
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
          .process-grid-custom {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .process-grid-custom {
            grid-template-columns: 1fr;
          }
          
          .solutions-grid-custom {
            grid-template-columns: 1fr;
          }
          
          .journey-phases-custom {
            grid-template-columns: 1fr;
          }
          
          .phase {
            border-right: none;
            border-bottom: 1px solid var(--project-border);
          }
          
          .phase:last-child {
            border-bottom: none;
          }
          
          .hero-banner-inner {
            flex-direction: column;
            text-align: center;
          }
          
          .takeaway-custom {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .interview-links {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .project-hero-custom h1 {
            font-size: 2rem;
          }
          
          .hero-sub {
            font-size: 1rem;
          }
          
          .solution-card-custom {
            padding: 1.8rem 1.5rem;
          }
        }
      `}</style>

      {/* Hero Section - Image Only */}
      <section className="fade-section" data-section="hero" style={visibleSections.hero ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="hero-image-full">
          <img src={airbnbHeroImg} alt="Airbnb Project" />
        </div>
      </section>

      {/* Hero Content - Below Image */}
      <section className="project-hero-custom fade-section" data-section="hero-content" style={visibleSections['hero-content'] ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="hero-content-wrapper">
          <h1>Rebuilding trust in <em>Airbnb's</em> booking journey</h1>
          <p className="hero-sub">New travellers were dropping off before booking - not because they didn't want to, but because the platform couldn't answer the questions that mattered most. This is how I found that out, and what I designed to fix it.</p>
          
          <div className="hero-meta">
            <div className="meta-item">
              <label>My Role</label>
              <p>UX Researcher & Designer, UI Designer</p>
            </div>
            <div className="meta-item">
              <label>Methods</label>
              <p>Competitive Analysis · User Interviews · Journey Mapping</p>
            </div>
            <div className="meta-item">
              <label>Team</label>
              <p>Academic project, 5-person team</p>
            </div>
            <div className="meta-item">
              <label>Target Users</label>
              <p>Travellers aged 18-40, booking groups or first trips</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <div className="hero-banner-custom fade-section" data-section="banner" style={visibleSections.banner ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="hero-banner-inner">
          <div className="airbnb-logo-wrap">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 1C9.37 1 4 6.37 4 13c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12zm0 16.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z"/>
            </svg>
          </div>
          <p className="hero-banner-text">"New users faced the most challenges in the purchase path. They weren't failing because Airbnb was hard to use - they were failing because <strong>they couldn't trust what they were seeing.</strong>"</p>
        </div>
      </div>

      {/* Context Section */}
      <section className="section-custom fade-section" data-section="context" style={visibleSections.context ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Context</span>
        </div>
        <h2 className="section-heading">The brief: make Airbnb the preferred choice for authentic travel</h2>
        <p className="body-text">Airbnb had a goal: connect more people to unique, local travel experiences. But our early competitive review suggested something was getting in the way - users were exploring, but not booking. The question wasn't "how do we make the product look better?" It was: <strong>what is actually stopping people from completing a booking, and who is most affected?</strong></p>
        <p className="body-text">We scoped the project around the purchase path - from discovering a listing to confirming a stay - and decided to treat it as a trust and confidence problem, not a navigation problem.</p>

        <div className="hypothesis-box">
          <p>If we understand <strong>what gives a new traveller enough confidence to book</strong>, we can design interventions that don't just look reassuring - they actually are.</p>
        </div>
      </section>

      {/* Process Section */}
      <div className="section-full-custom fade-section" data-section="process" style={visibleSections.process ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner">
          <div className="section-label">
            <span className="step-num">Process</span>
          </div>
          <h2 className="section-heading">A three-phase research sprint</h2>
          <p className="body-text">Rather than jumping to solutions, the team committed to understanding the problem space first. Every method was chosen to answer a specific question.</p>

          <div className="process-grid-custom">
            <div className="process-card-custom">
              <div className="process-num">01</div>
              <h3>Competitive Analysis</h3>
              <p>Benchmarked Airbnb against VRBO and Booking.com across business goals, usability heuristics, tasks to be done, and a SWOT analysis. <strong>Goal:</strong> understand what the industry considers table stakes, and where Airbnb is under-investing.</p>
            </div>
            <div className="process-card-custom">
              <div className="process-num">02</div>
              <h3>User Interviews</h3>
              <p>Recruited and interviewed 10 participants using a screener and structured discussion guide. Participants were asked to sketch their ideal booking process. <strong>Goal:</strong> hear directly from users about where their confidence breaks down - and why.</p>
            </div>
            <div className="process-card-custom">
              <div className="process-num">03</div>
              <h3>Persona & Journey Mapping</h3>
              <p>Synthesised interview findings into personas and a full journey map spanning Awareness → Exploration → Decision → Booking → Experience. <strong>Goal:</strong> make emotional pain points visible, so design solutions could target the real moments of friction.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Analysis Section */}
      <section className="section-custom fade-section" data-section="competitive" style={visibleSections.competitive ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Competitive Analysis</span>
        </div>
        <h2 className="section-heading">What competitors are doing that Airbnb isn't</h2>
        <p className="body-text">We evaluated Airbnb, VRBO, and Booking.com across four dimensions: value proposition, business goals, tasks-to-be-done, and Nielsen's usability heuristics. One pattern stood out immediately.</p>

        <blockquote className="pull-quote-custom">
          Booking.com scored 4.5/5 on usability heuristics. Airbnb scored 3/5. The gap wasn't in design polish - it was in <em>error prevention, feedback, and flexibility</em>.
        </blockquote>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Competitive Analysis - Airbnb vs VRBO vs Booking.com</span>
          </div>
          <div className="artifact-body">
            <img src={competitiveAnalysisImg} alt="Competitive Analysis - 3-column table comparing Airbnb, VRBO and Booking.com" />
          </div>
        </div>

        <div className="findings-grid-custom">
          <div className="finding-card-custom">
            <span className="finding-icon">🔍</span>
            <h4>No search history</h4>
            <p>Airbnb doesn't save or surface prior search sessions, forcing users to re-enter context every visit. Competitors handle this natively.</p>
          </div>
          <div className="finding-card-custom">
            <span className="finding-icon">🗺️</span>
            <h4>Location gated behind booking</h4>
            <p>Exact location only revealed after booking - a meaningful trust barrier that VRBO and Booking.com don't impose.</p>
          </div>
          <div className="finding-card-custom">
            <span className="finding-icon">⚖️</span>
            <h4>No comparison feature</h4>
            <p>Users can't compare two or more listings side by side. This is table stakes in hotel booking - absent entirely in Airbnb.</p>
          </div>
          <div className="finding-card-custom">
            <span className="finding-icon">🏷️</span>
            <h4>No loyalty or incentive system</h4>
            <p>Both competitors run loyalty programmes. Airbnb offers no comparable structure for repeat or first-time bookers.</p>
          </div>
          <div className="finding-card-custom">
            <span className="finding-icon">📋</span>
            <h4>Overloaded navigation</h4>
            <p>Heavy reliance on icons with inconsistent labelling leads to navigation confusion, particularly for new users unfamiliar with the platform's layout.</p>
          </div>
          <div className="finding-card-custom">
            <span className="finding-icon">🛁</span>
            <h4>Sparse listing information</h4>
            <p>Basic details like number of bathrooms or room configuration often require clicking into individual listings - slowing comparison significantly.</p>
          </div>
        </div>
      </section>

      {/* User Research Section */}
      <div className="section-full-custom fade-section" data-section="research" style={visibleSections.research ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner">
          <div className="section-label">
            <span className="step-num">User Interviews</span>
          </div>
          <h2 className="section-heading">Ten interviews, one recurring pattern</h2>
          <p className="body-text">We screened participants for frequent online accommodation booking behaviour across a range of demographics. Each team member conducted individual interviews using a shared discussion guide, and asked participants to sketch their ideal booking process - a technique that revealed process gaps users couldn't articulate verbally.</p>
          <p className="body-text"><strong>Primary finding:</strong> New users and group bookers experienced the most friction. Not in the mechanics of booking, but in the moment of deciding - when they needed enough confidence to commit.</p>

          {/* Research Documents - Single Combined Box */}
          <div className="research-documents-box">
            <div className="research-documents-header">
              <h3>Research Artifacts: Screener & Discussion Guides</h3>
            </div>
            <div className="research-documents-grid">
              <div className="research-document-item">
                <img src={screenerImg} alt="Participant Screener" className="research-document-image" />
                <div className="research-document-caption">Participant Screener</div>
              </div>
              <div className="research-document-item">
                <img src={discussionGuide1Img} alt="Discussion Guide - Part 1" className="research-document-image" />
                <div className="research-document-caption">Discussion Guide (Part 1)</div>
              </div>
              <div className="research-document-item">
                <img src={discussionGuide2Img} alt="Discussion Guide - Part 2" className="research-document-image" />
                <div className="research-document-caption">Discussion Guide (Part 2)</div>
              </div>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.02em', margin: '2.5rem 0 1.5rem', color: 'var(--project-text)' }}>
            Listen to the interviews
          </h3>
          
          <div className="interview-links">
            {interviewLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="interview-link"
              >
                <span className="interview-link-icon">🎧</span>
                <div className="interview-link-content">
                  <div className="interview-link-title">{link.name}</div>
                  <div className="interview-link-subtitle">Click to listen (opens in new tab)</div>
                </div>
                <span className="interview-link-arrow">↗</span>
              </a>
            ))}
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.02em', margin: '3rem 0 1.5rem', color: 'var(--project-text)' }}>
            What users told us they actually needed
          </h3>
          <div className="findings-grid-custom">
            <div className="finding-card-custom">
              <span className="finding-icon">✅</span>
              <h4>Verification they could trust</h4>
              <p>Multiple users stopped short of booking because a property had no verified label. They couldn't tell if photos were current, accurate, or staged.</p>
            </div>
            <div className="finding-card-custom">
              <span className="finding-icon">💬</span>
              <h4>Real reviews, not curated ones</h4>
              <p>"I don't trust a 4.9 from 12 reviews." Users wanted photo evidence from guests - not just star ratings - to feel confident.</p>
            </div>
            <div className="finding-card-custom">
              <span className="finding-icon">💰</span>
              <h4>Price transparency and comparison</h4>
              <p>Pricing inconsistencies between the listing preview and checkout total caused users to abandon mid-flow to check competitors.</p>
            </div>
            <div className="finding-card-custom">
              <span className="finding-icon">👥</span>
              <h4>Group booking clarity</h4>
              <p>Planning for groups was "a nightmare" - users couldn't easily see bed/bathroom configurations upfront, or coordinate booking decisions with others.</p>
            </div>
            <div className="finding-card-custom">
              <span className="finding-icon">📍</span>
              <h4>Location confidence before committing</h4>
              <p>Not knowing the exact address until after booking made it impossible to assess neighbourhood suitability - a dealbreaker for safety-conscious travellers.</p>
            </div>
            <div className="finding-card-custom">
              <span className="finding-icon">🤝</span>
              <h4>Reachable hosts</h4>
              <p>Several users had urgent pre-booking questions that went unanswered. An unresponsive host before booking killed trust in the stay itself.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Map Section */}
      <section className="section-custom fade-section" data-section="journey" style={visibleSections.journey ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Journey Mapping</span>
        </div>
        <h2 className="section-heading">Where the emotional journey breaks down</h2>
        <p className="body-text">The journey map synthesised interview data across five phases of the Airbnb booking experience. It made one thing clear: <strong>users don't drop off at random - they drop off at the Decision phase</strong>, where confidence requirements are highest and platform support is lowest.</p>

        <div className="journey-phases-custom">
          <div className="phase awareness">
            <div className="phase-name">Awareness</div>
            <div className="phase-emotion">😄</div>
            <div className="phase-feeling">Excited</div>
            <div className="phase-pain">Motivated to plan, beginning to explore options across platforms.</div>
          </div>
          <div className="phase exploration">
            <div className="phase-name">Exploration</div>
            <div className="phase-emotion">😊</div>
            <div className="phase-feeling">Happy</div>
            <div className="phase-pain">Delighted by range of options - but inaccurate pricing and no comparison tool start causing friction.</div>
          </div>
          <div className="phase decision">
            <div className="phase-name">Decision</div>
            <div className="phase-emotion">😞</div>
            <div className="phase-feeling">Disappointed</div>
            <div className="phase-pain">Discouraged by unverified listings, unreliable reviews, and incomplete descriptions. <strong>This is where users leave.</strong></div>
          </div>
          <div className="phase booking">
            <div className="phase-name">Booking</div>
            <div className="phase-emotion">🤔</div>
            <div className="phase-feeling">Curious</div>
            <div className="phase-pain">Satisfied with checkout flow, but concerns about security and hidden terms remain.</div>
          </div>
          <div className="phase experience">
            <div className="phase-name">Experience</div>
            <div className="phase-emotion">😤</div>
            <div className="phase-feeling">Annoyed</div>
            <div className="phase-pain">Disappointed when the property doesn't match featured images. Trust in platform eroded post-stay.</div>
          </div>
        </div>

        <div className="artifact-box-simple">
          <div className="artifact-header">
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <div className="artifact-dot"></div>
            <span className="artifact-title">Full Journey Map - Airbnb Purchase Path</span>
          </div>
          <div className="artifact-body">
            <img src={journeyMapImg} alt="Journey Map - 5-phase journey map with task paths, emotions, pain points, and opportunities" />
          </div>
        </div>

        <blockquote className="pull-quote-custom">
          The journey map didn't reveal a usability problem - it revealed a <em>trust architecture</em> problem. The platform asks for commitment before it's earned it.
        </blockquote>
      </section>

      {/* Design Solutions Section */}
      <div className="section-full-custom fade-section" data-section="solutions" style={visibleSections.solutions ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner">
          <div className="section-label">
            <span className="step-num">Design Solutions</span>
          </div>
          <h2 className="section-heading">Four interventions, each rooted in a finding</h2>
          <p className="body-text">Every solution maps directly to an insight from the research. No feature was added speculatively - each addresses a specific moment of breakdown identified in the journey map.</p>

          <div className="solutions-grid-custom">
            <div className="solution-card-custom accent">
              <div className="solution-num">Solution 01</div>
              <h3>Side-by-side listing comparison</h3>
              <p>A compare feature allowing up to three listings to be evaluated simultaneously across price, location, amenities, and guest reviews. Competitive analysis showed this is standard in hotel booking; Airbnb's absence of it was driving users to third-party comparison sites mid-flow.</p>
              <span className="solution-tag">Insight → "I always check multiple platforms before deciding"</span>
            </div>

            <div className="solution-card-custom">
              <div className="solution-num">Solution 02</div>
              <h3>Suggest Me - preference-based matching</h3>
              <p>"Suggest Me" is a guided onboarding flow that asks users about their trip type, budget, guest count, and accommodation preference - and returns listings tailored to those inputs. This directly addresses decision paralysis in the Exploration phase, when too many choices led to no choice.</p>
              <span className="solution-tag">Insight → "I don't know where to start looking"</span>
            </div>

            <div className="solution-card-custom">
              <div className="solution-num">Solution 03</div>
              <h3>Detailed listing cards</h3>
              <p>Key specs - beds, bathrooms, bedrooms, guest capacity - surfaced directly on the listing card, eliminating the need to open individual pages just to gather basic criteria. Group bookers and multi-room travellers cited this as critical for shortlisting efficiently.</p>
              <span className="solution-tag">Insight → "I have to open 15 listings just to compare basics"</span>
            </div>

            <div className="solution-card-custom">
              <div className="solution-num">Solution 04</div>
              <h3>Verified listing badge</h3>
              <p>A "Verified" tag on the accommodation card, visible before clicking in, signals that the property's images and description have been authenticated. This targets the #1 trust barrier identified in interviews: users couldn't tell whether what they were seeing was real.</p>
              <span className="solution-tag">Insight → "I don't book listings without verified labels"</span>
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', margin: '2.5rem 0 1.5rem', color: 'var(--project-text)' }}>
            Supporting feature updates
          </h3>
          <div className="findings-grid-custom">
            <div className="finding-card-custom">
              <span className="finding-icon">📸</span>
              <h4>Guest-uploaded photos</h4>
              <p>Past guests can upload photos taken during their stay. This addresses the recurring complaint about staged or outdated listing images - authentic guest photos carry more trust than host-curated ones.</p>
            </div>
            <div className="finding-card-custom">
              <span className="finding-icon">📅</span>
              <h4>Image capture date</h4>
              <p>Listing photos now include the date they were taken. This simple addition immediately signals whether images are recent - a significant trust signal for users who'd been misled by outdated photography.</p>
            </div>
            <div className="finding-card-custom">
              <span className="finding-icon">🗺️</span>
              <h4>Nearby attractions preview</h4>
              <p>An "Explore Nearby" button on the map view lets users assess neighbourhood context without booking. This directly addresses the pain point of location being gated behind commitment.</p>
            </div>
          </div>
        </div>
      </div>


      {/* Design Mockups Section - Full Width Image */}
      <div className="section-full-custom fade-section" data-section="mockups" style={visibleSections.mockups ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="inner wide">
          <div className="section-label" style={{ padding: '0 5%' }}>
            <span className="step-num">Design Mockups</span>
          </div>
          <h2 className="section-heading" style={{ padding: '0 5%' }}>Visualizing the solutions</h2>
          <p className="body-text" style={{ padding: '0 5%' }}>These mockups show how the research findings translated into concrete design interventions - from verified badges to comparison features and enhanced listing cards.</p>

          <div className="mockup-full-container">
            <img src={airbnbMockupAllImg} alt="Airbnb Design Mockups Collection" className="mockup-full-image" />
          </div>
        </div>
      </div>

      {/* Reflections Section */}
      <section className="section-custom fade-section" data-section="reflections" style={visibleSections.reflections ? { opacity: 1, transform: 'translateY(0)' } : {}}>
        <div className="section-label">
          <span className="step-num">Reflections</span>
        </div>
        <h2 className="section-heading">What this project taught me about research-led design</h2>

        <div className="takeaways-custom">
          <div className="takeaway-custom">
            <div className="takeaway-letter">A</div>
            <div>
              <h4>The problem users describe is rarely the actual problem</h4>
              <p>Users told us they "couldn't find what they wanted." What the journey map actually revealed was that they <em>found</em> options fine - they just couldn't build enough confidence to choose one. Defining the right problem is the most important design decision of a project.</p>
            </div>
          </div>
          <div className="takeaway-custom">
            <div className="takeaway-letter">B</div>
            <div>
              <h4>Competitive analysis sets the floor, not the ceiling</h4>
              <p>Mapping competitors showed us what the industry considers standard. It also showed us where Airbnb could leapfrog rather than match - particularly around personalised discovery, which neither VRBO nor Booking.com had invested in meaningfully.</p>
            </div>
          </div>
          <div className="takeaway-custom">
            <div className="takeaway-letter">C</div>
            <div>
              <h4>Journey maps make stakeholder alignment much easier</h4>
              <p>Presenting a journey map that shows exactly where users feel "disappointed" and why is far more persuasive than a list of pain points. Visualising emotional drop-off gave the team a shared language for prioritising solutions - and a clear rationale for why the Decision phase needed the most attention.</p>
            </div>
          </div>
          <div className="takeaway-custom">
            <div className="takeaway-letter">D</div>
            <div>
              <h4>Trust is a system, not a feature</h4>
              <p>No single intervention would have fixed the confidence gap. The verified badge, guest photos, comparison tools, and date-stamped images work together to build a coherent trust architecture. This reinforced that design solutions should be evaluated as a system - not as isolated additions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}

<div className="project-navigation" style={{ padding: '0 5% 5rem', maxWidth: '1200px', margin: '0 auto' }}>
  <button onClick={handleBackToProjects} className="btn btn-secondary">
    <i className="fas fa-arrow-left"></i>
    <span>Back to Projects</span>
  </button>

  <Link to="/projects/2" className="btn btn-primary">
    <span>Next Project: Byblos</span>
    <i className="fas fa-arrow-right"></i>
  </Link>
</div>
    </div>
  );
};

export default AirbnbProject;