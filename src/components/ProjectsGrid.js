import React, { useState, useEffect, useRef } from 'react';
import './ProjectsGrid.css';

const ProjectsGrid = () => {
  const projects = [
    { id: 1, height: 150, title: "Zephyr Quantum", subtitle: "Nexus protocol integration" },
    { id: 2, height: 280, title: "Vortex Matrix", subtitle: "Synthetic neural pathways" },
    { id: 3, height: 200, title: "Crimson Flux", subtitle: "Biometric authentication" },
    { id: 4, height: 350, title: "Aurora Prism", subtitle: "Distributed consensus algorithm" },
    { id: 5, height: 120, title: "Nebula Core", subtitle: "Edge computing framework" },
    { id: 6, height: 300, title: "Phantom Vector", subtitle: "Real-time data streaming" },
    { id: 7, height: 400, title: "Eclipse Nexus", subtitle: "Machine learning optimization" },
    { id: 8, height: 180, title: "Crystal Wave", subtitle: "Blockchain verification" },
    { id: 9, height: 320, title: "Quantum Shift", subtitle: "Advanced cryptography" },
    { id: 10, height: 230, title: "Solar Flare", subtitle: "Cloud infrastructure" },
    { id: 11, height: 160, title: "Digital Mirage", subtitle: "API gateway system" },
  ];

  const containerRef = useRef(null);
  const [columns, setColumns] = useState(3);
  const [columnHeights, setColumnHeights] = useState([]);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width > 1200) setColumns(4);
      else if (width > 800) setColumns(3);
      else if (width > 600) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const boxWidth = (containerWidth - (columns - 1) * 8) / columns; // 8px gap
      
      const newColumnHeights = new Array(columns).fill(0);
      const positionedProjects = projects.map(project => {
        const shortestColumn = newColumnHeights.indexOf(Math.min(...newColumnHeights));
        const x = shortestColumn * (boxWidth + 8);
        const y = newColumnHeights[shortestColumn];
        
        newColumnHeights[shortestColumn] += project.height + 8; // 8px gap
        
        return {
          ...project,
          x,
          y,
          width: boxWidth
        };
      });

      setColumnHeights(newColumnHeights);
      
      // Apply positions
      positionedProjects.forEach((project, index) => {
        const element = container.children[index];
        if (element) {
          element.style.position = 'absolute';
          element.style.left = `${project.x}px`;
          element.style.top = `${project.y}px`;
          element.style.width = `${project.width}px`;
        }
      });

      // Set container height
      container.style.height = `${Math.max(...newColumnHeights)}px`;
    }
  }, [columns, projects]);

  return (
    <div className="projects-masonry" ref={containerRef}>
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-box"
          style={{ height: `${project.height}px` }}
        >
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
