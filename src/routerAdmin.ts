import express from "express";
import memberController from "./controllers/restaurant.controller";  // use the controller

const routerAdmin = express.Router();

routerAdmin.get("/", memberController.goHome);
routerAdmin.get("/login", memberController.getLogin);
routerAdmin.get("/signup", memberController.getSignup);

export default routerAdmin;