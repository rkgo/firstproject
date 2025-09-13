import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__brand">
            <h3 className="footer__brand-name">Ramakrishnan Gopinath</h3>
            <p className="footer__brand-tagline">Electrical Engineering Student & Research Assistant</p>
          </div>
          
          <div className="footer__links">
            <div className="footer__section">
              <h4 className="footer__section-title">Navigation</h4>
              <ul className="footer__section-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer__section">
              <h4 className="footer__section-title">Connect</h4>
              <ul className="footer__section-links">
                <li><a href="mailto:ramakrishnan.gopinath@asu.edu">Email</a></li>
                <li><a href="https://linkedin.com/in/ramakrishnan-gopinath" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://github.com/ramakrishnan-gopinath" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
            
            <div className="footer__section">
              <h4 className="footer__section-title">Location</h4>
              <ul className="footer__section-links">
                <li>Arizona State University</li>
                <li>Tempe, Arizona</li>
                <li>United States</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; {currentYear} Ramakrishnan Gopinath. All rights reserved.</p>
          </div>
          
          <div className="footer__made-with">
            <p>Made with ❤️ and React</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
