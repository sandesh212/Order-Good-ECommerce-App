const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
      type: String,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      data: mongoose.Schema.Types.Buffer,
      contenetType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("product",productSchema);

module.exports = product;