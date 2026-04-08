import db from '@/lib/db';
import Product from '@/models/products';
import CollectionClient from './CollectionClient';

export default async function CollectionPage() {
  await db();
  const products = await Product.find({}).lean();
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <CollectionClient initialProducts={serializedProducts} />;
}