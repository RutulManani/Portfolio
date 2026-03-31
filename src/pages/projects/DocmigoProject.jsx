import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../components/ProjectDetail.css'

// Import all Docmigo images
import docmigoHeroImg from '../../assets/images/Docmigo.png'
import personaDoctorImg from '../../assets/images/user-persona.png'
import wireframeImg from '../../assets/images/docmigo-mockup-5.png'
import styleGuideImg from '../../assets/images/docmigo-grid.jpg'
import visualDesignsImg from '../../assets/images/Docmigo-mockup1.jpg'
import visualDesignsImg2 from '../../assets/images/Docmigo-mockup2.jpg'
import visualDesignsImg3 from '../../assets/images/Docmigo-mockup3.jpg'
import competitiveAnalysisImg from '../../assets/images/docmigo-competitive-analysis.png'
import iaDiagramImg from '../../assets/images/info-arch.png'

const DocmigoProject = () => {
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

  const surveyData = [
    {
      question: 'Do you have a latest or updated software in your hospital?',
      yes: 32,
      no: 68,
      insight:
        'The majority of clinics surveyed were still operating without any digital management software - confirming the gap in the market.'
    },
    {
      question: 'Do you want your patients connected with you digitally?',
      yes: 88,
      no: 12,
      insight:
        'Near-unanimous appetite for digital patient connection - validating the WhatsApp-integrated patient engagement module.'
    },
    {
      question: 'Do you think Docmigo would help solve your problems?',
      yes: 91,
      no: 9,
      insight:
        'Strong problem-solution fit confirmed. The 9% who were unsure were primarily concerned about training time.'
    },
    {
      question:
        'Do you want patients to be able to view their medical records?',
      yes: 79,
      no: 21,
      insight:
        'Significant demand for patient-facing record access - confirming e-prescription and medical history as core MVP features.'
    }
  ]

  const statData = [
    {
      value: '5.2M',
      label: 'Medical errors annually in India - the 3rd leading cause of death'
    },
    {
      value: '3rd',
      label:
        'Most preventable errors stem from communication gaps and missing records'
    },
    {
      value: '~60%',
      label:
        "Of hospital admin time consumed by tasks that don't directly support patient care"
    }
  ]

  return (
    <div className='docmigo-project'>
      <style jsx='true'>{`
        .docmigo-project {
          --project-accent: #3c66c0;
          --project-accent-dim: rgba(60, 102, 192, 0.1);
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

        .docmigo-logo-wrap {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          background: var(--project-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(60, 102, 192, 0.3);
        }

        .docmigo-logo-wrap svg {
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

        @media (max-width: 768px) {
          .hero-banner-inner {
            flex-direction: column;
            text-align: center;
          }
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

        /* Stats Grid */
        .stats-grid-custom {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .stat-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 1.8rem;
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
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .stats-grid-custom {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .stats-grid-custom {
            grid-template-columns: 1fr;
          }
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
          box-shadow: 0 4px 20px rgba(60, 102, 192, 0.1);
        }

        .hypothesis-box::before {
          content: '{ }';
          position: absolute;
          bottom: 1rem;
          right: 2rem;
          font-family: monospace;
          font-size: 5rem;
          color: rgba(60, 102, 192, 0.05);
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

        /* Problems Grid */
        .problems-grid-custom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .problem-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 10px;
          padding: 1.8rem;
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .problem-card-custom:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
        }

        .problem-card-custom::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: var(--project-accent);
          border-radius: 3px 0 0 3px;
        }

        .problem-icon {
          font-size: 1.5rem;
          margin-bottom: 0.9rem;
          display: block;
        }

        .problem-card-custom h4 {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          color: var(--project-text);
        }

        .problem-card-custom p {
          font-size: 0.88rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .problems-grid-custom {
            grid-template-columns: 1fr;
          }
        }

        /* Personas Grid */
        .personas-grid-custom {
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

        .persona-subtitle {
          font-size: 0.8rem;
          color: var(--project-text-secondary);
        }

        .persona-details p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
          margin-bottom: 0.8rem;
        }

        .persona-details p strong {
          color: var(--project-text);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .personas-grid-custom {
            grid-template-columns: 1fr;
          }
        }

        /* MVP Grid */
        .mvp-grid-custom {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .mvp-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 10px;
          padding: 1.8rem;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .mvp-card-custom:hover {
          transform: translateY(-4px);
          border-color: var(--project-accent);
        }

        .mvp-icon {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          display: block;
        }

        .mvp-card-custom h4 {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: var(--project-text);
        }

        .mvp-card-custom p {
          font-size: 0.85rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
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

        @media (max-width: 1024px) {
          .process-grid-custom {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .process-grid-custom {
            grid-template-columns: 1fr;
          }
        }

        /* Survey Grid */
        .survey-grid-custom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .survey-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
        }

        .survey-question {
          font-size: 1rem;
          font-weight: 600;
          color: var(--project-text);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .survey-bar-container {
          margin-bottom: 1rem;
        }

        .survey-bar-label {
          margin-bottom: 0.8rem;
        }

        .survey-bar-label span {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          margin-bottom: 0.3rem;
        }

        .survey-percent {
          color: var(--project-accent);
          font-weight: 600;
        }

        .survey-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 0.2rem;
        }

        .survey-bar-fill {
          height: 100%;
          background: var(--project-accent);
          border-radius: 4px;
          transition: width 1s ease;
        }

        .survey-bar-fill.no {
          background: rgba(255, 255, 255, 0.2);
        }

        .survey-insight {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--project-border);
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          font-style: italic;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .survey-grid-custom {
            grid-template-columns: 1fr;
          }
        }

        /* IA Grid */
        .ia-grid-custom {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin: 2.5rem 0;
        }

        .ia-branch-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
        }

        .ia-branch-custom h4 {
          font-family: var(--font-heading);
          color: var(--project-accent);
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--project-border);
        }

        .ia-branch-custom ul {
          list-style: none;
          padding: 0;
        }

        .ia-branch-custom li {
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.5;
        }

        .ia-branch-custom li::before {
          content: '→';
          color: var(--project-accent);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .ia-grid-custom {
            grid-template-columns: 1fr;
          }
        }

        /* Artifact Box */
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

        .artifact-dot:nth-child(1) {
          background: var(--project-accent);
        }
        .artifact-dot:nth-child(2) {
          background: var(--project-accent);
          opacity: 0.6;
        }
        .artifact-dot:nth-child(3) {
          background: var(--project-accent);
          opacity: 0.3;
        }

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

        /* Design System Grid */
        .design-system-grid-custom {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .ds-card-custom {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
        }

        .ds-label {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--project-accent);
          margin-bottom: 1.5rem;
        }

        .color-dots {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .color-dot {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 2px solid var(--project-border);
        }

        .type-sample {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--project-text);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .type-detail {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          margin-bottom: 1rem;
        }

        .grid-sample {
          display: flex;
          gap: 8px;
          height: 40px;
          align-items: stretch;
        }

        .grid-col {
          flex: 1;
          background: rgba(60, 102, 192, 0.15);
          border-radius: 4px;
          border: 1px solid rgba(60, 102, 192, 0.2);
        }

        @media (max-width: 1024px) {
          .design-system-grid-custom {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .design-system-grid-custom {
            grid-template-columns: 1fr;
          }
        }

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
          border: 1px solid rgba(60, 102, 192, 0.2);
        }

        .solution-card-custom.accent .solution-tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .solutions-grid-custom {
            grid-template-columns: 1fr;
          }
        }

        /* Final Designs */
        .mockup-full-container {
          width: 100%;
          margin: 2rem 0;
          padding: 0;
        }

        .mockup-full-image {
          width: 100%;
          height: auto;
          margin-bottom: 1rem;
          display: block;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--project-border);
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

        @media (max-width: 768px) {
          .takeaway-custom {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
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
        @media (max-width: 480px) {
          .project-hero-custom h1 {
            font-size: 2rem;
          }
          .hero-sub {
            font-size: 1rem;
          }
          .stat-value-custom {
            font-size: 2rem;
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
          <img src={docmigoHeroImg} alt='Docmigo Hospital App' />
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
            Designing a hospital that <em>runs itself</em>
          </h1>
          <p className='hero-sub'>
            Small and mid-sized hospitals in India were drowning in paper,
            losing revenue, and making avoidable errors - not from lack of care,
            but from a total absence of the right tools. Docmigo was designed to
            change that, starting with the people who use it most: doctors and
            receptionists.
          </p>

          <div className='hero-meta'>
            <div className='meta-item'>
              <label>My Role</label>
              <p>UX Researcher & Designer, Graphic Designer</p>
            </div>
            <div className='meta-item'>
              <label>Methods</label>
              <p>Stakeholder Interviews · User Surveys · Journey Mapping</p>
            </div>
            <div className='meta-item'>
              <label>Context</label>
              <p>Internship - end-to-end product design</p>
            </div>
            <div className='meta-item'>
              <label>Target Users</label>
              <p>
                Doctors & receptionists in small to mid-sized Indian hospitals
              </p>
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
          <div className='docmigo-logo-wrap'>
            <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
              <rect
                x='4'
                y='3'
                width='18'
                height='23'
                rx='3'
                stroke='white'
                strokeWidth='2'
                fill='none'
              />
              <path
                d='M9 10h8M9 14h8M9 18h5'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <circle cx='24' cy='24' r='6' fill='white' />
              <path
                d='M22 24h4M24 22v4'
                stroke='#3c66c0'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
          <p className='hero-banner-text'>
            "India sees approximately 5.2 million medical errors every year.
            Many are traceable to a single root cause:{' '}
            <strong>
              information that didn't reach the right person at the right time.
            </strong>
            "
          </p>
        </div>
      </div>

      {/* SECTION 1: The Problem */}
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
          Paper-based operations aren't just inefficient - they're dangerous
        </h2>
        <p className='body-text'>
          During the research phase, a consistent picture emerged across clinic
          visits and stakeholder conversations:{' '}
          <strong>
            most small and mid-sized hospitals in India were still running on
            paper registers, WhatsApp messages, and verbal handoffs.
          </strong>{' '}
          This wasn't a preference - it was a gap in the market. Existing tools
          were either too expensive, too complex, or built for a Western
          healthcare context.
        </p>
        <p className='body-text'>
          The consequences weren't just operational. Miscommunication between
          staff led to duplicate tests, missed prescriptions, and billing
          errors. Patient records lived in physical files that could be lost,
          misfiled, or simply never retrieved during a critical moment.
        </p>

        <div className='stats-grid-custom'>
          {statData.map((stat, index) => (
            <div key={index} className='stat-card-custom'>
              <span className='stat-value-custom'>{stat.value}</span>
              <span className='stat-label-custom'>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className='hypothesis-box'>
          <p>
            The question wasn't "how do we digitise a hospital?" It was:{' '}
            <strong>
              what does a doctor actually need to do their job better
            </strong>{' '}
            - and how do we get out of their way for everything else?
          </p>
        </div>

        <div className='problems-grid-custom'>
          <div className='problem-card-custom'>
            <span className='problem-icon'>📋</span>
            <h4>Inefficient operations</h4>
            <p>
              Redundant information sharing, manual follow-ups, and inconsistent
              communication created significant time loss across departments -
              consuming hours that should have been spent with patients.
            </p>
          </div>
          <div className='problem-card-custom'>
            <span className='problem-icon'>📦</span>
            <h4>Inventory flying blind</h4>
            <p>
              Pharmacy and supply inventory was tracked in paper registers and
              basic spreadsheets, making it nearly impossible to forecast stock
              needs or catch shortages before they became critical.
            </p>
          </div>
          <div className='problem-card-custom'>
            <span className='problem-icon'>💬</span>
            <h4>Broken communication loops</h4>
            <p>
              Patients were reluctant to share full medical histories in rushed
              appointments. Without comprehensive records, doctors were making
              diagnoses with incomplete information.
            </p>
          </div>
          <div className='problem-card-custom'>
            <span className='problem-icon'>💸</span>
            <h4>Revenue leakage</h4>
            <p>
              Manual billing, no payment tracking, and absent patient follow-up
              systems meant hospitals were consistently losing revenue they'd
              already earned - and patients they could have retained.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: User Personas */}
      <div
        className='section-full-custom fade-section'
        data-section='personas'
        style={
          visibleSections.personas
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>User Personas</span>
          </div>
          <h2 className='section-heading'>
            Two very different users sharing one product
          </h2>
          <p className='body-text'>
            One of the defining design challenges of Docmigo was that it had to
            serve two fundamentally different users within the same system. The
            doctor and the receptionist have different goals, different levels
            of digital comfort, and radically different time pressures.
          </p>

          <div className='personas-grid-custom'>
            <div className='persona-card-custom'>
              <div className='persona-header'>
                <span className='persona-icon'>👨‍⚕️</span>
                <div>
                  <h3>The Doctor</h3>
                  <div className='persona-subtitle'>Primary power user</div>
                </div>
              </div>
              <div className='persona-details'>
                <p>
                  <strong>Goal:</strong> See more patients with fewer
                  administrative interruptions. Access complete patient history
                  in seconds, not minutes.
                </p>
                <p>
                  <strong>Frustration:</strong> Time lost to paperwork, chasing
                  test results, and correcting billing errors that shouldn't
                  require their involvement.
                </p>
                <p>
                  <strong>Design implication:</strong> Every interaction must be
                  optimised for speed. The doctor shouldn't need to navigate
                  more than 2–3 taps to reach any critical function.
                </p>
              </div>
            </div>

            <div className='persona-card-custom'>
              <div className='persona-header'>
                <span className='persona-icon'>🧑‍💼</span>
                <div>
                  <h3>The Receptionist</h3>
                  <div className='persona-subtitle'>
                    Day-to-day operations owner
                  </div>
                </div>
              </div>
              <div className='persona-details'>
                <p>
                  <strong>Goal:</strong> Manage appointment flow, handle patient
                  queries, process payments - without errors and without keeping
                  patients waiting.
                </p>
                <p>
                  <strong>Frustration:</strong> Juggling phone calls, paper
                  registers, and manual WhatsApp messages simultaneously, with
                  no single source of truth.
                </p>
                <p>
                  <strong>Design implication:</strong> The interface must be
                  learnable without formal training. Complex tasks need to be
                  broken into clear, sequential steps.
                </p>
              </div>
            </div>
          </div>

          <div className='artifact-box-simple'>
            <div className='artifact-header'>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <span className='artifact-title'>
                User Personas - Doctor & Patient (detailed)
              </span>
            </div>
            <div className='artifact-body'>
              <img src={personaDoctorImg} alt='Doctor Persona' />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Product Definition */}
      <section
        className='section-custom fade-section'
        data-section='product-definition'
        style={
          visibleSections['product-definition']
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>Product Definition</span>
        </div>
        <h2 className='section-heading'>
          Five features, each earned by the research
        </h2>
        <p className='body-text'>
          The MVP was defined by cross-referencing the survey findings with the
          pain points from stakeholder interviews. Every feature on this list
          had to answer a specific problem - no feature made it in on assumption
          alone.
        </p>

        <div className='mvp-grid-custom'>
          <div className='mvp-card-custom'>
            <span className='mvp-icon'>📅</span>
            <h4>Appointment scheduling</h4>
            <p>
              Pre-booking with Google Calendar integration and automated patient
              reminders - eliminating the phone-based back-and-forth that
              consumed receptionist time.
            </p>
          </div>
          <div className='mvp-card-custom'>
            <span className='mvp-icon'>💬</span>
            <h4>WhatsApp patient engagement</h4>
            <p>
              Appointment confirmations, prescription shares, and billing
              notifications via the channel patients already use - reducing
              no-shows and missed communications.
            </p>
          </div>
          <div className='mvp-card-custom'>
            <span className='mvp-icon'>💳</span>
            <h4>Payment management</h4>
            <p>
              Online payment processing with revenue dashboards - replacing
              manual billing and giving hospital owners real-time visibility
              into income and outstanding dues.
            </p>
          </div>
          <div className='mvp-card-custom'>
            <span className='mvp-icon'>📄</span>
            <h4>E-prescriptions & history</h4>
            <p>
              Digital prescriptions linked to a centralised patient record -
              enabling doctors to access full history at the point of care, not
              after hunting through paper files.
            </p>
          </div>
          <div className='mvp-card-custom'>
            <span className='mvp-icon'>🏥</span>
            <h4>OPD visit management</h4>
            <p>
              Outpatient department workflow fully compliant with the ABDM
              framework - enabling NDHM health ID integration without requiring
              a separate platform or process.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Research Approach */}
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
            <span className='step-num'>Research Approach</span>
          </div>
          <h2 className='section-heading'>
            From clinic visits to validated problem statements
          </h2>
          <p className='body-text'>
            The research phase had two goals: understand the actual shape of the
            problem through stakeholder interviews, then validate which
            solutions had genuine demand through surveys with real clinics and
            hospitals.
          </p>

          <div className='process-grid-custom'>
            <div className='process-card-custom'>
              <div className='process-num'>01</div>
              <h3>Stakeholder Interviews</h3>
              <p>
                Conversations with doctors, receptionists, and clinic owners to
                map the real workflow - not the idealised one.{' '}
                <strong>Goal:</strong> understand what was actually painful
                day-to-day, and what "better" would look like in practice.
              </p>
            </div>
            <div className='process-card-custom'>
              <div className='process-num'>02</div>
              <h3>Competitive Analysis</h3>
              <p>
                Benchmarked existing hospital management platforms to identify
                gaps. <strong>Key finding:</strong> no competitor offered
                automation-first workflows or NDHM/ABDM compliance out of the
                box for the SMB hospital segment.
              </p>
            </div>
            <div className='process-card-custom'>
              <div className='process-num'>03</div>
              <h3>User Surveys</h3>
              <p>
                Structured surveys deployed across clinics and hospitals to
                validate MVP feature priorities against real demand.{' '}
                <strong>Goal:</strong> avoid building assumptions into the
                product before confirming there was a market for each feature.
              </p>
            </div>
          </div>

          <div className='artifact-box-simple'>
            <div className='artifact-header'>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <span className='artifact-title'>
                Competitive Analysis - Docmigo vs existing hospital management
                platforms
              </span>
            </div>
            <div className='artifact-body'>
              <img src={competitiveAnalysisImg} alt='Competitive Analysis' />
            </div>
          </div>

          <blockquote className='pull-quote-custom'>
            The opportunity wasn't to out-feature existing tools - it was to be
            the first tool designed <em>with doctors</em> rather than for IT
            departments.
          </blockquote>
        </div>
      </div>

      {/* SECTION 5: User Surveys */}
      <section
        className='section-custom fade-section'
        data-section='surveys'
        style={
          visibleSections.surveys
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>User Surveys</span>
        </div>
        <h2 className='section-heading'>
          Validating demand before designing solutions
        </h2>
        <p className='body-text'>
          Rather than building around assumptions, surveys were deployed to
          clinics and hospitals to measure real interest in each proposed MVP
          feature. This step ensured the product wouldn't be designed in a
          vacuum - every feature had to be grounded in expressed need.
        </p>

        <div className='survey-grid-custom'>
          {surveyData.map((survey, index) => (
            <div key={index} className='survey-card-custom'>
              <div className='survey-question'>{survey.question}</div>
              <div className='survey-bar-container'>
                <div className='survey-bar-label'>
                  <span>
                    Yes <span className='survey-percent'>{survey.yes}%</span>
                  </span>
                  <div className='survey-bar'>
                    <div
                      className='survey-bar-fill'
                      style={{ width: `${survey.yes}%` }}
                    ></div>
                  </div>
                </div>
                <div className='survey-bar-label'>
                  <span>
                    No <span className='survey-percent'>{survey.no}%</span>
                  </span>
                  <div className='survey-bar'>
                    <div
                      className='survey-bar-fill no'
                      style={{ width: `${survey.no}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className='survey-insight'>{survey.insight}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Information Architecture */}
      <section
        className='section-custom fade-section'
        data-section='ia'
        style={
          visibleSections.ia ? { opacity: 1, transform: 'translateY(0)' } : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>Information Architecture</span>
        </div>
        <h2 className='section-heading'>One app, two distinct user flows</h2>
        <p className='body-text'>
          The IA had to solve a structural challenge: the doctor's interface and
          the receptionist's interface share the same data layer, but the tasks,
          priority hierarchy, and interaction patterns are completely different.
          A single unified nav would have buried critical functions for both
          users.
        </p>

        <div className='artifact-box-simple'>
          <div className='artifact-header'>
            <div className='artifact-dot'></div>
            <div className='artifact-dot'></div>
            <div className='artifact-dot'></div>
            <span className='artifact-title'>
              Information Architecture - full app structure
            </span>
          </div>
          <div className='artifact-body'>
            <img src={iaDiagramImg} alt='Information Architecture' />
          </div>
        </div>

        <div className='ia-grid-custom'>
          <div className='ia-branch-custom'>
            <h4>Doctor flow</h4>
            <ul>
              <li>Today's appointments & OPD queue</li>
              <li>Patient profile & full history</li>
              <li>E-prescription creation</li>
              <li>Lab results & reports</li>
              <li>Revenue overview</li>
            </ul>
          </div>
          <div className='ia-branch-custom'>
            <h4>Receptionist flow</h4>
            <ul>
              <li>Appointment booking & calendar</li>
              <li>Patient registration</li>
              <li>Billing & payment processing</li>
              <li>WhatsApp notifications</li>
              <li>Inventory status</li>
            </ul>
          </div>
        </div>

        <blockquote className='pull-quote-custom'>
          The IA decision to separate doctor and receptionist flows wasn't just
          a UX preference - it was a safety decision. A receptionist shouldn't
          be one mis-tap away from altering a prescription.
        </blockquote>
      </section>

      {/* SECTION 7: Design Process */}
      <div
        className='section-full-custom fade-section'
        data-section='design'
        style={
          visibleSections.design
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>Design Process</span>
          </div>
          <h2 className='section-heading'>
            From low-fi sketches to a tested visual system
          </h2>
          <p className='body-text'>
            The design process moved deliberately from structure to fidelity -
            starting with wireframes that tested flow and hierarchy before
            committing to any visual decisions. This order mattered: a
            beautifully designed screen that solves the wrong problem is still
            the wrong design.
          </p>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              margin: '2.5rem 0 1.5rem',
              color: 'var(--project-text)'
            }}
          >
            Low-fidelity wireframes - testing structure before style
          </h3>

          <div className='artifact-box-simple'>
            <div className='artifact-header'>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <span className='artifact-title'>
                Low-fidelity wireframes - core screens
              </span>
            </div>
            <div className='artifact-body'>
              <img src={wireframeImg} alt='Wireframes' />
            </div>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              margin: '3rem 0 1.5rem',
              color: 'var(--project-text)'
            }}
          >
            The design system - consistency as a reliability signal
          </h3>
          <p className='body-text'>
            In a medical context, visual consistency isn't just aesthetic - it
            builds confidence. If the interface looks and behaves predictably,
            users are less likely to make errors from interface confusion. The
            style guide was built around this principle.
          </p>

          <div className='design-system-grid-custom'>
            <div className='ds-card-custom'>
              <div className='ds-label'>Colour palette</div>
              <div className='color-dots'>
                <div
                  className='color-dot'
                  style={{ background: '#3257A8' }}
                ></div>
                <div
                  className='color-dot'
                  style={{ background: '#37A794' }}
                ></div>
                <div
                  className='color-dot'
                  style={{ background: '#333333' }}
                ></div>
                <div
                  className='color-dot'
                  style={{ background: '#4F4F4F' }}
                ></div>
                <div
                  className='color-dot'
                  style={{ background: '#F7F8FA' }}
                ></div>
                <div
                  className='color-dot'
                  style={{ background: '#b3b3b3' }}
                ></div>
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--project-text-secondary)',
                  lineHeight: '1.6'
                }}
              >
                Blue builds trust and signals professionalism. Neutral tones
                create a calm, clinical environment.
              </p>
            </div>
            <div className='ds-card-custom'>
              <div className='ds-label'>Typography</div>
              <div className='type-sample'>Aa</div>
              <p className='type-detail'>
                Mobile-first type scale optimised for glanceability under time
                pressure
              </p>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--project-text-secondary)'
                }}
              >
                Heading / Syne 20px bold · Body / Space Grotesk 14px regular ·
                Caption / 12px muted
              </p>
            </div>
            <div className='ds-card-custom'>
              <div className='ds-label'>Grid - Mobile 360px</div>
              <div className='grid-sample'>
                <div className='grid-col'></div>
                <div className='grid-col'></div>
              </div>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--project-text-secondary)',
                  marginTop: '1rem'
                }}
              >
                2 columns · 130px each · 30px gutter · Cross-platform: Android &
                iOS
              </p>
            </div>
          </div>

          <div className='artifact-box-simple'>
            <div className='artifact-header'>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <div className='artifact-dot'></div>
              <span className='artifact-title'>
                Style guide - full design system
              </span>
            </div>
            <div className='artifact-body'>
              <img src={styleGuideImg} alt='Style Guide' />
            </div>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.3rem',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              margin: '3rem 0 1.5rem',
              color: 'var(--project-text)'
            }}
          >
            Key design decisions and why they were made
          </h3>

          <div className='solutions-grid-custom'>
            <div className='solution-card-custom accent'>
              <div className='solution-num'>Decision 01</div>
              <h3>WhatsApp as the patient layer</h3>
              <p>
                Rather than building a patient-facing app - which would require
                download, registration, and habit change - Docmigo integrates
                patient communication entirely through WhatsApp. In India,
                WhatsApp is already the dominant communication tool across all
                demographics. Meeting patients where they already are removes
                onboarding friction entirely.
              </p>
              <span className='solution-tag'>
                Based on → survey data showing 88% wanted digital patient
                connection
              </span>
            </div>

            <div className='solution-card-custom'>
              <div className='solution-num'>Decision 02</div>
              <h3>ABDM compliance built in</h3>
              <p>
                Rather than treating regulatory compliance as an add-on,
                NDHM/ABDM framework integration was designed into the core OPD
                flow. Hospitals can generate and link NDHM health IDs without
                leaving the platform or setting up a separate system - reducing
                a major adoption barrier for the target segment.
              </p>
              <span className='solution-tag'>
                Based on → stakeholder interviews; compliance was cited as a
                blocker
              </span>
            </div>

            <div className='solution-card-custom'>
              <div className='solution-num'>Decision 03</div>
              <h3>Automation-first over feature-rich</h3>
              <p>
                Every workflow was designed to reduce the number of manual steps
                required. Appointment reminders send themselves. Billing
                generates from the prescription. Lab results route to the
                patient record automatically. The goal was to make the system
                proactive, so staff don't have to be.
              </p>
              <span className='solution-tag'>
                Based on → core insight: time lost to manual tasks is the #1
                pain point
              </span>
            </div>

            <div className='solution-card-custom'>
              <div className='solution-num'>Decision 04</div>
              <h3>Rightly priced for SMBs</h3>
              <p>
                Competitive analysis showed existing hospital software was
                priced for enterprise hospital chains. Docmigo's pricing
                strategy - and the design decisions that enabled it, like
                mobile-first to reduce infrastructure needs - was specifically
                modelled around the revenue profile of small and mid-sized
                clinics.
              </p>
              <span className='solution-tag'>
                Based on → competitive analysis; pricing was a consistent
                barrier
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8: Final Designs */}
      <section
        className='section-custom fade-section'
        data-section='final'
        style={
          visibleSections.final
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>Final Designs</span>
        </div>
        <h2 className='section-heading'>Visualizing the solutions</h2>
        <p className='body-text'>
          These mockups show how the research findings translated into concrete
          design interventions - from appointment flows to prescription
          management and patient profiles.
        </p>

        <div className='mockup-full-container'>
          <div>
            <img
              src={visualDesignsImg}
              alt='Docmigo Design Mockups Collection'
              className='mockup-full-image'
            />
          </div>
          <div>
            <img
              src={visualDesignsImg2}
              alt='Docmigo Additional Mockup 1'
              className='mockup-full-image'
            />
          </div>
          <div>
            <img
              src={visualDesignsImg3}
              alt='Docmigo Additional Mockup 2'
              className='mockup-full-image'
            />
          </div>
        </div>
      </section>

      {/* SECTION 9: Reflections */}
      <div
        className='section-full-custom fade-section'
        data-section='reflections'
        style={
          visibleSections.reflections
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>Reflections</span>
          </div>
          <h2 className='section-heading'>
            What designing for healthcare taught me
          </h2>

          <div className='takeaways-custom'>
            <div className='takeaway-custom'>
              <div className='takeaway-letter'>A</div>
              <div>
                <h4>
                  Designing for two users means designing two products inside
                  one
                </h4>
                <p>
                  The doctor and the receptionist use the same data but have
                  fundamentally different jobs. Every screen decision had to be
                  evaluated twice: does this work for the person under clinical
                  time pressure, and does it work for the person managing 40
                  patients at a front desk simultaneously? When the answer was
                  "no" for either, the design went back.
                </p>
              </div>
            </div>
            <div className='takeaway-custom'>
              <div className='takeaway-letter'>B</div>
              <div>
                <h4>Surveys are hypothesis tests, not just data collection</h4>
                <p>
                  The user surveys weren't done to validate what we already
                  believed - they were done to challenge it. The finding that
                  21% of hospitals didn't want patients accessing their own
                  records was unexpected, and it shaped a more nuanced approach
                  to data visibility settings in the final design.
                </p>
              </div>
            </div>
            <div className='takeaway-custom'>
              <div className='takeaway-letter'>C</div>
              <div>
                <h4>
                  In healthcare, errors in the interface become errors in care
                </h4>
                <p>
                  Every design pattern had to be evaluated for failure mode, not
                  just success state. What happens if a receptionist
                  accidentally closes a payment screen mid-entry? What if a
                  doctor selects the wrong patient from a list? The visual
                  hierarchy and confirmation patterns in the final design were
                  driven by these worst-case scenarios, not the ideal flow.
                </p>
              </div>
            </div>
            <div className='takeaway-custom'>
              <div className='takeaway-letter'>D</div>
              <div>
                <h4>Internship context means constraints are real</h4>
                <p>
                  Working with actual client timelines, stakeholder feedback
                  cycles, and cross-functional dependencies is different from
                  academic projects. The most valuable skill I developed wasn't
                  a design method - it was learning to make defensible decisions
                  quickly when full information isn't available, and communicate
                  those decisions clearly to non-designers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <Link to='/projects/2' className='btn btn-secondary'>
            <i className='fas fa-arrow-left'></i>
            <span>Previous: Byblos</span>
          </Link>
          <Link to='/projects/4' className='btn btn-primary'>
            <span>Next: SpendSmart</span>
            <i className='fas fa-arrow-right'></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DocmigoProject
