import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Projects.css';
import AirbnbImage from '../assets/images/Airbnb.png';
import PrimeVideoImage from '../assets/images/PrimeVideo.png';
import ByblosImage from '../assets/images/Byblos.png';
import DocmigoImage from '../assets/images/Docmigo.png';

const Projects = () => {
  const projects = [
    {
      id: '1',
      title: "Airbnb UX Research",
      description: "Improved booking experience through comprehensive UX research",
      tags: ["UX Research", "User Interviews", "Journey Mapping"],
      image: AirbnbImage,
      imagePosition: "right center"
    },
    {
      id: '2',
      title: "Prime Video Usability",
      description: "Enhanced content discovery and watchlist management",
      tags: ["Usability Testing", "Heuristic Evaluation"],
      image: PrimeVideoImage,
      imagePosition: "left top"
    },
    {
      id: '3',
      title: "Byblos Restaurant",
      description: "Redesigned ordering experience with seamless online system",
      tags: ["UI/UX Design", "User Flows"],
      image: ByblosImage,
      imagePosition: "center center"
    },
    {
      id: '4',
      title: "Docmigo Hospital App",
      description: "Streamlined hospital operations with communication app",
      tags: ["UX Research", "Stakeholder Interviews"],
      image: DocmigoImage,
      imagePosition: "right bottom"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
         Designs That Matter
        </motion.h2>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div 
                className="project-image" 
                style={{ 
                  backgroundImage: `url(${project.image})`,
                  backgroundPosition: project.imagePosition
                }}
              />
              <div className="project-content">
                <div className="project-number">0{index + 1}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <Link 
                  to={`/projects/${project.id}`} 
                  className="project-link"
                  aria-label={`View ${project.title} project`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;