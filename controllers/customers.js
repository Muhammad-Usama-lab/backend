const customers = require("../models/customers");

// get

const getAll = async (req, res) => {
  try {
    let { name } = req.query;
    console.log(name);
    let custs = await customers.find({
      first_name: { $regex: name || "", $options: "i" },
    });
    console.log(custs);
    res.status(200).json(custs);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const getCustomer = async (req, res) => {
  try {
    let { id } = req?.query;
    let customer = await customers.findOne({ _id: id });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// update

const updateCustomer = async (req, res) => {
  try {
    let { body } = req;
    let obj = {};
    for (var key in body) {
      if (key != "id") {
        obj[key] = body[key];
      }
    }
    let updated = await customers.findOneAndUpdate({ _id: body?.id }, obj, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// create
const addCustomer = async (req, res) => {

  try {
    console.log('req.body', req.body);

    let { first_name, last_name, size, phone_number, phone_number_2, sku } =
      req.body;

    let customer = await customers.create({
      first_name,
      last_name,
      size,
      sku,
      phone_number,
      phone_number_2,
      preferences:req?.images ? req?.images?.find(v=>!v?.split("_").includes("Customer")) : null,
      image: req?.images ? req?.images?.find(v=>v?.split("_").includes("Customer")) : null,
    });
    if (customer) res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = {
  addCustomer,
  updateCustomer,
  getCustomer,
  getAll,
};
