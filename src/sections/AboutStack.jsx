// src/sections/AboutStack.jsx
import React from "react";
import PixelCard from '../components/PixelCard';
import "./about-stack.css";

export default function AboutStack() {
  return (
    <section id="about" className="snap about-section" aria-label="About me">
      <div className="about-left">
        <h2 className="about-title">About me</h2>
      </div>

      <div className="about-right">
        <div className="pixel-cards-container">
          <PixelCard variant="blue">
            <div className="card-content">
              <h3>Electrical Engineer</h3>
              <p>Circuit design & power systems</p>
            </div>
          </PixelCard>
          
          <PixelCard variant="yellow">
            <div className="card-content">
              <h3>Software Developer</h3>
              <p>Full-stack & modern tech</p>
            </div>
          </PixelCard>
          
          <PixelCard variant="pink">
            <div className="card-content">
              <h3>Problem Solver</h3>
              <p>Creative engineering solutions</p>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
}
