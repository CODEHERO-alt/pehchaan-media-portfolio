// src/layouts/WorkCategoryLayout.jsx
import React from "react";

/**
 * WorkCategoryLayout
 *
 * Props:
 *  - category: {
 *      title: string,
 *      description?: string,
 *      media?: array
 *    }
 *  - children: ReactNode (media grid)
 *  - filterControls?: ReactNode (filter UI)
 */

export default function WorkCategoryLayout({
  category = {},
  children,
  filterControls
}) {
  const { title, description, media = [] } = category;

  return (
    <main className="work-category-page min-h-screen w-full">
      {/* ---- Header ---- */}
      <header className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="mb-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {title || "Untitled Category"}
          </h1>

          {/* Description */}
          {description && (
            <p className="mt-3 text-gray-500 max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* ---- Top Controls Row ---- */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Filter Controls (left) */}
          <div className="flex-shrink-0">{filterControls}</div>

          {/* Meta (right) */}
          <div className="text-sm text-gray-400 whitespace-nowrap">
            {media.length > 0
              ? `Showing ${media.length} samples`
              : "No samples available"}
          </div>
        </div>
      </header>

      {/* ---- Content Grid ---- */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {children}
      </section>
    </main>
  );
}
