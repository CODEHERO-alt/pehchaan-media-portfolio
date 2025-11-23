// src/components/work/WorkSampleCard.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cardHover, thumbReveal } from "../../utils/workAnimations";
import { guessMediaType } from "../../utils/mediaType";
import useHoverVideo from "../../hooks/useHoverVideo";

export default function WorkSampleCard({
  item,
  onOpen = () => {},
  className = "",
}) {
  const type = item.type || guessMediaType(item.src);
  const videoRef = useHoverVideo();
  const wrapperRef = useRef(null);

  return (
    <motion.article
      ref={wrapperRef}
      className={`work-sample-card group ${className}`}
      variants={thumbReveal}
      initial="initial"
      animate="animate"
      whileHover="hover"
      style={{ borderRadius: "1rem", overflow: "hidden" }}
    >
      <motion.div
        variants={cardHover}
        className="relative bg-neutral-900"
        style={{ borderRadius: "1rem" }}
      >
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-900">
          {type === "image" ? (
            <img
              src={item.src}
              alt={item.alt || item.title || "work sample"}
              loading="lazy"
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster || ""}
              preload="metadata"
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* bottom title */}
          <div className="absolute left-4 bottom-4 right-4 pointer-events-none">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold tracking-tight text-white/95">
                  {item.title}
                </div>
                <div className="text-xs text-white/60 mt-1"></div>
              </div>

              <div className="ml-3">
                <span
                  className={`inline-flex items-center text-[11px] font-medium px-2 py-1 rounded-full ${
                    type === "video"
                      ? "bg-rose-600/90 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {type === "video" ? "Reel" : "Image"}
                </span>
              </div>
            </div>
          </div>

          {/* click cover */}
          <button
            onClick={() => onOpen(item)}
            aria-label={`Open preview: ${item.title}`}
            className="absolute inset-0 w-full h-full"
            style={{ background: "transparent" }}
          />
        </div>
      </motion.div>
    </motion.article>
  );
}
