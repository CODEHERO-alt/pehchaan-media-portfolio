// src/data/workData.js
// Central data source for all 9 categories. Each category has 15 media items.
// Replace placeholder URLs with your real CDN/hosted assets.
// NOTE: keep slugs consistent with route paths like /work/<slug>

const VIDEO_PLACEHOLDER = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const IMAGE_PLACEHOLDER = "https://via.placeholder.com/1600x1000?text=";

const buildMedia = (categorySlug, count = 15) =>
  Array.from({ length: count }).map((_, i) => {
    // sample pattern: every 3rd item is video to show both types
    const isVideo = i % 3 === 0;
    return {
      id: `${categorySlug}-${(i + 1).toString().padStart(2, "0")}`,
      title: `${categorySlug.replace(/-/g, " ")} sample ${(i + 1)}`,
      // set real src values here
      src: isVideo
        ? VIDEO_PLACEHOLDER
        : `${IMAGE_PLACEHOLDER}${encodeURIComponent(`${categorySlug} ${i + 1}`)}`,
      // optional poster (for videos)
      poster: !isVideo ? null : `${IMAGE_PLACEHOLDER}${encodeURIComponent(`${categorySlug} poster ${i + 1}`)}`,
      // allow explicit type but auto-detection utilities will work if omitted
      type: isVideo ? "video" : "image",
      tags: isVideo ? ["reel"] : ["image"],
      alt: `${categorySlug} sample ${(i + 1)}`,
    };
  });

export const WORK_CATEGORIES = [
  {
    
export const youtubeItems = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1581091012184-5c6f3a8d08da?w=600&auto=format&fit=crop&q=70",
    title: "Tech Breakdown Thumbnail",
    category: "Thumbnails",
  },
  {
    id: 2,
    type: "video",
    src: "https://videos.pexels.com/video-files/854128/854128-hd_1920_1080_30fps.mp4",
    title: "Cinematic Travel Edit",
    category: "Edits",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600&auto=format&fit=crop&q=70",
    title: "Fitness Motivation Cover",
    category: "Thumbnails",
  },
  {
    id: 4,
    type: "video",
    src: "https://videos.pexels.com/video-files/3130141/3130141-hd_1920_1080_24fps.mp4",
    title: "Product Review — Fast Cuts",
    category: "Edits",
  },
  {
    id: 5,
    type: "image",
    src: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&auto=format&fit=crop&q=70",
    title: "Lifestyle Vlog Thumbnail",
    category: "Thumbnails",
  },
  {
    id: 6,
    type: "video",
    src: "https://videos.pexels.com/video-files/856368/856368-hd_1920_1080_30fps.mp4",
    title: "Fashion B-Roll Sequence",
    category: "Edits",
  },
  {
    id: 7,
    type: "image",
    src: "https://images.unsplash.com/photo-1520975698519-59cde0b30a52?w=600&auto=format&fit=crop&q=70",
    title: "Storytelling Podcast Thumbnail",
    category: "Thumbnails",
  },
  {
    id: 8,
    type: "video",
    src: "https://videos.pexels.com/video-files/5993626/5993626-hd_1920_1080_30fps.mp4",
    title: "Workout Channel Edit",
    category: "Edits",
  },
  {
    id: 9,
    type: "image",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=70",
    title: "Documentary Episode Cover",
    category: "Thumbnails",
  },
  {
    id: 10,
    type: "video",
    src: "https://videos.pexels.com/video-files/856300/856300-hd_1920_1080_30fps.mp4",
    title: "Short-form Promo Edit",
    category: "Edits",
  },
];

export default WORK_CATEGORIES;
