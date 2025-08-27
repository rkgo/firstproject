import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigate = (sectionId) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
    
    // Add smooth scrolling for sidebar navigation
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          {/* Modern Animated Hamburger Menu on the left */}
          <button
            className={`navbar__menu-toggle ${isMenuOpen ? 'open' : ''}`}
            onClick={handleMenuToggle}
            aria-label="Toggle navigation menu"
          >
            <span className="navbar__brand-text cursor-target">[RG]</span>
          </button>
          
          {/* Empty div to maintain spacing */}
          <div style={{ width: '24px' }}></div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div className={`navbar__sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="navbar__sidebar-header">
          <span className="navbar__sidebar-brand">RG</span>
          <button
            className="navbar__sidebar-close cursor-target"
            onClick={handleCloseMenu}
            aria-label="Close navigation menu"
          >
            <span className="close-icon">×</span>
          </button>
        </div>
        
        <nav className="navbar__sidebar-nav">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="navbar__sidebar-nav-item cursor-target"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
              }}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Removed bottom RG footer */}
      </div>

      {/* Overlay */}
      <div
        className={`navbar__overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={handleCloseMenu}
      />
    </>
  );
};

export default Navbar;
