import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = configured && /^https?:\/\//.test(configured) ? configured.replace(/\/$/, '') : 'http://localhost:3000';
  return [{ url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
