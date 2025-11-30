// src/components/work/youtube/HeroYouTube.jsx
// ✅ OPTIMIZED - Compact hero with play button, no text/jet, water-fill buttons
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import "./youtube-hero.css";
import { TIMINGS, EASING, AUDIO_CONFIG } from "../../../utils/animationConfig";

export default function HeroYouTube({ onAnimationComplete }) {
  const rootControls = useAnimation();
  const playButtonControls = useAnimation();
  const trailControls = useAnimation();
  const shockwaveControls = useAnimation();
  const contentControls = useAnimation();
  const bgControls = useAnimation();
  const prefersReduced = useReducedMotion();

  const audio = useRef({ charge: null, shockwave: null, reveal: null });
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    try { audio.current.charge = new Audio(AUDIO_CONFIG.sounds.drag); } catch {}
    try { audio.current.shockwave = new Audio(AUDIO_CONFIG.sounds.whoosh); } catch {}
    try { audio.current.reveal = new Audio(AUDIO_CONFIG.sounds.click); } catch {}

    [audio.current.charge, audio.current.shockwave, audio.current.reveal].forEach((a) => {
      if (a) a.volume = AUDIO_CONFIG.baseVolume;
    });
  }, []);

  // Optimized particles - fewer count for performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.35;
    };

    const createParticles = () => {
      particles = Array.from({ length: 25 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random() * 0.5,
        size: Math.random() * 1.5 + 0.5,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.008;

        const opacity = Math.max(0, 1 - p.life * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.4})`;
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

  // Main animation sequence - optimized
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
      // Stage 1: Fade in hero
      await rootControls.start({
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut" },
      });

      // Stage 2: Play button charges up
      audio.current.charge?.play().catch(() => {});
      await playButtonControls.start({
        scale: [0.4, 1.05],
        opacity: [0, 1],
        transition: { duration: 0.9, ease: EASING.cinematic },
      });

      // Stage 3: Button settles
      await playButtonControls.start({
        scale: 1,
        transition: { duration: 0.35, ease: EASING.elastic },
      });

      await new Promise((r) => setTimeout(r, 300));

      // Stage 4: Trail/shockwave effect
      audio.current.shockwave?.play().catch(() => {});
      
      await Promise.all([
        trailControls.start({
          opacity: [0, 0.8, 0],
          scale: [0.5, 1.2, 1],
          transition: { duration: 1.2, ease: EASING.pop },
        }),

        shockwaveControls.start({
          opacity: [1, 0],
          scale: [1, 2.5],
          transition: { duration: 0.5, ease: "easeOut" },
        }),

        bgControls.start({
          opacity: [1, 0.5],
          transition: { duration: 1.2 },
        }),
      ]);

      // Stage 5: Content reveal
      await new Promise((r) => setTimeout(r, 200));
      audio.current.reveal?.play().catch(() => {});

      await contentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: EASING.smooth },
      });

      onAnimationComplete?.();
    })();
  }, [
    rootControls, playButtonControls, trailControls,
    shockwaveControls, contentControls, bgControls, prefersReduced, onAnimationComplete
  ]);

  return (
    <motion.section
      ref={containerRef}
      className="yt-hero-root"
      initial={{ opacity: 0 }}
      animate={rootControls}
      role="region"
      aria-label="HyperTrail Play Button"
    >
      {/* Optimized particle canvas */}
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

      {/* Glow orbs */}
      <div className="yt-glow-container">
        <div className="yt-glow-orb yt-glow-red" />
        <div className="yt-glow-orb yt-glow-cyan" />
      </div>

      {/* Animation stage - compact */}
      <div className="yt-animation-stage">
        
        {/* YouTube Play Button - Levitating */}
        <motion.div
          className="yt-play-button-wrapper"
          animate={playButtonControls}
          initial={{ scale: 0.4, opacity: 0 }}
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
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                <feColorMatrix type="saturate" values="1.2" />
              </filter>
            </defs>
            
            {/* Outer glow ring */}
            <circle cx="80" cy="80" r="75" fill="none" stroke="#FF4444" strokeWidth="2" opacity="0.4" filter="url(#playGlow)" />
            
            {/* Main circle */}
            <circle cx="80" cy="80" r="70" fill="url(#playGradient)" filter="url(#playGlow)" />
            
            {/* Inner highlight */}
            <circle cx="80" cy="80" r="68" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.2" />
            
            {/* Play triangle */}
            <polygon points="65,55 65,105 105,80" fill="#FFFFFF" />
            
            {/* Center spark */}
            <circle cx="80" cy="80" r="2" fill="#00FFFF" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Shockwave effect */}
        <motion.div
          className="yt-shockwave"
          animate={shockwaveControls}
          initial={{ opacity: 0, scale: 1 }}
        />

        {/* Trail glow */}
        <motion.div
          className="yt-trail-glow"
          animate={trailControls}
          initial={{ opacity: 0, scale: 0.5 }}
        />
      </div>

      {/* Content reveal - buttons with water fill */}
      <motion.div
        className="yt-content-reveal"
        initial={{ opacity: 0, y: 40 }}
        animate={contentControls}
      >
        <div className="yt-content-inner">
          <div className="yt-content-ctas">
            <a href="#featured" className="glass-btn glass-btn-fill">
              <span className="btn-fill-water"></span>
              <span className="btn-text">Watch Reel</span>
            </a>
            <a href="#contact" className="glass-btn glass-btn-fill btn-ghost">
              <span className="btn-fill-water"></span>
              <span className="btn-text">See Results</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
