// src/components/work/youtube/HeroYouTube.jsx
// ✅ PREMIUM - YouTube logo → Jet morphing animation with content reveal
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import "./youtube-hero.css";
import { TIMINGS, EASING, AUDIO_CONFIG } from "../../../utils/animationConfig";

export default function HeroYouTube({ onAnimationComplete }) {
  const rootControls = useAnimation();
  const logoControls = useAnimation();
  const jetControls = useAnimation();
  const contentControls = useAnimation();
  const bgControls = useAnimation();
  const trailControls = useAnimation();
  const prefersReduced = useReducedMotion();

  const audio = useRef({ whoosh: null, jet: null, reveal: null });
  const containerRef = useRef(null);

  // Load audio
  useEffect(() => {
    try { audio.current.whoosh = new Audio(AUDIO_CONFIG.sounds.whoosh); } catch {}
    try { audio.current.jet = new Audio(AUDIO_CONFIG.sounds.bass); } catch {}
    try { audio.current.reveal = new Audio(AUDIO_CONFIG.sounds.click); } catch {}

    [audio.current.whoosh, audio.current.jet, audio.current.reveal].forEach((a) => {
      if (a) a.volume = AUDIO_CONFIG.baseVolume;
    });
  }, []);

  // Main animation sequence
  useEffect(() => {
    if (prefersReduced) {
      (async () => {
        await rootControls.start({ opacity: 1 });
        await contentControls.start({ opacity: 1, y: 0 });
        onAnimationComplete?.();
      })();
      return;
    }

    (async () => {
      // Stage 1: Fade in hero, show YouTube logo centered
      await rootControls.start({
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" },
      });

      // Stage 2: YouTube logo at center (visible, waiting for morph)
      await logoControls.start({
        scale: [0.6, 1],
        opacity: [0, 1],
        transition: { duration: 0.8, ease: EASING.cinematic },
      });

      // Pause to let user see the logo
      await new Promise((r) => setTimeout(r, 600));

      // Stage 3: Logo morphs into jet + flies right + vanishes
      audio.current.whoosh?.play().catch(() => {});
      
      await Promise.all([
        // Logo fades out as jet appears
        logoControls.start({
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.3, ease: EASING.morph },
        }),
        
        // Jet flies in from center, morphs, then zooms right
        jetControls.start({
          opacity: [0, 1, 0],
          x: ["0%", "0%", "150%"],
          scale: [0.3, 1, 1.2],
          rotate: [0, 0, 8],
          transition: {
            duration: 2.2,
            ease: [0.16, 0.88, 0.2, 1],
            times: [0, 0.25, 1],
          },
        }),

        // Trail follows jet then fades
        trailControls.start({
          opacity: [0, 1, 0],
          x: ["0%", "50%", "150%"],
          transition: {
            duration: 2.2,
            ease: [0.16, 0.88, 0.2, 1],
          },
        }),

        // Background gradually darkens/shifts
        bgControls.start({
          opacity: [1, 0.3],
          filter: "blur(2px)",
          transition: { duration: 1.5, ease: "easeInOut" },
        }),
      ]);

      // Stage 4: After jet exits, content slides up smoothly
      audio.current.reveal?.play().catch(() => {});
      
      await contentControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3,
        },
      });

      // Callback for parent component
      onAnimationComplete?.();
    })();
  }, [rootControls, logoControls, jetControls, contentControls, bgControls, trailControls, prefersReduced, onAnimationComplete]);

  return (
    <motion.section
      ref={containerRef}
      className="yt-hero-root"
      initial={{ opacity: 0 }}
      animate={rootControls}
      role="region"
      aria-label="YouTube cinematic hero"
    >
      {/* Animated background */}
      <motion.div 
        className="yt-hero-bg"
        animate={bgControls}
        initial={{ opacity: 1 }}
      />

      {/* Glow orbs */}
      <div className="yt-glow-container">
        <div className="yt-glow-orb yt-glow-red" />
        <div className="yt-glow-orb yt-glow-cyan" />
      </div>

      {/* Main animation container - fullscreen */}
      <motion.div className="yt-animation-container" initial={{ opacity: 1 }}>
        
        {/* YOUTUBE LOGO - Center stage */}
        <motion.div
          className="yt-logo-wrapper"
          animate={logoControls}
          initial={{ scale: 0.6, opacity: 0 }}
        >
          <svg
            className="yt-logo-svg"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <filter id="logoGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                <feColorMatrix in="SourceGraphic" type="saturate" values="1.2" />
              </filter>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0000" />
                <stop offset="100%" stopColor="#FF4444" />
              </linearGradient>
            </defs>
            {/* Red rounded square */}
            <rect x="20" y="20" width="80" height="80" rx="16" fill="url(#logoGrad)" filter="url(#logoGlow)" />
            {/* White play triangle */}
            <polygon points="48,48 48,72 72,60" fill="#FFFFFF" />
          </svg>
        </motion.div>

        {/* JET - Morphs and flies */}
        <motion.div
          className="yt-jet-wrapper"
          animate={jetControls}
          initial={{ opacity: 0, x: "0%", scale: 0.3 }}
        >
          <svg
            className="yt-jet-svg"
            viewBox="0 0 400 280"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="jetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0000" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FF4444" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
              </linearGradient>
              <filter id="jetShadow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              </filter>
            </defs>

            {/* Futuristic jet body */}
            {/* Main fuselage */}
            <path
              d="M 60 140 L 200 100 L 380 140 L 200 180 Z"
              fill="url(#jetGrad)"
              filter="url(#jetShadow)"
              opacity="0.95"
            />

            {/* Left wing */}
            <path
              d="M 200 140 L 140 80 L 200 120"
              fill="url(#jetGrad)"
              opacity="0.9"
            />

            {/* Right wing */}
            <path
              d="M 200 140 L 260 80 L 200 120"
              fill="url(#jetGrad)"
              opacity="0.9"
            />

            {/* Cockpit glow */}
            <circle cx="350" cy="140" r="12" fill="#22d3ee" opacity="0.95" filter="url(#jetShadow)" />
            <circle cx="350" cy="140" r="8" fill="#00faff" opacity="0.8" />

            {/* Engine glow */}
            <circle cx="70" cy="140" r="10" fill="#FF6B35" opacity="0.9" filter="url(#jetShadow)" />
            <circle cx="70" cy="140" r="6" fill="#FFaa44" opacity="0.7" />

            {/* Speed lines (trailing effect) */}
            <g opacity="0.6">
              <line x1="20" y1="130" x2="50" y2="130" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" />
              <line x1="15" y1="145" x2="45" y2="145" stroke="#FF4444" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="25" y1="155" x2="55" y2="155" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>

        {/* Trail/smoke effect */}
        <motion.svg
          className="yt-trail-svg"
          viewBox="0 0 1400 280"
          preserveAspectRatio="none"
          animate={trailControls}
          initial={{ opacity: 0 }}
          aria-hidden
        >
          <defs>
            <linearGradient id="trailGrad" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#FF4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <filter id="trailBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
            </filter>
          </defs>
          <path
            d="M 200 130 Q 400 110, 600 135 Q 800 160, 1000 140 Q 1200 120, 1400 150"
            stroke="url(#trailGrad)"
            strokeWidth="60"
            fill="none"
            strokeLinecap="round"
            filter="url(#trailBlur)"
          />
        </motion.svg>
      </motion.div>

      {/* Content reveal - slides up from bottom */}
      <motion.div
        className="yt-content-reveal"
        initial={{ opacity: 0, y: 100 }}
        animate={contentControls}
      >
        <div className="yt-content-inner">
          <h1 className="yt-content-title">YouTube Production That Creates Audiences</h1>
          <p className="yt-content-subtitle">Thumbnails that get clicked. Edits that make them binge.</p>
          
          <div className="yt-content-ctas">
            <a href="#featured" className="glass-btn">Watch Reel</a>
            <a href="#contact" className="glass-btn btn-ghost">See Results</a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
