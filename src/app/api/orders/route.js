import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/products';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jwt';
import { calculateShipping, normalizeCheckoutPayload, normalizeShippingMethod, trimValue } from '@/lib/checkout';
import { limitByIp } from '@/lib/rateLimit';

async function restoreInventory(reservedItems) {
  for (const item of reservedItems) {
    await Product.updateOne(
      { _id: item.productId, 'sizes.size': item.size },
      { $inc: { 'sizes.$.stock': item.qty } }
    );
  }
}

export async function POST(req) {
  let reservedItems = [];

  try {
    const rate = limitByIp(req, 'orders:create', 12, 60 * 1000);
    if (rate.limited) {
      return NextResponse.json(
        { success: false, error: 'Too many order attempts. Please retry shortly.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rate.retryAfter),
            'X-RateLimit-Remaining': String(rate.remaining),
          },
        }
      );
    }

    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    let authedUser = null;
    if (token) {
      try {
        authedUser = verifyToken(token);
      } catch {
        authedUser = null;
      }
    }

    const body = await req.json();

    const normalizedBody = normalizeCheckoutPayload(body, authedUser);
    if (normalizedBody.error) {
      return NextResponse.json({ success: false, error: normalizedBody.error }, { status: 400 });
    }

    const { customer, items } = normalizedBody;
    const productIds = [...new Set(items.map((item) => item.productId))];
    const products = await Product.find({ _id: { $in: productIds } }, 'name price images sizes').lean();
    const productsById = new Map(products.map((product) => [String(product._id), product]));
    const normalizedItems = [];

    for (const rawItem of items) {
      const productId = String(rawItem.productId);
      const product = productsById.get(productId);
      const qty = rawItem.qty;
      const size = trimValue(rawItem.size);

      if (!product || !qty || !size) {
        return NextResponse.json({ success: false, error: 'Invalid cart item data' }, { status: 400 });
      }

      const sizeObj = product.sizes?.find((s) => s.size === size);
      const availableStock = sizeObj ? Number(sizeObj.stock || 0) : 0;

      if (availableStock < qty) {
        return NextResponse.json({ 
          success: false, 
          error: `Insufficient stock for ${product.name} (${size}). Available: ${availableStock}, Requested: ${qty}` 
        }, { status: 400 });
      }

      const productPrice = Number(product.price || 0);
      normalizedItems.push({
        productId,
        title: trimValue(product.name),
        image: trimValue(product.images?.[0]?.url),
        price: productPrice,
        qty,
        size,
      });
    }

    const subtotal = normalizedItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
    const shipping = calculateShipping(subtotal);
    const shippingMethod = normalizeShippingMethod(subtotal);
    const total = subtotal + shipping;

    for (const item of normalizedItems) {
      const reservedProduct = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          sizes: {
            $elemMatch: {
              size: item.size,
              stock: { $gte: item.qty },
            },
          },
        },
        { $inc: { 'sizes.$.stock': -item.qty } },
        { new: true }
      );

      if (!reservedProduct) {
        await restoreInventory(reservedItems);
        return NextResponse.json({
          success: false,
          error: `Insufficient stock for ${item.title} (${item.size})`,
        }, { status: 400 });
      }

      reservedItems.push(item);
    }

    const newOrder = await Order.create({
      userId: customer.userId,
      userEmail: customer.userEmail,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      address: customer.address,
      city: customer.city,
      postalCode: customer.postalCode,
      phone: customer.phone,
      country: customer.country,
      items: normalizedItems,
      subtotal,
      shipping,
      shippingMethod,
      paymentMethod: customer.paymentMethod,
      total,
      status: 'Processing'
    });

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    if (reservedItems.length > 0) {
      try {
        await restoreInventory(reservedItems);
      } catch (restoreError) {
        console.error('Inventory rollback failed:', restoreError);
      }
    }
    console.error('Order creation error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
