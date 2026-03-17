import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./router.js"; // ✅ MUST have .js

// ✅ ESM fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1-ENTRANCE
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2-SESSIONS (optional)

// 3-VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4-ROUTERS
app.use("/", router);

export default app;