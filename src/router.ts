import express from "express";
import memberController from "./controllers/member.controller";
import { isAuthenticated, isUser } from "./libs/middlewares/auth.middleware";
 
const router = express.Router();
 
// Public pages
router.get("/", memberController.goHome);
router.get("/products", memberController.getProducts);
router.get("/users", memberController.getUsers);
 
// Auth pages
router.get("/login", memberController.getLogin);
router.post("/login", memberController.processLogin);
router.get("/signup", memberController.getSignUp);
router.post("/signup", memberController.processSignup);
 
// Protected
router.post("/logout", isAuthenticated, memberController.processLogout);
 
export default router;
 
 