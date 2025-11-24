// src/components/work/CreativeMediaItem.jsx

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import BrushRevealOverlay from "./BrushRevealOverlay";
import { mediaFloat, mediaHoverIn, mediaHoverOut } from "@/utils/creativeAnimations";

export default function CreativeMediaItem({
  item,
  index,
  onClick,
  enableBrush = true,
}) {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef(null);

  // ------------------------------------------
  // PARALLAX HOVER MOTION VALUES
  // ------------------------------------------
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-30, 30], [8, -8]);
  const rotateY = useTransform(x, [-30, 30], [-8, 8]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx / 4);
    y.set(dy / 4);
  };

  // ------------------------------------------
  // RENDER
  // ------------------------------------------
  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer select-none"
      variants={mediaFloat}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-10%" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(item)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* MEDIA WRAPPER */}
      <motion.div
        className="overflow-hidden rounded-2xl relative"
        variants={isHovered ? mediaHoverIn : mediaHoverOut}
        animate={isHovered ? "hover" : "rest"}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* IMAGE OR VIDEO */}
        {item.type === "video" ? (
          <video
            src={item.src}
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
            {...(isHovered ? { autoPlay: true } : {})}
          />
        ) : (
          <img
            src={item.src}
            alt={item.title || "media"}
            className="w-full h-full object-cover"
          />
        )}

        {/* GRAIN TEXTURE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none texture-grain opacity-40 mix-blend-soft-light"></div>

        {/* DARK GRADIENT MASK */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* BRUSH REVEAL OVERLAY */}
        {enableBrush && (
          <BrushRevealOverlay hovering={isHovered} />
        )}
      </motion.div>

      {/* TITLE / META */}
      {item.title && (
        <div className="mt-2 px-1">
          <h3 className="text-lg font-semibold text-neutral-100">
            {item.title}
          </h3>
          {item.category && (
            <p className="text-sm text-neutral-400 -mt-1">
              {item.category}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
