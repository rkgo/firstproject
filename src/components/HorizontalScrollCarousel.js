import { motion, useTransform, useScroll, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import './HorizontalScrollCarousel.css';

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false);
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
      // Start horizontal scrolling when the experience section is properly in view
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.3;

      if (isInView) {
        // We're in the experience section - disable vertical scrolling immediately
        setIsHorizontalScrolling(true);
      } else {
        // We're not in the experience section - re-enable vertical scrolling
        setIsHorizontalScrolling(false);
        horizontalProgress.set(0); // Reset horizontal progress when exiting
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
        return false;
      }
    };

    const handleKeyDown = (e) => {
      if (isHorizontalScrolling) {
        // Convert vertical arrow keys to horizontal movement
        if (e.keyCode === 38) { // Up arrow - move right
          e.preventDefault();
          const currentValue = horizontalProgress.get();
          horizontalProgress.set(Math.min(1, currentValue + 0.01));
          return false;
        } else if (e.keyCode === 40) { // Down arrow - move left
          e.preventDefault();
          const currentValue = horizontalProgress.get();
          horizontalProgress.set(Math.max(0, currentValue - 0.01));
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
