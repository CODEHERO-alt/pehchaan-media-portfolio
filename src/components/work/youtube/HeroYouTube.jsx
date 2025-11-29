// src/components/work/youtube/HeroYouTube.jsx
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import "./youtube-hero.css";

/**
 * HeroYouTube.jsx
 * Fullscreen cinematic hero:
 * 1. glossy YouTube logo glides from left (drag sound)
 * 2. crossfade morph into TRON-style scooter (same scale)
 * 3. scooter accelerates right with neon trail (whoosh)
 * 4. screen goes cinematic → giant headline appears (bass)
 * 5. headline shrinks to final cyan + white layout; subtext and CTAs fade in
 *
 * Place optional audio files in:
 *   /public/assets/sfx/drag.mp3
 *   /public/assets/sfx/click.mp3
 *   /public/assets/sfx/whoosh.mp3
 *   /public/assets/sfx/bass.mp3
 *
 * Reduced-motion: simplified fade-in of final state.
 */

export default function HeroYouTube() {
  const rootControls = useAnimation();
  const logoControls = useAnimation();
  const scooterControls = useAnimation();
  const titleControls = useAnimation();
  const finalControls = useAnimation();
  const prefersReduced = useReducedMotion();

  // audio refs (guarded)
  const audio = useRef({
    drag: null,
    click: null,
    whoosh: null,
    bass: null,
  });

  useEffect(() => {
    // safe audio load (won't throw if files missing)
    try { audio.current.drag = new Audio("/assets/sfx/drag.mp3"); } catch {}
    try { audio.current.click = new Audio("/assets/sfx/click.mp3"); } catch {}
    try { audio.current.whoosh = new Audio("/assets/sfx/whoosh.mp3"); } catch {}
    try { audio.current.bass = new Audio("/assets/sfx/bass.mp3"); } catch {}

    [audio.current.drag, audio.current.click, audio.current.whoosh, audio.current.bass].forEach((a) => {
      if (a) a.volume = 0.85;
    });

    // Reduced-motion fallback: simple fade to final state
    if (prefersReduced) {
      (async () => {
        await rootControls.start({ opacity: 1, transition: { duration: 0.3 } });
        await titleControls.start({ opacity: 1, scale: 1, transition: { duration: 0.45 } });
        finalControls.start({ opacity: 1, transition: { duration: 0.4 } });
      })();
      return;
    }

    // Main timeline (async await style for crisp sequencing)
    (async () => {
      // root quick reveal
      await rootControls.start({ opacity: 1, transition: { duration: 0.01 } });

      // 1) Play logo slides in from left (drag sound)
      audio.current.drag && audio.current.drag.play().catch(()=>{});
      await logoControls.start({
        x: ["-120%", "6%"],
        opacity: [0, 1],
        transition: { duration: 0.88, ease: [0.2, 1, 0.25, 1] },
      });

      // small settle -> click
      await new Promise((r) => setTimeout(r, 170));
      audio.current.click && audio.current.click.play().catch(()=>{});

      // 2) Crossfade: fade logo out while scooter fades in (same scale)
      await Promise.all([
        logoControls.start({ opacity: 0, transition: { duration: 0.28, ease: [0.32, 1, 0.22, 1] } }),
        scooterControls.start({ opacity: 1, transition: { duration: 0.28, ease: [0.32, 1, 0.22, 1] } }),
      ]);

      // 3) Scooter accelerates across, trigger trail & whoosh
      audio.current.whoosh && audio.current.whoosh.play().catch(()=>{});
      // activate trail via CSS toggling
      const trail = document.querySelector(".yt-trail-svg");
      if (trail) trail.classList.add("trail-active");

      await scooterControls.start({
        x: ["0%", "140%"],
        rotate: [0, 3],
        transition: { duration: 1.05, ease: [0.22, 1, 0.3, 1] },
      });

      // tiny pause
      await new Promise((r) => setTimeout(r, 180));

      // 4) Large title reveal with bass -> grow then snap shrink
      audio.current.bass && audio.current.bass.play().catch(()=>{});
      await titleControls.start({
        opacity: 1,
        scale: [0.72, 1.28],
        transition: { duration: 0.9, ease: [0.22, 1, 0.32, 1] },
      });

      // shrink to final
      await titleControls.start({
        scale: 1,
        transition: { duration: 0.42, ease: [0.22, 1.4, 0.3, 1] },
      });

      // reveal subtext & CTAs
      await finalControls.start({ opacity: 1, transition: { duration: 0.36, ease: "easeOut" } });

      // timeline complete
    })();
  }, [logoControls, scooterControls, titleControls, finalControls, rootControls, prefersReduced]);

  return (
    <section className="yt-hero-root" role="region" aria-label="YouTube cinematic hero">
      <div className="yt-hero-bg" />

      {/* trail SVG */}
      <svg className="yt-trail-svg" viewBox="0 0 1800 120" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="ytTrailGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
            <stop offset="65%" stopColor="#ff6a4a" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.92" />
          </linearGradient>
        </defs>
        <path className="trail-path" d="M -200 68 C 80 40, 420 22, 760 42 C 1080 64, 1320 62, 1700 52" stroke="url(#ytTrailGrad)" strokeWidth="28" fill="none" strokeLinecap="round" />
      </svg>

      <motion.div className="yt-hero-inner" initial={{ opacity: 0 }} animate={rootControls}>
        <div className="yt-left-col">
          <motion.h1 className="yt-title" initial={{ opacity: 0, scale: 0.9 }} animate={titleControls}>
            <span className="yt-title-fill">YouTube Production That Creates Audiences</span>
          </motion.h1>

          <motion.p className="yt-sub" initial={{ opacity: 0 }} animate={finalControls}>
            Thumbnails that get clicked. Edits that make them binge.
          </motion.p>

          <motion.div className="yt-ctas" initial={{ opacity: 0 }} animate={finalControls}>
            <a className="glass-btn" href="#featured">Watch Reel</a>
            <a className="glass-btn btn-ghost" href="#contact">See Results</a>
          </motion.div>
        </div>

        <div className="yt-stage" aria-hidden>
          {/* PLAY logo */}
          <motion.div className="yt-play-wrap" initial={{ x: "-140%", opacity: 0 }} animate={logoControls}>
            <svg className="yt-play-svg" viewBox="0 0 140 92" width="200" height="128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
              <rect x="0" y="0" width="140" height="92" rx="18" fill="#FF0000" />
              <polygon points="60,24 60,68 100,46" fill="#fff" />
            </svg>
          </motion.div>

          {/* TRON scooter (fade in then move) */}
          <motion.div className="yt-scooter-wrap" initial={{ opacity: 0 }} animate={scooterControls}>
            <svg className="yt-scooter-svg" viewBox="0 0 260 120" width="360" height="170" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <!-- chassis -->
              <path d="M16 68 C44 34, 94 24, 148 28 L186 32 L200 26 L230 30 L230 54 L200 64 L148 68 Z" fill="#050607" />
              <!-- white accent -->
              <rect x="126" y="14" width="48" height="8" rx="3" fill="#ffffff" opacity="0.98" />
              <!-- neon red wheels -->
              <circle cx="44" cy="88" r="14" fill="#ff3b30" />
              <circle cx="198" cy="88" r="14" fill="#ff3b30" />
              <!-- cyan trim -->
              <path d="M76 36 L102 36" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
              <!-- headlight glow -->
              <circle cx="214" cy="36" r="8" fill="#ff6a4a" opacity="0.95" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
