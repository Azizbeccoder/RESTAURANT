import dotenv from 'dotenv';
dotenv.config();

console.log("PORT:", process.env.PORT);

// ✅ Correct key name — use process.env.MONGODB_URL
console.log("MONGODB_URL:", process.env.MONGODB_URL);
