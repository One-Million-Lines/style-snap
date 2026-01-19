export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  trending?: boolean;
  tags?: string[];
}

export const portraitTemplates: Template[] = [
  {
    id: "linkedin-pro",
    title: "LinkedIn Corporate",
    category: "Professional",
    description: "Clean, professional headshot perfect for LinkedIn and business profiles.",
    trending: true,
  },
  {
    id: "studio-lighting",
    title: "Studio Lighting",
    category: "Professional",
    description: "Soft studio lighting that flatters any face shape.",
  },
  {
    id: "glamour-studio",
    title: "Glamour Studio",
    category: "Professional",
    description: "High-end beauty photography style with perfect lighting.",
  },
  {
    id: "realistic-glowup",
    title: "Realistic Glow-up",
    category: "Professional",
    description: "Subtle enhancements for a natural, polished look.",
    trending: true,
  },
  {
    id: "70s-retro",
    title: "70s Retro",
    category: "Retro",
    description: "Warm tones and vintage vibes from the disco era.",
  },
  {
    id: "90s-school",
    title: "90s School Photo",
    category: "Retro",
    description: "Classic school portrait with that nostalgic backdrop.",
    trending: true,
  },
  {
    id: "pixar-style",
    title: "Pixar Style",
    category: "Artistic",
    description: "Transform into a nice Pixar-style animated character.",
  },
  {
    id: "anime-portrait",
    title: "Anime Portrait",
    category: "Artistic",
    description: "Japanese anime-inspired character transformation.",
  },
];

export const viralTemplates: Template[] = [
  {
    id: "ai-yearbook",
    title: "AI Yearbook",
    category: "Viral",
    description: "The viral yearbook trend that took over social media.",
    trending: true,
  },
  {
    id: "baby-generator",
    title: "Baby Generator",
    category: "Viral",
    description: "See what your future baby might look like! (2 photos needed)",
  },
  {
    id: "cartoonified",
    title: "Cartoonified",
    category: "Fun",
    description: "Turn yourself into a cartoon character.",
  },
  {
    id: "meme-maker",
    title: "Meme Maker",
    category: "Fun",
    description: "Create shareable memes with customizable text.",
  },
  {
    id: "christmas-magic",
    title: "Christmas Magic",
    category: "Holiday",
    description: "Festive holiday transformations with snow and lights.",
  },
  {
    id: "halloween-spooky",
    title: "Halloween Spooky",
    category: "Holiday",
    description: "Spooky and scary Halloween transformations.",
  },
  {
    id: "valentines-glow",
    title: "Valentine's Glow",
    category: "Holiday",
    description: "Romantic pink and red themed portraits.",
  },
  {
    id: "movie-poster",
    title: "Movie Poster Star",
    category: "Viral",
    description: "See yourself as the star of a blockbuster movie.",
    trending: true,
  },
];

export const businessTemplates: Template[] = [
  {
    id: "product-cleanup",
    title: "Product Photo Cleanup",
    category: "Product",
    description: "Remove backgrounds and enhance product photos.",
  },
  {
    id: "background-removal",
    title: "Background Removal",
    category: "Product",
    description: "Clean, transparent background for any product.",
    trending: true,
  },
  {
    id: "lifestyle-scene",
    title: "Lifestyle Scene",
    category: "Product",
    description: "Place your product in beautiful lifestyle settings.",
  },
  {
    id: "fb-ad-creative",
    title: "Facebook Ad Creative",
    category: "Ads",
    description: "Optimized for Facebook and Instagram ad formats.",
  },
  {
    id: "ig-ad-creative",
    title: "Instagram Ad Creative",
    category: "Ads",
    description: "Eye-catching visuals for Instagram advertising.",
  },
  {
    id: "seasonal-promo",
    title: "Seasonal Promo Banner",
    category: "Marketing",
    description: "Promotional banners for seasonal campaigns.",
  },
  {
    id: "brand-style-pack",
    title: "Brand Style Pack",
    category: "Marketing",
    description: "Apply your brand colors to product photos.",
  },
];

export const trendingTemplates: Template[] = [
  ...portraitTemplates.filter((t) => t.trending),
  ...viralTemplates.filter((t) => t.trending),
  ...businessTemplates.filter((t) => t.trending),
];

export const allTemplates: Template[] = [
  ...portraitTemplates,
  ...viralTemplates,
  ...businessTemplates,
];

export const topTemplates = allTemplates.slice(0, 12);
