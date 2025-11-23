// src/hooks/useWorkFilter.js
import { useMemo } from "react";

const guessMediaType = (src) => {
  if (!src) return "image";
  return src.endsWith(".mp4") || src.endsWith(".mov") ? "video" : "image";
};

export default function useWorkFilter(
  items = [],
  { searchQuery = "", activeTags = [], activeCategory = "", sortMode = "featured" }
) {
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();

    return (items || []).filter((item) => {
      const src = item.media || item.src;
      const tags = Array.isArray(item.tags) ? item.tags : [];
      const title = item.title || "";
      const category = item.category || "";

      // Search match
      const matchesSearch =
        title.toLowerCase().includes(q) ||
        tags.join(" ").toLowerCase().includes(q);

      // Category match
      const matchesCategory =
        !activeCategory || category === activeCategory;

      // Tag match
      const matchesTags =
        activeTags.length === 0 ||
        activeTags.every((tag) => tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [items, searchQuery, activeTags, activeCategory]);

  // Sorting
  const sorted = useMemo(() => {
    const arr = [...filtered];

    switch (sortMode) {
      case "recent":
        return arr.sort((a, b) => (b.year || 0) - (a.year || 0));

      case "oldest":
        return arr.sort((a, b) => (a.year || 0) - (b.year || 0));

      case "alpha":
        return arr.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );

      case "featured":
      default:
        return arr;
    }
  }, [filtered, sortMode]);

  return sorted;
}
