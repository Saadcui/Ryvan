import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/products';
import { verifyToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

// --- Helper: Restore stock for all items in an order ---
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

    // Restore inventory before deleting
    await restoreInventory(order);

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

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    
    const user = verifyToken(token);
    if (!user || user.role !== 'admin') return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });

    await dbConnect();
    const order = await Order.findById(id);

    if (!order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

    // If cancelling, restore inventory (only if not already cancelled)
    if (status === 'Cancelled' && order.status !== 'Cancelled') {
      await restoreInventory(order);
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
