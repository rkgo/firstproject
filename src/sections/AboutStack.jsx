// src/sections/AboutStack.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicBento from '../components/MagicBento';
import HorizontalScrollCarousel from '../components/HorizontalScrollCarousel';
import "./about-stack.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AboutStack({ id = "about", title = "about me" }) {
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const container = containerRef.current;

    if (!title || !container) return;

    // Create a timeline for the title animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false
      }
    });

    // Initial state - title is hidden and transformed
    gsap.set(title, {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotationX: 45,
      transformOrigin: "center center"
    });

    // Animate title in with crazy effects
    tl.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      ease: "back.out(1.7)"
    })
    .to(title, {
      textShadow: "0 0 30px rgba(111, 229, 228, 0.8), 0 0 60px rgba(111, 229, 228, 0.4)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(title, {
      y: -10,
      duration: 0.6,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    }, "-=0.3");

    // Add floating particles around the title
    const particles = [];
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.className = "title-particle";
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(111, 229, 228, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      `;
      container.appendChild(particle);
      particles.push(particle);

      // Animate each particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0,
        duration: 2 + Math.random() * 2,
        delay: i * 0.2,
        ease: "power2.out",
        repeat: -1,
        yoyo: true
      });
    }

    // Cleanup function
    return () => {
      tl.kill();
      particles.forEach(particle => particle.remove());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id={id} className="about-section" aria-label="About me">
      <div className="about-container" ref={containerRef}>
        <div className="about-header">
          <h2 className="about-title" ref={titleRef}>{title}</h2>
        </div>

        <div className="about-content">
          {id === "experience" ? (
            <HorizontalScrollCarousel />
          ) : (
            <MagicBento
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={400}
              particleCount={15}
              glowColor="111, 229, 228"
            />
          )}
        </div>
      </div>
    </section>
  );
}
