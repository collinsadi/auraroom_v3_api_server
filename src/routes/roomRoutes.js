const express = require("express");
const { authenticate } = require("../middlewares/authMiddleware");
const { createRoom, joinRoom } = require("../controllers/roomController");
const router = express.Router();

router.post("/new", authenticate, createRoom);
router.post("/join", authenticate, joinRoom);

module.exports = router;
