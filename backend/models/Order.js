const mongoose = require("mongoose");

// Food Item Schema
const itemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  image: String,
  quantity: Number,
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },

  items: [itemSchema],

  totalItems: Number,

  subtotal: Number,

  deliveryFee: Number,

  grandTotal: Number,

  orderDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["Pending", "Preparing", "Delivered"],
    default: "Pending",
  },
});

// Create Order Model
const Order = mongoose.model("Order", orderSchema);

// Export Model
module.exports = Order;
