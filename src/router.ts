import express from "express";
const router = express.Router();

import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";

/*** MEMBER API ***/

// Get restaurant
router.get("/member/restaurant", memberController.getRestaurant);

// Auth
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);

// Member detail
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberdetail
);

// Update member (with image upload)
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);

// Top users
router.get("/member/top-users", memberController.getTopUsers);

/*** PRODUCT API ***/

// Get all products
router.get("/product/all", productController.getProducts);

// Get single product
router.get(
  "/product/:id",
  memberController.retrieveAuth,
  productController.getProduct
);

/*** ORDER API ***/

// Create order
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);

// Get my orders
router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);

// Update order
router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

export default router;