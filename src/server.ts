import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js"; // ✅ FIXED

const PORT = process.env.PORT ? Number(process.env.PORT) : 3003;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("❌ MONGO_URL is not defined in .env file");
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });