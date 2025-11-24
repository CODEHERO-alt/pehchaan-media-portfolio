// src/pages/work/MotionDesignWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "../../layouts/WorkCategoryLayout";
import useWorkFilter from "../../hooks/useWorkFilter";

const motionSamples = [
  { type: "video", src: "https://videos.pexels.com/video-files/7989692/7989692-uhd_2560_1440_25fps.mp4" },
  { type: "video", src: "https://videos.pexels.com/video-files/6898859/6898859-uhd_1440_2560_24fps.mp4" },
  { type: "video", src: "https://videos.pexels.com/video-files/6898857/6898857-uhd_1440_2560_24fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6" },
  { type: "image", src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97" },
];

export default function MotionDesignWorkPage() {
  const { filteredItems, typeFilter, setTypeFilter } = useWorkFilter(motionSamples);

  const category = {
    title: "Motion Design & Reels",
    description:
      "Snappy motion graphics, reels, and micro-animations designed to stop the scroll and build recall.",
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
        onClick={() => setTypeFilter("video")}
        className={`px-3 py-1 rounded-full border transition ${
          typeFilter === "video"
            ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
            : "border-white/10 text-white/70 hover:border-white/30"
        }`}
      >
        Reels
      </button>
      <button
        onClick={() => setTypeFilter("image")}
        className={`px-3 py-1 rounded-full border transition ${
          typeFilter === "image"
            ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
            : "border-white/10 text-white/70 hover:border-white/30"
        }`}
      >
        Storyboards
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
  const videoRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current && item.type === "video") {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && item.type === "video") {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
  };

  return (
    <>
      <div
        className="group w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_18px_40px_rgba(15,23,42,0.8)] cursor-pointer relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => item.type === "image" && setShowModal(true)}
      >
        {item.type === "video" ? (
          <video
            ref={videoRef}
            src={item.src}
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover aspect-video"
          />
        ) : (
          <img
            src={item.src}
            loading="lazy"
            className="w-full h-full object-cover aspect-video"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
          <span className="inline-flex h-6 px-2 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white/80 backdrop-blur">
            {item.type === "video" ? "Motion Reel" : "Frame"}
          </span>
        </div>
      </div>

      {showModal && item.type === "image" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 max-w-3xl shadow-2xl relative">
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
