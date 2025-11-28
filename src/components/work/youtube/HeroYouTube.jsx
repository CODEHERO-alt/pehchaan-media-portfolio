// src/components/work/youtube/HeroYouTube.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "@/styles/youtube-hero.css"; // relative to src

/**
 * HeroYouTube
 *
 * - Fast punch sweep (0.6s)
 * - Play icon slides in from left, then crossfades to scooter
 * - Scooter drags a red->cyan trail which fills the title's clip-mask
 * - Title starts huge, glows, then shrinks to final size
 *
 * Mobile: simplified animation (scale down & short sweep)
 *
 * Props:
 * - headline: string
 * - subtext: string
 */
export default function HeroYouTube({
  headline = "YouTube Work That Creates Audiences!",
  subtext = "Thumbnails that get clicked. Edits that make them binge.",
}) {
  const controls = useAnimation();
  const [started, setStarted] = useState(false);
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // Start the fast punch sweep sequence when component mounts
    // If mobile, use simplified timings
    const sequence = async () => {
      setStarted(true);
      // playSweep: slide play-icon in (0.45s)
      await controls.start("sweepIn");
      // morph/crossfade to scooter and scooter run (0.6s)
      await controls.start("scooterRun");
      // fill title and shrink (0.35s)
      await controls.start("titleShrink");
      // reveal CTAs
      await controls.start("revealCTAs");
    };

    // small delay so page layout is ready
    const t = setTimeout(sequence, 120);
    return () => clearTimeout(t);
  }, [controls]);

  // FRAMER VARIANTS (local to component for clarity)
  const playVariants = {
    sweepIn: isMobile
      ? { x: ["-110%", "6%"], rotate: 0, transition: { duration: 0.5, ease: "easeOut" } }
      : { x: ["-120%", "10%"], rotate: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    sweepOut: { x: "20%", transition: { duration: 0.25 } },
  };

  const scooterVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    scooterIn: { opacity: 1, scale: 1, transition: { duration: 0.14 } },
    run: (custom) => ({
      x: ["0%", "120%"],
      transition: {
        duration: isMobile ? 0.7 : 0.9,
        ease: [0.2, 0.9, 0.2, 1],
      },
    }),
  };

  const titleVariants = {
    initial: { scale: isMobile ? 1.9 : 2.6, opacity: 1, filter: "blur(0px)" },
    shrink: { scale: 1, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
    glow: { opacity: 1, transition: { duration: 0.2 } },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28, delay: 0.06 } },
  };

  // Helper: if user clicks a thumbnail later, you can re-trigger the animation by calling controls.start(...)
  return (
    <section className="youtube-hero neo-hero" ref={heroRef} aria-label="YouTube hero">
      {/* Background subtle layers */}
      <div className="hero-bg-layer" />

      <div className="hero-inner max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: headline area */}
          <div className="lg:col-span-6 hero-text-wrap">
            <motion.h1
              className="hero-headline"
              initial="initial"
              animate={controls}
              variants={titleVariants}
              transition={{}}
            >
              {/* Using clip-mask technique: base text + fill layer which is painted by scooter trail */}
              <span className="headline-fill-mask" id="headline-mask">
                {headline}
              </span>

              <span className="headline-base">{headline}</span>
            </motion.h1>

            <motion.p className="hero-subtext text-neutral-300 mt-4" initial={{ opacity: 0 }} animate={controls} variants={ctaVariants}>
              {subtext}
            </motion.p>

            <motion.div className="mt-6 flex items-center gap-3" initial="hidden" animate={controls} variants={ctaVariants}>
              <button className="glass-btn" aria-label="Watch reel">Watch Reel</button>
              <button className="glass-btn btn-ghost" aria-label="See results">See Results</button>
            </motion.div>
          </div>

          {/* RIGHT: visual area where icon/scooter animates */}
          <div className="lg:col-span-6 hero-visual relative">
            <div className="visual-stage">
              {/* Play Icon (initial) */}
              <motion.div
                className="play-icon-wrap"
                variants={playVariants}
                animate={controls}
                initial={{ x: "-120%" }}
                // we run sweepIn when starting; after that scooter appears
                transition={{}}
                onAnimationComplete={() => {}}
              >
                <svg className="play-icon" width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  <rect x="0" y="0" width="120" height="80" rx="12" fill="#FF0000" />
                  <polygon points="46,20 46,60 86,40" fill="#fff" />
                </svg>
              </motion.div>

              {/* Scooter: cross-fades in after play icon sweep */}
              <motion.div
                className="scooter-wrap"
                initial={{ opacity: 0 }}
                animate={controls}
                variants={scooterVariants}
                custom={0}
              >
                {/* Simple scooter SVG (clean, small) */}
                <svg className="scooter" width="160" height="80" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                  {/* body */}
                  <path d="M12 50 C30 30, 70 20, 110 28 L135 30 L140 24 L150 28 L150 44 L140 50 L110 52" fill="#ff3b30" />
                  {/* seat / handle */}
                  <rect x="94" y="14" width="36" height="6" rx="3" fill="#ffffff" opacity="0.9" />
                  {/* wheels */}
                  <circle cx="28" cy="58" r="10" fill="#041016" />
                  <circle cx="130" cy="58" r="10" fill="#041016" />
                  {/* cyan accent stripe */}
                  <rect x="60" y="30" width="14" height="6" rx="2" fill="#22d3ee" />
                </svg>
              </motion.div>

              {/* SVG Canvas for trail (red -> cyan). We'll animate stroke-dashoffset with CSS + JS via class toggles */}
              <svg className="trail-canvas" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="trailGradient" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FF0000" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#FF6A4A" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path className="trail-path" d="M -200 70 C 120 40, 360 20, 620 40 C 860 56, 1040 60, 1400 50" stroke="url(#trailGradient)" strokeWidth="18" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
