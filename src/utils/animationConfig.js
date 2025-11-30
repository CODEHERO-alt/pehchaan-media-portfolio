// src/utils/animationConfig.js
// ✅ OPTIMIZED - Compact hero, water-fill buttons, no lag

// ===== CUSTOM EASING CURVES =====
export const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.22, 1, 0.36, 1],
  elastic: [0.22, 1.4, 0.3, 1],
  cinematic: [0.15, 0.88, 0.32, 1.2],
  pop: [0.16, 1, 0.32, 1],
  morph: [0.32, 1, 0.22, 1],
};

// ===== TIMING CONSTANTS (in seconds) =====
export const TIMINGS = {
  // Initial sequence
  heroFadeIn: 0.4,
  playButtonCharge: 0.9,
  playButtonSettle: 0.35,
  playButtonPause: 0.3,

  // Effects
  trailEffect: 1.2,
  shockwaveDuration: 0.5,

  // Content reveal
  contentDelay: 0.2,
  contentReveal: 0.8,

  // Background
  bgFadeDuration: 1.2,

  // Button water fill
  waterFillDuration: 0.8,
};

// ===== AUDIO CONFIG =====
export const AUDIO_CONFIG = {
  enabled: true,
  baseVolume: 0.7,
  sounds: {
    drag: "/assets/sfx/drag.mp3",        // Charge sound
    click: "/assets/sfx/click.mp3",      // Reveal sound
    whoosh: "/assets/sfx/whoosh.mp3",    // Shockwave sound
    bass: "/assets/sfx/bass.mp3",        // Impact
  },
};

// ===== ANIMATION TIMELINE =====
/**
 * OPTIMIZED COMPACT HERO
 * Total Duration: ~3.5 seconds
 * 
 * T=0.0s    Hero fades in (0.4s)
 * T=0.4s    Play button charges (0.9s)
 * T=1.3s    Button settles (0.35s)
 * T=1.65s   Pause
 * T=1.95s   Shockwave & trail (1.2s)
 * T=2.3s    Content reveals (0.8s delay 0.2s)
 * T=3.5s    Animation complete
 */

export const ANIMATION_TIMELINE = {
  stages: [
    { name: "Hero Fade In", start: 0, duration: 0.4 },
    { name: "Play Button Charge", start: 0.4, duration: 0.9 },
    { name: "Play Button Settle", start: 1.3, duration: 0.35 },
    { name: "Shockwave & Trail", start: 1.95, duration: 1.2 },
    { name: "Content Reveal", start: 2.3, duration: 0.8 },
  ],
  totalDuration: 3.5,
};

// ===== MICRO-INTERACTIONS CONFIG =====
export const MICRO_INTERACTIONS = {
  playButtonPulse: {
    duration: 2.5,
    intensity: "medium",
  },
  buttonGlow: {
    duration: 3.0,
    intensity: "medium",
  },
  particleDrift: {
    count: 25,
    speed: "slow",
  },
};

// ===== RESPONSIVE ADJUSTMENTS =====
export const RESPONSIVE_TIMINGS = {
  mobile: {
    heroFadeIn: 0.35,
    playButtonCharge: 0.8,
    trailEffect: 1.0,
    contentReveal: 0.7,
  },
  tablet: {
    playButtonCharge: 0.85,
    trailEffect: 1.1,
    contentReveal: 0.75,
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

// ===== PERFORMANCE CONFIG =====
export const PERFORMANCE = {
  particleCount: 25,
  particleOpacity: 0.4,
  glowBlurAmount: 60,
  enableCanvasParticles: true,
};
