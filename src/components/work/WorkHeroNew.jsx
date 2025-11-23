// src/components/work/WorkHeroNew.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  heroContainer,
  heroTitleParent,
  heroTitleChild,
  heroSubtitle,
  heroGlowOrbs,
  heroTrails,
} from "@/utils/workAnimations";

export default function WorkHeroNew() {
  const title = "Our Work";
  const letters = useMemo(() => title.split(""), []);

  const glowOrbs = useMemo(() => [0, 1, 2], []);
  const trails = useMemo(() => Array.from({ length: 6 }, (_, i) => i), []);

  return (
    <section className="relative w-full h-[52vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Orbs */}
      {glowOrbs.map((i) => (
        <motion.div
          key={`orb-${i}`}
          custom={i}
          variants={heroGlowOrbs}
          initial="initial"
          animate="animate"
          className="absolute rounded-full blur-3xl opacity-40"
          style={{
            width: 350,
            height: 350,
            background: "radial-gradient(circle at center, #ffffff40, transparent)",
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Vertical Trails */}
      {trails.map((i) => (
        <motion.div
          key={`trail-${i}`}
          custom={i}
          variants={heroTrails}
          initial="initial"
          animate="animate"
          className="absolute w-[2px] h-36 bg-white/10 blur-[2px]"
          style={{
            left: `${12 + i * 14}%`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Foreground Content */}
      <motion.div
        variants={heroContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          variants={heroTitleParent}
          initial="initial"
          animate="animate"
          className="text-5xl md:text-7xl font-bold text-white tracking-tight"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={heroTitleChild}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          initial="initial"
          animate="animate"
          className="mt-4 text-gray-300 text-lg md:text-xl"
        >
          Explore our best design, media, and branding work.
        </motion.p>
      </motion.div>
    </section>
  );
}
