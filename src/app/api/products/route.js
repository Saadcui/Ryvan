import { NextResponse } from 'next/server';
import db from '@/lib/db';
import Product from '@/models/products';
import { adminOnly } from '@/middleware/admin';

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getSort(sortParam) {
  switch (sortParam) {
    case 'price_asc':
      return { price: 1, createdAt: -1 };
    case 'price_desc':
      return { price: -1, createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
}

function getProjection(fieldsParam) {
  switch (fieldsParam) {
    case 'card':
      return 'name price category Gender images sizes createdAt';
    case 'admin':
      return 'name description price category Gender images sizes createdAt';
    default:
      return '';
  }
}

export async function GET(req) {
  try {
    await db();

    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');
    const fieldsParam = searchParams.get('fields');
    const projection = getProjection(fieldsParam);

    let products;
    if (idsParam) {
      const ids = idsParam.split(',').filter(Boolean);
      products = await Product.find({ _id: { $in: ids } }, projection).lean();
    } else {
      const all = searchParams.get('all') === '1';
      const page = toPositiveInt(searchParams.get('page'), 1);
      const requestedLimit = toPositiveInt(searchParams.get('limit'), all ? 500 : 24);
      const limit = Math.min(requestedLimit, all ? 500 : 100);
      const skip = (page - 1) * limit;
      const category = searchParams.get('category');
      const gender = searchParams.get('gender');
      const sort = getSort(searchParams.get('sort'));

      const query = {};
      if (category && category !== 'ALL') query.category = category;
      if (gender && gender !== 'ALL') query.Gender = gender;

      const [rows, total] = await Promise.all([
        Product.find(query, projection).sort(sort).skip(skip).limit(limit).lean(),
        Product.countDocuments(query),
      ]);

      const response = NextResponse.json({
        success: true,
        data: rows,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.max(1, Math.ceil(total / limit)),
          hasMore: page * limit < total,
        },
      });

      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
      return response;
    }

    const response = NextResponse.json({ success: true, data: products });
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return response;
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

