const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    token: {
      required: true,
      type: String,
    },
    room_id: {
      required: true,
      type: String,
    },
    random: {
      type: Boolean,
      default: false,
    },
    screenshots: {
      type: Boolean,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    media: {
      type: Boolean,
    },
    activeUsers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
