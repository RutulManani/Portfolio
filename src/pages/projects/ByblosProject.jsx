import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../components/ProjectDetail.css'

// Import all Byblos images
import byblosHeroImg from '../../assets/images/Byblos.png'
import byblosUserFlowImg from '../../assets/images/user flow.png'
import byblosWebPaperImg from '../../assets/images/web-paper.png'
import byblosMobilePaperImg from '../../assets/images/mobile-paper.png'
import byblosWebwireframeImg from '../../assets/images/web-wireframe.png'
import byblosMobilewireframeImg from '../../assets/images/mobile-wireframe.png'
import byblosWebHiFiImg from '../../assets/images/byblos-mockup-1.png'
import byblosMobileHiFiImg from '../../assets/images/byblos-mockup-2.png'
import byblosFinalMockupImg from '../../assets/images/byblos-mockup-3.png'
import byblosStyleGuideImg from '../../assets/images/byblos-style-guide.jpg'

const ByblosProject = () => {
  const navigate = useNavigate()
  const [visibleSections, setVisibleSections] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)

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

  const openImageModal = imageUrl => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // User testing insights
  const userTestingInsights = [
    'Initially confused about favorites button but liked its functionality',
    'Suggested further grouping and filtering options for menu items',
    'Preferred price next to item names on product details screen',
    'Felt homepage layout was oversized',
    "Proposed breaking up dense text on 'About Us' section",
    "Desired clearer organization for menu items and 'forgot password' option",
    "Struggled to locate 'About Us' section and suggested visual cues for scrolling",
    'Recommended adding more images on homepage',
    'Proposed adjusting alignment of menu categories on menu page',
    'Advocated for incorporating more images on the homepage, potentially featuring the owner and chef'
  ]

  return (
    <div className='byblos-project'>
      <style jsx='true'>{`
        .byblos-project {
          --project-accent: #1ba3d4;
          --project-accent-dim: rgba(77, 205, 255, 0.1);
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

        /* Simple Image Container */
        .mockup-full-container {
          width: 100%;
          margin: 2rem 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .mockup-full-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--project-border);
          cursor: pointer;
        }

        /* Problem Grid */
        .problem-grid-simple {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .problem-card-simple {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
          transition: border-color 0.3s ease;
        }

        .problem-card-simple:hover {
          border-color: var(--project-accent);
        }

        .problem-card-simple h3 {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: var(--project-text);
        }

        .problem-card-simple p {
          font-size: 0.95rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        /* Process Timeline */
        .process-timeline-unique {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin: 3rem 0;
          position: relative;
        }

        .process-timeline-unique::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--project-accent);
          opacity: 0.3;
        }

        .process-item {
          display: flex;
          gap: 2rem;
          position: relative;
        }

        .process-number {
          width: 40px;
          height: 40px;
          background: var(--project-accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--project-bg);
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        .process-content {
          flex: 1;
          padding-bottom: 1rem;
        }

        .process-content h3 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: var(--project-text);
        }

        .process-content p {
          font-size: 0.95rem;
          color: var(--project-text-secondary);
          line-height: 1.7;
        }

        /* User Testing Grid */
        .testing-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin: 2.5rem 0;
        }

        .testing-card {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          transition: border-color 0.3s ease;
        }

        .testing-card:hover {
          border-color: var(--project-accent);
        }

        .testing-card p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
        }

        .testing-card p::before {
          content: '💬 ';
          color: var(--project-accent);
          font-size: 1rem;
        }

        /* Style Guide Container */
        .style-guide-container {
          width: 100%;
          margin: 2rem 0;
        }

        .style-guide-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--project-border);
          cursor: pointer;
        }

        /* Solutions Grid */
        .solutions-grid-simple {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .solution-card-simple {
          background: var(--project-bg-secondary);
          border: 1px solid var(--project-border);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
        }

        .solution-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .solution-card-simple h3 {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.8rem;
          color: var(--project-text);
        }

        .solution-card-simple p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
        }

        /* Takeaways */
        .takeaways-simple {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin: 2.5rem 0;
        }

        .takeaway-simple {
          background: var(--project-bg-secondary);
          border-left: 3px solid var(--project-accent);
          padding: 1.5rem;
        }

        .takeaway-simple h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--project-text);
        }

        .takeaway-simple p {
          font-size: 0.9rem;
          color: var(--project-text-secondary);
          line-height: 1.6;
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

        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          cursor: pointer;
        }

        .modal-content {
          max-width: 90vw;
          max-height: 90vh;
        }

        .modal-content img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .close-modal {
          position: absolute;
          top: 20px;
          right: 30px;
          color: white;
          font-size: 40px;
          font-weight: bold;
          cursor: pointer;
          z-index: 2001;
        }

        @media (max-width: 768px) {
          .problem-grid-simple,
          .testing-grid,
          .solutions-grid-simple,
          .takeaways-simple {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className='fade-section'
        data-section='hero'
        style={
          visibleSections.hero ? { opacity: 1, transform: 'translateY(0)' } : {}
        }
      >
        <div className='hero-image-full'>
          <img
            src={byblosHeroImg}
            alt='Byblos Restaurant - Eastern Mediterranean Cuisine'
          />
        </div>
      </section>

      {/* Hero Content */}
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
            Streamlining the <em>ordering experience</em> for Byblos Restaurant
          </h1>
          <p className='hero-sub'>
            Our objective was to streamline the ordering process for Byblos,
            providing customers with flexibility to place orders from anywhere,
            whether at home or on the go. This enhanced convenience not only
            improves customer satisfaction but also drives revenue growth for
            the business.
          </p>

          <div className='hero-meta'>
            <div className='meta-item'>
              <label>My Role</label>
              <p>UI/UX Designer</p>
            </div>
            <div className='meta-item'>
              <label>Methodologies</label>
              <p>User flows · Paper Prototyping · Wireframing</p>
            </div>
            <div className='meta-item'>
              <label>Context</label>
              <p>College Project - Humber College</p>
            </div>
            <div className='meta-item'>
              <label>Target Users</label>
              <p>Tourists, locals, students, families</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
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
        <h2 className='section-heading'>A menu without ordering capability</h2>
        <p className='body-text'>
          The Byblos website served as a digital menu board - users could browse
          food options but had no way to place orders directly. This absence of
          an ordering feature limited user engagement and transactional
          capabilities, potentially resulting in missed revenue opportunities
          for the restaurant.
        </p>
        <p className='body-text'>
          Additionally, the overall interface failed to attract users
          effectively, resulting in a lack of motivation for them to proceed
          with ordering. The challenge was to{' '}
          <strong>
            transform a static menu into an engaging ordering platform
          </strong>{' '}
          that captures the authentic Eastern Mediterranean dining experience.
        </p>

        <div className='problem-grid-simple'>
          <div className='problem-card-simple'>
            <h3>📋 Menu Only</h3>
            <p>
              The website provided a menu for users to peruse food options
              without the capability to place orders directly.
            </p>
          </div>
          <div className='problem-card-simple'>
            <h3>🎯 Low Engagement</h3>
            <p>
              The interface failed to attract users effectively, resulting in a
              lack of motivation for them to proceed with ordering.
            </p>
          </div>
          <div className='problem-card-simple'>
            <h3>💰 Missed Revenue</h3>
            <p>
              Absence of ordering capability limited user engagement and
              transactional capabilities, resulting in missed revenue
              opportunities.
            </p>
          </div>
          <div className='problem-card-simple'>
            <h3>📱 No Convenience</h3>
            <p>
              Customers had no flexibility to place orders from home or on the
              go, limiting the restaurant's reach and accessibility.
            </p>
          </div>
        </div>
      </section>

      {/* User Flow Section */}
      <section
        className='section-custom fade-section'
        data-section='userflow'
        style={
          visibleSections.userflow
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>User Flow</span>
        </div>
        <h2 className='section-heading'>Mapping the ordering journey</h2>
        <p className='body-text'>
          Understanding how users navigate from browsing to ordering was
          critical. We mapped out the complete user flow to identify friction
          points and optimize the path to purchase.
        </p>

        <div className='mockup-full-container'>
          <div>
            <img
              src={byblosUserFlowImg}
              alt='Byblos User Flow Diagram'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosUserFlowImg)}
            />
          </div>
        </div>
      </section>

      {/* Design Process */}
      <div
        className='section-full-custom fade-section'
        data-section='process'
        style={
          visibleSections.process
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>Design Process</span>
          </div>
          <h2 className='section-heading'>How we got there</h2>

          <div className='process-timeline-unique'>
            <div className='process-item'>
              <div className='process-number'>1</div>
              <div className='process-content'>
                <h3>Discovery & Research</h3>
                <p>
                  Interviewed restaurant staff and customers to understand needs
                  and map the user flow for ordering an item. Identified pain
                  points in the existing menu-only experience and gathered
                  requirements for the ordering system.
                </p>
              </div>
            </div>
            <div className='process-item'>
              <div className='process-number'>2</div>
              <div className='process-content'>
                <h3>Prototyping & Iteration</h3>
                <p>
                  Created paper prototypes for quick iteration and feedback.
                  Developed low-fidelity wireframes for both web and mobile
                  platforms, testing navigation and layout before committing to
                  high-fidelity designs.
                </p>
              </div>
            </div>
            <div className='process-item'>
              <div className='process-number'>3</div>
              <div className='process-content'>
                <h3>User Testing & Validation</h3>
                <p>
                  Conducted usability testing with real users to gather
                  insights. Users liked core features but suggested clearer
                  icons, better menu organization, shorter text, and more
                  imagery-especially on the homepage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wireframes Section */}
      <section
        className='section-custom fade-section'
        data-section='wireframes'
        style={
          visibleSections.wireframes
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>Wireframes</span>
        </div>
        <h2 className='section-heading'>From paper to pixels</h2>
        <p className='body-text'>
          We started with paper prototypes to quickly test ideas, then
          progressed to low-fidelity digital wireframes for both web and mobile
          platforms. This iterative approach allowed us to validate concepts
          early and often.
        </p>
        <div className='mockup-full-container'>
          <div>
            <img
              src={byblosWebPaperImg}
              alt='Web Paper Prototyping'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosWebPaperImg)}
            />
          </div>
          <div>
            <img
              src={byblosMobilePaperImg}
              alt='Mobile Low Fidelity Prototyping'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosMobilePaperImg)}
            />
          </div>
          <div>
            <img
              src={byblosWebwireframeImg}
              alt='Web Wireframe'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosWebwireframeImg)}
            />
          </div>
          <div>
            <img
              src={byblosMobilewireframeImg}
              alt='Mobile Wireframe'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosMobilewireframeImg)}
            />
          </div>
        </div>
      </section>

      {/* User Testing Section */}
      <div
        className='section-full-custom fade-section'
        data-section='testing'
        style={
          visibleSections.testing
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>User Tests</span>
          </div>
          <h2 className='section-heading'>What users told us</h2>
          <p className='body-text'>
            Based on low-fidelity designs, we conducted user tests to understand
            their insights and gather feedback. These insights directly shaped
            our high-fidelity designs.
          </p>

          <div className='testing-grid'>
            {userTestingInsights.map((insight, index) => (
              <div key={index} className='testing-card'>
                <p>{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Style Guide Section */}
      <section
        className='section-custom fade-section'
        data-section='styleguide'
        style={
          visibleSections.styleguide
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>Style Guide</span>
        </div>
        <h2 className='section-heading'>Visual identity & design system</h2>
        <p className='body-text'>
          A cohesive style guide was developed to ensure consistency across all
          platforms. The design system includes color palette, typography,
          spacing, and component library that reflects the authentic Eastern
          Mediterranean aesthetic.
        </p>

        <div className='style-guide-container'>
          <img
            src={byblosStyleGuideImg}
            alt='Byblos Style Guide - Visual Identity and Design System'
            className='style-guide-image'
          />
        </div>
      </section>

      {/* High-Fidelity Designs Section */}
      <section
        className='section-custom fade-section'
        data-section='hifi'
        style={
          visibleSections.hifi ? { opacity: 1, transform: 'translateY(0)' } : {}
        }
      >
        <div className='section-label'>
          <span className='step-num'>High-Fidelity Designs</span>
        </div>
        <h2 className='section-heading'>Bringing the vision to life</h2>
        <p className='body-text'>
          After incorporating user feedback, we developed high-fidelity
          prototypes for both web and mobile platforms. The designs focus on
          visual hierarchy, clear navigation, and an authentic Eastern
          Mediterranean aesthetic.
        </p>
        <div className='mockup-full-container'>
          <div>
            <img
              src={byblosWebHiFiImg}
              alt='Web High Fidelity Prototyping'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosWebHiFiImg)}
            />
          </div>
          <div>
            <img
              src={byblosMobileHiFiImg}
              alt='Mobile High Fidelity Prototyping'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosMobileHiFiImg)}
            />
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <div
        className='section-full-custom fade-section'
        data-section='solutions'
        style={
          visibleSections.solutions
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>Solutions</span>
          </div>
          <h2 className='section-heading'>What we built</h2>
          <p className='body-text'>
            Based on user research and testing, we implemented three key
            solutions that transformed the Byblos website from a static menu
            into an engaging ordering platform.
          </p>

          <div className='solutions-grid-simple'>
            <div className='solution-card-simple'>
              <span className='solution-icon'>🛵</span>
              <h3>Online Ordering</h3>
              <p>
                Implemented full online ordering with delivery and pickup
                options, allowing customers to place orders from anywhere, at
                any time.
              </p>
            </div>
            <div className='solution-card-simple'>
              <span className='solution-icon'>📋</span>
              <h3>Menu Redesign</h3>
              <p>
                Improved organization with grouping and filtering options,
                making it easier for customers to find what they're looking for.
              </p>
            </div>
            <div className='solution-card-simple'>
              <span className='solution-icon'>💳</span>
              <h3>Streamlined Checkout</h3>
              <p>
                Simplified payment process with fewer steps, reducing friction
                and increasing conversion rates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Mockups Section */}
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
          <span className='step-num'>Final Mockups</span>
        </div>
        <h2 className='section-heading'>The finished product</h2>
        <p className='body-text'>
          The final designs deliver a cohesive cross-platform experience that
          captures the essence of Eastern Mediterranean cuisine while providing
          a seamless ordering experience.
        </p>

        <div className='mockup-full-container'>
          <div>
            <img
              src={byblosFinalMockupImg}
              alt='Byblos Final Mockups'
              className='mockup-full-image'
              onClick={() => openImageModal(byblosFinalMockupImg)}
            />
          </div>
        </div>
      </section>

      {/* Takeaways */}
      <div
        className='section-full-custom fade-section'
        data-section='takeaways'
        style={
          visibleSections.takeaways
            ? { opacity: 1, transform: 'translateY(0)' }
            : {}
        }
      >
        <div className='inner'>
          <div className='section-label'>
            <span className='step-num'>Key Takeaways</span>
          </div>
          <h2 className='section-heading'>What I learned</h2>

          <div className='takeaways-simple'>
            <div className='takeaway-simple'>
              <h4>Clear visual hierarchy matters</h4>
              <p>
                Food ordering requires users to quickly scan menu items, see
                prices, and understand options without cognitive overload.
              </p>
            </div>
            <div className='takeaway-simple'>
              <h4>Mobile-first is essential</h4>
              <p>
                Most customers browse and order from their phones, so the mobile
                experience must be flawless.
              </p>
            </div>
            <div className='takeaway-simple'>
              <h4>Fewer steps = more orders</h4>
              <p>
                Every additional click is a potential drop-off point -
                streamline checkout ruthlessly.
              </p>
            </div>
            <div className='takeaway-simple'>
              <h4>Test early, test often</h4>
              <p>
                Testing low-fidelity prototypes revealed issues we never would
                have anticipated on our own.
              </p>
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
          <Link to='/projects/1' className='btn btn-secondary'>
            <i className='fas fa-arrow-left'></i>
            <span>Previous: Airbnb</span>
          </Link>
          <Link to='/projects/3' className='btn btn-primary'>
            <span>Next: Docmigo</span>
            <i className='fas fa-arrow-right'></i>
          </Link>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className='image-modal' onClick={closeImageModal}>
          <span className='close-modal'>&times;</span>
          <div className='modal-content'>
            <img src={selectedImage} alt='Enlarged view' />
          </div>
        </div>
      )}
    </div>
  )
}

export default ByblosProject
