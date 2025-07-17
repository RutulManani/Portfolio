import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-text">
              <h3>Email</h3>
              <a href="mailto:rutulmanani18@gmail.com">rutulmanani18@gmail.com</a>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-text">
              <h3>Location</h3>
              <p>Toronto, Canada</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="contact-text">
              <h3>Availability</h3>
              <p>Available for freelance & full-time opportunities</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="contact-text">
              <h3>Education</h3>
              <p>Humber College - UX Design</p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Send Message <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
  );
};

console.log('Contact:', typeof Contact);

export default Contact;