const Room = require("../models/Room");
const generateUniqueHash = require("../utils/randomHashGenerator");
const generateRandomMessage = require("../utils/shareMessages");
const { body, validationResult } = require("express-validator");

exports.createRoom = async (req, res) => {
  let { roomName, password, screenShot, media } = req.body;
  const premium = req.premium;
  try {
    if (!roomName || !password) {
      return res
        .status(422)
        .json({ status: false, message: "Room Name and Key Required" });
    }

    if (roomName.length > 30 || roomName.length < 3) {
      return res.status(422).json({
        status: false,
        message: "Room Name should be between 3-30 characters",
      });
    }

    const roomId = generateUniqueHash(6);

    await Room.create({
      name: roomName,
      token: password,
      room_id: roomId,
      screenshots: premium ? screenShot === "1" : true,
      media: premium ? media === "1" : true,
      premium,
    });

    res.status(200).json({
      status: true,
      message: "Room Created",
      id: roomId,
      details: generateRandomMessage(roomId, password, roomName),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.joinRoom = async (req, res) => {
  const { roomId, roomKey, useReserved } = req.body;
  const premium = req.premium;
  try {
    if (!roomId || !roomKey) {
      return res
        .status(422)
        .json({ status: false, message: "Room Id and Key Required" });
    }

    const roomExists = await Room.findOne({
      room_id: String(roomId).trim(),
      random: false,
    });

    if (!roomExists) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    if (roomExists.token !== String(roomKey).trim()) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }

    res.status(200).json({
      status: true,
      message: "Room Credentials Valid",
      useReserved: premium ? useReserved === "1" : undefined,
      room: roomExists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
