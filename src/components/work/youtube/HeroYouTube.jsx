// src/components/work/youtube/HeroYouTube.jsx
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import "./youtube-hero.css";

/**
 * HeroYouTube.jsx
 * - Fullscreen cinematic hero for the YouTube Work page.
 * - Sequence:
 *   1) play-logo slides in from left (drag sound)
 *   2) morph/crossfade into TRON scooter (same scale)
 *   3) scooter rides to the right with neon trail (whoosh)
 *   4) screen briefly darkens, giant title appears (bass hit)
 *   5) title quickly shrinks to final size; subtext & CTAs appear
 *
 * Audio files (optional) - place into /public/assets/sfx/:
 *   drag.mp3, click.mp3, whoosh.mp3, bass.mp3
 *
 * Reduced motion: simplified fade + no audio.
 */

export default function HeroYouTube() {
  const controls = useAnimation();
  const logoControls = useAnimation();
  const scooterControls = useAnimation();
  const titleControls = useAnimation();
  const finalControls = useAnimation();
  const prefersReduced = useReducedMotion();

  // audio (optional) - safe guarded
  const dragAudio = useRef(null);
  const clickAudio = useRef(null);
  const whooshAudio = useRef(null);
  const bassAudio = useRef(null);

  useEffect(() => {
    // prepare optional audio (no errors if files missing)
    try { dragAudio.current = new Audio("/assets/sfx/drag.mp3"); } catch {}
    try { clickAudio.current = new Audio("/assets/sfx/click.mp3"); } catch {}
    try { whooshAudio.current = new Audio("/assets/sfx/whoosh.mp3"); } catch {}
    try { bassAudio.current = new Audio("/assets/sfx/bass.mp3"); } catch {}

    // Set gentle volumes (tweak if needed)
    if (dragAudio.current) dragAudio.current.volume = 0.7;
    if (clickAudio.current) clickAudio.current.volume = 0.95;
    if (whooshAudio.current) whooshAudio.current.volume = 0.95;
    if (bassAudio.current) bassAudio.current.volume = 0.95;

    if (prefersReduced) {
      // reduced motion fallback: simple reveal
      (async () => {
        await controls.start({ opacity: 1, transition: { duration: 0.5 } });
        await titleControls.start({ opacity: 1, scale: 1, transition: { duration: 0.5 } });
        finalControls.start({ opacity: 1 });
      })();
      return;
    }

    // Main timeline - Fast punch feeling but smooth curves
    (async () => {
      // initial state
      await controls.start({ opacity: 1, transition: { duration: 0.01 } });

      // 1) Slide-in logo (slower entry with drag sound)
      try { dragAudio.current && dragAudio.current.play().catch(()=>{}); } catch {}
      await logoControls.start({
        x: ["-120%", "8%"],
        opacity: [0, 1],
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
      });

      // tiny pause then "land" click
      await new Promise((r) => setTimeout(r, 160));
      try { clickAudio.current && clickAudio.current.play().catch(()=>{}); } catch {}

      // 2) Morph effect: fade logo out while scooter fades in (same scale) — smooth crossfade
      await Promise.all([
        logoControls.start({ opacity: 0, transition: { duration: 0.28, ease: [0.3, 0.9, 0.2, 1] } }),
        scooterControls.start({ opacity: 1, scale: 1, transition: { duration: 0.28, ease: [0.3, 0.9, 0.2, 1] } }),
      ]);

      // 3) Scooter accelerates across screen and triggers neon trail (whoosh)
      try { whooshAudio.current && whooshAudio.current.play().catch(()=>{}); } catch {}
      await scooterControls.start({
        x: ["0%", "140%"],
        rotate: [0, 4],
        transition: { duration: 1.05, ease: [0.2, 0.9, 0.2, 1] },
      });

      // trigger trail reveal separately via CSS class toggle
      const trail = document.querySelector(".yt-trail-svg");
      if (trail) {
        trail.classList.add("trail-active");
      }

      // small pause after scooter exit
      await new Promise((r) => setTimeout(r, 200));

      // 4) Big title reveal (grow + bass)
      try { bassAudio.current && bassAudio.current.play().catch(()=>{}); } catch {}
      await titleControls.start({
        opacity: 1,
        scale: [0.7, 1.26],
        transition: { duration: 0.95, ease: [0.22, 1, 0.32, 1] },
      });

      // 5) Rapid shrink to final size (snap-like but smooth)
      await titleControls.start({
        scale: 1,
        transition: { duration: 0.44, ease: [0.22, 1.4, 0.3, 1] },
      });

      // reveal subtext & CTAs
      await finalControls.start({ opacity: 1, transition: { duration: 0.36, ease: "easeOut" } });

      // done
    })();
  }, [controls, logoControls, scooterControls, titleControls, finalControls, prefersReduced]);

  // SVGs are inline for reliability; all visuals are controlled by animation above.
  return (
    <section className="yt-hero-hero" role="region" aria-label="YouTube cinematic hero">
      {/* solid background while sequence runs */}
      <div className="yt-hero-bg" />

      {/* SVG Trail (hidden until .trail-active class toggles) */}
      <svg className="yt-trail-svg" viewBox="0 0 1600 120" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="trailGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="0.98" />
            <stop offset="65%" stopColor="#ff6a4a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.92" />
          </linearGradient>
        </defs>
        <path className="trail-path" d="M -160 70 C 120 40, 420 20, 760 40 C 1040 56, 1320 60, 1700 52" stroke="url(#trailGrad)" strokeWidth="24" fill="none" strokeLinecap="round" />
      </svg>

      <motion.div className="yt-hero-inner" initial={{ opacity: 0 }} animate={controls}>
        {/* LEFT: Title area */}
        <div className="yt-left-col">
          <motion.h1
            className="yt-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={titleControls}
            style={{ fontFamily: "'Work Sans', system-ui, -apple-system, 'Inter', sans-serif }}
          >
            <span className="yt-title-fill">YouTube Work That Creates Audiences!</span>
          </motion.h1>

          <motion.p className="yt-sub" initial={{ opacity: 0 }} animate={finalControls}>
            Thumbnails that get clicked. Edits that make them binge.
          </motion.p>

          <motion.div className="yt-ctas" initial={{ opacity: 0 }} animate={finalControls}>
            <a href="#featured" className="glass-btn">Watch Reel</a>
            <a href="#contact" className="glass-btn btn-ghost">See Results</a>
          </motion.div>
        </div>

        {/* RIGHT: Visual stage (logo then scooter) */}
        <div className="yt-stage" aria-hidden>
          {/* PLAY logo — slides in then crossfades */}
          <motion.div className="yt-play-wrap" initial={{ opacity: 0, x: "-120%" }} animate={logoControls}>
            {/* Official-looking YouTube play in red rounded rectangle (SVG) */}
            <svg className="yt-play-svg" viewBox="0 0 120 80" width="160" height="110" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
              <rect x="0" y="0" width="120" height="80" rx="14" fill="#FF0000" />
              <polygon points="46,20 46,60 86,40" fill="#fff" />
            </svg>
          </motion.div>

          {/* Scooter overlay: initially hidden (opacity 0) then fades in and moves */}
          <motion.div className="yt-scooter-wrap" initial={{ opacity: 0, x: 0 }} animate={scooterControls}>
            {/* TRON-styled scooter (flat shapes + neon trims) */}
            <svg className="yt-scooter-svg" viewBox="0 0 220 100" width="320" height="140" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              {/* chassis */}
              <path d="M12 56 C36 28, 80 18, 128 24 L160 28 L172 22 L196 26 L196 46 L172 56 L128 60" fill="#040507" />
              {/* white accent stripe */}
              <rect x="94" y="12" width="36" height="6" rx="3" fill="#ffffff" opacity="0.95" />
              {/* neon red lights */}
              <ellipse cx="36" cy="72" rx="12" ry="12" fill="#ff3b30" />
              <ellipse cx="156" cy="72" rx="12" ry="12" fill="#ff3b30" />
              {/* cyan trim */}
              <path d="M64 34 L82 34" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
              {/* headlight glow */}
              <circle cx="170" cy="28" r="6" fill="#ff6a4a" opacity="0.95" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
