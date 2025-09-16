import { motion, useTransform, useScroll, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import './HorizontalScrollCarousel.css';

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false);
  const [hasExited, setHasExited] = useState(false);
  const horizontalProgress = useMotionValue(0);
  const smoothHorizontalProgress = useSpring(horizontalProgress, { 
    stiffness: 100, 
    damping: 30, 
    mass: 0.8 
  });
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Monitor when we're in the experience section
  useEffect(() => {
    const handleScroll = () => {
      const element = targetRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (isInView && !isHorizontalScrolling && !hasExited) {
        // We're in the experience section and not already horizontal scrolling - start horizontal scrolling
        setIsHorizontalScrolling(true);
      } else if (!isInView && isHorizontalScrolling) {
        // We're not in the experience section and were horizontal scrolling - stop horizontal scrolling
        setIsHorizontalScrolling(false);
        horizontalProgress.set(0); // Reset horizontal progress when exiting
        setHasExited(true); // Mark that we've exited to prevent restart
      }
    };

    // Check immediately
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Convert vertical scrolling to horizontal movement when horizontal scrolling is active
  useEffect(() => {
    const handleWheel = (e) => {
      if (isHorizontalScrolling) {
        e.preventDefault();
        e.stopPropagation();
        
        // Convert vertical scroll to horizontal progress
        const delta = e.deltaY * 0.0012; // Increased sensitivity for smoother scrolling
        const currentValue = horizontalProgress.get();
        const newProgress = Math.max(0, Math.min(1, currentValue + delta));
        horizontalProgress.set(newProgress);
        
        // Check if we've reached the beginning (Project 1) or end (Project 7)
        if (newProgress <= 0.05 && e.deltaY < 0) {
          // At the beginning and trying to scroll up - switch back to vertical
          setIsHorizontalScrolling(false);
          horizontalProgress.set(0); // Reset horizontal progress when exiting
          // Scroll up to previous section
          setTimeout(() => {
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
          }, 50);
        } else if (newProgress >= 1.0 && e.deltaY > 0) {
          // At the very end (98% through) and trying to scroll down - switch back to vertical
          setIsHorizontalScrolling(false);
          setHasExited(true); // Mark that we've exited to prevent restart
          horizontalProgress.set(1); // Reset horizontal progress when exiting
          // Scroll down to next section immediately to get out of experience section
          setTimeout(() => {
            window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'smooth' });
          }, 50);
        }
        
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if (isHorizontalScrolling) {
        // Convert vertical arrow keys to horizontal movement
        if (e.keyCode === 38) { // Up arrow - move right
          e.preventDefault();
          const currentValue = horizontalProgress.get();
          const newProgress = Math.min(1, currentValue + 0.025);
          horizontalProgress.set(newProgress);
          
          // Check if we've reached the end and trying to go further
          if (currentValue >= 1.0) {
            setIsHorizontalScrolling(false);
            horizontalProgress.set(1);
            setTimeout(() => {
              window.scrollBy({ top: window.innerHeight * 1.5, behavior: 'smooth' });
            }, 50);
          }
          return false;
        } else if (e.keyCode === 40) { // Down arrow - move left
          e.preventDefault();
          const currentValue = horizontalProgress.get();
          const newProgress = Math.max(0, currentValue - 0.025);
          horizontalProgress.set(newProgress);
          
          // Check if we've reached the beginning and trying to go further
          if (currentValue <= 0.05) {
            setIsHorizontalScrolling(false);
            horizontalProgress.set(0);
            setTimeout(() => {
              window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
            }, 50);
          }
          return false;
        } else if ([32, 33, 34, 35, 36].includes(e.keyCode)) { // Space, Page Up/Down, Home, End
          e.preventDefault();
          return false;
        }
      }
    };

    if (isHorizontalScrolling) {
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown, { passive: false });
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isHorizontalScrolling]);

  // Use custom horizontal progress when in horizontal mode, otherwise use scroll progress
  const x = useTransform(
    isHorizontalScrolling ? smoothHorizontalProgress : scrollYProgress, 
    [0, 1], 
    ["0%", "-70%"]
  );

  return (
    <div ref={targetRef} className="horizontal-scroll-container">
      <div className="horizontal-scroll-sticky">
        <motion.div style={{ x }} className="horizontal-scroll-content">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <div
      key={card.id}
      className="horizontal-scroll-card"
    >
      <div className="horizontal-scroll-card-content">
        <div className="horizontal-scroll-card-header">
          <h3 className="horizontal-scroll-card-title">
            {card.title}
          </h3>
          <p className={`horizontal-scroll-card-subtitle ${card.id === 1 ? 'smaller-subtitle' : ''}`}>
            {card.subtitle}
          </p>
          {card.supervisor && (
            <p className="horizontal-scroll-card-supervisor">
              {card.supervisor}
            </p>
          )}
          {card.date && (
            <p className="horizontal-scroll-card-date">
              {card.date}
            </p>
          )}
        </div>
        
        <div className="horizontal-scroll-card-body">
          <div className="horizontal-scroll-card-description">
            {card.description.split('•').map((point, index) => {
              if (index === 0) {
                return <p key={index}>{point.trim()}</p>;
              }
              return (
                <div key={index} className="horizontal-scroll-card-bullet-point">
                  <span className="bullet">•</span>
                  <span className="bullet-text">{point.trim()}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="horizontal-scroll-card-footer">
          <div className="horizontal-scroll-card-technologies">
            {card.technologies.map((tech, index) => (
              <span key={index} className="horizontal-scroll-card-tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const cards = [
  {
    title: "chips and control systems intern",
    subtitle: "undergrad intern @ national institute of standards and technology (nist)",
    date: "may - aug 25'",
            description: "• designed and implemented a fully automated workflow via labview to collect raman spectra as a function of spatial position, magnetic field, and temperature for scanning of semiconductor devices. • reconstructed detailed 2d raman maps of semiconductor devices by controlling one-millionth of a meter movements through piezoelectric positioners, identifying flakes, interfaces, and heterogeneities across samples. • enabled communication between hardware control and spectral data acquisition from 1.7 – 300 k.",
    technologies: ["labview", "python", "labspec"],
    id: 1,
  },
  {
    title: "solar powered reconfigurable intelligent surface (ris)",
    subtitle: "furi @ asu - under prof. george trichopoulos",
    date: "jan 25' - present",
    description: "• designed an autonomous solar power system for ris to operate off-grid. • built an arduino due–based dummy electronic load (dac → op-amp → mosfet) to emulate and test ris power draw. • calibrated closed-loop current control and validated panel/battery sizing through v–i characterization and long-duration testing.",
    technologies: ["arduino", "c++", "matlab", "ltspice"],
    id: 2,
  },
  {
    title: "data analytics & visualization" ,
    subtitle: "remote semester-long project @ intel",
    supervisor: "",
    date: "jan - may 25'",
    description: "• built tableau dashboards to visualize net energy production, trends, and power plant data. • used sql data aggregation to compare regions and recommend an optimal data center location based on renewable energy availability. • processed and aggregated large datasets with pandas and numpy to support sql analysis and tableau visualization.",
    technologies: ["pandas", "numpy", "tableau", "sql", "python", "excel"],
    id: 3,
  },
  {
    title: "data science & modeling",
    subtitle: "remote project @ the recording academy",
    supervisor: "",
    date: "mar - may 25'",
    description: "• analyzed grammy.com metrics such as page views, time on site, and pages per session using python and sql. • cleaned and organized real-world data by sorting, filtering, and grouping. • created charts in matplotlib to show audience engagement and content performance.",
    technologies: ["python", "sql", "matplotlib", "pandas", "numpy"],
    id: 4,
  },
  {
    title: "software development intern",
    subtitle: " remote internship @ cloudware it",
    supervisor: "",
    date: "aug 23' - may 24'",
    description: "• automated government contract searches on sam.gov with a python selenium scraper. • supported projects involving pandas data processing, javascript web updates, and smtp email notifications to deliver daily job alerts based on location and role keywords.",
    technologies: ["python", "selenium", "pandas", "javascript", "smtp"],
    id: 5,
  },
 
];

export default HorizontalScrollCarousel;
 