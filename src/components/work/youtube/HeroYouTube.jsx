// src/components/work/youtube/HeroYouTube.jsx
// ✅ PREMIUM - HyperTrail Jet Launch: YouTube Play Ignition Sequence
// Cinematic hero with energy beams, plasma trails, text formation, and shockwaves
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import "./youtube-hero.css";
import { TIMINGS, EASING, AUDIO_CONFIG } from "../../../utils/animationConfig";

export default function HeroYouTube({ onAnimationComplete }) {
  const rootControls = useAnimation();
  const playButtonControls = useAnimation();
  const jetControls = useAnimation();
  const trailControls = useAnimation();
  const textControls = useAnimation();
  const gridControls = useAnimation();
  const shockwaveControls = useAnimation();
  const contentControls = useAnimation();
  const bgControls = useAnimation();
  const particlesControls = useAnimation();
  const prefersReduced = useReducedMotion();

  const audio = useRef({ charge: null, jet: null, shockwave: null, reveal: null });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    try { audio.current.charge = new Audio(AUDIO_CONFIG.sounds.drag); } catch {}
    try { audio.current.jet = new Audio(AUDIO_CONFIG.sounds.bass); } catch {}
    try { audio.current.shockwave = new Audio(AUDIO_CONFIG.sounds.whoosh); } catch {}
    try { audio.current.reveal = new Audio(AUDIO_CONFIG.sounds.click); } catch {}

    [audio.current.charge, audio.current.jet, audio.current.shockwave, audio.current.reveal].forEach((a) => {
      if (a) a.volume = AUDIO_CONFIG.baseVolume;
    });
  }, []);

  // Plasma particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 0.5,
        size: Math.random() * 2 + 1,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.005;

        const opacity = Math.max(0, 1 - p.life * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life > 1) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.life = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
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
      // Stage 1: Fade in background and energy
      await rootControls.start({
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      });

      // Stage 2: Play button charges up and levitates
      audio.current.charge?.play().catch(() => {});
      await playButtonControls.start({
        scale: [0.3, 1.1],
        opacity: [0, 1],
        transition: { duration: 1.2, ease: EASING.cinematic },
      });

      // Stage 3: Play button settles with pulsing glow
      await playButtonControls.start({
        scale: 1,
        transition: { duration: 0.4, ease: EASING.elastic },
      });

      await new Promise((r) => setTimeout(r, 400));

      // Stage 4: Grid distortion preparation
      await gridControls.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });

      // Stage 5: Jet launches with plasma trail
      audio.current.jet?.play().catch(() => {});
      
      await Promise.all([
        // Jet flies right with speed curve
        jetControls.start({
          x: ["0%", "150%"],
          opacity: [1, 1, 0],
          scale: [1, 1.1, 0.8],
          transition: {
            duration: TIMINGS.jetTrail,
            ease: EASING.jetFlight,
            times: [0, 0.85, 1],
          },
        }),

        // Plasma trail follows jet and snakes
        trailControls.start({
          opacity: [0, 1, 0.3],
          x: ["0%", "130%"],
          transition: {
            duration: TIMINGS.jetTrail,
            ease: EASING.jetFlight,
          },
        }),

        // Grid bends and distorts
        gridControls.start({
          opacity: [0.1, 0.3, 0],
          filter: "blur(4px) brightness(0.8)",
          transition: { duration: TIMINGS.jetTrail },
        }),

        // Background energy pulses
        bgControls.start({
          opacity: [1, 0.8, 0.2],
          transition: { duration: TIMINGS.jetTrail },
        }),
      ]);

      // Stage 6: Trail lines snap together forming text
      await new Promise((r) => setTimeout(r, 200));
      
      audio.current.shockwave?.play().catch(() => {});
      
      // Shockwave flash
      await shockwaveControls.start({
        opacity: [1, 0],
        scale: [1, 2],
        transition: { duration: 0.4, ease: "easeOut" },
      });

      // Text fills with cyan glow
      await textControls.start({
        opacity: [0, 1],
        scale: [0.8, 1],
        textShadow: [
          "0 0 0px rgba(34, 211, 238, 0)",
          "0 0 40px rgba(34, 211, 238, 1)",
        ],
        transition: { duration: 0.8, ease: EASING.pop },
      });

      // Content reveals smoothly
      await new Promise((r) => setTimeout(r, 300));
      audio.current.reveal?.play().catch(() => {});

      await contentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: EASING.smooth },
      });

      onAnimationComplete?.();
    })();
  }, [
    rootControls, playButtonControls, jetControls, trailControls, 
    textControls, gridControls, shockwaveControls, contentControls, 
    bgControls, prefersReduced, onAnimationComplete
  ]);

  const titleText = "YouTube Production That Creates Audiences";

  return (
    <motion.section
      ref={containerRef}
      className="yt-hero-root"
      initial={{ opacity: 0 }}
      animate={rootControls}
      role="region"
      aria-label="HyperTrail Jet Launch"
    >
      {/* Particle canvas for drifting particles */}
      <canvas
        ref={canvasRef}
        className="yt-particles-canvas"
        aria-hidden="true"
      />

      {/* Energy background */}
      <motion.div 
        className="yt-energy-bg"
        animate={bgControls}
        initial={{ opacity: 1 }}
      />

      {/* Animated glow orbs */}
      <div className="yt-glow-container">
        <div className="yt-glow-orb yt-glow-red" />
        <div className="yt-glow-orb yt-glow-cyan" />
      </div>

      {/* Distorted grid background */}
      <motion.svg
        className="yt-grid-distortion"
        viewBox="0 0 1920 1080"
        animate={gridControls}
        initial={{ opacity: 0 }}
        aria-hidden
      >
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FF0000" stopOpacity="0.1" />
          </linearGradient>
          <filter id="gridDistort">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" />
          </filter>
        </defs>
        
        {/* Grid lines */}
        <g stroke="url(#gridGrad)" strokeWidth="1" opacity="0.3">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 54} x2="1920" y2={i * 54} />
          ))}
          {Array.from({ length: 36 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 53.3} y1="0" x2={i * 53.3} y2="1080" />
          ))}
        </g>
      </motion.svg>

      {/* Main animation stage - fullscreen */}
      <div className="yt-animation-stage">
        
        {/* YouTube Play Button - Levitating */}
        <motion.div
          className="yt-play-button-wrapper"
          animate={playButtonControls}
          initial={{ scale: 0.3, opacity: 0 }}
        >
          <svg
            className="yt-play-button-svg"
            viewBox="0 0 160 160"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <radialGradient id="playGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4444" />
                <stop offset="100%" stopColor="#FF0000" />
              </radialGradient>
              <filter id="playGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                <feColorMatrix type="saturate" values="1.3" />
              </filter>
              <filter id="playShimmer">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
            </defs>
            
            {/* Outer glow ring */}
            <circle cx="80" cy="80" r="75" fill="none" stroke="#FF4444" strokeWidth="2" opacity="0.4" filter="url(#playGlow)" />
            
            {/* Main circle */}
            <circle cx="80" cy="80" r="70" fill="url(#playGradient)" filter="url(#playGlow)" />
            
            {/* Inner highlight */}
            <circle cx="80" cy="80" r="68" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
            
            {/* Play triangle */}
            <polygon points="65,55 65,105 105,80" fill="#FFFFFF" filter="url(#playShimmer)" />
            
            {/* Center spark */}
            <circle cx="80" cy="80" r="3" fill="#00FFFF" opacity="0.9" />
          </svg>
        </motion.div>

        {/* Jet/Scooter vehicle */}
        <motion.div
          className="yt-jet-vehicle"
          animate={jetControls}
          initial={{ x: "0%", opacity: 1, scale: 1 }}
        >
          <svg
            className="yt-jet-svg"
            viewBox="0 0 500 300"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="jetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF0000" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.8" />
              </linearGradient>
              <filter id="jetEngine">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>
              <filter id="jetGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>

            {/* Futuristic jet body */}
            <g>
              {/* Main fuselage */}
              <path d="M 80 150 L 280 120 L 480 150 L 280 180 Z" fill="url(#jetGradient)" filter="url(#jetGlow)" />
              
              {/* Wings */}
              <path d="M 280 150 L 180 80 L 280 130" fill="url(#jetGradient)" opacity="0.85" />
              <path d="M 280 150 L 380 80 L 280 130" fill="url(#jetGradient)" opacity="0.85" />
              
              {/* Cockpit */}
              <circle cx="450" cy="150" r="16" fill="#22d3ee" filter="url(#jetEngine)" opacity="0.95" />
              <circle cx="450" cy="150" r="12" fill="#00FFFF" opacity="0.8" />
              
              {/* Engine flare */}
              <circle cx="100" cy="150" r="14" fill="#FF6B35" filter="url(#jetEngine)" opacity="0.9" />
              <circle cx="100" cy="150" r="10" fill="#FFaa44" opacity="0.7" />
              
              {/* Speed lines */}
              <g opacity="0.7" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round">
                <line x1="30" y1="140" x2="60" y2="140" />
                <line x1="25" y1="155" x2="55" y2="155" />
                <line x1="35" y1="165" x2="65" y2="165" />
              </g>
            </g>
          </svg>
        </motion.div>

        {/* Plasma trail */}
        <motion.svg
          className="yt-plasma-trail"
          viewBox="0 0 1920 300"
          preserveAspectRatio="none"
          animate={trailControls}
          initial={{ opacity: 0 }}
          aria-hidden
        >
          <defs>
            <linearGradient id="plasmaGrad" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#FF0000" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#FF6B35" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
            </linearGradient>
            <filter id="plasmaBlur">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
            </filter>
          </defs>
          
          {/* Plasma wave */}
          <path
            d="M 300 140 Q 600 100, 900 150 Q 1200 200, 1500 140 Q 1700 110, 1920 160"
            stroke="url(#plasmaGrad)"
            strokeWidth="80"
            fill="none"
            strokeLinecap="round"
            filter="url(#plasmaBlur)"
          />
        </motion.svg>

        {/* Shockwave effect */}
        <motion.div
          className="yt-shockwave"
          animate={shockwaveControls}
          initial={{ opacity: 0, scale: 1 }}
        />
      </div>

      {/* Text formation and reveal */}
      <motion.div
        className="yt-text-formation"
        animate={textControls}
        initial={{ opacity: 0, scale: 0.8 }}
      >
        <h1 className="yt-hero-headline">{titleText}</h1>
      </motion.div>

      {/* Content reveal - slides up */}
      <motion.div
        className="yt-content-reveal"
        initial={{ opacity: 0, y: 100 }}
        animate={contentControls}
      >
        <div className="yt-content-inner">
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
