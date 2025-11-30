// src/utils/animationConfig.js
// ✅ UPDATED - Configuration for YouTube → Jet hero animation

// ===== CUSTOM EASING CURVES =====
export const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.22, 1, 0.36, 1],
  elastic: [0.22, 1.4, 0.3, 1],
  cinematic: [0.15, 0.88, 0.32, 1.2],
  pop: [0.16, 1, 0.32, 1],
  morph: [0.32, 1, 0.22, 1],
  anticipation: [0.34, 1.56, 0.64, 1],
  jetFlight: [0.16, 0.88, 0.2, 1],
};

// ===== TIMING CONSTANTS (in seconds) =====
export const TIMINGS = {
  // Initial fade in
  heroFadeIn: 0.4,
  
  // YouTube logo entrance
  logoEnter: 0.8,
  logoPause: 0.6,
  logoExit: 0.3,
  
  // Jet animation
  jetMorph: 2.2,
  jetFlight: 2.2,
  
  // Trail effect
  trailDuration: 2.2,
  
  // Background effects
  bgDim: 1.5,
  
  // Content reveal
  contentDelay: 0.3,
  contentReveal: 1.2,
  contentFadeIn: 0.5,
};

// ===== AUDIO CONFIG =====
export const AUDIO_CONFIG = {
  enabled: true,
  baseVolume: 0.7,
  sounds: {
    drag: "/assets/sfx/drag.mp3",
    click: "/assets/sfx/click.mp3",
    whoosh: "/assets/sfx/whoosh.mp3",
    bass: "/assets/sfx/bass.mp3",
  },
};

// ===== STAGE BREAKDOWN =====
/**
 * ANIMATION SEQUENCE (Total ~5.5 seconds):
 * 
 * T=0.0s    Hero fades in (0.4s)
 * T=0.4s    YouTube logo scales up, centered (0.8s)
 * T=1.2s    Logo visible pause (0.6s)
 * T=1.8s    Whoosh sound - Logo fades, Jet flies right (2.2s)
 * T=1.8-2.1s Parallel: Logo exit (0.3s)
 * T=1.8-4.0s Jet morphs and flies across (2.2s)
 * T=1.8-4.0s Trail follows jet (2.2s)
 * T=1.8-3.3s Background dims (1.5s)
 * T=4.0s    Reveal sound - Content slides up (1.2s)
 * T=5.2s    Animation complete
 */

export const ANIMATION_TIMELINE = {
  stages: [
    { name: "Hero Fade In", start: 0, duration: 0.4 },
    { name: "Logo Appear", start: 0.4, duration: 0.8 },
    { name: "Logo Pause", start: 1.2, duration: 0.6 },
    { name: "Jet Morph & Flight", start: 1.8, duration: 2.2 },
    { name: "Trail Effect", start: 1.8, duration: 2.2 },
    { name: "BG Dim", start: 1.8, duration: 1.5 },
    { name: "Content Reveal", start: 4.0, duration: 1.2 },
  ],
  totalDuration: 5.2,
};

// ===== RESPONSIVE ADJUSTMENTS =====
export const RESPONSIVE_TIMINGS = {
  mobile: {
    heroFadeIn: 0.35,
    logoEnter: 0.7,
    logoPause: 0.5,
    jetMorph: 1.8,
    contentReveal: 1.0,
  },
  tablet: {
    logoEnter: 0.75,
    jetMorph: 2.0,
    contentReveal: 1.1,
  },
};

export const getAdjustedTimings = () => {
  if (typeof window === "undefined") return TIMINGS;
  
  const width = window.innerWidth;
  
  if (width <= 640) {
    return { ...TIMINGS, ...RESPONSIVE_TIMINGS.mobile };
  } else if (width <= 1024) {
    return { ...TIMINGS, ...RESPONSIVE_TIMINGS.tablet };
  }
  
  return TIMINGS;
};
