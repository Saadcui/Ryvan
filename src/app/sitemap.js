import db from '@/lib/db';
import Product from '@/models/products';

export default async function sitemap() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const now = new Date();

  const staticUrls = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/collection`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  try {
    await db();
    const products = await Product.find({}, { _id: 1, updatedAt: 1, createdAt: 1 }).lean();

    const productUrls = (products || []).map(p => ({
      url: `${siteUrl}/product/${p._id}`,
      lastModified: p.updatedAt || p.createdAt || now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticUrls, ...productUrls];
  } catch {
    return staticUrls;
  }
}
