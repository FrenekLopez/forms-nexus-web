import { MetadataRoute } from 'next';

// METADATA ROUTE: SITEMAP GENERATION
// Search engine mapping file providing explicit crawl directions for indexing
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://freneklopez.dev',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
