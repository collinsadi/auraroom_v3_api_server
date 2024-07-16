const { default: mongoose } = require("mongoose");
const { createCharge } = require("../helpers/transactionHelpers");
const Address = require("../models/Address");
const Transaction = require("../models/Transaction");
const handleError = require("../utils/handleError");
const generateUniqueHash = require("../utils/randomHashGenerator");
const Fruit = require("../models/Name");
require("dotenv").config();
const payStackSecretKey = process.env.PAYSTACK_SECRET;
const nairaCharge = 3000;

exports.payForPremiumWithCoinbase = async (req, res) => {
  const { nameId, length } = req.body;

  try {
    if (!nameId) {
      return res
        .status(422)
        .json({ status: false, message: "Select a fruit Name to Reserve" });
    }

    if (!mongoose.isValidObjectId(nameId)) {
      return res
        .status(422)
        .json({ status: false, message: "the name appears to be invalid" });
    }

    if (!length) {
      return res.status(422).json({
        status: false,
        message: "Please select how long you want to subscribe for!",
      });
    }

    const fruitNameReserved = await Fruit.findOne({
      _id: nameId,
      reserved: true,
    });

    if (fruitNameReserved) {
      return res.status(422).json({
        status: false,
        message: "Name already Reserved!",
      });
    }

    const auraAddress = `ARURAx${generateUniqueHash(34)}`;

    const newAddress = await Address.create({
      string: auraAddress,
      lastRegistered: new Date(),
      reservedName: nameId,
    });

    const transaction = await Transaction.create({
      owner: newAddress._id,
      amount: 2 * parseInt(length),
      length: parseInt(length),
      method: "Coinbase",
    });

    const description = `Payment for premium for ${auraAddress}`;
    const pricing_type = "fixed_price";
    const local_price = {
      amount: 2 * parseInt(length),
      currency: "USD",
    };

    try {
      const charge = await createCharge(
        description,
        pricing_type,
        local_price,
        transaction._id
      );

      res.status(200).json({
        status: true,
        message: "Charge created successfully",
        paymentUrl: charge.hosted_url,
        address: auraAddress,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.payForPremiumWithPaystack = async (req, res) => {
  const { nameId, length } = req.body;

  try {
    if (!nameId) {
      return res
        .status(422)
        .json({ status: false, message: "Select a fruit Name to Reserve" });
    }

    if (!mongoose.isValidObjectId(nameId)) {
      return res
        .status(422)
        .json({ status: false, message: "the name appears to be invalid" });
    }

    if (!length) {
      return res.status(422).json({
        status: false,
        message: "Please select how long you want to subscribe for!",
      });
    }

    const fruitNameReserved = await Fruit.findOne({
      _id: nameId,
      reserved: true,
    });

    if (fruitNameReserved) {
      return res.status(422).json({
        status: false,
        message: "Name already Reserved!",
      });
    }

    const auraAddress = `ARURAx${generateUniqueHash(34)}`;

    const newAddress = await Address.create({
      string: auraAddress,
      lastRegistered: new Date(),
      reservedName: nameId,
    });
    const amount = nairaCharge * parseInt(length);

    const transaction = await Transaction.create({
      owner: newAddress._id,
      amount,
      length: parseInt(length),
      method: "Paystack",
    });

    try {
      const url = "https://api.paystack.co/transaction/initialize";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${payStackSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100,
          email: "support@auraroom.xyz",
          callback_url: `http://localhost:5173/p/${transaction._id}/v`,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.status) {
        res.status(200).json({
          status: true,
          paymentUrl: data.data.authorization_url,
          ref: data.data.reference,
          address: auraAddress,
        });
        return;
      }

      res
        .status(400)
        .json(
          handleError(
            400,
            "an Error Occured",
            `${data.message ? data.message : "Unable to Process Payment"}`
          )
        );
    } catch (error) {
      res
        .status(500)
        .json(
          handleError(
            500,
            "an Error Occured",
            "this is a Paystack payment initialization Error"
          )
        );
      console.log("Paystack error", error);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.paystackCallback = async (req, res) => {
  const { refrence, transaction_id } = req.query;

  try {
    const url = "https://api.paystack.co/transaction/verify/" + refrence;

    const response = await fetch(url, {
      method: "get",
      headers: {
        Authorization: `Bearer ${payStackSecretKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!data.status) {
      return res.status(400).json({ status: false, message: data.message });
    }

    if (!mongoose.isValidObjectId(transaction_id)) {
      return res
        .status(400)
        .json(
          handleError(
            400,
            "Invalid Transaction Id",
            "the transaction Id Provided by the client appears to be invalid"
          )
        );
    }

    const transactionExists = await Transaction.findOne({ refrence });

    if (transactionExists) {
      return res
        .status(401)
        .json(
          handleError(
            401,
            "Unauthorized Request",
            "this transaction has already been settled"
          )
        );
    }

    if (data.status && data.data.status === "success") {
      const transaction = await Transaction.findOneAndUpdate(
        { _id: transaction_id },
        { refrence },
        { new: true }
      );

      await Address.findOneAndUpdate(
        { _id: transaction.owner },
        { subscriptionValid: true, processing: false }
      );

      return res
        .status(200)
        .json({ status: true, message: "Subscription Successful" });
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Subscription Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
