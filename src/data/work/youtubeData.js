// src/data/work/youtubeData.js
// Rewritten YouTube dataset — mixed sizes, weight controls, meta for overlays.
// Images hosted externally (Unsplash used here as placeholders).
// Replace src values with your imgbb / archive URLs as needed.

export const youtubeItems = [
  // Featured (full-width) — weight: 3
  {
    id: "yt-01",
    type: "video",
    src: "https://videos.pexels.com/video-files/854128/854128-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1581091012184-5c6f3a8d08da?w=1600&auto=format&fit=crop&q=70",
    title: "Cinematic Channel Reel",
    category: "Feature",
    weight: 3,
    meta: { duration: "1:12", views: "1.2M" },
  },

  // Two-up row (weight 2)
  {
    id: "yt-02",
    type: "image",
    src: "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&auto=format&fit=crop&q=70",
    title: "Tech Breakdown — Thumbnail",
    category: "Thumbnails",
    weight: 2,
    meta: { duration: null, views: "420k" },
  },
  {
    id: "yt-03",
    type: "video",
    src: "https://videos.pexels.com/video-files/3130141/3130141-hd_1920_1080_24fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1200&auto=format&fit=crop&q=70",
    title: "Product Review — Fast Cuts",
    category: "Edits",
    weight: 2,
    meta: { duration: "0:42", views: "210k" },
  },

  // Three-up row (small tiles)
  {
    id: "yt-04",
    type: "image",
    src: "https://images.unsplash.com/photo-1520975698519-59cde0b30a52?w=900&auto=format&fit=crop&q=70",
    title: "Fitness Motivation Cover",
    category: "Thumbnails",
    weight: 1,
    meta: { duration: null, views: "85k" },
  },
  {
    id: "yt-05",
    type: "image",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&auto=format&fit=crop&q=70",
    title: "Lifestyle Vlog Thumbnail",
    category: "Thumbnails",
    weight: 1,
    meta: { duration: null, views: "52k" },
  },
  {
    id: "yt-06",
    type: "video",
    src: "https://videos.pexels.com/video-files/856368/856368-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&auto=format&fit=crop&q=70",
    title: "Fashion B-Roll Sequence",
    category: "Edits",
    weight: 1,
    meta: { duration: "0:36", views: "32k" },
  },

  // Large + two tall (mosaic)
  {
    id: "yt-07",
    type: "image",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&auto=format&fit=crop&q=70",
    title: "Documentary Episode Cover",
    category: "Thumbnails",
    weight: 2,
    meta: { duration: null, views: "240k" },
  },
  {
    id: "yt-08",
    type: "video",
    src: "https://videos.pexels.com/video-files/5993626/5993626-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1505740106531-4243f3831d9d?w=900&auto=format&fit=crop&q=70",
    title: "Workout Channel Edit",
    category: "Edits",
    weight: 1,
    meta: { duration: "0:28", views: "18k" },
  },
  {
    id: "yt-09",
    type: "image",
    src: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=900&auto=format&fit=crop&q=70",
    title: "Storytelling Podcast Cover",
    category: "Thumbnails",
    weight: 1,
    meta: { duration: null, views: "44k" },
  },

  // More items for scrolling & depth
  {
    id: "yt-10",
    type: "image",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1000&auto=format&fit=crop&q=70",
    title: "Short-form Promo Edit",
    category: "Edits",
    weight: 1,
    meta: { duration: "0:22", views: "11k" },
  },
  {
    id: "yt-11",
    type: "image",
    src: "https://images.unsplash.com/photo-1514474959185-0c0f85b46b6e?w=1000&auto=format&fit=crop&q=70",
    title: "Thumbnail Variant — Tech",
    category: "Thumbnails",
    weight: 1,
    meta: { duration: null, views: "9.6k" },
  },
  {
    id: "yt-12",
    type: "video",
    src: "https://videos.pexels.com/video-files/856300/856300-hd_1920_1080_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1000&auto=format&fit=crop&q=70",
    title: "Tutorial Edit — Fast Cuts",
    category: "Edits",
    weight: 1,
    meta: { duration: "0:54", views: "72k" },
  },
  {
    id: "yt-13",
    type: "image",
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1000&auto=format&fit=crop&q=70",
    title: "Lifestyle — Cover",
    category: "Thumbnails",
    weight: 1,
    meta: { duration: null, views: "28k" },
  },
  {
    id: "yt-14",
    type: "image",
    src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1000&auto=format&fit=crop&q=70",
    title: "B-Roll Montage",
    category: "Edits",
    weight: 1,
    meta: { duration: null, views: "4.8k" },
  },
  {
    id: "yt-15",
    type: "image",
    src: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=1200&auto=format&fit=crop&q=70",
    title: "Creator Portrait — Thumbnail Set",
    category: "Thumbnails",
    weight: 1,
    meta: { duration: null, views: "3.1k" },
  },
];

export default youtubeItems;
