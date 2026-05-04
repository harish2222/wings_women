import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wingswomencentre.vercel.app';
  
  const staticPages = [
    { url: '/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: '/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/services', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: '/doctors', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: '/contact', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ];
  
  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}