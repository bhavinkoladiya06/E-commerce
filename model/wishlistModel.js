const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var wishlistSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const WISHLIST = mongoose.model("wishlist", wishlistSchema);

module.exports = WISHLIST;
