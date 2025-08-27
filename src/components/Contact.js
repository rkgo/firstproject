import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/ramakrishnan-gopinath',
      icon: '💼',
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ramakrishnan-gopinath',
      icon: '🐙',
      color: '#333'
    },
    {
      name: 'Email',
      url: 'mailto:ramakrishnan.gopinath@asu.edu',
      icon: '📧',
      color: '#EA4335'
    }
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          I'm always interested in new opportunities and collaborations
        </p>
        
        <div className="contact__content">
          <div className="contact__info">
            <div className="contact__card">
              <h3 className="contact__card-title">Contact Information</h3>
              <p className="contact__card-description">
                Feel free to reach out if you'd like to discuss potential collaborations, 
                research opportunities, or just want to connect.
              </p>
              
              <div className="contact__details">
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">📍</span>
                  <div className="contact__detail-content">
                    <h4>Location</h4>
                    <p>Arizona State University, Tempe, AZ</p>
                  </div>
                </div>
                
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">📧</span>
                  <div className="contact__detail-content">
                    <h4>Email</h4>
                    <p>ramakrishnan.gopinath@asu.edu</p>
                  </div>
                </div>
                
                <div className="contact__detail-item">
                  <span className="contact__detail-icon">🎓</span>
                  <div className="contact__detail-content">
                    <h4>Education</h4>
                    <p>Electrical Engineering, ASU</p>
                  </div>
                </div>
              </div>
              
              <div className="contact__social">
                <h4>Connect With Me</h4>
                <div className="contact__social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__social-link"
                      style={{ '--social-color': social.color }}
                    >
                      <span className="contact__social-icon">{social.icon}</span>
                      <span className="contact__social-name">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact__form">
            <form onSubmit={handleSubmit} className="contact__form-content">
              <div className="contact__form-group">
                <label htmlFor="name" className="contact__form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="contact__form-input"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="contact__form-group">
                <label htmlFor="email" className="contact__form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="contact__form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="contact__form-group">
                <label htmlFor="subject" className="contact__form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="contact__form-input"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div className="contact__form-group">
                <label htmlFor="message" className="contact__form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="contact__form-textarea"
                  placeholder="Tell me more about your project or opportunity..."
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary contact__form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
