const express = require("express");
const productController = require("../controllers/products");
const { uploadImages } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/create", uploadImages, productController.addProduct);
router.get("/get-all", productController.getAll);
router.post("/update", productController.updateProduct);
router.get("/get", productController.getProduct);

module.exports = router;
