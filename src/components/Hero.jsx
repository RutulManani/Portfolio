import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import ShinyText from './ShinyText';
import Aurora from './Aurora';

// Replace these with your actual company logo imports
import CompanyLogo1 from '../assets/images/company1.png';
import CompanyLogo2 from '../assets/images/company2.png';
import CompanyLogo3 from '../assets/images/company3.png';

const Hero = () => {
  const companies = [
    { logo: CompanyLogo1, name: 'Company 1' },
    { logo: CompanyLogo2, name: 'Company 2' },
    { logo: CompanyLogo3, name: 'Company 3' }
  ];

  return (
    <section className="hero">
      {/* Aurora Background */}
      <div className="hero-background">
        <Aurora
          colorStops={["#101057", "#370617", "#4D194D"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <div className="hero-content">
        <motion.div 
          className="kinetic-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="kinetic-word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Hello,
          </motion.span>
          <span className="word-spacer">&nbsp;</span>
          <motion.span 
            className="kinetic-word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I'm
          </motion.span>
          <span className="word-spacer">&nbsp;</span>
          <motion.span 
            className="kinetic-word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Rutul
          </motion.span>
          <span className="word-spacer">&nbsp;</span>
          <motion.span 
            className="kinetic-word"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Manani
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <ShinyText 
            text="UI/UX designer blending product thinking, research, and front-end execution"
            disabled={false} 
            speed={4} 
          />
        </motion.div>

        {/* Company Logos Section */}
        <motion.div 
          className="company-logos-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="logos-experience-wrapper">
            <div className="logos-container">
              {companies.map((company, index) => (
                <motion.div 
                  key={index}
                  className="logo-item"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="company-logo"
                  />
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="company-logo-hover"
                  />
                </motion.div>
              ))}
            </div>
            <p className="experience-text">3+ years of experience in insurance to AI-driven platforms</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;