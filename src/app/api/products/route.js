import { NextResponse } from 'next/server';
import db from '@/lib/db';
import Product from '@/models/products';

export async function GET() {
  try {
    await db();
    const products = await Product.find({});
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.message || 'Failed to load products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await db();
    const data = await request.json();
    // Normalize sizes: accept array of strings or objects, convert to {size, stock}
    if (data.sizes && Array.isArray(data.sizes)) {
      const globalStock = Number(data.stock) || 0;
      data.sizes = data.sizes.map(s => {
        if (typeof s === 'string') return { size: s, stock: globalStock };
        // if object, ensure keys present and cast stock to Number
        return { size: s.size || String(s), stock: Number(s.stock || globalStock) };
      });
    }
    // remove legacy global stock to match schema
    delete data.stock;
    const newProduct = new Product(data);
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

