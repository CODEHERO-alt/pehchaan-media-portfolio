// src/components/work/youtube/HeroYouTube.jsx
// ✅ UPDATED - Character stagger + smooth logo→scooter transition + magnetic buttons
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import "./youtube-hero.css";
import { TIMINGS, EASING, AUDIO_CONFIG } from "../../../utils/animationConfig";

export default function HeroYouTube() {
  const rootControls = useAnimation();
  const logoControls = useAnimation();
  const scooterControls = useAnimation();
  const titleControls = useAnimation();
  const finalControls = useAnimation();
  const prefersReduced = useReducedMotion();

  const [titleText] = useState("YouTube Production That Creates Audiences");
  const audio = useRef({ drag: null, click: null, whoosh: null, bass: null });
  const scooterRef = useRef(null);
  const ctaRefs = useRef([]);

  // Load audio files from config
  useEffect(() => {
    try { audio.current.drag = new Audio(AUDIO_CONFIG.sounds.drag); } catch {}
    try { audio.current.click = new Audio(AUDIO_CONFIG.sounds.click); } catch {}
    try { audio.current.whoosh = new Audio(AUDIO_CONFIG.sounds.whoosh); } catch {}
    try { audio.current.bass = new Audio(AUDIO_CONFIG.sounds.bass); } catch {}

    [audio.current.drag, audio.current.click, audio.current.whoosh, audio.current.bass].forEach((a) => {
      if (a) a.volume = AUDIO_CONFIG.baseVolume;
    });
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const buttons = ctaRefs.current;
    if (!buttons.length) return;

    const handleMouseMove = (e) => {
      buttons.forEach((btn) => {
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const distX = e.clientX - btnCenterX;
        const distY = e.clientY - btnCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const magneticRadius = 100;

        if (distance < magneticRadius) {
          const pull = (magneticRadius - distance) / magneticRadius;
          const moveX = (distX / distance) * pull * 12;
          const moveY = (distY / distance) * pull * 12;
          btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          btn.style.transform = "translate(0, 0)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main animation sequence
  useEffect(() => {
    if (prefersReduced) {
      (async () => {
        await rootControls.start({ opacity: 1, transition: { duration: 0.3 } });
        await titleControls.start({ opacity: 1, scale: 1, transition: { duration: 0.45 } });
        finalControls.start({ opacity: 1, transition: { duration: 0.4 } });
      })();
      return;
    }

    (async () => {
      // Stage 1: Fade in root
      await rootControls.start({
        opacity: 1,
        transition: { duration: 0.01 },
      });

      // Stage 2: Logo slides in from left
      audio.current.drag?.play().catch(() => {});
      await logoControls.start({
        x: ["-140%", "0%"],
        opacity: [0, 1],
        rotate: [15, 0],
        transition: {
          duration: TIMINGS.logoSlideIn,
          ease: EASING.cinematic,
        },
      });

      // Pause
      await new Promise((r) => setTimeout(r, TIMINGS.pauseAfterLogo * 1000));

      // Stage 3: Logo morphs out, scooter morphs in
      audio.current.click?.play().catch(() => {});
      audio.current.whoosh?.play().catch(() => {});

      await Promise.all([
        logoControls.start({
          x: "40%",
          opacity: 0,
          scale: 0.8,
          rotate: -12,
          transition: {
            duration: TIMINGS.logoMorphOut,
            ease: EASING.morph,
          },
        }),
        scooterControls.start({
          x: "0%",
          opacity: 1,
          scale: 1,
          transition: {
            duration: TIMINGS.scooterMorphIn,
            ease: EASING.morph,
            delay: TIMINGS.scooterDelay,
          },
        }),
      ]);

      // Activate trail
      const trail = document.querySelector(".yt-trail-svg");
      if (trail) trail.classList.add("trail-active");
      if (scooterRef.current) scooterRef.current.classList.add("animating");

      // Stage 4: Scooter zooms right
      await scooterControls.start({
        x: ["0%", "160%"],
        rotate: [0, 4],
        transition: {
          duration: TIMINGS.scooterZoom,
          ease: EASING.cinematic,
        },
      });

      // Pause before title
      await new Promise((r) => setTimeout(r, TIMINGS.pauseBeforeTitle * 1000));

      // Stage 5: Title pops with scale
      audio.current.bass?.play().catch(() => {});
      await titleControls.start({
        opacity: 1,
        scale: [0.65, 1.35],
        transition: {
          duration: TIMINGS.titlePopScale,
          ease: EASING.pop,
        },
      });

      // Spring settle
      await titleControls.start({
        scale: 1,
        transition: {
          duration: TIMINGS.titleSettle,
          ease: EASING.elastic,
        },
      });

      // Stage 6: Subtitle + CTAs fade in
      await new Promise((r) => setTimeout(r, TIMINGS.pauseBeforeText * 1000));
      await finalControls.start({
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      });
    })();
  }, [
    logoControls,
    scooterControls,
    titleControls,
    finalControls,
    rootControls,
    prefersReduced,
  ]);

  // Split title into characters for stagger
  const renderTitle = () => {
    return titleText.split("").map((char, idx) => (
      <span
        key={idx}
        className={`yt-char yt-char-${(idx % 20) + 1}`}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  // CTA click ripple effect
  const handleCtaClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "radial-gradient(circle, rgba(34,211,238,0.5), transparent)";
    ripple.style.pointerEvents = "none";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.animation = "ripple 0.6s ease-out";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <section
      className="yt-hero-root"
      role="region"
      aria-label="YouTube cinematic hero"
    >
      <div className="yt-hero-bg" />

      {/* Trail SVG */}
      <svg
        className="yt-trail-svg"
        viewBox="0 0 1800 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="ytTrailGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff0000" stopOpacity="1" />
            <stop offset="65%" stopColor="#ff6a4a" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.92" />
          </linearGradient>
          <filter id="trailBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <path
          className="trail-path"
          d="M -200 68 C 80 40, 420 22, 760 42 C 1080 64, 1320 62, 1700 52"
          stroke="url(#ytTrailGrad)"
          strokeWidth="28"
          fill="none"
          strokeLinecap="round"
          filter="url(#trailBlur)"
        />
      </svg>

      <motion.div
        className="yt-hero-inner"
        initial={{ opacity: 0 }}
        animate={rootControls}
      >
        {/* LEFT COLUMN */}
        <div className="yt-left-col">
          <motion.h1
            className="yt-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={titleControls}
          >
            <span className="yt-title-fill">{renderTitle()}</span>
          </motion.h1>

          <motion.p className="yt-sub" initial={{ opacity: 0 }} animate={finalControls}>
            Thumbnails that get clicked. Edits that make them binge.
          </motion.p>

          <motion.div className="yt-ctas" initial={{ opacity: 0 }} animate={finalControls}>
            <a
              ref={(el) => {
                if (el) ctaRefs.current[0] = el;
              }}
              className="glass-btn"
              href="#featured"
              onClick={handleCtaClick}
            >
              Watch Reel
            </a>
            <a
              ref={(el) => {
                if (el) ctaRefs.current[1] = el;
              }}
              className="glass-btn btn-ghost"
              href="#contact"
              onClick={handleCtaClick}
            >
              See Results
            </a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="yt-stage" aria-hidden>
          {/* PLAY LOGO */}
          <motion.div
            className="yt-play-wrap"
            initial={{ x: "-140%", opacity: 0 }}
            animate={logoControls}
          >
            <svg
              className="yt-play-svg"
              viewBox="0 0 140 92"
              width="200"
              height="128"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <filter id="playGlow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                </filter>
              </defs>
              <rect
                x="0"
                y="0"
                width="140"
                height="92"
                rx="18"
                fill="#FF0000"
                filter="url(#playGlow)"
              />
              <polygon points="60,24 60,68 100,46" fill="#fff" />
            </svg>
          </motion.div>

          {/* SCOOTER */}
          <motion.div
            ref={scooterRef}
            className="yt-scooter-wrap"
            initial={{ opacity: 0, x: "-100%" }}
            animate={scooterControls}
          >
            <svg
              className="yt-scooter-svg"
              viewBox="0 0 260 120"
              width="360"
              height="170"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <filter id="scooterGlow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                </filter>
              </defs>
              <path
                d="M16 68 C44 34, 94 24, 148 28 L186 32 L200 26 L230 30 L230 54 L200 64 L148 68 Z"
                fill="#050607"
                filter="url(#scooterGlow)"
              />
              <rect x="126" y="14" width="48" height="8" rx="3" fill="#ffffff" opacity="0.98" />
              <circle cx="44" cy="88" r="14" fill="#ff3b30" filter="url(#scooterGlow)" />
              <circle cx="198" cy="88" r="14" fill="#ff3b30" filter="url(#scooterGlow)" />
              <path
                d="M76 36 L102 36"
                stroke="#22d3ee"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.9"
              />
              <circle cx="214" cy="36" r="8" fill="#ff6a4a" opacity="0.95" filter="url(#scooterGlow)" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
