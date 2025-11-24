// src/components/work/BrushRevealOverlay.jsx

import React from "react";
import { motion } from "framer-motion";
import { brushReveal } from "@/utils/creativeAnimations";

export default function BrushRevealOverlay({ hovering }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      variants={brushReveal}
      animate={hovering ? "reveal" : "hidden"}
      transition={{ duration: 0.55, ease: "circOut" }}
    >
      {/* BRUSH TEXTURE */}
      <div className="absolute inset-0 mask-brush pointer-events-none opacity-70 mix-blend-overlay"></div>

      {/* GRADIENT TOP LIGHT */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
    </motion.div>
  );
}
