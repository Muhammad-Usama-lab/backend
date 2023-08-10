const products = require("../models/products");

// get

const getAll = async (req, res) => {
  try {
    let { title } = req.query;
  
    let prods = await products.find({
      title: { $regex: title || "", $options: "i" },
    });
    res.status(200).json(prods);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: `${error}` });
  }
};

const getProduct = async (req, res) => {
  try {
    let { id } = req?.query;
    let prod = await products.findOne({ _id: id });
    res.status(200).json(prod);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// update

const updateProduct = async (req, res) => {
  try {
    let { body } = req;
    let obj = {};
    for (var key in body) {
      if (key != "id") {
        obj[key] = body[key];
      }
    }
    let updated = await products.findOneAndUpdate({ _id: body?.id }, obj, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// create
const addProduct = async (req, res) => {
  try {
    let { title, actual_price, selling_price, stock } = req.body;

    let product = await products.create({
      title,
      actual_price,
      selling_price,
      stock,
    });
    if (product) res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  getProduct,
  getAll,
};
