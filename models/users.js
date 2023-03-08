const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = Schema(
  {
    first_name: { type: Schema.Types.String, required: true },
    last_name: String,
    user_name: {
      required: true,
      type: Schema.Types.String,
    },
    image: String,
    password: {
      required: true,
      type: Schema.Types.String,
    },
    phone: String,
    permissions: {
      required: true,
      type: Schema.Types.Array,
    },
    type: {
      required: true,
      type: Schema.Types.String,
    },
  },
  { timestamp: true }
);

const users = mongoose.model("users", user);
module.exports = users;
