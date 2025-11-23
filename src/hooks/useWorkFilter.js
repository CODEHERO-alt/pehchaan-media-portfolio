// src/hooks/useWorkFilter.js
import React from "react";
import { guessMediaType } from "../utils/mediaType";

// Simple filter hook for media gallery pages
export default function useWorkFilter(initialItems = []) {
  const [typeFilter, setTypeFilter] = React.useState("all"); // 'all' | 'image' | 'video'

  // Ensure each item has a type
  const normalized = React.useMemo(
    () =>
      (initialItems || []).map((item) => ({
        ...item,
        type: item.type || guessMediaType(item.src),
      })),
    [initialItems]
  );

  const filteredItems = React.useMemo(() => {
    if (typeFilter === "all") return normalized;
    return normalized.filter((item) => item.type === typeFilter);
  }, [normalized, typeFilter]);

  // Inline filter bar component using the state above
  const FilterBar = React.useCallback(
    () => (
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <button
          onClick={() => setTypeFilter("all")}
          className={`px-3 py-1 rounded-full border transition ${
            typeFilter === "all"
              ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
              : "border-white/10 text-white/70 hover:border-white/30"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setTypeFilter("image")}
          className={`px-3 py-1 rounded-full border transition ${
            typeFilter === "image"
              ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
              : "border-white/10 text-white/70 hover:border-white/30"
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setTypeFilter("video")}
          className={`px-3 py-1 rounded-full border transition ${
            typeFilter === "video"
              ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
              : "border-white/10 text-white/70 hover:border-white/30"
          }`}
        >
          Videos
        </button>
      </div>
    ),
    [typeFilter]
  );

  return { filteredItems, FilterBar, typeFilter, setTypeFilter };
}
