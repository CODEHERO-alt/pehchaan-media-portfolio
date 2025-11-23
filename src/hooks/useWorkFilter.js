// src/hooks/useWorkFilter.js
import { useMemo, useState } from "react";
import { guessMediaType } from "../utils/mediaType";

/**
 * useWorkFilter
 * - initialItems: array of media items
 * - returns: { filteredItems, typeFilter, setTypeFilter }
 *
 * This hook is PURE JS – no JSX – so it can live in a .js file without
 * breaking Vite's build-import-analysis.
 */
export default function useWorkFilter(initialItems = []) {
  const [typeFilter, setTypeFilter] = useState("all"); // 'all' | 'image' | 'video'

  // Normalize items so each has a `.type`
  const normalized = useMemo(
    () =>
      (initialItems || []).map((item) => ({
        ...item,
        type: item.type || guessMediaType(item.src),
      })),
    [initialItems]
  );

  const filteredItems = useMemo(() => {
    if (typeFilter === "all") return normalized;
    return normalized.filter((item) => item.type === typeFilter);
  }, [normalized, typeFilter]);

  return { filteredItems, typeFilter, setTypeFilter };
}
