const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

// GET /api/wallet/stats — summary stats
router.get("/stats", auth, async (req, res) => {
  try {
    const Order = mongoose.model("Order");
    const orders = await Order.find({ userId: req.user.id });
    const totalCredits = orders.filter(o => !o.retired).reduce((a, b) => a + b.qty, 0);
    const totalOffset  = orders.filter(o => o.retired).reduce((a, b) => a + b.qty, 0);
    const totalSpent   = orders.reduce((a, b) => a + b.total, 0);
    res.json({ totalCredits, totalOffset, totalSpent, totalOrders: orders.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
