// src/components/work/CreativeMediaItem.jsx
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import BrushRevealOverlay from "./BrushRevealOverlay";
import { mediaFloat, mediaHoverIn, mediaHoverOut } from "@/utils/creativeAnimations";

export default function CreativeMediaItem({
  item,
  index = 0,
  onClick = () => {},
  enableBrush = true,
}) {
  const ref = useRef(null);
  const [isHovered, setHovered] = useState(false);

  // intersection observer to trigger scroll reveal
  const [inViewRef, inView] = useInView({
    triggerOnce: false, // re-trigger when scrolling back
    threshold: 0.15,
  });

  // combine refs
  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // PARALLAX HOVER MOTION
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [8, -8]);
  const rotateY = useTransform(x, [-30, 30], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx / 6);
    y.set(dy / 6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const baseCardClasses = "relative group cursor-pointer select-none";

  return (
    <motion.div
      ref={setRefs}
      className={baseCardClasses}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={mediaFloat}
      transition={{ duration: 0.75 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick(item);
      }}
      aria-label={`Open ${item.title || "work item"}`}
    >
      {/* MEDIA WRAPPER */}
      <motion.div
        className="overflow-hidden rounded-2xl relative bg-neutral-900/40 border border-white/6"
        variants={isHovered ? mediaHoverIn : mediaHoverOut}
        animate={isHovered ? "hover" : "rest"}
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-56 sm:h-64 lg:h-72 object-cover"
            {...(isHovered ? { autoPlay: true } : {})}
          />
        ) : (
          <img
            src={item.src}
            alt={item.title || "work image"}
            className="w-full h-56 sm:h-64 lg:h-72 object-cover"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* GRAIN TEXTURE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none texture-grain opacity-30 mix-blend-soft-light"></div>

        {/* DARK GRADIENT MASK */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* BRUSH REVEAL */}
        {enableBrush && <BrushRevealOverlay hovering={isHovered} />}
      </motion.div>

      {/* TITLE / META */}
      <div className="mt-3 px-1">
        {item.title && (
          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white leading-tight">
            {item.title}
          </h3>
        )}
        {item.category && (
          <p className="text-xs md:text-sm text-neutral-400 uppercase tracking-wider -mt-1">
            {item.category}
          </p>
        )}
      </div>
    </motion.div>
  );
}
