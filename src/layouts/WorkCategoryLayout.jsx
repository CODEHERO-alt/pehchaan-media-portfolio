// src/layouts/WorkCategoryLayout.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * WorkCategoryLayout
 *
 * A lightweight layout wrapper used by category pages (YouTube, Motion, Web Redesign, etc).
 * It accepts a `category` object (title, description, hero, media), optional `filterControls`
 * and renders children (the media grid).
 *
 * This file previously contained placeholder ellipses which caused a runtime syntax error
 * and prevented pages importing this layout from rendering (resulting in a blank/solid screen).
 * Replacing the file with this fully-formed component should fix those pages.
 */
export default function WorkCategoryLayout({ category = {}, filterControls = null, children }) {
  const { title = "Category", description = "" } = category || {};

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <header className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
            {description && <p className="mt-3 text-sm md:text-base text-white/80 max-w-2xl">{description}</p>}
          </div>
        </div>
      </header>

      {/* optional filter controls */}
      {filterControls && (
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="bg-white/5 rounded-xl p-4">{filterControls}</div>
        </div>
      )}

      {/* content grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {children}
      </section>
    </main>
  );
}

WorkCategoryLayout.propTypes = {
  category: PropTypes.object,
  filterControls: PropTypes.node,
  children: PropTypes.node,
};
