const express = require("express");
const {
  payForPremiumWithCoinbase,
  payForPremiumWithPaystack,
  paystackCallback,
} = require("../controllers/transactionController");
const { loginAddress } = require("../controllers/addressController");
const router = express.Router();

router.post("/pay/coinbase", payForPremiumWithCoinbase);
router.post("/pay/paystack", payForPremiumWithPaystack);
router.post("/pay/paystack/validate", paystackCallback);

// login premium user

router.post("/login", loginAddress);

module.exports = router;
