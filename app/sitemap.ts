import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://saffafashion.shop';
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
