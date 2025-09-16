import React, { useRef } from 'react';
import './ProjectsGrid.css';

const ProjectsGrid2 = () => {
  const projects = [
    // Page 2 - Empty (portfolio moved to first page)
  ];

  const containerRef = useRef(null);

  return (
    <div className="projects-scroll-container">
      <div className="projects-section">
        <div className="projects-masonry" ref={containerRef}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-box"
            >
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                {project.description && (
                  <div className="project-description">
                    {project.description.split('•').map((point, index) => {
                      if (index === 0) {
                        return <p key={index}>{point.trim()}</p>;
                      }
                      return (
                        <div key={index} className="project-bullet-point">
                          <span className="bullet">•</span>
                          <span className="bullet-text">{point.trim()}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid2;
