// src/utils/workAnimations.js

// ---------- ORIGINAL ANIMATIONS (preserved) ----------
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

export const thumbReveal = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

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

// ---------- NEW / ADDED CINEMATIC VARIANTS ----------

// Container stagger alias (keeps compatibility)
export const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// fadeInUp — scroll-triggered with custom index (strength)
export const fadeInUp = {
  hidden: { opacity: 0, y: 28, perspective: 800, rotateX: 4 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// mediaFloat (gentle entrance used by cards)
export const mediaFloat = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

// hover variants for media (subtle)
export const mediaHoverIn = {
  hover: {
    scale: 1.03,
    transition: { duration: 0.28, ease: "easeOut" },
  },
};
export const mediaHoverOut = {
  rest: { scale: 1, transition: { duration: 0.28, ease: "easeInOut" } },
};

// size-based strength helper (return variant)
export const sizeStrength = (weight = 1) => {
  const base = 0.06;
  return {
    hidden: { opacity: 0, y: 28 * (1 + weight * 0.15) },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * base,
        duration: 0.6 + weight * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };
};
