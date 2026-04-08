import db from '@/lib/db';
import Product from '@/models/products';
import { NextResponse } from "next/server";
import { adminOnly } from '@/middleware/admin';

export async function GET(request, { params }) {
try{
    await db();
    const resolvedParams = await params; 
        const id = resolvedParams.id;
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
    const admin = adminOnly(request);
    if (admin && typeof admin.status === 'number') return admin;

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
    const admin = adminOnly(request);
    if (admin && typeof admin.status === 'number') return admin;

    await db();
    const { id } = params;
    const data = await request.json();
    const normalizedData = { ...data };
    if (normalizedData.sizes && Array.isArray(normalizedData.sizes)) {
      const globalStock = Number(normalizedData.stock) || 0;
      normalizedData.sizes = normalizedData.sizes.map((sizeEntry) => {
        if (typeof sizeEntry === 'string') {
          return { size: sizeEntry.trim(), stock: globalStock };
        }

        return { size: String(sizeEntry.size || sizeEntry).trim(), stock: Number(sizeEntry.stock ?? globalStock) };
      });
    }
    delete normalizedData.stock;
    const updatedProduct = await Product.findByIdAndUpdate(id, normalizedData, { new: true, runValidators: true });
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product: updatedProduct }, { status: 200 });
    } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}