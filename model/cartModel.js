const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var cartSchema = new Schema({
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

const CART = mongoose.model("cart", cartSchema);

module.exports = CART;
