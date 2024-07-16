const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fruitNameSchema = new Schema(
  {
    name: String,
    reserved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Fruit = mongoose.model("fruit", fruitNameSchema);

module.exports = Fruit;
