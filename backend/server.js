require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const creditsRoutes = require("./routes/credits");
const ordersRoutes = require("./routes/orders");
const walletRoutes = require("./routes/wallet");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/credits", creditsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/wallet", walletRoutes);

app.get("/", (req, res) => res.json({ status: "CarbonBridge API running ✅" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
