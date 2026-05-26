const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

// http://localhost:8081/products/create
router.post(
    "/create",
    authMiddleware,
    productController.createProduct
);

// http://localhost:8081/products/
router.get(
    "/",
    productController.getProducts
);

// http://localhost:8081/products/:id
router.get(
    "/:id",
    productController.getSingleProduct
);

// http://localhost:8081/products/:id
router.put(
    "/:id",
    authMiddleware,
    productController.updateProduct
);

// http://localhost:8081/products/:id
router.delete(
    "/:id",
    authMiddleware,
    productController.deleteProduct
);

module.exports = router;