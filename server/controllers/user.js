const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const { sendMail } = require("../services/email");
const orderModel = require("../models/order");
const Token = require("../models/token");
const crypto = require("crypto");
require("dotenv").config();

// Controller function to handle user creation
const addUser = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: 0,
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Already registered, please login!");
    }
    const token = await JWT.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      status: true,
      message: "User added successfully",
      data: savedUser,
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        status: false,
        message: "Invalid Email and password!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        status: false,
        message: "Email not registered!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        status: false,
        message: "Password is incorrect!",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      status: true,
      message: "Successfully Login",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Failed to login!",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    res.status(200).send({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting orders",
      error,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-image")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting orders",
      error,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password -image");
    res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting users",
      error,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log(orderId, status);
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );
    await order.save();
    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While updating order status",
      error,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(403).send({
      success: false,
      message: "Please Enter a correct Email address",
    });
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    return res.status(404).send({
      success: false,
      message: "User with this Email does not exits!",
    });
  }

  let token = await Token.findOne({ userId: userExists._id });
  if (!token) {
    token = await new Token({
      userId: userExists._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  const link = `${process.env.BASE_URL}/resetpassword/${userExists._id}/${token.token}`;

  const mail = await sendMail({ email, subject: "Forgot Password", link });
  console.log(mail)
  return res.status(200).send({
    success: true,
    message: "Email send successfully",
  });
};

const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid link or expired" });

    const hashedPassword = await hashPassword(password);
    const tokenExists = await Token.findOne({
      userId: user._id,
      token: token,
    });
    if (!tokenExists)
      return res
        .status(400)
        .send({ success: false, message: "Invalid link or expired" });

    user.password = hashedPassword;
    await user.save();
    await tokenExists.deleteOne();

    res
      .status(200)
      .send({ success: true, message: "password reset sucessfully." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addUser,
  login,
  getOrders,
  getAllOrders,
  getUsers,
  updateOrderStatus,
  forgotPassword,
  resetPassword,
};
