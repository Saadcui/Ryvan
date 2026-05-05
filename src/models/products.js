import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please enter product description"]
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    default: 0.0
  },
  category: {
    type: String,
    required: [true, "Please select category"],
    enum: {
      values: ['Topwear', 'Bottomwear', 'Footwear', 'Outerwear', 'Accessories'],
      message: "Please select correct category"
    }
  },
  // CHANGED: We removed the global stock field and replaced it with this:
  sizes: [
    {
      size: { type: String, required: true },
      stock: { type: Number, required: true, default: 0 }
    }
  ],
  images: [
    {
      url: { type: String, required: true }
    }
  ],
  Gender: {
    type: String,
    required: [true, "Please select Gender"],
    enum: {
      values: ['MEN', 'WOMEN', 'UNISEX'], // Added UNISEX to match the UI
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ Gender: 1, createdAt: -1 });
productSchema.index({ category: 1, Gender: 1, createdAt: -1 });

export default mongoose.models.Product || mongoose.model('Product', productSchema);