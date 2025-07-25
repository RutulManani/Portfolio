import React from 'react';
import aboutImage from '../assets/images/IMG_0410.png';
import './About.css';

const About = () => {
  const skills = [
    'UX Research', 'UI Design', 'Figma', 'Usability Testing',
    'User Flows', 'Wireframing', 'Prototyping', 'Product Design',
    'User Interviews', 'Information Architecture', 'Interaction Design', 'Design Systems'
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="about-title">Ctrl + Me</h2>
        
        <div className="about-content">
          <div className="about-text-content">
            <div className="about-text">
              <p className="about-description">
                I'm a Toronto-based UX/UI designer and web developer with 3 years of cross-industry experience and a background in Industrial Design. Currently pursuing post-graduate studies in UX Design and Web Development at Humber College, I bring a blend of design thinking and technical expertise to craft intuitive digital experiences. From insurance to AI-driven platforms, I bridge design and development to deliver human-centered, scalable solutions.
              </p>
            </div>
            
            <div className="skills-container">
              <h3 className="skills-title">My Skills</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-bullet">•</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="about-image-wrapper">
            <div className="about-image-container">
              <img src={aboutImage} alt="Rutul Manani" className="profile-image" />
              <div className="profile-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;