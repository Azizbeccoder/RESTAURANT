import express from "express";
import memberController from "./controllers/member.controller";
import { isAuthenticated } from "./libs/middlewares/auth.middleware";

const router = express.Router();

router.get("/", memberController.goHome);
router.get("/products", memberController.getProducts);
router.get("/users", memberController.getUsers);

router.get("/login", memberController.getLogin);
router.post("/login", memberController.processLogin);

router.get("/signup", memberController.getSignUp);
router.post("/signup", memberController.processSignup);

router.post("/logout", isAuthenticated, memberController.processLogout);

export default router;