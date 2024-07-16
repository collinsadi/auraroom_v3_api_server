require("dotenv").config({ path: "../.env" });
const axios = require("axios");

const COINBASE_COMMERCE_API_KEY = process.env.COINBASE_COMMERCE_API_KEY;
const COINBASE_COMMERCE_API_URL = "https://api.commerce.coinbase.com";

exports.createCharge = async (
  description,
  pricing_type,
  local_price,
  transactionId
) => {
  const url = `${COINBASE_COMMERCE_API_URL}/charges`;
  const headers = {
    "Content-Type": "application/json",
    "X-CC-Api-Key": COINBASE_COMMERCE_API_KEY,
    "X-CC-Version": "2018-03-22",
  };

  const data = {
    name: "Aura Room",
    description,
    pricing_type,
    local_price: {
      amount: local_price.amount,
      currency: local_price.currency,
    },
    metadata: {
      transaction_id: String(transactionId),
    },
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating charge:",
      error.response ? error.response.data : error.message
    );
    
  }
};
