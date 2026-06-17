const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMethod: { type: String, enum: ['cod'], default: 'cod' },
  status: { type: String, enum: ['pending', 'confirmed', 'delivered'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
