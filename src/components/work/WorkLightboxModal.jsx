// src/components/work/WorkLightboxModal.jsx

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkLightboxModal({
  open,
  item,
  onClose,
}) {
  // ESC to close
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP CLOSE AREA */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
        />

        {/* CONTENT */}
        <motion.div
          className="relative z-[1000] max-w-5xl w-full mx-4"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-neutral-200 hover:text-white transition text-xl"
          >
            ✕
          </button>

          {/* MEDIA */}
          <div className="overflow-hidden rounded-2xl relative">
            {item.type === "video" ? (
              <video
                src={item.src}
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <img
                src={item.src}
                alt={item.title || "preview"}
                className="w-full h-full object-contain bg-black"
              />
            )}

            {/* subtle texture overlay */}
            <div className="absolute inset-0 texture-grain opacity-30 pointer-events-none"></div>
          </div>

          {/* META INFO */}
          {item.title && (
            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold text-neutral-100">
                {item.title}
              </h2>
              {item.category && (
                <p className="text-neutral-400 text-sm mt-1">
                  {item.category}
                </p>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
