import React from 'react';
import aboutImage from '../assets/images/IMG_0410.png';
import sketch1 from '../assets/images/sketch1.jpg';
import sketch2 from '../assets/images/sketch2.jpg';
import sketch3 from '../assets/images/sketch3.jpg';
import sketch4 from '../assets/images/sketch4.jpg';
import sketch5 from '../assets/images/sketch5.jpg';
import './About.css';

const About = () => {
  const skills = [
    'UX Research', 'UI Design', 'Figma', 'Usability Testing',
    'User Flows', 'Wireframing', 'Prototyping', 'Product Design'
  ];

  const sketches = [sketch1, sketch2, sketch3, sketch4, sketch5];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-profile">
            <div className="profile-image-container">
              <img src={aboutImage} alt="Rutul Manani" className="profile-image" />
              <div className="profile-decoration"></div>
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

          <div className="about-text">
            <h2 className="section-title">About Me</h2>
            <p className="about-description">
              I'm a Toronto-based UX/UI designer and web developer with 3 years of cross-industry experience and a background in Industrial Design. Currently pursuing post-graduate studies in UX Design and Web Development at Humber College, I bring a blend of design thinking and technical expertise to craft intuitive digital experiences. From insurance to AI-driven platforms, I bridge design and development to deliver human-centered, scalable solutions.
            </p>
            
            <div className="sketches-section">
              <h3 className="sketches-title">When I'm not designing, I love sketching</h3>
              <div className="sketches-grid">
                {sketches.map((sketch, index) => (
                  <div key={index} className="sketch-item">
                    <img src={sketch} alt={`Sketch ${index + 1}`} className="sketch-image" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;