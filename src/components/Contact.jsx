import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const email = 'rutulmanani18@gmail.com';
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="contact-title">Let's create something remarkable</h2>
        <div className="contact-content">
          <div className="contact-card">
            <p className="contact-intro">
              Whether you have a project in mind, a role you think I'd be a good fit for, 
              or just want to connect - I'd love to hear from you.
            </p>
            <div className="contact-email-wrapper">
              <a 
                href={`mailto:${email}`} 
                className="contact-email"
                aria-label="Email Rutul Manani"
              >
                {email}
              </a>
              <button 
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
                aria-label="Copy email to clipboard"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="contact-availability">
              <span className="availability-dot"></span>
              <span>Currently available for freelance & full-time opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;