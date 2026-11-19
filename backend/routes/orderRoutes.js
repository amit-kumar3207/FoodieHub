const express = require("express");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  trackOrder,
} = require("../controllers/orderController");
const router = express.Router();

// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getOrders);

// Track Order By Order ID
router.get("/track/:orderId", trackOrder);

// Update Order Status
router.patch("/:orderId", updateOrderStatus);

module.exports = router;
