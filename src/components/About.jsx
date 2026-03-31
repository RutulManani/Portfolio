import React from 'react'
import aboutImage from '../assets/images/IMG_0410.png'
import './About.css'

const About = () => {
  const skills = [
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
    'Data Synthesis'
  ]

  return (
    <section id='about' className='about-section'>
      <div className='container'>
        <h2 className='about-title'>Ctrl + Me</h2>

        <div className='about-content'>
          <div className='about-text-content'>
            <div className='about-text'>
              <p className='about-description'>
                I'm a Toronto-based UX/UI designer and front-end developer with
                4+ years of cross-industry experience and a background in
                Industrial Design. I pursued post-graduate studies in UX Design
                and Web Development at Humber College, where I honed my ability
                to bridge the gap between design thinking and technical
                execution. From insurance to AI-driven platforms, I specialize
                in crafting intuitive, scalable digital experiences that solve
                real human problems - not just look good on a screen.
              </p>
            </div>

            <div className='skills-container'>
              <h3 className='skills-title'>My Skills</h3>
              <div className='skills-grid'>
                {skills.map((skill, index) => (
                  <div key={index} className='skill-item'>
                    <span className='skill-bullet'>•</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='about-image-wrapper'>
            <div className='about-image-container'>
              <img
                src={aboutImage}
                alt='Rutul Manani'
                className='profile-image'
              />
              <div className='profile-decoration'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
