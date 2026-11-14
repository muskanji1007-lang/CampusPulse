import React, { useState, useRef } from 'react';

/**
 * Card3D - Subtle Interactive Tilt Component
 * Provides restrained perspective depth with an oceanic ambient specular sheen.
 */
export default function Card3D({ children, className = '', depth = 6 }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -depth;
    const rotY = ((x - centerX) / centerX) * depth;

    setRotateX(rotX);
    setRotateY(rotY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.06 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1200px' }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative ${className}`}
      >
        {/* Subtle Cyan-tinted specular sheen */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, ${glarePos.opacity}), transparent 80%)`,
          }}
        />
        
        {/* Card Content with subtle elevation */}
        <div style={{ transform: 'translateZ(6px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
