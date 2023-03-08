const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = Schema(
  {
    sku: String,
    title: {
      type: Schema.Types.String,
      required: true,
    },
    stock: { type: Schema.Types.String,required: true,  },
    actual_price: String,
    selling_price: String,
    images: Array,
  },
  { timestamp: true }
);
const products = mongoose.model("products", product);
module.exports = products;
