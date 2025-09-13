import React, { useState, useEffect } from 'react';
import './CircuitLoader.css';

const CircuitLoader = ({ 
  size = 200, 
  color = '#6FE5E4', 
  className = '',
  showText = false,
  onBatteryComplete = null
}) => {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isCharging, setIsCharging] = useState(true);
  const [chargingDots, setChargingDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        if (prev >= 100) {
          setIsCharging(false);
          if (onBatteryComplete) {
            setTimeout(() => onBatteryComplete(), 1000); // Wait 1 second after reaching 100%
          }
          return 100;
        }
        return prev + 1;
      });
    }, 80); // Slightly slower for better visual effect

    return () => clearInterval(interval);
  }, [onBatteryComplete]);

  // Charging dots animation
  useEffect(() => {
    if (!isCharging) return;
    
    const dotsInterval = setInterval(() => {
      setChargingDots(prev => (prev + 1) % 4); // 0, 1, 2, 3 (0 = no dots, 1-3 = 1-3 dots)
    }, 500); // Change every 500ms

    return () => clearInterval(dotsInterval);
  }, [isCharging]);

  return (
    <div 
      className={`circuit-loader ${className}`} 
      style={{ 
        width: size, 
        height: size,
        position: 'relative'
      }}
    >
      <svg 
        viewBox="0 0 400 300" 
        className="circuit-loader__svg"
        style={{ width: size, height: size * 0.75 }}
      >
        {/* Circuit Board Background */}
        <rect 
          x="20" 
          y="20" 
          width="360" 
          height="260" 
          rx="4" 
          fill="rgba(245, 245, 220, 0.1)" 
          stroke={color} 
          strokeWidth="1" 
          opacity="0.3"
        />
        
        {/* Grid Pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect x="20" y="20" width="360" height="260" fill="url(#grid)" />
        
        {/* Main Microcontroller (U1) - Central Component */}
        <g className="microcontroller">
          <rect x="180" y="120" width="60" height="80" fill="rgba(60, 60, 60, 0.8)" stroke={color} strokeWidth="2" strokeDasharray="4,2" rx="2" />
          <text x="210" y="135" fontSize="10" fill={color} textAnchor="middle" fontWeight="bold">U1</text>
          <text x="210" y="150" fontSize="8" fill={color} textAnchor="middle">MCU</text>
          
          {/* Loading Bar */}
          <rect x="185" y="160" width="50" height="8" fill="rgba(0, 0, 0, 0.3)" stroke={color} strokeWidth="1" rx="1" />
          <rect x="185" y="160" width={`${(batteryLevel / 100) * 50}`} height="8" fill={color} opacity="0.8" rx="1" />
          <text x="210" y="185" fontSize="6" fill={color} textAnchor="middle">{batteryLevel}%</text>
          
          {/* Microcontroller Pins - Simplified */}
          {/* Top pins */}
          <rect x="185" y="115" width="3" height="3" fill={color} />
          <rect x="195" y="115" width="3" height="3" fill={color} />
          <rect x="205" y="115" width="3" height="3" fill={color} />
          <rect x="215" y="115" width="3" height="3" fill={color} />
          <rect x="225" y="115" width="3" height="3" fill={color} />
          
          {/* Right pins */}
          <rect x="240" y="125" width="3" height="3" fill={color} />
          <rect x="240" y="135" width="3" height="3" fill={color} />
          <rect x="240" y="145" width="3" height="3" fill={color} />
          <rect x="240" y="155" width="3" height="3" fill={color} />
          <rect x="240" y="165" width="3" height="3" fill={color} />
          <rect x="240" y="175" width="3" height="3" fill={color} />
          <rect x="240" y="185" width="3" height="3" fill={color} />
          
          {/* Bottom pins */}
          <rect x="225" y="200" width="3" height="3" fill={color} />
          <rect x="215" y="200" width="3" height="3" fill={color} />
          <rect x="205" y="200" width="3" height="3" fill={color} />
          <rect x="195" y="200" width="3" height="3" fill={color} />
          <rect x="185" y="200" width="3" height="3" fill={color} />
          
          {/* Left pins */}
          <rect x="180" y="185" width="3" height="3" fill={color} />
          <rect x="180" y="175" width="3" height="3" fill={color} />
          <rect x="180" y="165" width="3" height="3" fill={color} />
          <rect x="180" y="155" width="3" height="3" fill={color} />
          <rect x="180" y="145" width="3" height="3" fill={color} />
          <rect x="180" y="135" width="3" height="3" fill={color} />
          <rect x="180" y="125" width="3" height="3" fill={color} />
        </g>
        
        {/* MCU Connections to Circuit */}
        <g className="mcu-connections">
          {/* MCU top connections to resistors - Signal lines to R1 and R2 */}
          <path d="M 195 120 L 195 70" stroke={color} strokeWidth="2" fill="none" />
          <path d="M 225 120 L 225 70" stroke={color} strokeWidth="2" fill="none" />
          
          {/* MCU left connection to crystal - Clock signal line */}
          <path d="M 180 160 L 100 160" stroke={color} strokeWidth="2" fill="none" />
          
          {/* MCU bottom connection to GND - Ground reference line */}
          <path d="M 210 200 L 210 250" stroke={color} strokeWidth="2" fill="none" />
        </g>
        
        {/* Power Supply Section */}
        <g className="power-supply">
          {/* VDD Power Line - Main positive power rail across top */}
          <path d="M 50 50 L 350 50" stroke={color} strokeWidth="3" fill="none" opacity="0.8" />
          <text x="200" y="45" fontSize="8" fill={color} textAnchor="middle">VDD (3.3V)</text>
          
          {/* GND Power Line - Main ground rail across bottom */}
          <path d="M 50 250 L 350 250" stroke={color} strokeWidth="3" fill="none" opacity="0.8" />
          <text x="200" y="245" fontSize="8" fill={color} textAnchor="middle">GND</text>
          
          {/* Ground Symbol - Single central ground reference point */}
          <g className="ground-symbols">
            <path d="M 200 250 L 200 260 M 195 260 L 205 260 M 197 262 L 203 262 M 198 264 L 202 264" 
                  stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
          </g>
        </g>
        
        {/* Resistors */}
        <g className="resistors">
          {/* R1 - 10K - Connected to LED1 and MCU */}
          <path d="M 100 70 L 125 70" stroke={color} strokeWidth="2" fill="none" />
          <rect x="125" y="65" width="15" height="10" fill="none" stroke={color} strokeWidth="1" />
          <path d="M 140 70 L 260 70" stroke={color} strokeWidth="2" fill="none" />
          <text x="133" y="85" fontSize="6" fill={color} textAnchor="middle">R1</text>
          <text x="133" y="95" fontSize="5" fill={color} textAnchor="middle">10KΩ</text>
          
          {/* R2 - 220 - Connected to LED2 and MCU */}
          <path d="M 275 70 L 300 70" stroke={color} strokeWidth="2" fill="none" />
          <rect x="260" y="65" width="15" height="10" fill="none" stroke={color} strokeWidth="1" />
          <text x="268" y="85" fontSize="6" fill={color} textAnchor="middle">R2</text>
          <text x="268" y="95" fontSize="5" fill={color} textAnchor="middle">220Ω</text>
          
        </g>
        
        {/* Capacitors */}
        <g className="capacitors">
          {/* C1 - 100nF - Connected to VDD and GND */}
          {/* C1 VDD connection - Power line from VDD rail */}
          <path d="M 50 50 L 50 100" stroke={color} strokeWidth="2" fill="none" />
          <path d="M 45 110 L 55 110" stroke={color} strokeWidth="2" fill="none" />
          {/* C1 GND connection - Ground line to GND rail */}
          <path d="M 50 120 L 50 250" stroke={color} strokeWidth="2" fill="none" />
          <text x="60" y="105" fontSize="6" fill={color}>C1</text>
          <text x="60" y="95" fontSize="5" fill={color}>100nF</text>
          
          {/* C2 - 10uF - Connected to VDD and GND */}
          {/* C2 VDD connection - Power line from VDD rail */}
          <path d="M 350 50 L 350 100" stroke={color} strokeWidth="2" fill="none" />
          <path d="M 345 110 L 355 110" stroke={color} strokeWidth="2" fill="none" />
          {/* C2 GND connection - Ground line to GND rail */}
          <path d="M 350 120 L 350 250" stroke={color} strokeWidth="2" fill="none" />
          <text x="340" y="105" fontSize="6" fill={color} textAnchor="end">C2</text>
          <text x="340" y="95" fontSize="5" fill={color} textAnchor="end">10uF</text>
          
        </g>
        
        {/* LEDs */}
        <g className="leds">
          {/* LED1 - Connected to VDD and R1 */}
          {/* LED1 VDD connection - Power line from VDD rail */}
          <path d="M 100 50 L 100 55" stroke={color} strokeWidth="2" fill="none" /> //this is the vertical line connecting led1
          <polygon points="100,55 90,65 110,65" fill={batteryLevel >= 100 ? "#00FF00" : "#FF0000"} opacity="0.9" className="led-blink" />
          <path d="M 100 65 L 100 70" stroke={color} strokeWidth="2" fill="none" />
            
          {/* LED2 - Connected to VDD and R2 */}
          {/* LED2 VDD connection - Power line from VDD rail */}
          <path d="M 300 50 L 300 55" stroke={color} strokeWidth="2" fill="none" />
          <polygon points="300,55 290,65 310,65" fill={batteryLevel >= 100 ? "#00FF00" : "#FF0000"} opacity="0.9" className="led-blink" />
          <path d="M 300 65 L 300 70" stroke={color} strokeWidth="2" fill="none" />
        </g>
        
        {/* Crystal Oscillator - Connected to MCU */}
        <g className="crystal">
          <rect x="80" y="150" width="20" height="15" fill="none" stroke={color} strokeWidth="2" />
          <path d="M 90 150 L 90 140" stroke={color} strokeWidth="2" fill="none" />
          <path d="M 90 165 L 90 250" stroke={color} strokeWidth="2" fill="none" />
          <text x="90" y="140" fontSize="6" fill={color} textAnchor="middle">Y1</text>
          <text x="90" y="135" fontSize="5" fill={color} textAnchor="middle">32MHz</text>
        </g>
        
        {/* Connectors */}
        <g className="connectors">
          {/* J1 - Power Connector - Connected to VDD */}
          <rect x="25" y="100" width="15" height="20" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="27" cy="105" r="1" fill={color} />
          <circle cx="27" cy="110" r="1" fill={color} />
          <circle cx="27" cy="115" r="1" fill={color} />
          <path d="M 40 110 L 50 110" stroke={color} strokeWidth="2" fill="none" />
          {/* J1 VDD connection - Power line to VDD rail */}
          <path d="M 50 110 L 50 50" stroke={color} strokeWidth="2" fill="none" />
          {/* J1 GND connection - Ground line to GND rail */}
          <path d="M 50 110 L 50 250" stroke={color} strokeWidth="2" fill="none" />
          <text x="32" y="95" fontSize="6" fill={color} textAnchor="middle">J1</text>
          
          {/* J2 - GPIO Connector - Connected to VDD and GND */}
          <rect x="360" y="100" width="15" height="20" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="362" cy="105" r="1" fill={color} />
          <circle cx="362" cy="110" r="1" fill={color} />
          <circle cx="362" cy="115" r="1" fill={color} />
          <path d="M 360 110 L 350 110" stroke={color} strokeWidth="2" fill="none" />
          {/* J2 VDD connection - Power line to VDD rail */}
          <path d="M 350 110 L 350 50" stroke={color} strokeWidth="2" fill="none" />
          {/* J2 GND connection - Ground line to GND rail */}
          <path d="M 350 100 L 350 250" stroke={color} strokeWidth="2" fill="none" />
          <text x="368" y="95" fontSize="6" fill={color} textAnchor="middle">J2</text>
        </g>
      </svg>
      
      {showText && (
        <div className="circuit-loader__text" style={{ color }}>
          {isCharging ? `Charging${'.'.repeat(chargingDots)} ${batteryLevel}%` : 'System Ready!'}
        </div>
      )}
    </div>
  );
};

export default CircuitLoader;
