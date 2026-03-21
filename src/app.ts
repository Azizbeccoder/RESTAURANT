import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";
import { extractToken, verifyToken } from "./libs/utils/jwt.utils";

const app = express();

// ── Static files (public/ at project ROOT — one level up from src/) ──
app.use(express.static(path.join(__dirname, "..", "public")));

// ── Middleware ────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

// ── JWT global middleware ─────────────────────────────────────────────
app.use((req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      req.user = payload;
    }
  }
  next();
});

// ── Views (views/ at project ROOT — one level up from src/) ──────────
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

// ── Routers ───────────────────────────────────────────────────────────
app.use("/admin", routerAdmin);
app.use("/", router);

export default app;