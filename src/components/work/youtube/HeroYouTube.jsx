// src/components/work/youtube/HeroYouTube.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "@/styles/youtube-hero.css";


/**
 * HeroYouTube
 * Sequence:
 *  - phase "icon": youtube play icon slides in (drag sound)
 *  - phase "land": small click when icon lands
 *  - phase "ride": icon morphs -> scooter runs across (whoosh)
 *  - phase "titleBig": huge title appears (bass swell)
 *  - phase "titleFinal": title shrinks to final size and glow settles
 *
 * Audio files (place these exact filenames under src/assets/sfx/):
 *  - drag.mp3        (drag/raagr sound as icon enters)
 *  - click.mp3       (crisp click when icon lands)
 *  - whoosh.mp3      (scooter zoom whoosh)
 *  - bass.mp3        (bass hit when title locks)
 *
 * Note: If user prefers reduced motion the component falls back to a simple fade.
 */

export default function HeroYouTube() {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState("init"); // init -> icon -> land -> ride -> titleBig -> titleFinal
  const trailRef = useRef(null);

  // audio refs
  const dragRef = useRef(null);
  const clickRef = useRef(null);
  const whooshRef = useRef(null);
  const bassRef = useRef(null);

  useEffect(() => {
    // Preload audio
    dragRef.current = new Audio("/assets/sfx/drag.mp3");
    clickRef.current = new Audio("/assets/sfx/click.mp3");
    whooshRef.current = new Audio("/assets/sfx/whoosh.mp3");
    bassRef.current = new Audio("/assets/sfx/bass.mp3");

    // set volumes (tweakable)
    if (dragRef.current) dragRef.current.volume = 0.65;
    if (clickRef.current) clickRef.current.volume = 0.9;
    if (whooshRef.current) whooshRef.current.volume = 0.95;
    if (bassRef.current) bassRef.current.volume = 0.9;

    // Sequence timings (fast punch style)
    const timeouts = [];

    // small delay to let page layout settle
    timeouts.push(setTimeout(() => setPhase("icon"), 120));

    // drag sound during icon slide-in and land
    timeouts.push(setTimeout(() => {
      if (!prefersReduced && dragRef.current) dragRef.current.play().catch(()=>{});
      setPhase("land");
    }, 700)); // icon arrives ~700ms

    // crisp click on landing
    timeouts.push(setTimeout(() => {
      if (!prefersReduced && clickRef.current) clickRef.current.play().catch(()=>{});
      setPhase("ride");
      // start trail reveal
      if (trailRef.current) trailRef.current.classList.add("trail-active");
    }, 950));

    // whoosh during scooter run
    timeouts.push(setTimeout(() => {
      if (!prefersReduced && whooshRef.current) whooshRef.current.play().catch(()=>{});
    }, 1050));

    // show big title after scooter crosses most of stage
    timeouts.push(setTimeout(() => {
      setPhase("titleBig");
      if (!prefersReduced && bassRef.current) {
        // small delay then bass for dramatic lock
        setTimeout(()=> bassRef.current.play().catch(()=>{}), 120);
      }
    }, 2400)); // big title ~2.4s

    // shrink title -> final
    timeouts.push(setTimeout(() => {
      setPhase("titleFinal");
    }, 3800)); // settle ~3.8s

    // cleanup
    return () => timeouts.forEach(clearTimeout);
  }, [prefersReduced]);

  // Reduced-motion fallback: skip heavy animation phases quickly
  if (prefersReduced) {
    return (
      <section className="yt-hero reduced">
        <div className="yt-hero-inner">
          <h1 className="yt-title final">YouTube Work That Creates Audiences!</h1>
          <p className="yt-sub">Thumbnails that get clicked. Edits that make them binge.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="yt-hero" role="region" aria-label="YouTube hero">
      <div className="yt-hero-bg" />

      {/* SVG trail canvas (revealed during ride) */}
      <svg ref={trailRef} className="yt-trail-svg" viewBox="0 0 1400 120" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="ytTrail" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="0.98" />
            <stop offset="60%" stopColor="#ff6a4a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.92" />
          </linearGradient>
        </defs>
        <path className="trail-path" d="M -120 70 C 120 40, 360 24, 640 40 C 900 56, 1100 60, 1500 52" stroke="url(#ytTrail)" strokeWidth="22" fill="none" strokeLinecap="round" />
      </svg>

      <div className="yt-hero-inner">
        {/* LEFT: dynamic title area */}
        <div className="yt-text-col">
          {phase === "titleBig" && (
            <motion.h1
              className="yt-title mega"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1.25 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              YouTube Work That Creates Audiences!
            </motion.h1>
          )}

          {phase === "titleFinal" && (
            <motion.h1
              className="yt-title final"
              initial={{ opacity: 0, scale: 1.18 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              YouTube Work That Creates Audiences!
            </motion.h1>
          )}

          {/* show landing subtext after final */}
          {phase !== "icon" && (
            <motion.p
              className="yt-sub"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Thumbnails that get clicked. Edits that make them binge.
            </motion.p>
          )}

          {/* CTAs revealed once title final */}
          {phase === "titleFinal" && (
            <motion.div className="yt-ctas" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <a className="glass-btn" href="#featured">Watch Reel</a>
              <a className="glass-btn btn-ghost" href="#contact">See Results</a>
            </motion.div>
          )}
        </div>

        {/* RIGHT: visual stage */}
        <div className="yt-stage" aria-hidden>
          {/* PLAY ICON (slides in when phase is icon or land) */}
          {(phase === "icon" || phase === "land") && (
            <motion.div
              className="yt-play"
              initial={{ x: "-140%", rotate: 0, opacity: 0 }}
              animate={{ x: phase === "icon" ? "6%" : "8%", opacity: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 20, duration: 0.6 }}
            >
              <svg viewBox="0 0 120 80" className="yt-play-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
                <rect x="0" y="0" width="120" height="80" rx="12" fill="#FF0000" />
                <polygon points="46,20 46,60 86,40" fill="#fff" />
              </svg>
            </motion.div>
          )}

          {/* SCOOTER (appears during ride and animates across, triggers trail) */}
          {phase === "ride" && (
            <>
              <motion.div
                className="yt-scooter"
                initial={{ x: "0%", opacity: 1 }}
                animate={{ x: "120%", opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.2, 0.9, 0.2, 1] }}
              >
                {/* minimal scooter SVG (flat style) */}
                <svg width="160" height="80" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg" className="scooter-svg" aria-hidden>
                  <path d="M12 50 C30 30, 70 20, 110 28 L135 30 L140 24 L150 28 L150 44 L140 50 L110 52" fill="#ff3b30" />
                  <rect x="94" y="14" width="36" height="6" rx="3" fill="#ffffff" opacity="0.95" />
                  <circle cx="28" cy="58" r="10" fill="#041016" />
                  <circle cx="130" cy="58" r="10" fill="#041016" />
                  <rect x="60" y="30" width="14" height="6" rx="2" fill="#22d3ee" />
                </svg>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
