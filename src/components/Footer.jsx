import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <Link 
          to="/" 
          className="footer-logo"
          onClick={scrollToTop}
          aria-label="Home"
        >
          <img 
            src={logoImage} 
            alt="Rutul Manani Logo" 
            className="logo-image"
          />
        </Link>

        <div className="social-links">
          <a 
            href="https://www.linkedin.com/in/rutulmanani/" 
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a 
            href="https://www.behance.net/rutulmanandb9b" 
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
          >
            <i className="fab fa-behance"></i>
          </a>
          <a 
            href="https://github.com/RutulManani" 
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Rutul Manani. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;