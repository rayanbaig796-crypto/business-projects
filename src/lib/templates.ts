export type Template = {
  id: string;
  title: string;
  category: string;
  premium: boolean;
  animated: boolean;
  palette: { bg: string; ink: string; accent: string };
  motif: "mandala" | "floral" | "minimal" | "south" | "cinematic" | "night";
};

export const CATEGORIES = [
  "All",
  "Royal Heritage",
  "Floral Elegance",
  "Modern Minimal",
  "South Indian Traditions",
  "Cinematic Wedding",
  "Luxury Night Themes",
] as const;

export const TEMPLATES: Template[] = [
  { id: "royal-maroon",   title: "Royal Maroon",    category: "Royal Heritage",          premium: true,  animated: true,  motif: "mandala",   palette: { bg: "#2a0a14", ink: "#f6e5b4", accent: "#d4af37" } },
  { id: "ivory-gold",     title: "Ivory & Gold",    category: "Royal Heritage",          premium: false, animated: false, motif: "mandala",   palette: { bg: "#1c1408", ink: "#f6e5b4", accent: "#d4af37" } },
  { id: "rose-bloom",     title: "Rose Bloom",      category: "Floral Elegance",         premium: true,  animated: true,  motif: "floral",    palette: { bg: "#2a1320", ink: "#fde6ee", accent: "#e8a3b8" } },
  { id: "jasmine-vine",   title: "Jasmine Vine",    category: "Floral Elegance",         premium: false, animated: true,  motif: "floral",    palette: { bg: "#0f1a14", ink: "#eef7ee", accent: "#bfe3c6" } },
  { id: "muji-noir",      title: "Muji Noir",       category: "Modern Minimal",          premium: false, animated: false, motif: "minimal",   palette: { bg: "#0e0e10", ink: "#f4f4f5", accent: "#d4af37" } },
  { id: "linen-script",   title: "Linen Script",    category: "Modern Minimal",          premium: true,  animated: true,  motif: "minimal",   palette: { bg: "#1a1815", ink: "#f4ecd8", accent: "#c9a96a" } },
  { id: "kanchi-silk",    title: "Kanchi Silk",     category: "South Indian Traditions", premium: true,  animated: true,  motif: "south",     palette: { bg: "#2d0a0a", ink: "#fde9b8", accent: "#e7b94a" } },
  { id: "temple-bell",    title: "Temple Bell",     category: "South Indian Traditions", premium: false, animated: false, motif: "south",     palette: { bg: "#1a0d05", ink: "#f6dcae", accent: "#d68a3c" } },
  { id: "cine-reel",      title: "Cine Reel",       category: "Cinematic Wedding",       premium: true,  animated: true,  motif: "cinematic", palette: { bg: "#0a0a16", ink: "#fff6d6", accent: "#f2c14e" } },
  { id: "moonlit-vows",   title: "Moonlit Vows",    category: "Cinematic Wedding",       premium: true,  animated: true,  motif: "cinematic", palette: { bg: "#0a1424", ink: "#e8eeff", accent: "#9bb6ff" } },
  { id: "midnight-pearl", title: "Midnight Pearl",  category: "Luxury Night Themes",     premium: true,  animated: true,  motif: "night",     palette: { bg: "#08070d", ink: "#f1eadf", accent: "#d4af37" } },
  { id: "starlit-onyx",   title: "Starlit Onyx",    category: "Luxury Night Themes",     premium: false, animated: true,  motif: "night",     palette: { bg: "#070710", ink: "#eaeaf2", accent: "#c0a0ff" } },
];

export const getTemplate = (id?: string | null) =>
  TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
