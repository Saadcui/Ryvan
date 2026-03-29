import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/products';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';

export async function POST(req) {
  try {
    await dbConnect();

    // Server-side auth check: trust cookie, NOT client-sent userId
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    let authedUser = null;
    if (token) {
      try { authedUser = verifyToken(token); } catch { authedUser = null; }
    }

    const body = await req.json();
    const {
      email, firstName, lastName, address,
      city, postalCode, phone, country, items,
      subtotal, shipping, shippingMethod, paymentMethod, total
    } = body;

    if (!email || !firstName || !lastName || !address || !items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Simple rule: if logged in → attach userId; if guest → userId stays null
    const resolvedUserId = authedUser?.id ? String(authedUser.id) : null;

    const newOrder = await Order.create({
      userId: resolvedUserId,
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phone,
      country: country || 'Pakistan',
      items,
      subtotal,
      shipping,
      shippingMethod,
      paymentMethod,
      total,
      status: 'Processing'
    });

    // Inventory Management: Subtract stock for each ordered item
    for (const item of items) {
      if (item.productId) {
        await Product.updateOne(
          { _id: item.productId, "sizes.size": item.size },
          { $inc: { "sizes.$.stock": -item.qty } }
        );
      }
    }

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
