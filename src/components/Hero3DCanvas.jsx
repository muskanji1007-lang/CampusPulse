import React, { useRef, useEffect } from 'react';

/**
 * Hero3DCanvas - Professional Placement Constellation Visualization
 * Mathematically projects 3D recruitment nodes (Companies, Skills, Student Criteria)
 * with restrained enterprise styling aligned with Obsidian + Emerald aesthetic.
 */
export default function Hero3DCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth || 320);
    let height = (canvas.height = canvas.parentElement.clientHeight || 200);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 320;
      height = canvas.height = canvas.parentElement.clientHeight || 200;
    };
    window.addEventListener('resize', handleResize);

    // Spherical node distribution (Fibonacci Sphere)
    const nodeCount = 38;
    const radius = Math.min(width, height) * 0.42;
    const nodes = [];

    const companyLabels = ['Google', 'Amazon', 'Microsoft', 'Razorpay', 'TCS', 'Cred', 'DSA', 'CGPA', 'System Design'];

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

    let angleX = 0.002;
    let angleY = 0.0035;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseX = x * 0.0001;
      mouseY = y * 0.0001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentRotY = angleY + mouseX;
      const currentRotX = angleX + mouseY;

      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      const projected = [];
      const focalLength = 340;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        let y1 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        node.x = x1;
        node.y = y1;
        node.z = z2;

        const scale = focalLength / (focalLength + z2 + radius);
        const projX = x1 * scale + centerX;
        const projY = y1 * scale + centerY;
        const alpha = Math.max(0.12, Math.min(1, (z2 + radius) / (2 * radius)));

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

      projected.sort((a, b) => a.z - b.z);

      // Clean, subtle connecting lines (no excessive glow)
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            const lineAlpha = (1 - dist / 60) * Math.min(projected[i].alpha, projected[j].alpha) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Render crisp, restrained nodes (no heavy blur)
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        ctx.beginPath();
        if (p.isHighlight) {
          ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha * 0.9})`;
        } else {
          ctx.arc(p.x, p.y, 1.8 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(156, 169, 161, ${p.alpha * 0.5})`;
        }
        ctx.fill();

        // Node labels
        if (p.label && p.z > -15) {
          ctx.font = `${Math.max(9, Math.round(9.5 * p.scale))}px "Plus Jakarta Sans", sans-serif`;
          ctx.fillStyle = `rgba(232, 237, 233, ${p.alpha * 0.85})`;
          ctx.fillText(p.label, p.x + 5, p.y + 3);
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
