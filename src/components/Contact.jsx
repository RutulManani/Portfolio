import React from 'react';
import './Contact.css';

const Contact = () => {
  const email = 'rutulmanani18@gmail.com';
  
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="contact-title">Get In Touch</h2>
        <div className="contact-content">
          <a 
            href={`mailto:${email}`} 
            className="contact-email"
            aria-label="Email Rutul Manani"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;