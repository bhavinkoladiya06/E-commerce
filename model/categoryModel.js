const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const CATEGORY = mongoose.model("category", categorySchema);

module.exports = CATEGORY;
