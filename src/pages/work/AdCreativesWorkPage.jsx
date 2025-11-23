// src/pages/work/AdCreativesWorkPage.jsx
import React, { useState } from "react";
import WORK_CATEGORIES from "../../data/workData";
import useWorkFilter from "../../hooks/useWorkFilter";
import WorkSampleCard from "../../components/work/WorkSampleCard";
import WorkModalView from "../../components/work/WorkModalView";
import { motion } from "framer-motion";
import { staggerContainer, thumbReveal } from "../../utils/workAnimations";

export default function AdCreativesWorkPage() {
  const category = WORK_CATEGORIES.find((c) => c.slug === "ad-creatives");

  // Guard in case slug is wrong / data missing
  if (!category) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p className="text-sm md:text-base">
          Could not find the <span className="font-semibold">ad-creatives</span> category in workData.js
        </p>
      </main>
    );
  }

  const { list, typeFilter, setTypeFilter } = useWorkFilter(category.media || []);
  const [selected, setSelected] = useState(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-400/80">
          Work samples
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
          {category.title || "Ad Creatives"}
        </h1>
        {category.description && (
          <p className="mt-3 text-sm md:text-base text-white/75 max-w-2xl">
            {category.description}
          </p>
        )}
      </header>

      {/* Filter bar */}
      <section className="max-w-6xl mx-auto px-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border border-white/10 rounded-2xl px-4 py-3 bg-white/5 backdrop-blur">
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/70">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/70 text-[10px]">
              {list.length}
            </span>
            <span className="font-medium tracking-wide">pieces</span>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1 rounded-full border text-xs md:text-[13px] transition ${
                typeFilter === "all"
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                  : "border-white/10 text-white/70 hover:border-white/30"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter("image")}
              className={`px-3 py-1 rounded-full border text-xs md:text-[13px] transition ${
                typeFilter === "image"
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                  : "border-white/10 text-white/70 hover:border-white/30"
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setTypeFilter("video")}
              className={`px-3 py-1 rounded-full border text-xs md:text-[13px] transition ${
                typeFilter === "video"
                  ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                  : "border-white/10 text-white/70 hover:border-white/30"
              }`}
            >
              Videos
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {list.map((item, index) => (
            <motion.div key={item.id || index} variants={thumbReveal} custom={index}>
              <WorkSampleCard item={item} onOpen={setSelected} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Modal */}
      <WorkModalView
        open={!!selected}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}
