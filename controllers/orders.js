const orders = require("../models/orders");

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
    let order = await orders.create(req.body);
    if (order) res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getAllOrdersByCreatedBy,
  getAllOrders,
};
