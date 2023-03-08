const express = require("express");
const customerController = require("../controllers/customers");
const { uploadImages } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/create", uploadImages, customerController.addCustomer);
router.get("/get-all", customerController.getAll);
router.post("/update", customerController.updateCustomer);
router.get("/get", customerController.getCustomer);

module.exports = router;
