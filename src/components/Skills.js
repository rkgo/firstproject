import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'C++', level: 85 },
        { name: 'LabVIEW', level: 88 },
        { name: 'SQL', level: 82 },
        { name: 'JavaScript', level: 80 },
        { name: 'HTML/CSS', level: 85 }
      ]
    },
    {
      title: 'Libraries & Frameworks',
      icon: '🔧',
      skills: [
        { name: 'Arduino', level: 90 },
        { name: 'React', level: 75 },
        { name: 'Selenium', level: 85 },
        { name: 'Pandas', level: 88 },
        { name: 'Mathematica', level: 80 },
        { name: 'Tkinter', level: 75 },
        { name: 'Matplotlib', level: 85 }
      ]
    },
    {
      title: 'Design & Modeling Tools',
      icon: '🎯',
      skills: [
        { name: 'MATLAB', level: 90 },
        { name: 'LTSpice', level: 85 },
        { name: 'GTKWave', level: 80 },
        { name: 'Digital', level: 75 },
        { name: 'Fusion 360', level: 80 },
        { name: 'Onshape', level: 75 },
        { name: 'Microsoft Office', level: 90 }
      ]
    },
    {
      title: 'Technical Skills',
      icon: '⚡',
      skills: [
        { name: 'Power Systems', level: 88 },
        { name: 'Automation & Control', level: 90 },
        { name: 'RF/Antennas', level: 85 },
        { name: 'Data Analysis', level: 85 },
        { name: 'System Integration', level: 88 },
        { name: 'Hardware Design', level: 82 }
      ]
    }
  ];

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        <p className="section-subtitle">
          My technical skills and proficiency levels across various domains
        </p>
        
        <div className="skills__grid">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skills__category">
              <div className="skills__category-header">
                <span className="skills__category-icon">{category.icon}</span>
                <h3 className="skills__category-title">{category.title}</h3>
              </div>
              
              <div className="skills__list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skills__skill">
                    <div className="skills__skill-info">
                      <span className="skills__skill-name">{skill.name}</span>
                      <span className="skills__skill-level">{skill.level}%</span>
                    </div>
                    <div className="skills__skill-bar">
                      <div 
                        className="skills__skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
