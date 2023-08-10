const User = require("../models/users");
const bcrypt = require("bcrypt");
const {sign}= require("jsonwebtoken")
const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ username });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          console.log("Authorize")
          res.status(200).json({
            token:sign({ results: user?._id }, "darzi-app")
          });
        } else {
          res.status(200).json({
            message: "Invalid Password",
          });
        }
      });
    } else {
      res.status(200).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(200).json({
      message: `${error}`,
    });
  }
};

module.exports = {
  login,
};
