import React, { useEffect, useRef } from 'react';

export const BackgroundEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle drifting ambient particles
    const particleCount = Math.min(Math.floor(width / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.35 + 0.1,
    }));

    let isTabVisible = true;
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        render();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = null;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Draw subtle particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Background Gradient Mesh */}
      <div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, rgba(14,165,233,0.1) 70%, transparent 100%)',
        }}
      />
      <div 
        className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full blur-[160px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.3) 0%, rgba(59,130,246,0.1) 70%, transparent 100%)',
        }}
      />
      <div 
        className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full blur-[150px] opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(6,182,212,0.1) 70%, transparent 100%)',
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Subtle particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      
      {/* Vignette edge mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,10,0.85)_100%)]" />
    </div>
  );
};

export default BackgroundEffect;
