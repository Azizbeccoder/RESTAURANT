import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./router";
import routerAdmin from "../src/routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";
import { extractToken, verifyToken } from "./libs/utils/jwt.utils";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

// JWT middleware — runs on every request, sets req.user if token valid
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/admin", routerAdmin);
app.use("/", router);

export default app;