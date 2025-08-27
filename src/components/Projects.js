import React, { useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: 'Solar Powered RIS System',
      category: 'Research',
      description: 'Designed and implemented a solar power system for reconfigurable intelligent surfaces (RISs) to function without grid connection. Conducted comprehensive testing using Arduino DUE for scalable power distribution.',
      technologies: ['Arduino', 'Solar Power', 'Power Distribution', 'RIS Technology'],
      image: '⚡',
      link: '#'
    },
    {
      title: 'NIST Raman Spectroscopy Automation',
      category: 'Automation',
      description: 'Developed a fully automated LabVIEW workflow for collecting Raman spectra with nanoscale precision. Integrated multiple hardware components for accurate 2D material scanning.',
      technologies: ['LabVIEW', 'Raman Spectroscopy', 'Nanopositioners', 'Automation'],
      image: '🔬',
      link: '#'
    },
    {
      title: 'Shonto Solar Generator',
      category: 'Power Systems',
      description: 'Designed and tested a 1440W solar generator for the Navajo community. Optimized battery usage and analyzed inrush current for improved system longevity.',
      technologies: ['Solar Power', 'Battery Systems', 'Power Analysis', 'Community Development'],
      image: '☀️',
      link: '#'
    },
    {
      title: 'Intel Sustainability Dashboard',
      category: 'Data Analytics',
      description: 'Built comprehensive Tableau dashboards for visualizing energy production trends and power plant data. Used SQL aggregation for regional comparisons and optimization.',
      technologies: ['Tableau', 'SQL', 'Data Visualization', 'Sustainability Metrics'],
      image: '📊',
      link: '#'
    },
    {
      title: 'Web Scraping & Data Mining Tools',
      category: 'Software',
      description: 'Developed Python-based tools for data collection and analysis. Implemented web scraping solutions using Selenium for automated data gathering.',
      technologies: ['Python', 'Selenium', 'Web Scraping', 'Data Mining'],
      image: '🕷️',
      link: '#'
    },
    {
      title: 'Portfolio Website',
      category: 'Frontend',
      description: 'Designed and developed this responsive portfolio website using React and modern CSS. Implemented smooth animations and responsive design principles.',
      technologies: ['React', 'CSS3', 'JavaScript', 'Responsive Design'],
      image: '🌐',
      link: '#'
    }
  ];

  const categories = ['All', 'Research', 'Automation', 'Power Systems', 'Data Analytics', 'Software', 'Frontend'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A showcase of my research, development, and engineering projects
        </p>
        
        <div className="projects__filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`projects__filter ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <div key={index} className="projects__card">
              <div className="projects__image">
                <span className="projects__icon">{project.image}</span>
              </div>
              
              <div className="projects__content">
                <div className="projects__category">{project.category}</div>
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__description">{project.description}</p>
                
                <div className="projects__technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="projects__tech">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="projects__actions">
                  <button className="btn btn-primary">
                    View Project
                  </button>
                  <button className="btn btn-secondary">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
