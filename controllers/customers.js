const customers = require("../models/customers");

// get

const getAll = async (req, res) => {
  try {
    let custs = await customers.find({});
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
    let { first_name, last_name, size, phone_number, phone_number_2 } =
      req.body;

    let customer = await customers.create({
      first_name,
      last_name,
      size,
      phone_number,
      phone_number_2,
      image: req?.images ? req?.images[0] : null,
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
