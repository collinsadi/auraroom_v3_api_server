const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    string: {
      type: String,
      required: true,
    },
    lastRegistered: {
      type: Date,
      required: true,
    },
    subscriptionValid: {
      type: Boolean,
      dafault: false,
    },
    processing: {
      type: Boolean,
      dafault: true,
    },
    reservedName: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"fruit"
    },
    deleted: {
      type: Boolean,
      dafault: false,
    },
  },
  { timestamps: true }
);

const Address = mongoose.model("address", addressSchema);

module.exports = Address;
