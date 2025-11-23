// src/components/work/MediaMasonry.jsx
import React, { useMemo } from "react";

export default function MediaMasonry({ items = [], onClick = () => {} }) {
  const safeItems = useMemo(() => items || [], [items]);

  return (
    <div className="masonry w-full">
      {safeItems.map((item, i) => {
        const src = item.media || item.src;
        const isVideo = src?.endsWith(".mp4") || src?.endsWith(".mov");

        return (
          <div key={i} className="masonry-item mb-4 cursor-pointer" onClick={() => onClick(item)}>
            {isVideo ? (
              <video
                src={src}
                className="w-full rounded-2xl"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={src}
                alt={item.title || "work item"}
                className="w-full rounded-2xl"
                loading="lazy"
              />
            )}
          </div>
        );
      })}

      {/* INLINE SAFE CSS (Vite-compatible) */}
      <style>{`
        .masonry {
          column-count: 1;
          column-gap: 1.5rem;
        }
        @media (min-width: 640px) {
          .masonry { column-count: 2; }
        }
        @media (min-width: 1024px) {
          .masonry { column-count: 3; }
        }
        .masonry-item {
          break-inside: avoid;
        }
      `}</style>
    </div>
  );
}
