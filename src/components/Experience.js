import React from 'react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      title: 'NIST SURF Research Intern',
      subtitle: 'Automation & Control Systems',
      company: 'National Institute of Standards and Technology',
      location: 'Gaithersburg, Maryland, United States',
      period: 'May 2025 – Aug 2025',
      type: 'internship',
      icon: '🔬',
      description: 'Designed and implemented a fully automated workflow via LabVIEW to collect Raman spectra as a function of spatial position for extremely accurate scanning of 2D materials and semiconductor devices.',
      highlights: [
        'Reconstructed detailed 2D Raman maps by controlling nanoscale movements through piezoelectric positioners',
        'Identified flakes, interfaces, and heterogeneities across samples',
        'Integrated LabVIEW, nanopositioners, and LabSpec software into a unified system',
        'Enabled communication between hardware control and spectral data acquisition from 1.7–300 K'
      ]
    },
    {
      title: 'Engineers Without Borders: Shonto Solar',
      subtitle: 'Electrical Team Co-Lead',
      company: 'Engineers Without Borders',
      location: 'Shonto, Arizona',
      period: 'May 2025 – Present',
      type: 'leadership',
      icon: '👥',
      description: 'Leading the electrical team in designing and implementing solar power solutions for the Navajo community.',
      highlights: [
        'Designed and tested a 1440W solar generator using solar panels and batteries',
        'Analyzed inrush current and adjusted battery use to optimize system longevity',
        'Organized electrical team meetings for build days and assigned tasks to team members',
        'Collaborated with community stakeholders to ensure solutions meet local energy needs'
      ]
    },
    {
      title: 'Cloudware IT',
      subtitle: 'Software Product Technical Intern',
      company: 'Cloudware IT',
      location: 'Gaithersburg, Maryland, United States',
      period: 'Aug 2023 – Aug 2024',
      type: 'internship',
      icon: '💼',
      description: 'Contributed to software development and data analysis projects in a remote technical role.',
      highlights: [
        'Involved in data mining and web scraping using Python libraries such as Selenium',
        'Contributed to revamping the company website',
        'Developed data processing and analysis tools',
        'Collaborated with development team on software product improvements'
      ]
    },
    {
      title: 'Solar Powered RIS',
      subtitle: 'Undergraduate Research Assistant (FURI)',
      company: 'Arizona State University',
      location: 'Tempe, Arizona',
      period: 'Jan 2025 – Present',
      type: 'research',
      icon: '⚡',
      description: 'Researching solar power systems for reconfigurable intelligent surfaces (RISs) to function without grid connection.',
      highlights: [
        'Designed solar power system for reconfigurable intelligent surfaces (RISs)',
        'Conducted dummy load testing using Arduino DUE to verify scalable power distribution',
        'Tested capabilities for various RIS configurations',
        'Worked under Prof. George Trichopoulos on cutting-edge RF technology'
      ]
    },
    {
      title: 'Intel Sustainability Team',
      subtitle: 'Data Analytics & Visualization',
      company: 'Intel Corporation',
      location: 'Remote',
      period: 'Jan 2025 – Present',
      type: 'research',
      icon: '📊',
      description: 'Semester-long project focused on data analytics and visualization for sustainability initiatives.',
      highlights: [
        'Built Tableau dashboards to visualize net energy production, trends, and power plant data',
        'Used SQL data aggregation to compare regions and recommend optimal data center locations',
        'Based recommendations on renewable energy availability',
        'Worked under Dr. Robert Alvarez on sustainability metrics'
      ]
    }
  ];

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">Experience & Research</h2>
        <p className="section-subtitle">
          My professional journey, research contributions, and hands-on projects
        </p>
        
        <div className="experience__timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience__item">
              <div className="experience__marker">
                <span className="experience__icon">{exp.icon}</span>
                <div className={`experience__type experience__type--${exp.type}`}>
                  {exp.type === 'internship' && '💼'}
                  {exp.type === 'leadership' && '👥'}
                  {exp.type === 'research' && '🔬'}
                </div>
              </div>
              
              <div className="experience__content">
                <div className="experience__card">
                  <div className="experience__header">
                    <h3 className="experience__title">{exp.title}</h3>
                    <p className="experience__subtitle">{exp.subtitle}</p>
                    <div className="experience__meta">
                      <span className="experience__company">{exp.company}</span>
                      <span className="experience__location">{exp.location}</span>
                      <span className="experience__period">{exp.period}</span>
                    </div>
                  </div>
                  
                  <p className="experience__description">{exp.description}</p>
                  
                  <ul className="experience__highlights">
                    {exp.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="experience__highlight">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
