// src/pages/work/YouTubeWorkPage.jsx
import React from "react";
import WorkCategoryLayout from "../../layouts/WorkCategoryLayout";
import useWorkFilter from "../../hooks/useWorkFilter";

const youtubeSamples = [
  { type: "video", src: "https://videos.pexels.com/video-files/854128/854128-hd_1920_1080_30fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1520975698519-59cde0b30a52" },
  { type: "video", src: "https://videos.pexels.com/video-files/3130141/3130141-hd_1920_1080_24fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1503602642458-232111445657" },
  { type: "video", src: "https://videos.pexels.com/video-files/856300/856300-hd_1920_1080_30fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1484552338649-5bf19187add2" },
  { type: "video", src: "https://videos.pexels.com/video-files/5993626/5993626-hd_1920_1080_30fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2" },
  { type: "video", src: "https://videos.pexels.com/video-files/856368/856368-hd_1920_1080_30fps.mp4" },
  { type: "image", src: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34" },
];

export default function YouTubeWorkPage() {
  const { filteredItems, typeFilter, setTypeFilter } = useWorkFilter(youtubeSamples);

  const category = {
    title: "YouTube Production",
    description:
      "Long-form content, storytelling edits, and channel visuals crafted for retention and watch time.",
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
        Thumbnails
      </button>
      <button
        onClick={() => setTypeFilter("video")}
        className={`px-3 py-1 rounded-full border transition ${
          typeFilter === "video"
            ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
            : "border-white/10 text-white/70 hover:border-white/30"
        }`}
      >
        Edits
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
      // lighter hover: just unmute + play from current frame
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
        {/* Media */}
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

        {/* Overlay / label for theme consistency */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]">
          <span className="inline-flex h-6 px-2 items-center justify-center rounded-full bg-black/60 border border-white/15 text-white/80 backdrop-blur">
            {item.type === "video" ? "YouTube Edit" : "Thumbnail Visual"}
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
            <img
              src={item.src}
              className="max-h-[80vh] w-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
