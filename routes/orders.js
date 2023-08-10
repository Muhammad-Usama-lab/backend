const express = require("express");
const orderController = require("../controllers/orders");
const { uploadImages } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/create", uploadImages, orderController.createOrder);
router.get("/get-all", orderController.getAllOrders);
router.get("/get-all-created-by", orderController.getAllOrdersByCreatedBy);
router.get("/get", orderController.getOrder);
router.post("/uploadImages",orderController.uploadProductAttachements)

module.exports = router;
