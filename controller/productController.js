const PRODUCTS = require("../model/productModel");

exports.addProduct = async function (req, res, next) {
  try {
    req.body.images = req.file.filename;
    const {
      title,
      description,
      price,
      quantity,
      discountPercentage,
      discountedPrice,
      rating,
      stock,
      brand,
      category,
      images,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !quantity ||
      !discountPercentage ||
      !discountedPrice ||
      !rating ||
      !stock ||
      !brand ||
      !category ||
      !images
    ) {
      throw new Error("please fillup all filds");
    }

    const data = await PRODUCTS.create(req.body);
    res.status(201).json({
      Message: "product added",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fails",
      message: error.message,
    });
  }
};

exports.getAllProduct = async function (req, res, next) {
  try {
    var data = await PRODUCTS.find().populate("category")
    if (!data) {
      throw new Error("no product available");
    }

    const aggregatedCart = data.map((item) => {
      return {
        ...item.toObject(),
        total: item.price * item.discountPercentage,
      };
    });

    res.status(200).json({
      message: "get all product",
      data: aggregatedCart,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
      status: "Fails",
    });
  }
};
exports.searchProduct = async function (req, res, next) {
  try {
    
    var data = await PRODUCTS.find({
      title: { $regex: req.params.key, $options:'i' }
    });
    if (!data) {
      throw new Error("no product available");
    }

    res.status(200).json({
      message: "get all product",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "Fails",
    });
  }
};

exports.deleteProduct = async function (req, res, next) {
  try {
    console.log(req.params.id);
    await PRODUCTS.findByIdAndDelete({ _id: req.params.id });

    res.status(204).json({});
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "Fail",
    });
  }
};

exports.updateProduct = async function (req, res, next) {
  try {
    console.log(req.params.id);
    req.body.image = req.file.filename;
    const data = await PRODUCTS.findByIdAndUpdate(req.params.id, req.body);

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
