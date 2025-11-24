import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import CreativeMediaItem from "@/components/work/CreativeMediaItem";
import { containerStagger, fadeInUp } from "@/utils/creativeAnimations";

/**
 * WorkShowcaseTemplate
 * A single master template for all work category pages.
 * - Uses a "controlled chaos" grid for an editorial, handcrafted feel.
 * - Expects `samples` to be an array of { type: 'image'|'video', src, title?, meta? }
 * - Keeps outer layout minimal so Navbar/Footer from the app wrap it.
 */
export default function WorkShowcaseTemplate({
  title,
  description,
  samples = [],
  tags = ["All"],
  initialFilter = "all",
  theme = "emerald",
}) {
  const [typeFilter, setTypeFilter] = useState(initialFilter);
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    let out = samples;
    if (typeFilter && typeFilter !== "all") {
      out = out.filter((s) => s.type === typeFilter);
    }
    if (activeTag && activeTag !== "All") {
      // If your samples carry tags you can filter here — fallback is no-op
      out = out.filter((s) => (s.tags || []).includes(activeTag));
    }
    return out;
  }, [samples, typeFilter, activeTag]);

  return (
    <section className="work-showcase relative py-16 md:py-28 px-6 md:px-12 lg:px-20 text-white">
      {/* Subtle paper grain layer (Tailwind layer provided later) */}
      <div className="absolute inset-0 pointer-events-none texture-paper opacity-30 mix-blend-overlay" />

      {/* HERO */}
      <motion.header
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto mb-8 md:mb-12 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-display leading-tight tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-sm md:text-base text-white/70 max-w-2xl">{description}</p>

        {/* FILTERS */}
        <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
          <FilterBar
            tags={tags}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            activeTag={activeTag}
            onTagChange={setActiveTag}
            theme={theme}
          />

          <div className="text-xs text-white/60">{filtered.length} items</div>
        </div>
      </motion.header>

      {/* GRID */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10"
      >
        <ControlledChaosGrid items={filtered} />
      </motion.div>

      {/* Small CTA or subtle footer stripe */}
      <div className="max-w-6xl mx-auto mt-12 md:mt-16 z-10 relative">
        <div className="rounded-2xl p-6 bg-white/3 border border-white/6 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Want this look?</div>
            <div className="text-xs text-white/60">We can adapt this template for any category.</div>
          </div>
          <a
            href="#contact"
            className="text-sm px-4 py-2 rounded-md border border-white/10 hover:bg-white/5 transition"
          >
            Let's talk
          </a>
        </div>
      </div>
    </section>
  );
}

WorkShowcaseTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  samples: PropTypes.array,
  tags: PropTypes.array,
  initialFilter: PropTypes.string,
  theme: PropTypes.string,
};


/**
 * FilterBar — visual chip filters for type + tag selection
 */
function FilterBar({ tags = ["All"], typeFilter, onTypeChange, activeTag, onTagChange, theme }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onTypeChange("all")}
          className={`px-3 py-1 rounded-full border transition text-xs ${
            typeFilter === "all" ? "border-emerald-400 bg-emerald-500/15 text-emerald-200" : "border-white/10 text-white/70 hover:border-white/30"
          }`}
        >
          All
        </button>
        <button
          onClick={() => onTypeChange("image")}
          className={`px-3 py-1 rounded-full border transition text-xs ${
            typeFilter === "image" ? "border-emerald-400 bg-emerald-500/15 text-emerald-200" : "border-white/10 text-white/70 hover:border-white/30"
          }`}
        >
          Thumbnails
        </button>
        <button
          onClick={() => onTypeChange("video")}
          className={`px-3 py-1 rounded-full border transition text-xs ${
            typeFilter === "video" ? "border-emerald-400 bg-emerald-500/15 text-emerald-200" : "border-white/10 text-white/70 hover:border-white/30"
          }`}
        >
          Edits
        </button>
      </div>

      {/* Tag chips */}
      <div className="hidden sm:flex items-center gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => onTagChange(t)}
            className={`px-3 py-1 rounded-full border text-xs transition ${
              activeTag === t ? "bg-white/5 border-white/20 text-white" : "border-white/8 text-white/70 hover:border-white/30"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * ControlledChaosGrid
 * - Creates a staggered grid where some items intentionally span more rows/cols
 * - Uses the CreativeMediaItem for every piece
 */
function ControlledChaosGrid({ items = [] }) {
  // A mapping that decides the visual weight of each tile by index — tweakable.
  const weightMap = useMemo(() => [2, 1, 1, 2, 1, 1, 2, 1, 1, 2], []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {items.map((item, i) => {
        const weight = weightMap[i % weightMap.length] || 1;
        // We use row-span/col-span utility classes to create the irregular layout
        const className =
          weight === 2
            ? "row-span-1 sm:row-span-1 lg:col-span-2 lg:row-span-1"
            : "row-span-1";

        return (
          <motion.div
            key={`${item.src}-${i}`}
            variants={fadeInUp}
            className={`group ${className}`}
          >
            <CreativeMediaItem item={item} index={i} />
          </motion.div>
        );
      })}
    </div>
  );
}

// Local fadeInUp fallback (in case utils haven't been generated yet)
function fadeInUp() {
  return {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
}
