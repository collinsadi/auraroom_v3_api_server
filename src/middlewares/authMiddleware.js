require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const Address = require("../models/Address");
const JWT_SECRET = process.env.SECRET;

exports.authenticate = async (req, res, next) => {
  if (
    req.headers.Authorization &&
    req.headers.Authorization.startsWith("Bearer")
  ) {
    const token = req.headers.Authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const id = decoded.address;

      const addressExists = await Address.findOne({ _id: id });

      if (!addressExists) {
        return res
          .status(400)
          .json({ status: false, message: "authentication error" });
      }

      if (!addressExists.subscriptionValid) {
        return res
          .status(400)
          .json({ status: false, message: "authentication error" });
      }

      req.premium = true;

      next();
    } catch (error) {
      res.status(400).json({ status: false, message: "authentication error" });
    }
  } else {
    req.premium = false;
    next();
  }
};
