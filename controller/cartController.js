const CART = require("../model/cartModel");

exports.addToCart = async function (req, res, next) {
  try {
    const { product, user } = req.body;
    console.log(req.body);
    if (!product || !user) {
      throw new Error("please fillup all filds");
    }

    const data = await CART.create(req.body);
    res.status(201).json({
      Message: "product add to cart",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fails",
      message: error.message,
    });
  }
};

exports.getCart = async function (req, res, next) {
  try {
    var cart = await CART.find().populate("product").populate("user");
    // console.log(cart);
    if (!cart) {
      throw new Error("no product available");
    }

    res.status(200).json({
      message: "get cart list",
      cart,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
      status: "Fails",
    });
  }
};

exports.deleteCart = async function (req, res, next) {
  try {
    console.log(req.params.id);
    await CART.findByIdAndDelete({ _id: req.params.id });

    res.status(204).json({});
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "Fail",
    });
  }
};

exports.updateCart = async function (req, res, next) {
  try {
    const data = await CART.findByIdAndUpdate(req.params.id, req.body);

    res.status(201).json({
      message: "data update successfull",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "Fail",
    });
  }
};
exports.getCartOfUser = async function (req, res, next) {
  try {
    const data = await CART.find({ user: req.params.id });

    console.log(data);
    res.status(200).json({
      message: "data  found",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "Fail",
    });
  }
};
