const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    amount: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      default: 1,
    },
    method: {
      type: String,
      required: true,
    },
    renewal: {
      type: Boolean,
      default: false,
    },
    refrence: {
      type: String,
      default: "N/A",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
