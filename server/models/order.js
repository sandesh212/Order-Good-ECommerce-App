const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  payment: {},
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status:{
    type: String,
    default: "pending",
    enum: ["pending", "completed", "cancelled","delivered"]
  },

},{timestamps: true});

const order = mongoose.model("orders", orderSchema);

module.exports = order;
