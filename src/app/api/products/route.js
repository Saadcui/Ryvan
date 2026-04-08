import { NextResponse } from 'next/server';
import db from '@/lib/db';
import Product from '@/models/products';
import { adminOnly } from '@/middleware/admin';

export async function GET(req) {
  try {
    await db();
    
    // Support filtering by IDs: /api/products?ids=id1,id2,id3
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');
    
    let products;
    if (idsParam) {
      const ids = idsParam.split(',').filter(Boolean);
      products = await Product.find({ _id: { $in: ids } });
    } else {
      products = await Product.find({});
    }
    
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.message || 'Failed to load products' }, { status: 500 });
  }
}

function normalizeProductPayload(data) {
  const payload = { ...data };

  if (payload.sizes && Array.isArray(payload.sizes)) {
    const globalStock = Number(payload.stock) || 0;
    payload.sizes = payload.sizes.map((sizeEntry) => {
      if (typeof sizeEntry === 'string') {
        return { size: sizeEntry.trim(), stock: globalStock };
      }

      return {
        size: String(sizeEntry.size || sizeEntry).trim(),
        stock: Number(sizeEntry.stock ?? globalStock),
      };
    });
  }

  delete payload.stock;
  return payload;
}

export async function POST(request) {
  try {
    const admin = adminOnly(request);
    if (admin && typeof admin.status === 'number') return admin;

    await db();
    const data = await request.json();
    const newProduct = new Product(normalizeProductPayload(data));
    await newProduct.save();
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    const isValidation = error?.name === 'ValidationError';
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create product' },
      { status: isValidation ? 400 : 500 }
    );
  }
}

