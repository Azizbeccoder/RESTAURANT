import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";
import { extractToken, verifyToken } from "./libs/utils/jwt.utils";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

app.use((req: Request, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (token) {
    const payload = verifyToken(token);
    if (payload) req.user = payload;
  }
  next();
});

app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "..", "views"),
]);
app.set("view engine", "ejs");

app.use("/admin", routerAdmin);
app.use("/", router);

// 404 — must be after all routes
app.use((req: Request, res: Response) => {
  res.status(404).render("error", {
    error_code: 404,
    error_message: "Page Not Found",
    member: (req as any).user || null,
  });
});

// 500 global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error:", err);
  res.status(500).render("error", {
    error_code: 500,
    error_message: "Internal Server Error",
    member: (req as any).user || null,
  });
});

export default app;