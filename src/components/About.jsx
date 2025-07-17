import React from 'react';
import aboutImage from '../assets/images/IMG_0410.png';
import './About.css';

const About = () => {
  const skills = [
    'UX Research', 'UI Design', 'Figma', 'Usability Testing',
    'User Flows', 'Wireframing', 'Prototyping', 'Product Design'
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a Toronto-based UX-UI designer and web developer with 3 years of cross-industry experience and a background in Industrial Design. Currently pursuing post-graduate studies in UX Design and Web Development at Humber College, I bring a blend of design thinking and technical expertise to craft intuitive digital experiences. From insurance to AI-driven platforms, I bridge design and development to deliver human-centered, scalable solutions.
            </p>
            <div className="skills">
              {skills.map((skill, index) => (
                <span key={index} className="skill">{skill}</span>
              ))}
            </div>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="Rutul Manani" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
