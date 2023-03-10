const users = require("../models/users");

// get

const getAll = async (req, res) => {
  try {
    let usrs = await users.find({});
    res.status(200).json(usrs);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

const getUser = async (req, res) => {
  try {
    let { id } = req?.query;
    let user = await users.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// update

const updateUser = async (req, res) => {
  try {
    let { body } = req;
    let obj = {};
    for (var key in body) {
      if (key != "id") {
        obj[key] = body[key];
      }
    }
    let updated = await users.findOneAndUpdate({ _id: body?.id }, obj, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// create
const addUser = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      user_name,
      password,
      permissions,
      phone,
      type,
    } = req.body;

    let user = await users.create({
      first_name,
      last_name,
      user_name,
      password,
      permissions,
      phone,
      type,
      image: req?.images ? req?.images[0] : null,
    });
    if (user) res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = {
  addUser,
  updateUser,
  getUser,
  getAll,
};
