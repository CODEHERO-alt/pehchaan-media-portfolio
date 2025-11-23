// src/utils/workAnimations.js

// Generic staggered container
export const staggerContainer = (stagger = 0.05) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
});

// Card hover
export const cardHover = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -6,
    scale: 1.02,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

// Hero animations
export const heroContainer = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const heroTitleParent = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const heroTitleChild = {
  initial: { opacity: 0, y: 24, rotateX: 30 },
  animate: (i = 0) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.06,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const heroSubtitle = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Glowing orbs behind hero
export const heroGlowOrbs = {
  initial: { opacity: 0, scale: 0.6 },
  animate: (i = 0) => ({
    opacity: 1,
    scale: 1,
    x: [0, 10, -6, 0],
    y: [0, -8, 4, 0],
    transition: {
      delay: 0.3 + i * 0.2,
      duration: 6 + i * 1.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  }),
};

// Trails
export const heroTrails = {
  initial: { opacity: 0, y: 40 },
  animate: (i = 0) => ({
    opacity: [0, 1, 0],
    y: [-40, 40],
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 2.4 + i * 0.2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  }),
};

// Pill animation
export const pillVariant = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.96,
    opacity: 0.9,
  },
};

// Filter bar animations
export const filterBarParent = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export const filterBarInput = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const filterChipParent = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

export const filterChipChild = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

// Thumbnail reveal
export const thumbReveal = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Modal animations
export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const modalContent = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.2 },
  },
};
