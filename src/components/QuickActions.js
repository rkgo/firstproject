import React from 'react';
import './QuickActions.css';

const QuickActions = ({ onNavigate, activeSection }) => {
  const sections = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <div className="quick-actions">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`quick-actions__button ${activeSection === section.id ? 'quick-actions__button--active' : ''}`}
          onClick={() => onNavigate(section.id)}
          title={section.label}
          aria-label={`Go to ${section.label} section`}
        >
          <span className="quick-actions__icon">{section.icon}</span>
          <span className="quick-actions__label">{section.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
