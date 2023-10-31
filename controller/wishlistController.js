const WISHLIST = require("../model/wishlistModel");

exports.addToWishlist = async function (req, res, next) {
  try {
    const { product, user } = req.body;
    console.log(req.body);
    if (!product || !user) {
      throw new Error("please fillup all filds");
    }
    const data = await WISHLIST.create(req.body);
    res.status(201).json({
      Message: "product add to wishlist",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fails",
      message: error.message,
    });
  }
};

exports.getwishlist = async function (req, res, next) {
  try {
    var wishlist = await WISHLIST.find().populate("product").populate("user");
    // console.log(cart);
    if (!wishlist) {
      throw new Error("no product available");
    }

    res.status(200).json({
      message: "get wishlist ",
      wishlist,
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
      status: "Fails",
    });
  }
};

exports.deleteWishlist = async function (req, res, next) {
  try {
    console.log(req.params.id);
    await WISHLIST.findByIdAndDelete({ _id: req.params.id });

    res.status(204).json({});
  } catch (error) {
    res.status(404).json({
      message: error.message,
      status: "Fail",
    });
  }
};

exports.updateWishlist = async function (req, res, next) {
  try {
      const { id } = req.params;
    const wishlist  = await WISHLIST.findById(id);
console.log(wishlist);
if (!wishlist){
  throw new Error('no data found in this id')
}
await WISHLIST.findByIdAndUpdate(id, req.body);
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
exports.getWishlisttOfUser = async function (req, res, next) {
  try {
    const data = await WISHLIST.find({ user: req.params.id });

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
