import React, { useState, useEffect } from 'react';
import CircularText from './CircularText';
import FadeContent from './FadeContent';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCircularText, setShowCircularText] = useState(false);

  const fullText = "hi, i'm ramakrishnan\ngopinath";
  const typewriterSpeed = 75;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typewriterSpeed);
      return () => clearTimeout(timer);
    } else {
      // Show circular text only after typing is complete
      setShowCircularText(true);
    }
  }, [currentIndex, fullText]);

  const renderHeroText = () => {
    const lines = displayText.split('\n');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <div className="hero__text">
          <h1 className="hero__title">
            {renderHeroText()}
            <span className="hero__caret">|</span>
          </h1>
        </div>
        {showCircularText && (
          <FadeContent 
            duration={3000} 
            delay={1000} 
            threshold={0.1} 
            initialOpacity={0}
            className="hero__circular"
          >
            <CircularText
              text="ELECTRICAL ENGINEER - MUSICIAN - DEVELOPER - "
              onHover="speedUp"
              spinDuration={25}
              className="hero-circular-text"
            />
          </FadeContent>
        )}
      </div>
    </section>
  );
};

export default Hero;
