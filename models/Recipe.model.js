const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: { type: String },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [{ type: String }],
  cuisine: { type: String },
  dishType: { type: String },
  image: { type: String },
  duration: { type: Number },
  creator: { type: String },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
