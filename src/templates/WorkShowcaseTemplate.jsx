// src/templates/WorkShowcaseTemplate.jsx
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CreativeMediaItem from "@/components/work/CreativeMediaItem";
import { containerStagger, fadeInUp } from "@/utils/creativeAnimations";

/**
 * Elegant Minimal — Left-aligned editorial Work Showcase Template
 */
export default function WorkShowcaseTemplate({
  title,
  description,
  samples = [],
  tags = ["All"],
  initialFilter = "all",
  theme = "emerald",
  onItemClick,
}) {
  const [typeFilter, setTypeFilter] = useState(initialFilter);
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let out = samples || [];
    // type filter
    if (typeFilter && typeFilter !== "all") {
      out = out.filter((s) => s.type === typeFilter);
    }
    // tag/category filter (category field used in your data)
    if (activeTag && activeTag !== "All") {
      out = out.filter((s) => (s.category || "").toLowerCase() === activeTag.toLowerCase());
    }
    // query search (title)
    if (query && query.trim().length > 0) {
      const q = query.trim().toLowerCase();
      out = out.filter((s) => (s.title || "").toLowerCase().includes(q));
    }
    return out;
  }, [samples, typeFilter, activeTag, query]);

  return (
    <section className="work-showcase bg-black text-white min-h-screen py-20 md:py-28 px-6 md:px-12 lg:px-24">
      {/* thin textured background layer (keeps design subtle) */}
      <div className="absolute inset-0 pointer-events-none texture-paper opacity-10 mix-blend-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO — Left-aligned editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.header
            className="lg:col-span-5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1
              className="text-4xl md:text-6xl leading-tight font-[800] tracking-tight mb-4"
              style={{ lineHeight: 1.02 }}
            >
              {title}
            </h1>

            <p className="text-base md:text-lg text-neutral-300 max-w-xl mb-6">
              {description}
            </p>

            {/* Tag chips (left) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTypeFilter("all")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                    typeFilter === "all"
                      ? "bg-emerald-600/12 border border-emerald-600 text-emerald-200"
                      : "bg-transparent border border-white/6 text-neutral-300 hover:border-white/20"
                  }`}
                  aria-pressed={typeFilter === "all"}
                >
                  All
                </button>

                <button
                  onClick={() => setTypeFilter("image")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                    typeFilter === "image"
                      ? "bg-emerald-600/12 border border-emerald-600 text-emerald-200"
                      : "bg-transparent border border-white/6 text-neutral-300 hover:border-white/20"
                  }`}
                  aria-pressed={typeFilter === "image"}
                >
                  Thumbnails
                </button>

                <button
                  onClick={() => setTypeFilter("video")}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                    typeFilter === "video"
                      ? "bg-emerald-600/12 border border-emerald-600 text-emerald-200"
                      : "bg-transparent border border-white/6 text-neutral-300 hover:border-white/20"
                  }`}
                  aria-pressed={typeFilter === "video"}
                >
                  Edits
                </button>
              </div>

              {/* dynamic category chips */}
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setActiveTag(t);
                      // Reset type filter when tag changes (optional)
                      // setTypeFilter('all');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                      activeTag === t
                        ? "bg-white/6 border border-white/12 text-white"
                        : "bg-transparent border border-white/6 text-neutral-300 hover:border-white/20"
                    }`}
                    aria-pressed={activeTag === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Search / meta row */}
            <div className="flex items-center gap-4">
              <label htmlFor="work-search" className="sr-only">Search</label>
              <div className="relative max-w-xs w-full">
                <input
                  id="work-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title — e.g. 'Tech', 'Fitness'..."
                  className="w-full bg-white/3 placeholder:text-neutral-400 text-white text-sm py-2 px-3 rounded-md border border-white/6 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="text-sm text-neutral-400 ml-auto">
                <span className="font-medium text-white">{filtered.length}</span>{" "}
                items
              </div>
            </div>
          </motion.header>

          {/* Right: optional visual/feature column on large screens */}
          <div className="lg:col-span-7 hidden lg:block">
            <motion.div
              className="rounded-2xl overflow-hidden border border-white/6 p-6 bg-gradient-to-tr from-white/2 to-transparent"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
            >
              {/* subtle editorial layout sample — you can swap for a hero image */}
              <div className="h-64 rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-800/60 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Featured</div>
                  <div className="text-2xl font-semibold text-white mb-2">Editorial Spotlight</div>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    A refined visual preview of the tone — cinematic crops, measured spacing and soft gradients.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* GRID */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="visible"
          className="mt-10"
        >
          <ControlledChaosGrid items={filtered} onItemClick={onItemClick} />
        </motion.div>
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
  onItemClick: PropTypes.func,
};

/* ============================
   FilterBar removed — inlined above
   ControlledChaosGrid below
   ============================ */

function ControlledChaosGrid({ items = [], onItemClick }) {
  // visual weight mapping
  const weightMap = [2, 1, 1, 2, 1, 1, 2, 1, 1, 2];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 max-w-7xl mx-auto">
      {items.map((item, i) => {
        const weight = weightMap[i % weightMap.length] || 1;
        const className =
          weight === 2
            ? "row-span-1 sm:row-span-1 lg:col-span-2 lg:row-span-1"
            : "row-span-1";

        return (
          <motion.div
            key={`${item.id || item.src}-${i}`}
            variants={fadeInUp}
            className={`group ${className}`}
          >
            <CreativeMediaItem item={item} index={i} onClick={onItemClick} />
          </motion.div>
        );
      })}
    </div>
  );
}
