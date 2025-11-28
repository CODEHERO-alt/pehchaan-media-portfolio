// src/components/work/CreativeMediaItem.jsx
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { mediaFloat, mediaHoverIn, mediaHoverOut } from "@/utils/workAnimations";

export default function CreativeMediaItem({
  item,
  index = 0,
  onClick = () => {},
  enableBrush = true,
}) {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef(null);

  const [inViewRef, inView] = useInView({
    triggerOnce: false,
    threshold: 0.12,
  });

  // combine refs
  const setRefs = (node) => {
    ref.current = node;
    inViewRef(node);
  };

  // parallax values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [6, -6]);
  const rotateY = useTransform(x, [-30, 30], [-6, 6]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx / 8);
    y.set(dy / 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  // Decide card height classes by weight (small, medium, large)
  const heightClass = item.weight >= 3 ? "h-96" : item.weight === 2 ? "h-80" : "h-64";

  return (
    <motion.article
      ref={setRefs}
      className="relative group rounded-2xl"
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={mediaFloat}
      custom={index}
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
      aria-label={`Open ${item.title}`}
    >
      <motion.div
        className={`overflow-hidden relative rounded-2xl bg-neutral-900/40 shadow-sm`}
        variants={isHovered ? mediaHoverIn : mediaHoverOut}
        animate={isHovered ? "hover" : "rest"}
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            muted
            playsInline
            loop
            preload="metadata"
            className={`w-full ${heightClass} object-cover`}
            {...(isHovered ? { autoPlay: true } : {})}
          />
        ) : (
          <img
            src={item.src}
            alt={item.title || "work image"}
            className={`w-full ${heightClass} object-cover`}
            loading="lazy"
            decoding="async"
          />
        )}

        {/* subtle dark gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

        {/* micro overlay (title + meta) — visible on hover OR small always strip */}
        <div className="absolute left-4 right-4 bottom-4 pointer-events-none">
          <div className="backdrop-blur-sm bg-black/20 rounded-md px-3 py-2 flex items-center justify-between">
            <div>
              <div className="text-sm md:text-base text-white font-semibold leading-tight">
                {item.title}
              </div>
              <div className="text-xs text-neutral-300 mt-0.5 uppercase tracking-wider">
                {item.category} · {item.meta?.views || "—"} views
                {item.meta?.duration ? ` · ${item.meta.duration}` : ""}
              </div>
            </div>

            {/* subtle pill deliverable */}
            {item.meta?.duration && (
              <div className="ml-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium glass-pill">
                  {item.meta.duration}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
