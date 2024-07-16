const Fruit = require("../models/Name");
const { fruits } = require("../utils/fruitNames");

exports.registerAllNames = async (req, res) => {
  try {
    fruits.forEach(async (fruit) => {
      await Fruit.create({
        name: fruit,
      });
    });

    res.status(200).json({
      status: true,
      message: `All ${fruits.length} Fruit Names Have been registered`,
    });
  } catch (error) {
    throw error;
  }
};

exports.getAllFreeNames = async (req, res) => {
  try {
    const availableNames = await Fruit.find({ reserved: false });

    res.status(200).json({ status: true, names: availableNames });
  } catch (error) {
    throw error;
  }
};

exports.addName = async (req, res) => {
  const { fruitName } = req.body;

  try {
    if (!fruitName) {
      return res
        .status(400)
        .json({ status: false, message: "Fruit Name is Required" });
    }

    await Fruit.create({ name: fruitName });

    res.status(200).json({ status: true, message: "Fruit Name Added" });
  } catch (error) {
    throw error;
  }
};
