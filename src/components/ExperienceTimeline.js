import React from 'react';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {
  const experiences = [
    {
      title: "nist surf research intern",
      subtitle: "automation & control systems",
      period: "may 2025 – aug 2025",
      description: "designed and implemented a fully automated workflow via labview to collect raman spectra as a function of spatial position for extremely accurate scanning of 2d materials and semiconductor devices",
      type: "research"
    },
    {
      title: "engineers without borders",
      subtitle: "electrical team co-lead",
      period: "may 2025 – present",
      description: "leading the electrical team in designing and implementing solar power solutions for the navajo community",
      type: "leadership"
    },
    {
      title: "cloudware it",
      subtitle: "software product technical intern",
      period: "aug 2023 – aug 2024",
      description: "contributed to software development and data analysis projects in a remote technical role",
      type: "industry"
    },
    {
      title: "solar powered ris",
      subtitle: "undergraduate research assistant (furi)",
      period: "jan 2025 – present",
      description: "researching solar power systems for reconfigurable intelligent surfaces (riss) to function without grid connection",
      type: "research"
    },
    {
      title: "intel sustainability team",
      subtitle: "data analytics & visualization",
      period: "jan 2025 – present",
      description: "built tableau dashboards to visualize net energy production, trends, and power plant data",
      type: "industry"
    }
  ];

  return (
    <div className="tree-timeline">
      <div className="tree-timeline__trunk">
        {experiences.map((exp, index) => (
          <div key={index} className={`tree-timeline__branch tree-timeline__branch--${index % 2 === 0 ? 'left' : 'right'} ${exp.title.includes('nist') ? 'nist-card' : ''} ${exp.title.includes('cloudware') ? 'cloudware-card' : ''} ${exp.title.includes('intel') ? 'intel-card' : ''} ${exp.title.includes('engineers without borders') ? 'ewb-card' : ''} ${exp.title.includes('solar powered ris') ? 'solar-card' : ''}`}>
            <div className="tree-timeline__node">
              <div className="tree-timeline__node-dot"></div>
              <div className="tree-timeline__content">
                <div className="tree-timeline__type">{exp.type}</div>
                <h3 className="tree-timeline__title">{exp.title}</h3>
                <p className="tree-timeline__subtitle">{exp.subtitle}</p>
                <p className="tree-timeline__period">{exp.period}</p>
                <p className="tree-timeline__description">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
        {/* Add extra spacing at the end for endless scroll */}
        <div className="tree-timeline__end-spacer"></div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
