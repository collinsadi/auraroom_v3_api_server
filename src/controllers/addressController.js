const Address = require("../models/Address");
require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET;

exports.loginAddress = async (req, res) => {
  const { address } = req.body;

  try {
    if (!address) {
      return res
        .status(422)
        .json({ status: false, message: "Aura Address Required" });
    }

    const addressIsValid = await Address.findOne({
      string: address,
      deleted: false,
    });

    if (!addressIsValid) {
      return res
        .status(404)
        .json({ status: false, message: "Invalid Aura Address" });
    }

    if (addressIsValid.processing) {
      return res.status(404).json({
        status: false,
        message: "Subscription on this Address is still processing",
      });
    }
    if (!addressIsValid.subscriptionValid) {
      return res.status(404).json({
        status: false,
        message: "subscription expired",
      });
    }

    const token = jwt.sign({ address: addressIsValid._id }, JWT_SECRET, {
      expiresIn: "30 days",
    });

    response
      .status(200)
      .json({ status: true, message: "Authenticated Sucessfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
