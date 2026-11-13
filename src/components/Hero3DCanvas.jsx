import React, { useRef, useEffect } from 'react';

/**
 * Hero3DCanvas - Interactive 3D Placement Constellation Sphere
 * Projects mathematical 3D nodes (Companies, Skills, Student Profiles)
 * onto a 2D HTML5 canvas with real-time perspective projection and mouse drag.
 */
export default function Hero3DCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    let width = (canvas.width = canvas.parentElement.clientWidth || 320);
    let height = (canvas.height = canvas.parentElement.clientHeight || 200);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 320;
      height = canvas.height = canvas.parentElement.clientHeight || 200;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D Spherical Nodes (Golden Spiral / Fibonacci Sphere)
    const nodeCount = 42;
    const radius = Math.min(width, height) * 0.42;
    const nodes = [];

    const companyLabels = ['Google', 'Amazon', 'Microsoft', 'Razorpay', 'TCS', 'Cred', 'DSA', 'CGPA', 'React', 'System Design'];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      nodes.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        label: i < companyLabels.length ? companyLabels[i] : null,
        isHighlight: i < companyLabels.length
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseX = x * 0.00015;
      mouseY = y * 0.00015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3D Rendering loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate around X and Y axis
      const currentRotY = angleY + mouseX;
      const currentRotX = angleX + mouseY;

      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      // Project 3D to 2D
      const projected = [];
      const focalLength = 320;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Rotate Y
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // Rotate X
        let y1 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Save rotated coordinates
        node.x = x1;
        node.y = y1;
        node.z = z2;

        // 3D Perspective Projection
        const scale = focalLength / (focalLength + z2 + radius);
        const projX = x1 * scale + centerX;
        const projY = y1 * scale + centerY;
        const alpha = Math.max(0.15, Math.min(1, (z2 + radius) / (2 * radius)));

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          scale,
          alpha,
          label: node.label,
          isHighlight: node.isHighlight
        });
      }

      // Sort by Z for realistic depth
      projected.sort((a, b) => a.z - b.z);

      // Draw interconnected 3D wireframe lines
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const lineAlpha = (1 - dist / 65) * Math.min(projected[i].alpha, projected[j].alpha) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D nodes and floating labels
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        ctx.beginPath();
        if (p.isHighlight) {
          ctx.arc(p.x, p.y, 3.5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
          ctx.shadowColor = '#10B981';
          ctx.shadowBlur = 8;
        } else {
          ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.7})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();

        // Render floating 3D text label for key companies/skills
        if (p.label && p.z > -20) {
          ctx.shadowBlur = 0;
          ctx.font = `${Math.max(9, Math.round(10 * p.scale))}px "Plus Jakarta Sans", sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.85})`;
          ctx.fillText(p.label, p.x + 6, p.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
