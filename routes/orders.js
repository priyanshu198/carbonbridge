const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// ── Order Schema ──
const orderSchema = new mongoose.Schema(
  {
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    creditId:  { type: Number, required: true },
    creditName:{ type: String },
    registry:  { type: String },
    qty:       { type: Number, required: true },
    priceEach: { type: Number, required: true },
    total:     { type: Number, required: true },
    certId:    { type: String },
    retired:   { type: Boolean, default: false },
    retiredAt: { type: Date },
    icon:      { type: String },
    color:     { type: String },
    type:      { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

// Auth middleware
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

const genCertId = () => "CB-" + Math.random().toString(36).substring(2, 8).toUpperCase();

// POST /api/orders  — create new order (purchase)
router.post("/", auth, async (req, res) => {
  try {
    const { creditId, creditName, registry, qty, priceEach, icon, color, type } = req.body;
    if (!creditId || !qty || !priceEach)
      return res.status(400).json({ error: "creditId, qty, priceEach required" });

    const total = qty * priceEach * 1.02; // 2% platform fee
    const order = await Order.create({
      userId: req.user.id,
      creditId, creditName, registry,
      qty, priceEach, total,
      certId: genCertId(),
      icon, color, type,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/my — get logged-in user's orders
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/orders/:id/retire — retire a credit
router.patch("/:id/retire", auth, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.retired) return res.status(400).json({ error: "Already retired" });
    order.retired = true;
    order.retiredAt = new Date();
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
