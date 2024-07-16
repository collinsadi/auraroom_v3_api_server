const express = require("express");
const {
  registerAllNames,
  getAllFreeNames,
  addName,
} = require("../controllers/nameController");
const router = express.Router();

router.post("/register_all", registerAllNames);
router.get("/available_names", getAllFreeNames);
router.post("/add", addName);

module.exports = router;
