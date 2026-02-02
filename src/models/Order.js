import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [{
    productId: String,
    title: String,
    image: String,
    price: Number,
    qty: Number,
    size: String,
  }],
  subtotal: Number,
  shipping: Number,
  total: Number,
  status: { type: String, default: 'Processing' }, // Processing, In Transit, Delivered
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);