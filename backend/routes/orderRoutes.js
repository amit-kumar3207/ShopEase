const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// Create New Order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order Saved Successfully!",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Order Save Failed",
      error: error.message,
    });
  }
});

// Update Order Status
router.patch("/:orderId", async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status: req.body.status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order Not Found!",
      });
    }

    res.status(200).json({
      message: "Order Status Updated Successfully!",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Status Update Failed",
      error: error.message,
    });
  }
});

// Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Orders Fetch Failed",
      error: error.message,
    });
  }
});

module.exports = router;
