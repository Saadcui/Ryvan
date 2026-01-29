import db from '@/lib/db';
import Product from '@/models/products';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
try{
    await db();
    const { id } = params;
    const product = await Product.findById(id);
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });

}
catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }

}

export async function DELETE(request, { params }) {
  try {
    await db();
    const { id } = params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
    }

export async function PUT(request, { params }) {
  try {
    await db();
    const { id } = params;
    const data = await request.json();
    // Normalize sizes same as POST: support strings or objects
    if (data.sizes && Array.isArray(data.sizes)) {
      const globalStock = Number(data.stock) || 0;
      data.sizes = data.sizes.map(s => {
        if (typeof s === 'string') return { size: s, stock: globalStock };
        return { size: s.size || String(s), stock: Number(s.stock || globalStock) };
      });
    }
    delete data.stock;
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product: updatedProduct }, { status: 200 });
    } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}