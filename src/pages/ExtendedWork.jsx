// src/pages/ExtendedWork.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import WORK_CATEGORIES from "../data/workData";
import {
  heroContainer,
  thumbReveal,
  staggerContainer,
} from "../utils/workAnimations";

const slugify = (str) =>
  String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function ExtendedWork() {
  const [hovered, setHovered] = useState(null);

  const categoryCards = useMemo(
    () =>
      WORK_CATEGORIES.map((c) => ({
        ...c,
        slug: c.slug || slugify(c.title),
      })),
    []
  );

  return (
    <main className="min-h-screen bg-[#020713] text-white relative overflow-hidden">
      {/* Gradient background similar to home but a bit subtler */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#0b95ff22,_transparent_55%),radial-gradient(circle_at_bottom,_#00e0ff14,_transparent_52%)]" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <motion.header
          variants={heroContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto px-6 pt-28 pb-12 text-center"
        >
          <h1 className="font-bold text-[2.7rem] md:text-[3.2rem] lg:text-[3.6rem] leading-tight tracking-tight text-[#48b4ff]">
            OUR WORK AS A FULL-SERVICE AGENCY
          </h1>

          <p className="mt-5 text-sm md:text-base text-white/75 max-w-2xl mx-auto">
            From brand launches and social content to motion and product
            visuals, these categories showcase how we make brands{" "}
            <span className="font-semibold text-white">unforgettable</span>{" "}
            across formats.
          </p>
        </motion.header>

        {/* GRID */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            variants={staggerContainer(0.06)}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9"
          >
            {categoryCards.map((cat, idx) => {
              const hero =
                cat.hero ||
                (cat.media && cat.media[0] && cat.media[0].poster) ||
                (cat.media && cat.media[0] && cat.media[0].src);

              const sampleCount = cat.media?.length ?? 0;

              return (
                <motion.div
                  key={cat.slug}
                  variants={thumbReveal}
                  custom={idx}
                  onMouseEnter={() => setHovered(cat.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="flex"
                >
                  <Link
                    to={`/work/${cat.slug}`}
                    className="group block w-full rounded-[30px] overflow-hidden bg-[#04060d] shadow-[0_22px_55px_rgba(0,0,0,0.78)] hover:shadow-[0_26px_65px_rgba(0,193,255,0.5)] transition-all duration-300 transform-gpu hover:-translate-y-[5px]"
                    aria-label={`Open ${cat.title}`}
                  >
                    {/* Bigger & slightly taller container */}
                    <div className="relative w-full aspect-[3/2] min-h-[320px] md:min-h-[360px] bg-black overflow-hidden">
                      {/* IMAGE */}
                      {hero ? (
                        <img
                          src={hero}
                          alt={cat.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.07]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/35 text-sm">
                          Preview coming soon
                        </div>
                      )}

                      {/* Gradient overlay to keep text readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/45 to-transparent pointer-events-none" />

                      {/* Hover glow ring */}
                      <div
                        className={`absolute inset-0 rounded-[30px] pointer-events-none transition-opacity duration-300 ${
                          hovered === cat.slug
                            ? "opacity-100 shadow-[0_0_0_1px_rgba(0,193,255,0.9),0_0_40px_rgba(0,193,255,0.55)]"
                            : "opacity-0"
                        }`}
                      />

                      {/* TEXT OVER IMAGE */}
                      <div className="absolute left-6 right-6 bottom-6 flex flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                          {/* Title in cyan */}
                          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[#48b4ff]">
                            {cat.title}
                          </h3>

                          {sampleCount > 0 && (
                            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-[2px]">
                              {sampleCount} samples
                            </span>
                          )}
                        </div>

                        {cat.description && (
                          <p className="text-[0.76rem] md:text-xs text-white/70 leading-relaxed max-w-[92%]">
                            {cat.description}
                          </p>
                        )}

                        <button
                          type="button"
                          className="mt-2 self-start text-[0.75rem] md:text-xs font-medium text-white/55 group-hover:text-cyan-300 inline-flex items-center gap-1 transition-colors duration-200"
                        >
                          <span>View curated projects</span>
                          <span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">
                            ⟶
                          </span>
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA PILL BELOW GRID */}
          <div className="mt-18 flex justify-center">
            {/* Use Link to go to home page contact section */}
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full px-9 py-3.5 text-sm md:text-base font-semibold bg-gradient-to-r from-[#1dd1ff] to-[#4c8dff] text-black shadow-[0_14px_34px_rgba(0,0,0,0.7)] hover:shadow-[0_18px_42px_rgba(0,193,255,0.65)] transition-all duration-300 hover:-translate-y-[2px]"
            >
              Book a Free Session
            </Link>
          </div>

          <div className="h-20" />
        </section>
      </div>
    </main>
  );
}
