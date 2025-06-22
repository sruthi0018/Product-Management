const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  ram: String,
  price: Number,
  qty: Number,
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  description: String,
image: [{ type: String }],
  variants: [variantSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
