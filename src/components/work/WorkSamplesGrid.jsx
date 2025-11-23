// src/components/work/WorkSamplesGrid.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { staggerContainer } from "@/utils/workAnimations";
import WorkSampleCard from "./WorkSampleCard";
import WorkModalView from "./WorkModalView";
import PropTypes from "prop-types";

export default function WorkSamplesGrid({
  items,
  layout = "grid",
  title = "Curated samples",
}) {
  const [activeItem, setActiveItem] = useState(null);

  const closeModal = () => setActiveItem(null);

  const handleNext = () => {
    if (!activeItem || !items?.length) return;
    const idx = items.findIndex((it) => it.id === activeItem.id);
    const nextIdx = (idx + 1) % items.length;
    setActiveItem(items[nextIdx]);
  };

  const handlePrev = () => {
    if (!activeItem || !items?.length) return;
    const idx = items.findIndex((it) => it.id === activeItem.id);
    const prevIdx = (idx - 1 + items.length) % items.length;
    setActiveItem(items[prevIdx]);
  };

  return (
    <section aria-label="Work samples" className="max-w-7xl mx-auto px-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-white/70 uppercase tracking-[0.16em]">
            {title}
          </h3>
          <p className="text-xs text-white/50 mt-1">
            Showing <span className="font-semibold">{items.length}</span> pieces
            from the extended archive.
          </p>
        </div>
      </div>

      <motion.div
        variants={staggerContainer(0.05)}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div key={item.id} layout>
              <WorkSampleCard item={item} onOpen={setActiveItem} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <WorkModalView
        open={!!activeItem}
        item={activeItem}
        onClose={closeModal}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}

WorkSamplesGrid.propTypes = {
  items: PropTypes.array.isRequired,
  layout: PropTypes.string,
  title: PropTypes.string,
};
