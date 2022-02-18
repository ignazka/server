const Nutrition = require('./nutrition.module');

async function createFood(req, res) {
  try {
    const food = await Nutrition.create(req.body);
    return res.status(200).json(food).end();
  } catch (error) {
    return res.status(500).json(error).end();
  }
}

async function deleteFood(req, res) {
  try {
    const { foodID } = req.body;
    await Nutrition.findByIdAndRemove(foodID);
    return res.status(200).json({ message: 'deleted successfully' });
  } catch (error) {
    return res.status(500).json(error).end();
  }
}

module.exports = { createFood, deleteFood };
