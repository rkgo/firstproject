import React, { useState, useEffect } from 'react';
import Dock from './Dock';
import './Navbar.css';

const Navbar = ({ onNavigate, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);



  const handleNavigate = (sectionId) => {
    onNavigate(sectionId);
    
    // Add smooth scrolling for navigation
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const dockItems = [
    { 
      icon: <span style={{ fontSize: '14px', color: 'white' }}>⌂</span>, 
      label: 'Home', 
      onClick: () => handleNavigate('home') 
    },
    { 
      icon: <span style={{ fontSize: '14px', color: 'white' }}>👤</span>, 
      label: 'About', 
      onClick: () => handleNavigate('about') 
    },
    { 
      icon: <span style={{ fontSize: '14px', color: 'white' }}>⚡</span>, 
      label: 'Experience', 
      onClick: () => handleNavigate('experience') 
    },
    { 
      icon: <span style={{ fontSize: '14px', color: 'white' }}>★</span>, 
      label: 'Projects', 
      onClick: () => handleNavigate('projects') 
    },
    { 
      icon: <span style={{ fontSize: '14px', color: 'white' }}>✉</span>, 
      label: 'Contact', 
      onClick: () => handleNavigate('contact') 
    }
  ];

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setIsScrolled(scrollY > heroHeight * 0.3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Dock Navigation */}
        <Dock 
          items={dockItems}
          panelHeight={40}
          baseItemSize={32}
          magnification={40}
          className={isScrolled ? 'dock-faded' : ''}
        />
      </div>
    </nav>
  );
};

export default Navbar;
