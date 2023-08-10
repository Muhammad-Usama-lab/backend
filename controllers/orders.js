const orders = require("../models/orders");
const fs = require("fs");
const path = require("path");
const { uploadImageToS3 } = require("../helperfunctions/order");
const uploadDir = path.join(process.cwd(), "uploads");

// get

const getAllOrdersByCreatedBy = async (req, res) => {
  try {
    let { id } = req.query;
    if (id) {
      let ords = await orders.find({ createdBy: id });
      res.status(200).json(ords);
    } else
      res.status(404).json({
        message: "invalid user id",
      });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const getAllOrders = async () => {
  try {
    let ordrs = await orders.find({});
    if (ordrs) res.status(200).json(ords);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const getOrder = async (req, res) => {
  try {
    let { id } = req?.query;
    let order = await orders.findOne({ _id: id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// update

const updateOrder = async (req, res) => {
  try {
    let { body } = req;
    let obj = {};
    for (var key in body) {
      if (key != "id") {
        obj[key] = body[key];
      }
    }
    let updated = await customers.findOneAndUpdate({ _id: id }, obj, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// create
const createOrder = async (req, res) => {
  try {
    let { products } = req.body;
    products = JSON.parse(products);
    let attachments = [],
      count = products?.reduce(
        (previous, current) => (previous += current?.attachments.length),
        0
      );

    if (req.images.length === count) {
      let obj = { ...req.body };
      obj.attachments = [];
      obj.products = products?.map((v) => {
        let { attachments, ...remaining } = v;

        let URLS = req.images.filter((value) => {
          return value.split("_")[0]?.split("/")[1] == v?._id;
        });
        obj.attachments.push({ product: v?._id, attachments: URLS });
        return { ...remaining };
      });

      // obj.createdBy = req.userId;

      let order = await orders.create(obj);
      if (order)
        res.status(200).json({
          data: order,
          message: "Order placed Successfully",
        });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: `${error}` });
  }
};

const uploadProductAttachements = async (req, res) => {
  try {
    /*
    {
      patient:"",
      
    }
    */

    let { file } = req.body;
    const matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, "base64");

    fs.writeFile(uploadDir + "/image2.jpg", buffer, function (err) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Some error occurred",
        });
      } else {
        console.log("The image was saved!");
        res.status(200).json({
          message: "Image saved successfully",
        });
      }
    });

    // let data = req.images?.map((v) => ({ image: v, product }));
    // res.status(200).json(data);
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getAllOrdersByCreatedBy,
  getAllOrders,
  uploadProductAttachements,
};
