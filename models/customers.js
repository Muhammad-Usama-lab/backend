const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customer = Schema(
  {
    size: {
      required: true,
      type: Schema.Types.String,
    },
    first_name: {
      type: Schema.Types.String,
      required: true,
    },
    last_name: String,
    image: String,
    preferences: [],
    sku: String,
    phone_number: String,
    phone_number_optional: String,
  },
  { timestamps: true }
);

const customers = mongoose.model("customers", customer);
module.exports = customers;
