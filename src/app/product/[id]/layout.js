import mongoose from 'mongoose';
import db from '@/lib/db';
import Product from '@/models/products';

function truncate(text, maxLen) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen - 1).trimEnd() + '…';
}

function productMetaDescription(product) {
  const base = product?.description ? truncate(product.description, 120) : '';
  const tail = `Shop ${product?.category || 'premium'} styles in Pakistan and worldwide from Accelerate.`;
  if (!base) return tail;
  return truncate(`${base} ${tail}`, 160);
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      title: 'Product',
      robots: { index: false, follow: false },
    };
  }

  try {
    await db();
    const product = await Product.findById(id).lean();

    if (!product) {
      return {
        title: 'Product Not Found',
        robots: { index: false, follow: false },
        alternates: { canonical: `/product/${id}` },
      };
    }

    const title = truncate(`${product.name} in Pakistan`, 55);
    const description = productMetaDescription(product);
    const imageUrls = Array.isArray(product.images)
      ? product.images.map(i => i?.url).filter(Boolean)
      : [];

    return {
      title,
      description,
      keywords: [
        product.name,
        product.category,
        product.Gender,
        'Pakistan',
        'online shopping',
        'streetwear',
        'clothing',
        'footwear',
      ].filter(Boolean),
      alternates: {
        canonical: `/product/${product._id}`,
      },
      openGraph: {
        type: 'website',
        title,
        description,
        url: `/product/${product._id}`,
        images: imageUrls,
      },
      twitter: {
        card: imageUrls.length ? 'summary_large_image' : 'summary',
        title,
        description,
        images: imageUrls.length ? [imageUrls[0]] : undefined,
      },
    };
  } catch {
    return {
      title: 'Product',
      robots: { index: false, follow: false },
      alternates: { canonical: `/product/${id}` },
    };
  }
}

export default function ProductLayout({ children }) {
  return <>{children}</>;
}
