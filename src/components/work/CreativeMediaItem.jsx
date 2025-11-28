// src/components/work/CreativeMediaItem.jsx
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "@/styles/creative-media.css";

/**
 * CreativeMediaItem
 * - Tilt / parallax on hover
 * - Gentle scale on hover
 * - Accessibility: keyboard activation
 */

export default function CreativeMediaItem({ item, index = 0, onClick = () => {} }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // parallax motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [6, -6]);
  const rotateY = useTransform(x, [-30, 30], [-6, 6]);

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx / 12);
    y.set(dy / 12);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHovered(false);
  }

  const heightClass = item.weight >= 3 ? "h-96" : item.weight === 2 ? "h-80" : "h-64";

  return (
    <motion.article
      ref={ref}
      className={`creative-tilt rounded-2xl overflow-hidden`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(item); }}
      aria-label={`Open ${item.title}`}
    >
      <div className={`media-frame ${heightClass}`}>
        {item.type === "video" ? (
          <video src={item.src} poster={item.poster} muted playsInline loop preload="metadata" className="w-full h-full object-cover" {...(hovered ? { autoPlay: true } : {})} />
        ) : (
          <img src={item.src} alt={item.title || "work image"} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        )}

        <div className="media-overlay" aria-hidden>
          <div className="overlay-meta">
            <div className="meta-left">
              <div className="meta-title">{item.title}</div>
              <div className="meta-sub">{item.category} · {item.meta?.views || "—"}</div>
            </div>
            {item.meta?.duration && <div className="meta-duration">{item.meta.duration}</div>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
