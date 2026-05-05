import db from '@/lib/db';
import Product from '@/models/products';
import CollectionClient from './CollectionClient';

export const revalidate = 120;

export default async function CollectionPage() {
  await db();
  const products = await Product.find(
    {},
    'name price category Gender images sizes createdAt'
  )
    .sort({ createdAt: -1 })
    .lean();
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <CollectionClient initialProducts={serializedProducts} />;
}