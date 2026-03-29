import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  // --- Ownership ---
  // Present if the order was placed by a logged-in user. Null for guests.
  userId: { type: String, default: null },

  // --- Customer & Delivery Details ---
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String },
  phone: { type: String, required: true },
  country: { type: String, default: 'Pakistan' },

  // --- Cargo ---
  items: [{
    productId: String,
    title: String,
    image: String,
    price: Number,
    qty: Number,
    size: String,
  }],

  // --- Financials ---
  subtotal: Number,
  shipping: Number,
  total: Number,

  // --- Logistics ---
  shippingMethod: { type: String, default: 'Flat' },
  paymentMethod: { type: String, default: 'COD' },
  status: { type: String, default: 'Processing' }, // Processing, Shipped, Delivered, Cancelled

  createdAt: { type: Date, default: Date.now },
});

// Force re-register: clear cache so schema changes take effect without full server restart
if (mongoose.models.Order) delete mongoose.models.Order;
export default mongoose.model('Order', OrderSchema);