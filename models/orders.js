const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const order = Schema(
  {
    customer: { ref: "customers", type: Schema.Types.ObjectId },
    total_amount: { required: true, type: Schema.Types.Number },
    delivery_date: { type: Schema.Types.Date, required: true },
    attachments: [],
    products: [],
    createdBy: {
      ref: "users",
      type: Schema.Types.ObjectId,
      required: true,
    },
    balance_amount: String,
    comments: String,
    embroidery: String,
    type: String,
    status: String,
  },
  { timestamps: true }
);

const orders = mongoose.model("orders", order);
module.exports = orders;
