const slugify = require("slugify");
const productModel = require("../models/product.js");
const categoryModel = require("../models/category.js");
const orderModel = require("../models/order.js");
const fs = require("fs");
const braintree = require("braintree");
const dotenv = require("dotenv");

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProduct = async (req, res) => {
  try {
    const { title, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    //Validations
    switch (true) {
      case !title:
        return res.status(400).send({ message: "Name is Required!" });

      case !price:
        return res.status(400).send({ message: "price is Required!" });

      case !category:
        return res.status(400).send({ message: "category is Required!" });

      case !quantity:
        return res.status(400).send({ message: "quantity is Required!" });

      case image && image.size > 10000000:
        return res.status(400).send({
          message: "image is required and size should be less then 1Mb",
        });
    }

    const product = new productModel({ ...req.fields, slug: slugify(title) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contenetType = image.type;
    }
    await product.save();
    res.status(200).send({
      status: true,
      message: "Product add Successfully!",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While add product!",
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      status: true,
      message: "Product Fetched Successfully!",
      totalCount: product.length,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While fetching products!",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      status: true,
      message: "Product Fetch Successfully!",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While fetching product!",
    });
  }
};

const getProductImage = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contenetType);
      return res.status(200).send(product.image.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error While fetching product image!",
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).send({
      status: true,
      message: "Product delete successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error while delete Product!",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !title:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(title) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

//filters
const filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let agrs = {};
    if (checked.length > 0) agrs.category = checked;
    if (radio.length) agrs.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(agrs);
    res.status(200).send({
      status: true,
      products,
      message: "Product Filter Successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Error while filter product",
    });
  }
};
//Product Count
const productCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      status: true,
      total,
      message: "Product Count Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while count product",
    });
  }
};

const productList = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await productModel
      .find({})
      .select("-image")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res
      .status(200)
      .send({ success: true, products, message: "Product List Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while get product list",
    });
  }
};

//search product
const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-image");

    res.status(200).send({
      status: true,
      result,
      message: "Product search Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while search product",
    });
  }
};

const similarProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-image")
      .limit(3)
      .populate("category");
    res.status(200).send({
      status: true,
      products,
      message: "Similar Product fetch Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while fetch similar product",
    });
  }
};

const productCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({ slug: req.params.slug });

    const product = await productModel
      .find({ category: category[0]?._id })
      .select("-image")
      .populate("category");
    console.log(product);
    res.status(200).send({
      status: true,
      message: "Category wise product fetch successfully",
      category,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error While fetch product category",
      error,
    });
  }
};

const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.status(500).send({
          status: false,
          message: "Error while fetch braintree token",
        });
      } else {
        res.status(200).send({
          status: true,
          message: "Braintree Token Fetched Successfully!",
          token: response.clientToken,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while fetch braintree token",
    });
  }
};

const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce , id } = req.body;
    let total = 0;
    cart.map((i) => (total += i.price));
    let newTransaction = await gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send({
            status: false,
            message: "Error while payment process",
            error: err,
          });
        }

        if (result.success) {
          console.log("Transaction ID: " + result.transaction.id);
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: id,
          }).save();
          res.status(200).send({
            status: true,
            message: "Payment Successfull!",
            order,
          });

        } else {
          console.error(result.message);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while payment process",
    });
  }
};
module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  getProductImage,
  deleteProduct,
  updateProduct,
  filterProduct,
  productCount,
  productList,
  searchProduct,
  similarProduct,
  productCategory,
  brainTreeTokenController,
  braintreePaymentController
};
