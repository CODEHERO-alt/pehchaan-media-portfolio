// src/pages/work/BrandIdentityWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "../../layouts/WorkCategoryLayout";
import useWorkFilter from "../../hooks/useWorkFilter";

const brandIdentitySamples = [
  { type: "image", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" },
  { type: "image", src: "https://images.unsplash.com/photo-1526498460520-4c246339dccb" },
  { type: "image", src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6" },
  { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" },
  { type: "image", src: "https://images.unsplash.com/photo-1581291518835-4c5e7e263b78" },
  { type: "image", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984" },
];

export default function BrandIdentityWorkPage() {
  const { filteredItems, typeFilter, setTypeFilter } = useWorkFilter(brandIdentitySamples);

  const category = {
    title: "Brand Visuals & Identity",
    description:
      "Logos, color systems, and visual language for brands that want to feel consistent across every touchpoint.",
    media: filteredItems,
  };

  const filterControls = (
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
        Brand Boards
      </button>
    </div>
  );

  return (
    <WorkCategoryLayout category={category} filterControls={filterControls}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filteredItems.map((item, idx) => (
          <MediaItem key={idx} item={item} />
        ))}
      </div>
    </WorkCategoryLayout>
  );
}

function MediaItem({ item }) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <div
        className="group w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_18px_40px_rgba(15,23,42,0.8)] cursor-pointer relative"
        onClick={() => setShowModal(true)}
      >
        <img
          src={item.src}
          loading="lazy"
          className="w-full h-full object-cover aspect-video"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
          <span className="inline-flex h-6 px-2 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white/80 backdrop-blur">
            Identity
          </span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 max-w-4xl shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white text-xl font-bold"
            >
              ✕
            </button>
            <img src={item.src} className="max-h-[80vh] w-auto rounded-lg" />
          </div>
        </div>
      )}
    </>
  );
}
