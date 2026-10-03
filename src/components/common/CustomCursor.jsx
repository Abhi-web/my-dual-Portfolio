import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Smooth springs for cursor movement
  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const touchCheck = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchCheck || reducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.hasAttribute('data-cursor-interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-brand-400/50 pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 46 : isClicking ? 28 : 34,
          height: isHovering ? 46 : isClicking ? 28 : 34,
          backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.12)' : 'rgba(6, 182, 212, 0.04)',
          borderColor: isHovering ? 'rgba(34, 211, 238, 0.8)' : 'rgba(6, 182, 212, 0.35)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-400 pointer-events-none shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450 }}
      />
    </div>
  );
};

export default CustomCursor;
