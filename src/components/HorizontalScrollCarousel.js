import { motion, useTransform, useScroll, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import './HorizontalScrollCarousel.css';

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false);
  const [hasExited, setHasExited] = useState(false);
  const horizontalProgress = useMotionValue(0);
  
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
        const delta = e.deltaY * 0.0005; // Even smaller increment for tighter movement
        const currentValue = horizontalProgress.get();
        const newProgress = Math.max(0, Math.min(1, currentValue + delta));
        horizontalProgress.set(newProgress);
        
        // Check if we've reached the beginning (Project 1) or end (Project 7)
        if (newProgress <= 0.01 && e.deltaY < 0) {
          // At the beginning and trying to scroll up - switch back to vertical
          setIsHorizontalScrolling(false);
          horizontalProgress.set(0); // Reset horizontal progress when exiting
          // Scroll up to previous section
          setTimeout(() => {
            window.scrollBy(0, -window.innerHeight);
          }, 100);
        } else if (newProgress >= 0.85 && e.deltaY > 0) {
          // At Project 7 (85% through) and trying to scroll down - switch back to vertical
          setIsHorizontalScrolling(false);
          setHasExited(true); // Mark that we've exited to prevent restart
          horizontalProgress.set(1); // Reset horizontal progress when exiting
          // Scroll down to next section immediately to get out of experience section
          window.scrollBy(0, window.innerHeight * 2); // Scroll further to exit experience section
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
          const newProgress = Math.min(1, currentValue + 0.01);
          horizontalProgress.set(newProgress);
          
          // Check if we've reached the end and trying to go further
          if (currentValue >= 0.85) {
            setIsHorizontalScrolling(false);
            horizontalProgress.set(1);
          }
          return false;
        } else if (e.keyCode === 40) { // Down arrow - move left
          e.preventDefault();
          const currentValue = horizontalProgress.get();
          const newProgress = Math.max(0, currentValue - 0.01);
          horizontalProgress.set(newProgress);
          
          // Check if we've reached the beginning and trying to go further
          if (currentValue <= 0.01) {
            setIsHorizontalScrolling(false);
            horizontalProgress.set(0);
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
    isHorizontalScrolling ? horizontalProgress : scrollYProgress, 
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
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="horizontal-scroll-card-bg"
      ></div>
      <div className="horizontal-scroll-card-overlay">
        <p className="horizontal-scroll-card-title">
          {card.title}
        </p>
      </div>
    </div>
  );
};

const cards = [
  {
    url: "https://picsum.photos/450/450?random=1",
    title: "Project 1",
    id: 1,
  },
  {
    url: "https://picsum.photos/450/450?random=2",
    title: "Project 2",
    id: 2,
  },
  {
    url: "https://picsum.photos/450/450?random=3",
    title: "Project 3",
    id: 3,
  },
  {
    url: "https://picsum.photos/450/450?random=4",
    title: "Project 4",
    id: 4,
  },
  {
    url: "https://picsum.photos/450/450?random=5",
    title: "Project 5",
    id: 5,
  },
  {
    url: "https://picsum.photos/450/450?random=6",
    title: "Project 6",
    id: 6,
  },
  {
    url: "https://picsum.photos/450/450?random=7",
    title: "Project 7",
    id: 7,
  },
];

export default HorizontalScrollCarousel;
 