import express from "express";
import restaurantController from "./controllers/restaurant.controller";
import { isAuthenticated, isRestaurant } from "./libs/middlewares/auth.middleware";

const routerAdmin = express.Router();

routerAdmin.get("/", restaurantController.goHome);
routerAdmin.route("/login").get(restaurantController.getLogin).post(restaurantController.processLogin);
routerAdmin.route("/signup").get(restaurantController.getSignUp).post(restaurantController.processSignup);
routerAdmin.post("/logout", isAuthenticated, isRestaurant, restaurantController.processLogout);

export default routerAdmin;