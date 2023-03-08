const express = require("express");
const userController = require("../controllers/users");
const { uploadImages } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/create", uploadImages, userController.addUser);
router.get("/get-all", userController.getAll);
router.post("/update", userController.updateUser);
router.get("/get", userController.getUser);

module.exports = router;
