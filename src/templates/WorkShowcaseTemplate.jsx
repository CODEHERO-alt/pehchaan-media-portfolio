// src/templates/WorkShowcaseTemplate.jsx
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CreativeMediaItem from "@/components/work/CreativeMediaItem";
import { containerStagger, fadeInUp } from "@/utils/workAnimations";
import youtubeItems from "@/data/work/youtubeData";

export default function WorkShowcaseTemplate({
  title = "YouTube Production",
  description = "Thumbnails, long-form edits, storytelling visuals.",
  samples = youtubeItems,
  tags = ["All", "Thumbnails", "Edits"],
  featuredId = null,
  onItemClick = () => {},
}) {
  // Data-driven: choose featured first (if provided), else auto pick first weight>=3 else first video
  const featured = useMemo(() => {
    if (featuredId) return samples.find((s) => s.id === featuredId) || null;
    const w3 = samples.find((s) => s.weight >= 3);
    if (w3) return w3;
    return samples.find((s) => s.type === "video") || samples[0] || null;
  }, [samples, featuredId]);

  // Remove featured from rest
  const rest = samples.filter((s) => s.id !== (featured?.id || ""));

  // tags filtering kept simple; default all
  const filtered = useMemo(() => rest, [rest]);

  // Grouping: we'll build rows: first featured handled above. Then map rest to layout using weight
  const rows = useMemo(() => {
    // algorithm: try to chunk into groups: two-up (weights 2), three-up (1), mosaic (2+1+1)
    const out = [];
    let i = 0;
    const copy = [...filtered];
    while (i < copy.length) {
      const remaining = copy.length - i;
      // prefer 3-up if many remaining
      if (remaining >= 3) {
        out.push(copy.slice(i, i + 3));
        i += 3;
      } else {
        out.push(copy.slice(i, copy.length));
        break;
      }
    }
    return out;
  }, [filtered]);

  return (
    <section className="work-showcase bg-black text-white py-12 md:py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* HERO + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <motion.header
            className="lg:col-span-5"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            custom={0}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">
              {title}
            </h1>
            <p className="text-neutral-300 text-lg max-w-xl mb-6">{description}</p>

            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="px-3 py-1 rounded-full text-xs font-medium glass-chip focus:outline-none"
                >
                  {t}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <a
                href="#featured"
                className="px-4 py-2 rounded-md text-sm font-medium btn-primary"
              >
                Watch Reel
              </a>
              <a
                href="#contact"
                className="px-4 py-2 rounded-md text-sm font-medium btn-ghost"
              >
                See Results
              </a>
            </div>
          </motion.header>

          {/* right visual block */}
          <div className="lg:col-span-7">
            <motion.div
              id="featured"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              className="rounded-2xl overflow-hidden border border-transparent"
            >
              {featured ? (
                <div className="relative rounded-2xl">
                  {featured.type === "video" ? (
                    <video
                      src={featured.src}
                      poster={featured.poster}
                      muted
                      playsInline
                      loop
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
                      autoPlay
                    />
                  ) : (
                    <img
                      src={featured.src}
                      alt={featured.title}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />

                  <div className="absolute left-8 bottom-8 text-white">
                    <div className="text-xs uppercase tracking-wider text-neutral-300 mb-2">
                      Featured
                    </div>
                    <div className="text-2xl md:text-3xl font-semibold leading-tight">
                      {featured.title}
                    </div>
                    <div className="mt-2 text-sm text-neutral-300">
                      {featured.category} · {featured.meta?.views || "—"} views ·{" "}
                      {featured.meta?.duration || "—"}
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>

        {/* GRID — data-driven hybrid */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {rows.map((row, rIdx) => (
            <div key={`row-${rIdx}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {row.map((item, idx) => (
                <motion.div key={item.id} variants={fadeInUp} custom={rIdx * 3 + idx}>
                  <CreativeMediaItem item={item} index={rIdx * 3 + idx} onClick={onItemClick} />
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <section className="mt-12 bg-gradient-to-b from-transparent to-black/20 rounded-2xl p-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Creator Results</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg p-4 bg-neutral-900/40">
                <div className="text-3xl font-bold text-white">+2.1M</div>
                <div className="text-sm text-neutral-300 mt-1">Total Views (90 days)</div>
                <p className="text-neutral-300 mt-3">
                  "The team rebuilt our thumbnails and edits — our CTR jumped 42% in two weeks."
                </p>
                <div className="text-xs text-neutral-400 mt-2">— Hassan, Tech Creator</div>
              </div>

              <div className="rounded-lg p-4 bg-neutral-900/40">
                <div className="text-3xl font-bold text-white">+84%</div>
                <div className="text-sm text-neutral-300 mt-1">Avg Session Growth</div>
                <p className="text-neutral-300 mt-3">
                  "From 3 to 14 minute watch times — their narrative structure works."
                </p>
                <div className="text-xs text-neutral-400 mt-2">— Laila, Documentary Channel</div>
              </div>

              <div className="rounded-lg p-4 bg-neutral-900/40">
                <div className="text-3xl font-bold text-white">+120K</div>
                <div className="text-sm text-neutral-300 mt-1">New Subscribers</div>
                <p className="text-neutral-300 mt-3">
                  "Short-form promos drove rapid subscriber growth for our product launch."
                </p>
                <div className="text-xs text-neutral-400 mt-2">— Omar, Ecommerce Creator</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 rounded-2xl p-6 bg-neutral-900/30 flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">Ready to grow your channel?</div>
            <div className="text-sm text-neutral-300">We craft thumbnails, edits and strategy that win attention.</div>
          </div>
          <a href="#contact" className="px-4 py-2 rounded-md btn-primary">
            Let's Collaborate
          </a>
        </div>
      </div>
    </section>
  );
}

WorkShowcaseTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  samples: PropTypes.array,
  tags: PropTypes.array,
  featuredId: PropTypes.string,
  onItemClick: PropTypes.func,
};
