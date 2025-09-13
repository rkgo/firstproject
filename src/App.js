import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutStack from './sections/AboutStack';
import Footer from './components/Footer';
import TargetCursor from './components/TargetCursor';
import CircuitLoader from './components/CircuitLoader';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle battery completion
  const handleBatteryComplete = () => {
    setIsLoading(false);
  };

  // Update active section based on scroll position
              useEffect(() => {
                const handleScroll = () => {
                  const sections = ['home', 'about', 'experience', 'about2'];
                  const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <CircuitLoader 
          size={500}
          color="#6FE5E4"
          className="circuit-loader--overlay circuit-loader--fade-in"
          showText={true}
          onBatteryComplete={handleBatteryComplete}
        />
      ) : (
        <>
          <TargetCursor />
          <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
                      <main className="main-content">
                        <Hero />
                        <AboutStack id="about" title="about me" />
                        <AboutStack id="experience" title="experience" />
                        <AboutStack id="about2" title="about me" />
                      </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
