import type { Variants } from 'framer-motion'

/**
 * FlowstateIT Animation System
 * Framer Motion variants for consistent, cinematic animations
 */

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Fade in from top
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Fade in from right
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Simple fade in
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Scale up on entrance
export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Stagger container for sequential animations
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 200ms delay between children
      delayChildren: 0.1,
    },
  },
}

// Fast stagger for quick sequences
export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
}

// Slow stagger for dramatic effect
export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
}

// Gradient wave animation
export const gradientWave: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Pulse animation for CTAs
export const pulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Glow pulse animation
export const glowPulse: Variants = {
  initial: {
    opacity: 0.6,
  },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Float animation
export const float: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// 3D tilt on hover (for cards)
export const tiltOnHover = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

// Gradient sweep on hover (for buttons)
export const gradientSweep = {
  rest: {
    backgroundPosition: '0% 50%',
  },
  hover: {
    backgroundPosition: '100% 50%',
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
}

/**
 * Parallax scroll animation helper
 * Usage: Apply to useTransform with scrollYProgress
 */
export const parallaxConfig = {
  hero: 1.1, // Moves slightly faster than scroll
  background: 0.8, // Moves slower than scroll
  default: 1, // Moves with scroll
}

/**
 * Transition presets
 */
export const transitions = {
  fast: {
    duration: 0.2,
    ease: 'easeOut',
  },
  default: {
    duration: 0.3,
    ease: 'easeOut',
  },
  smooth: {
    duration: 0.5,
    ease: 'easeInOut',
  },
  slow: {
    duration: 0.7,
    ease: 'easeInOut',
  },
  spring: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 15,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 10,
  },
}

/**
 * Animation timing constants from theme.json
 */
export const timing = {
  staggerDelay: 200, // ms
  fadeInDuration: 500, // ms
  hoverDuration: 300, // ms
  complexDuration: 700, // ms
}

/**
 * Viewport animation options
 * For use with viewport prop in motion components
 */
export const viewportOptions = {
  once: true, // Animate only once when entering viewport
  amount: 0.3, // Trigger when 30% of element is visible
  margin: '0px 0px -100px 0px', // Start animation 100px before element enters viewport
}

export const viewportOptionsStrict = {
  once: true,
  amount: 0.5, // Trigger when 50% visible
}

export const viewportOptionsLoose = {
  once: true,
  amount: 0.1, // Trigger when 10% visible (good for tall sections)
}
