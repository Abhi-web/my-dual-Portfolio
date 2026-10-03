/**
 * Motion Design System & Animation Tokens
 * Centralized easing, spring physics, and Framer Motion variants
 * Adheres to: Fast, Smooth, Precise, Subtle, Professional.
 */

// Custom Quintic / Luxury ease: swift initial acceleration, silky smooth landing
export const customEase = [0.16, 1, 0.3, 1];

// Standard duration tokens (in seconds)
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  relaxed: 0.5,
  slow: 0.7,
};

// Spring configurations
export const springs = {
  snappy: { type: 'spring', damping: 24, stiffness: 350 },
  gentle: { type: 'spring', damping: 28, stiffness: 220 },
  bouncy: { type: 'spring', damping: 18, stiffness: 280 },
};

/**
 * Standard Fade & Slide Up reveal for sections and headings
 */
export const fadeUpVariant = (delay = 0, distance = 16) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      delay,
      ease: customEase,
    },
  },
});

/**
 * Fade In without translation
 */
export const fadeInVariant = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      delay,
      ease: 'easeOut',
    },
  },
});

/**
 * Parent container with staggered child reveals
 */
export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Stagger child item
 */
export const staggerItem = (distance = 14) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: customEase,
    },
  },
});

/**
 * Card hover micro-interaction
 */
export const cardHoverProps = {
  whileHover: {
    y: -3,
    transition: { duration: 0.2, ease: customEase },
  },
  whileTap: {
    scale: 0.99,
    transition: { duration: 0.1 },
  },
};

/**
 * Button tap micro-interaction
 */
export const buttonTapProps = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.18, ease: customEase },
  },
  whileTap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

/**
 * Modal dialog animation
 */
export const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.22, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.18, ease: 'easeIn' }
  },
};

export const modalDialogVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.28, ease: customEase }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    y: 12,
    transition: { duration: 0.2, ease: 'easeIn' }
  },
};

/**
 * Viewport reveal defaults
 */
export const viewportSettings = {
  once: true,
  margin: '-60px',
};
