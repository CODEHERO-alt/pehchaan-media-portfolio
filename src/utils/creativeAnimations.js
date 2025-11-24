// src/utils/creativeAnimations.js

export const showcaseStagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
};

export const mediaFloat = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export const mediaHoverIn = {
  hover: {
    scale: 1.04,
    rotateZ: 0.5,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const mediaHoverOut = {
  rest: {
    scale: 1,
    rotateZ: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// ✨ NEW — added fadeInUp (clean, smooth, Awwwards-style)
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const brushReveal = {
  hidden: {
    opacity: 0,
    clipPath: "inset(0% 50% 0% 50%)",
  },
  reveal: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.45,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};
