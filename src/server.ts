import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

mongoose.connect(process.env.MONGO_URL as string)
.then(() => {
    console.log("✅ MongoDB connection succeed");

    const PORT = process.env.PORT ?? 3003;

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`Admin: http://localhost:${PORT}/admin`);
    });
})
.catch((err) => {
    console.error("❌ ERROR on MongoDB connection", err);
});