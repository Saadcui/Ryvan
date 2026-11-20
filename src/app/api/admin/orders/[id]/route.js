import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/products';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

// --- Helpers for returning and reserving stock for an order ---
async function restoreInventory(order) {
  for (const item of order.items) {
    if (item.productId) {
      await Product.updateOne(
        { _id: item.productId, "sizes.size": item.size },
        { $inc: { "sizes.$.stock": item.qty } }
      );
    }
  }
}

async function reserveInventory(order) {
  const reservedItems = [];

  for (const item of order.items) {
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
      await restoreInventory({ items: reservedItems });
      return false;
    }

    reservedItems.push(item);
  }

  return true;
}

// --- ADMIN: Delete an order and restore its stock ---
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    
    const user = verifyToken(token);
    if (!user || user.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });

    await dbConnect();
    const order = await Order.findById(id);

    if (!order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

    // Restore only if this order has not already returned its inventory.
    if (order.status !== 'Cancelled') {
      await restoreInventory(order);
    }

    await Order.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Order cleared and inventory restored.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// --- ADMIN: Update order status, restore stock if Cancelled ---
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;
    const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid order status' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    
    const user = verifyToken(token);
    if (!user || user.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });

    await dbConnect();
    const order = await Order.findById(id);

    if (!order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

    const wasCancelled = order.status === 'Cancelled';
    const isBeingCancelled = status === 'Cancelled' && !wasCancelled;
    const isBeingReopened = status !== 'Cancelled' && wasCancelled;

    // Return stock once when an active order is cancelled.
    if (isBeingCancelled) {
      await restoreInventory(order);
    }

    // Reserve stock again when a cancelled order is moved back to an active status.
    if (isBeingReopened && !(await reserveInventory(order))) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock to reopen this order.' },
        { status: 400 }
      );
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
