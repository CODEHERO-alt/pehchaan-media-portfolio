// src/components/work/WorkModalView.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalBackdrop, modalContent } from "../../utils/workAnimations";

export default function WorkModalView({
  open,
  item = null,
  onClose = () => {},
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !item) return null;

  // SAFER media determination
  const src =
    item.src || item.sampleUrl || item.thumbnail || item.poster || "";

  const isVideo =
    item.type === "video" ||
    (typeof src === "string" &&
      src.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i));

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          variants={modalBackdrop}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative bg-black rounded-2xl shadow-2xl max-w-[1100px] w-full max-h-[86vh] overflow-auto"
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 p-2 rounded-full bg-black/40 text-white"
            >
              ✕
            </button>

            <div className="p-6 flex items-center justify-center">
              {isVideo ? (
                <video
                  src={src}
                  poster={item.poster || ""}
                  controls
                  autoPlay
                  className="max-w-full max-h-[70vh] object-contain"
                />
              ) : (
                <img
                  src={src}
                  alt={item.alt || item.title || "media"}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            {item.title && (
              <div className="px-6 py-4 border-t border-white/8 text-white/80">
                <div className="text-sm">{item.title}</div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
