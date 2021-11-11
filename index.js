const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI =
  "mongodb+srv://Julia:banialuki89@cluster0.ocbml.mongodb.net/recipe-lab?retryWrites=true&w=majority";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  /* 
  .then(() => {
    const newRecipe = {
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs",
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu",
    };
  
    //const createdRecipe = Recipe.create(newRecipe);
      return Recipe.create(newRecipe);
    // Run your code here, after you have insured that the connection was made
  })
  */
  .then(() => {
    const allRecipes = data;

    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then(() => {
    mongoose.disconnect();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
