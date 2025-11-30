// src/utils/animationConfig.js
// ✅ NEW FILE - Centralized animation configuration for YouTube hero
// Import in HeroYouTube.jsx: import { TIMINGS, EASING, AUDIO_CONFIG } from '../../../utils/animationConfig';

// ===== CUSTOM EASING CURVES =====
export const EASING = {
  smooth: [0.16, 1, 0.3, 1],
  snappy: [0.22, 1, 0.36, 1],
  elastic: [0.22, 1.4, 0.3, 1],
  cinematic: [0.15, 0.88, 0.32, 1.2],
  pop: [0.16, 1, 0.32, 1],
  morph: [0.32, 1, 0.22, 1],
  anticipation: [0.34, 1.56, 0.64, 1],
};

// ===== TIMING CONSTANTS (in seconds) =====
export const TIMINGS = {
  // Logo animation
  logoSlideIn: 0.92,
  logoMorphOut: 0.35,
  
  // Scooter animation
  scooterMorphIn: 0.35,
  scooterZoom: 1.15,
  scooterDelay: 0.05,
  
  // Title animation
  titlePopScale: 0.85,
  titleSettle: 0.48,
  titleCharacterDelay: 0.02,
  
  // Text animations
  subtitleFade: 0.7,
  ctaFade: 0.6,
  
  // Pauses between stages
  pauseAfterLogo: 0.2,
  pauseBeforeTitle: 0.12,
  pauseBeforeText: 0.08,
  
  // Trail animation
  trailDraw: 1.05,
};

// ===== AUDIO CONFIG =====
export const AUDIO_CONFIG = {
  enabled: true,
  baseVolume: 0.75,
  sounds: {
    drag: "/assets/sfx/drag.mp3",
    click: "/assets/sfx/click.mp3",
    whoosh: "/assets/sfx/whoosh.mp3",
    bass: "/assets/sfx/bass.mp3",
  },
};

// ===== MAGNETIC BUTTON CONFIG =====
export const MAGNETIC_CONFIG = {
  enabled: true,
  radius: 100,
  strength: 12,
  sensitivity: 0.08,
};

// ===== RESPONSIVE ADJUSTMENTS =====
export const RESPONSIVE_TIMINGS = {
  mobile: {
    logoSlideIn: 0.7,
    scooterZoom: 0.9,
    titlePopScale: 0.6,
    titleCharacterDelay: 0.01,
  },
  tablet: {
    logoSlideIn: 0.85,
    scooterZoom: 1.0,
    titlePopScale: 0.75,
  },
  desktop: {
    // Uses default TIMINGS
  },
};

/**
 * Get adjusted timings based on screen size
 * Usage: const timings = getAdjustedTimings();
 */
export const getAdjustedTimings = () => {
  if (typeof window === "undefined") return TIMINGS;
  
  const width = window.innerWidth;
  
  if (width <= 640) {
    return { ...TIMINGS, ...RESPONSIVE_TIMINGS.mobile };
  } else if (width <= 980) {
    return { ...TIMINGS, ...RESPONSIVE_TIMINGS.tablet };
  }
  
  return TIMINGS;
};
