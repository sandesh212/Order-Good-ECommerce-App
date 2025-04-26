const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.post("/", userController.addUser);
router.post("/login", userController.login);
router.route("/forgot-password").post(userController.forgotPassword);
router.route("/reset-password/:userId/:token").post(userController.resetPassword);

//protected route:
router.get("/user-auth", verifyToken, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected route:
router.get("/admin-auth", verifyToken, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//get all users
router.get("/users", verifyToken, isAdmin, userController.getUsers);

//orders
router.get("/orders", verifyToken, userController.getOrders);

//all orders
router.get("/all-orders", verifyToken, isAdmin, userController.getAllOrders);

//order status update
router.patch("/order-status/:orderId", verifyToken, isAdmin, userController.updateOrderStatus);

module.exports = router;
