import mongoose from 'mongoose';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import Product from '@/models/products';
import ProductClient from './ProductClient';

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id || !mongoose.isValidObjectId(id)) {
    notFound();
  }

  await db();
  const product = await Product.findById(id).lean();

  if (!product) {
    notFound();
  }

  const serializedProduct = JSON.parse(JSON.stringify(product));
  return <ProductClient product={serializedProduct} />;
}