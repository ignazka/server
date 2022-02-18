const { Schema, model } = require('mongoose');

const nutritionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  proteins: String,
  fibers: String,
  carbs: String,
  fats: String,
  cal: Number,
  image: String,
});

module.exports = model('Nutrition', nutritionSchema);
