const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/auth");
const formidableMiddleware = require("express-formidable");
const productController = require("../controllers/product");

router.post(
  "/",
  verifyToken,
  isAdmin,
  formidableMiddleware(),
  productController.createProduct
);

router.put(
  "/:pid",
  formidableMiddleware(),
  productController.updateProduct
);

router.get("/", productController.getProduct);
router.get("/:slug", productController.getSingleProduct);

router.get("/image/:pid", productController.getProductImage);
router.delete("/:id", verifyToken, isAdmin, productController.deleteProduct);

//filter product
router.route("/filter").post(productController.filterProduct);

//product count
router.route("/count").post(productController.productCount);

//prduct filter
router.get("/list/:page", productController.productList);

//search product
router.get("/search/:keyword", productController.searchProduct);

//similar products
router.get("/related/:pid/:cid", productController.similarProduct);

//category wise product
router.get("/category/:slug",productController.productCategory)

//braintree token
router.get("/braintree/token", productController.brainTreeTokenController);

//braintree payment
router.post("/braintree/payment",verifyToken, productController.braintreePaymentController);
module.exports = router;
