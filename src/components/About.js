import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'research', label: 'Research', icon: '🔬' },
    { id: 'interests', label: 'Interests', icon: '🎯' },
    { id: 'approach', label: 'Approach', icon: '⚡' }
  ];

  const tabContent = {
    about: {
      title: 'About Me',
      content: 'I\'m an Electrical Engineering undergraduate at Arizona State University with a passion for building practical systems that solve real-world problems. My approach combines theoretical knowledge with hands-on implementation, allowing me to create end-to-end solutions across multiple domains.',
      highlights: [
        'Power Systems & Renewable Energy',
        'Automation & Control Systems',
        'RF/Antennas & Wireless Communication',
        'Data Analysis & Software Development',
        'Hardware Design & System Integration'
      ]
    },
    education: {
      title: 'Education',
      content: 'I\'m currently pursuing my Bachelor\'s degree in Electrical Engineering at the Ira A. Fulton Schools of Engineering at Arizona State University. My coursework covers fundamental electrical engineering principles while allowing me to explore specialized areas through research and projects.',
      details: [
        'Bachelor of Science in Electrical Engineering',
        'Arizona State University, Tempe, AZ',
        'Expected Graduation: 2026',
        'GPA: 3.8/4.0',
        'Relevant Coursework: Power Systems, Control Theory, Digital Signal Processing, Circuit Analysis'
      ]
    },
    research: {
      title: 'Research Focus',
      content: 'My research interests lie at the intersection of power systems, automation, and renewable energy. I\'m particularly interested in developing intelligent systems that can optimize energy distribution and consumption in real-time.',
      areas: [
        'Solar Power System Optimization',
        'Reconfigurable Intelligent Surfaces (RIS)',
        'Automated Data Collection & Analysis',
        'Energy Efficiency in Data Centers',
        'Sustainable Technology Solutions'
      ]
    },
    interests: {
      title: 'Technical Interests',
      content: 'Beyond my core electrical engineering studies, I\'m passionate about emerging technologies and their applications in solving complex engineering challenges.',
      topics: [
        'Machine Learning & AI in Engineering',
        'Internet of Things (IoT) Systems',
        'Smart Grid Technologies',
        'Wireless Power Transfer',
        'Embedded Systems & Microcontrollers'
      ]
    },
    approach: {
      title: 'My Approach',
      content: 'I believe in a holistic approach to engineering that combines theoretical understanding with practical implementation. Every project I work on follows a systematic process from concept to deployment.',
      methodology: [
        'Problem Analysis & Requirements Gathering',
        'System Design & Architecture Planning',
        'Iterative Development & Testing',
        'Performance Optimization & Validation',
        'Documentation & Knowledge Sharing'
      ]
    }
  };

  const currentContent = tabContent[activeTab];

  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__header">
          <h2 className="about__title">About Me</h2>
          <p className="about__subtitle">
            Learn more about my background, education, and approach to engineering
          </p>
        </div>
        
        <div className="about__content">
          <div className="about__tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`about__tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="about__tab-icon">{tab.icon}</span>
                <span className="about__tab-label">{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="about__panel">
            <div className="about__panel-content">
              <h3 className="about__panel-title">{currentContent.title}</h3>
              <p className="about__panel-description">{currentContent.content}</p>
              
              <div className="about__highlights">
                {currentContent.highlights && (
                  <ul className="about__list">
                    {currentContent.highlights.map((item, index) => (
                      <li key={index} className="about__list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                
                {currentContent.details && (
                  <div className="about__details">
                    {currentContent.details.map((detail, index) => (
                      <div key={index} className="about__detail-item">
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
                
                {currentContent.areas && (
                  <ul className="about__list">
                    {currentContent.areas.map((area, index) => (
                      <li key={index} className="about__list-item">
                        {area}
                      </li>
                    ))}
                  </ul>
                )}
                
                {currentContent.topics && (
                  <ul className="about__list">
                    {currentContent.topics.map((topic, index) => (
                      <li key={index} className="about__list-item">
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}
                
                {currentContent.methodology && (
                  <ol className="about__list about__list--ordered">
                    {currentContent.methodology.map((step, index) => (
                      <li key={index} className="about__list-item">
                        {step}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
