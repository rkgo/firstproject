import React, { useRef } from 'react';
import './ProjectsGrid.css';

const ProjectsGrid = () => {
  const projects = [
    { 
      id: 1, 
      title: "electrical team lead – shonto solar", 
      subtitle: "engineers without borders @ asu",
      description: "• co-leading and managing the electrical team for the design and deployment of a 1440w solar generator for shonto community • tested and evaluated system performance through inrush current analysis • created a simple one-line system diagram in bluebeam"
    },
    { 
      id: 2, 
      title: "traffic light controller", 
      description: "• designed logic-gate circuit for two intersections • implemented hazard light and timing features • tested with breadboard prototyping • simulated timing sequences for realistic operation • tested using verilog and gtkwave"
    },
    { 
      id: 3, 
      title: "vr sports analysis", 
      description: "• prototype for motion tracking in vr using unity"
    },
    { 
      id: 4, 
      title: "power supply regulator", 
      description: "• designed a dc power regulator with voltage stabilization • implemented feedback control system for consistent output voltage • tested with various load conditions"
    },
    { 
      id: 6, 
      title: "solar powered portable phone charger", 
      description: "• built solar-powered charger with lipo battery and solar panel • soldered circuits with heat shrink tubing for safe charging"
    },
    { 
      id: 10, 
      title: "smart mini arduino car", 
      description: "• built arduino car with ir sensors for obstacle detection • programmed autonomous navigation and path planning • implemented pwm motor control for smooth movement"
    },
    { 
      id: 8, 
      title: "rlc circuit simulator", 
      description: "• modeled rlc circuits and computed transient and frequency response with matlab • plotted step and bode results and compared against lab measurements • analyzed circuit behavior and validated theoretical models with experimental data"
    },
    { 
      id: 7, 
      title: "temperature & humidity monitor", 
      description: "• built dht11 + lcd display system to monitor environment • implemented real-time data logging and display"
    },
    { 
      id: 9, 
      title: "water level detection system", 
      description: "• used hc-sr04 ultrasonic sensor + leds for water level measurement • implemented real-time monitoring with visual feedback"
    },
    { 
      id: 11, 
      title: "image & data classification w/ tensorflow", 
      description: "• built a tensorflow model in python with preprocessing, train/test split, and early stopping • trained a basic neural network on small datasets to classify inputs into categories • visualized accuracy and loss curves to evaluate performance and refine parameters"
    },
    { 
      id: 12, 
      title: "sir disease model", 
      description: "• interactive sir model to simulate disease spread built with python and tkinter • implemented real-time parameter adjustment and visualization of infection curves"
    },
    { 
      id: 15, 
      title: "portfolio website", 
      description: "• hardcoded this website using react, gsap, and css"
    },
    // Page 2 - Basic Projects & Games
    { 
      id: 14, 
      title: "dice rolling game", 
      description: "• built dice roller with interactive ui • implemented random number generation and visual dice animations"
    },

  ];

  const containerRef = useRef(null);

  // Split projects into two pages
  const page1Projects = projects.slice(0, 12); // Electrical engineering & advanced projects + portfolio
  const page2Projects = projects.slice(12); // Basic projects & games

  return (
    <div className="projects-scroll-container">
      <div className="projects-section">
        <h2 className="projects-header">cool projects</h2>
        <div className="projects-masonry" ref={containerRef}>
          {page1Projects.map((project) => (
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

export default ProjectsGrid;