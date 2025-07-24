import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link 
        to="/" 
        className="logo"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setMenuOpen(false);
        }}
        aria-label="Home"
      >
        <img 
          src={logoImage} 
          alt="Website Logo" 
          className="logo-img"
        />
      </Link>
      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link 
          to="/#about" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#about');
          }}
        >
          About
        </Link>
        <Link 
          to="/#projects" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#projects');
          }}
        >
          Projects
        </Link>
        <Link 
          to="/#contact" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#contact');
          }}
        >
          Contact
        </Link>
      </div>
      <div 
        className="menu-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;