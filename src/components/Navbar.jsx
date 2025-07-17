import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <nav>
      <Link 
        to="/" 
        className="logo"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setMenuOpen(false);
        }}
      >
        <svg className="logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50 52.4689L49.9883 52.6915C49.8759 53.7115 48.9997 54.4842 47.9736 54.4689L47.752 54.4532L11.752 49.9532C10.8138 49.8359 10.0951 49.0812 10.0088 48.1564L10 47.9689V45.0001H13V47.086L47 51.336V44.6271C47.9065 44.3962 48.7869 44.0614 49.6211 43.6232L50 43.4239V52.4689ZM47.752 5.01573C48.9455 4.86656 49.9998 5.7973 50 7.00011V15.0509L48.9258 14.6749C48.2977 14.4549 47.6535 14.2877 47 14.1749V8.13194L13 12.3819V14.0001H10V11.5001C10.0002 10.4916 10.7512 9.64083 11.752 9.51573L47.752 5.01573Z"
            fill="#FF4D4D"
          />
          <path
            d="M6.11597 43V16.36H16.916C18.884 16.36 20.564 16.708 21.956 17.404C23.372 18.1 24.452 19.06 25.196 20.284C25.964 21.508 26.348 22.924 26.348 24.532C26.348 26.284 25.904 27.82 25.016 29.14C24.128 30.436 22.868 31.384 21.236 31.984L27.032 43H20.876L15.584 32.74H11.66V43H6.11597ZM16.844 21.148H11.66V28.204H16.844C18.068 28.204 19.028 27.868 19.724 27.196C20.42 26.524 20.768 25.696 20.768 24.712C20.768 23.704 20.42 22.864 19.724 22.192C19.028 21.496 18.068 21.148 16.844 21.148ZM31.7449 43V16.36H41.8249C43.9849 16.36 45.8809 16.744 47.5129 17.512C49.1689 18.256 50.5369 19.264 51.6169 20.536C52.6969 21.808 53.5129 23.236 54.0649 24.82C54.6169 26.404 54.8929 28.024 54.8929 29.68C54.8929 31.336 54.6169 32.956 54.0649 34.54C53.5129 36.124 52.6969 37.552 51.6169 38.824C50.5369 40.096 49.1689 41.116 47.5129 41.884C45.8809 42.628 43.9849 43 41.8249 43H31.7449ZM41.5729 21.22H37.2889V38.068H41.5729C43.3249 38.068 44.7649 37.66 45.8929 36.844C47.0449 36.028 47.8969 34.972 48.4489 33.676C49.0249 32.38 49.3129 31.036 49.3129 29.644C49.3129 28.252 49.0249 26.92 48.4489 25.648C47.8969 24.352 47.0449 23.296 45.8929 22.48C44.7649 21.64 43.3249 21.22 41.5729 21.22Z"
            fill="white"
          />
        </svg>
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
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;