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
    slug: "ad-creatives",
    title: "Ad Creatives",
    description: "High-conversion ad creatives — motion, stills, and experimental cuts.",
    hero: "https://i.ibb.co/SXYRVGbv/Category-1-Vector-thumbnail.png",
    media: buildMedia("ad-creatives"),
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Campaign creative, social-first assets, and conversion-focused media.",
    hero: "https://i.ibb.co/Q731kq0S/Category-2-illustration-thumbnail.png",
    media: buildMedia("digital-marketing"),
  },
  {
    slug: "graphics",
    title: "Graphics",
    description: "Branding, illustration, and editorial graphics.",
    hero: "https://i.ibb.co/CKpK2SWq/Category-3-Vector-Thumbnail.jpg",
    media: buildMedia("graphics"),
  },
  {
    slug: "motion-design",
    title: "Motion Design",
    description: "Animation and motion identity work for digital screens.",
    hero: "https://i.ibb.co/207P9xYT/Chat-GPT-Image-Nov-23-2025-08-09-24-PM.png",
    media: buildMedia("motion-design"),
  },
  {
    slug: "product-photography",
    title: "Product Photography",
    description: "Studio and lifestyle product photography.",
    hero: "https://i.ibb.co/PzYf8fW9/category-5-illustration-thumbnail.png",
    media: buildMedia("product-photography"),
  },
  {
    slug: "product-videography",
    title: "Product Videography",
    description: "Cinematic product videos and in-use demos.",
    hero: "https://i.ibb.co/5xKcCM5D/Category-6-illustration-thumbnail.png",
    media: buildMedia("product-videography"),
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description: "Content packages, reels, and social-first stories.",
    hero: "https://i.ibb.co/HLWwX5Jy/Gemini-Generated-Image-98czpj98czpj98cz-b022956f-f5f4-4986-8510-e40352892c29.jpg",
    media: buildMedia("social-media-management"),
  },
  {
    slug: "web-redesign",
    title: "Web Redesign",
    description: "Web visuals, hero treatments, and interface micro-interactions.",
    hero: "https://i.ibb.co/skxJTZS/Chat-GPT-Image-Nov-23-2025-08-09-20-PM.png",
    media: buildMedia("web-redesign"),
  },
  {
    slug: "youtube",
    title: "YouTube",
    description: "Long-form and short-form video samples for branded channels.",
    hero: "https://i.ibb.co/sJ31cNPt/Chat-GPT-Image-Nov-23-2025-08-09-12-PM.png",
    media: buildMedia("youtube"),
  },
];

export default WORK_CATEGORIES;
