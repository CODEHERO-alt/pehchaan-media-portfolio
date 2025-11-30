// src/utils/animationConfig.js
// ✅ PREMIUM CINEMATIC - HyperTrail Jet Launch configuration
// YouTube Play Ignition Sequence with grid distortion and plasma trails

// ===== CUSTOM EASING CURVES - Physics-based ===== 
export const EASING = {
  // Apple-level smooth motion
  smooth: [0.16, 1, 0.3, 1],
  
  // Tesla-style snappy energy
  snappy: [0.22, 1, 0.36, 1],
  
  // Elastic spring with bounce
  elastic: [0.22, 1.4, 0.3, 1],
  
  // Cinematic slow-start, fast-middle, slow-end
  cinematic: [0.15, 0.88, 0.32, 1.2],
  
  // Pop with impact
  pop: [0.16, 1, 0.32, 1],
  
  // Smooth morph between states
  morph: [0.32, 1, 0.22, 1],
  
  // Jet flight - acceleration curve
  jetFlight: [0.16, 0.88, 0.2, 1],
  
  // Energy surge
  energySurge: [0.34, 1.56, 0.64, 1],
};

// ===== TIMING CONSTANTS (in seconds) =====
export const TIMINGS = {
  // Initial sequence
  heroFadeIn: 0.6,
  playButtonCharge: 1.2,
  playButtonSettle: 0.4,
  playButtonPause: 0.4,

  // Grid activation
  gridActivate: 0.3,

  // Jet sequence
  jetTrail: 2.2,
  jetAccel: 0.8,
  jetCruise: 1.0,
  jetExit: 0.4,

  // Trail effect
  trailDelay: 0.2,
  trailDuration: 2.2,

  // Grid distortion
  gridDistort: 2.2,

  // Shockwave
  shockwaveDelay: 2.4,
  shockwaveDuration: 0.4,

  // Text formation
  textRevealDelay: 0.2,
  textRevealDuration: 0.8,
  textGlowPulse: 2.0,

  // Content reveal
  contentDelay: 0.3,
  contentReveal: 1.2,

  // Background effects
  bgFadeDelay: 1.8,
  bgFadeDuration: 2.2,
};

// ===== AUDIO CONFIG =====
export const AUDIO_CONFIG = {
  enabled: true,
  baseVolume: 0.7,
  sounds: {
    drag: "/assets/sfx/drag.mp3",        // Charge/power up
    click: "/assets/sfx/click.mp3",      // Reveal sound
    whoosh: "/assets/sfx/whoosh.mp3",    // Jet launch
    bass: "/assets/sfx/bass.mp3",        // Shockwave
  },
};

// ===== ANIMATION TIMELINE BREAKDOWN =====
/**
 * HYPERTRAIL JET LAUNCH - IGNITION SEQUENCE
 * Total Duration: ~7.5 seconds
 * 
 * ┌─ CHARGE PHASE ─────────────────────────┐
 * T=0.0s    Hero fades in (0.6s)
 * T=0.6s    Play button charges & scales up (1.2s)
 *           Glow orbs start floating
 *           Particles drift across screen
 * T=1.0s    Audio: CHARGE sound
 * T=1.8s    Play button settles (0.4s)
 * T=2.0s    Play button pause (user sees it)
 *           Grid prepares to distort
 * 
 * ├─ IGNITION PHASE ──────────────────────┤
 * T=2.0s    Audio: WHOOSH sound
 * T=2.0s    Grid activates & distorts (0.3s delay)
 * T=2.0s    Jet launches & flies right (2.2s)
 *           Trail follows with plasma effect (2.2s)
 *           Background energy dims (2.2s)
 *           Speed curves accelerate jet
 * T=4.2s    Jet exits screen
 * 
 * ├─ REVELATION PHASE ────────────────────┤
 * T=4.4s    Audio: SHOCKWAVE sound
 * T=4.4s    Shockwave flash @ center (0.4s)
 * T=4.6s    Trail lines snap & form headline (0.8s)
 * T=4.6s    Text fills with cyan glow
 *           Neon pulse animation starts
 * 
 * └─ CONTENT PHASE ───────────────────────┘
 * T=5.0s    Audio: REVEAL sound
 * T=5.3s    Subtitle + CTAs slide up (1.2s)
 *           Buttons start glowing
 * T=6.5s    All micro-interactions active
 * T=7.5s    Animation complete
 */

export const ANIMATION_TIMELINE = {
  stages: [
    { name: "Hero Fade In", start: 0, duration: 0.6 },
    { name: "Play Button Charge", start: 0.6, duration: 1.2 },
    { name: "Play Button Settle", start: 1.8, duration: 0.4 },
    { name: "Play Button Pause", start: 2.2, duration: 0.4 },
    { name: "Grid Activation", start: 2.3, duration: 0.3 },
    { name: "Jet Launch", start: 2.0, duration: 2.2 },
    { name: "Plasma Trail", start: 2.2, duration: 2.2 },
    { name: "Background Dim", start: 2.0, duration: 2.2 },
    { name: "Shockwave Flash", start: 4.4, duration: 0.4 },
    { name: "Text Formation & Glow", start: 4.6, duration: 0.8 },
    { name: "Content Reveal", start: 5.3, duration: 1.2 },
  ],
  totalDuration: 7.5,
};

// ===== MICRO-INTERACTIONS CONFIG =====
export const MICRO_INTERACTIONS = {
  playButtonPulse: {
    duration: 3.0,
    intensity: "high",
  },
  trailPulse: {
    duration: 2.2,
    intensity: "high",
  },
  neonTextPulse: {
    duration: 2.0,
    intensity: "high",
  },
  buttonGlow: {
    duration: 3.0,
    intensity: "medium",
  },
  particleDrift: {
    count: 50,
    speed: "slow",
  },
};

// ===== RESPONSIVE ADJUSTMENTS =====
export const RESPONSIVE_TIMINGS = {
  mobile: {
    heroFadeIn: 0.5,
    playButtonCharge: 1.0,
    jetTrail: 1.8,
    trailDuration: 1.8,
    gridDistort: 1.8,
    textRevealDuration: 0.7,
    contentReveal: 1.0,
  },
  tablet: {
    playButtonCharge: 1.1,
    jetTrail: 2.0,
    trailDuration: 2.0,
    textRevealDuration: 0.75,
    contentReveal: 1.1,
  },
};

/**
 * Get adjusted timings based on screen size
 * Ensures smooth performance on all devices
 */
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

/**
 * Easing curve presets for different animation types
 * Use these for consistent premium motion
 */
export const EASING_PRESETS = {
  // UI elements and text
  text: EASING.smooth,
  
  // High-speed motion (jet, vehicle)
  highSpeed: EASING.jetFlight,
  
  // Entrance and exit
  enter: EASING.cinematic,
  exit: EASING.smooth,
  
  // Energy and impact
  energy: EASING.energySurge,
  
  // Interactive elements
  interactive: EASING.snappy,
};
