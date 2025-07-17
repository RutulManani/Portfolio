import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import ShinyText from './ShinyText'; 

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text-container">
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
      </div>

      {/* ✨ Shiny animated subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{ marginBottom: '2rem' }}
      >
        <ShinyText 
          text="UI/UX designer blending product thinking, research, and front-end execution"
          disabled={false} speed={4} 
        />
      </motion.div>

      <motion.div 
        className="hero-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <a href="#projects" className="btn btn-primary">View Projects</a>
        <a href="#contact" className="btn btn-secondary">Get in Touch</a>
      </motion.div>
    </section>
  );
};

export default Hero;