export const imageConfig = {
  domains: ["aaronsolar.com"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ["image/avif", "image/webp"],
  minimumCacheTTL: 60,
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
} as const;

export const imageSizes = {
  thumbnail: {
    width: 384,
    height: 216,
  },
  blogCard: {
    width: 750,
    height: 422,
  },
  hero: {
    width: 1920,
    height: 1080,
  },
} as const;
