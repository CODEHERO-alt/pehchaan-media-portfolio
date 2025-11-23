// src/components/work/WorkFilterBarNew.jsx
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  filterBarParent,
  filterBarInput,
  filterChipParent,
  filterChipChild,
} from "@/utils/workAnimations";

/* ---------------------------------------------
   TAG SELECTOR
--------------------------------------------- */
function TagSelector({ availableTags, activeTags, onTagToggle }) {
  const tags = useMemo(() => availableTags, [availableTags]);

  return (
    <div className="w-full mt-6">
      <div className="text-xs uppercase tracking-widest text-gray-500 mb-3">
        Filter by tags
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = activeTags.includes(tag);

          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`
                px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300
                backdrop-blur-md border  
                ${
                  active
                    ? "bg-[#ffffff15] border-white/30 text-white shadow-lg shadow-white/10 scale-[1.03]"
                    : "bg-black/20 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------
   MOBILE CATEGORY CARDS
--------------------------------------------- */
function CategoryCards({
  categories,
  activeCategory,
  onCategoryChange,
  categoryPreviews,
}) {
  const cats = useMemo(() => categories, [categories]);

  return (
    <div className="md:hidden mt-8 space-y-4">
      {cats.map((cat) => {
        const active = activeCategory === cat;
        const preview = categoryPreviews?.[cat];

        return (
          <div
            key={cat}
            className={`
              p-5 rounded-2xl transition-all duration-500 border backdrop-blur-xl
              ${
                active
                  ? "border-white/20 bg-white/5 shadow-lg shadow-white/10 scale-[1.02]"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">{cat}</h3>

              <button
                onClick={() => onCategoryChange(cat)}
                className="
                  px-3 py-1 rounded-xl text-xs uppercase tracking-widest border 
                  border-white/10 bg-black/40 text-gray-300 
                  hover:text-white hover:border-white/20 transition-all
                "
              >
                {active ? "Selected" : "Select"}
              </button>
            </div>

            {preview && (
              <div className="rounded-xl overflow-hidden relative group">
                <img
                  src={preview}
                  alt={`${cat} category preview`}
                  className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------
   SORT DROPDOWN
--------------------------------------------- */
function SortDropdown({ sortMode, onSortChange }) {
  const handleChange = useCallback(
    (e) => onSortChange(e.target.value),
    [onSortChange]
  );

  return (
    <motion.select
      variants={filterBarInput}
      value={sortMode}
      onChange={handleChange}
      className="
        w-full md:w-56 bg-black/30 border border-white/10 text-gray-300 
        px-4 py-3 rounded-xl backdrop-blur-xl
        focus:outline-none focus:ring-2 focus:ring-white/30 transition-all
      "
    >
      <option value="featured">Featured (Most Impact)</option>
      <option value="recent">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="alpha">A → Z</option>
    </motion.select>
  );
}

/* ---------------------------------------------
   MAIN FILTER BAR
--------------------------------------------- */
export default function WorkFilterBarNew({
  categories,
  activeCategory,
  onCategoryChange,
  availableTags,
  activeTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
  sortMode,
  onSortChange,
  categoryPreviews,
}) {
  const [showFilters, setShowFilters] = useState(true);

  const toggleFilters = useCallback(() => {
    setShowFilters((v) => !v);
  }, []);

  const cats = useMemo(() => categories, [categories]);

  return (
    <motion.div
      variants={filterBarParent}
      initial="initial"
      animate="animate"
      className="
        w-full backdrop-blur-2xl bg-[#050505]/80 border border-white/10
        rounded-3xl p-6 md:p-8 shadow-[0_0_80px_-10px_rgba(255,255,255,0.15)]
      "
    >
      {/* Top Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <motion.div variants={filterBarInput} className="relative w-full md:flex-1">
          <input
            type="text"
            placeholder="Search visual work..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              w-full px-5 py-3 rounded-xl bg-[#0a0a0a] text-gray-200 placeholder-gray-500 
              border border-white/10 focus:border-white/25 outline-none transition-all
            "
          />
        </motion.div>

        <SortDropdown sortMode={sortMode} onSortChange={onSortChange} />

        <motion.button
          variants={filterBarInput}
          onClick={toggleFilters}
          className="
            px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20
            hover:bg-white/20 transition text-sm
          "
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </motion.button>
      </div>

      {/* Category Chips (Desktop) */}
      <motion.div
        variants={filterChipParent}
        className="hidden md:flex flex-wrap gap-3 mt-7"
      >
        {cats.map((cat) => {
          const active = activeCategory === cat;

          return (
            <motion.button
              key={cat}
              variants={filterChipChild}
              onClick={() => onCategoryChange(cat)}
              className={`
                px-5 py-2 rounded-full text-xs md:text-sm font-medium border
                ${
                  active
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                }
              `}
            >
              {cat}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Expandable filters */}
      <AnimatePresence initial={false}>
        {showFilters && (
          <motion.div
            key="filters-content"
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            className="overflow-hidden mt-4 md:mt-2"
          >
            <TagSelector
              availableTags={availableTags}
              activeTags={activeTags}
              onTagToggle={onTagToggle}
            />

            <CategoryCards
              categories={cats}
              activeCategory={activeCategory}
              onCategoryChange={onCategoryChange}
              categoryPreviews={categoryPreviews}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
