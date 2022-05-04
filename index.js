const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI =
  "mongodb+srv://stringrolls:pcGyLAWWYDox2IlR@samy.vxygr.mongodb.net/recipes?retryWrites=true&w=majority";

// Connection to the database "recipe-app"
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
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
};

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // .then(async() => {
    //   await Recipe.deleteMany()
    return Recipe.deleteMany();
  })
  //iteration 2
  .then(() =>
    Recipe.create(newRecipe)
      .then((dbrecipe) => console.log(`recipe added: ${dbrecipe.title}`))
      .catch((error) => console.log("Error", error))
  )
  //Iteration 3
  // Run your code here, after you have insured that the connection was made
  .then(() =>
    Recipe.insertMany(data).then((insertRecipes) =>
      insertRecipes.forEach((recipe) => {
        // console.log(`recipe for : ${recipe.title} inserted`);
      })
    )
  )
  //Iteration 4

  .then(() =>
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then((recipe) => {
     // console.log(`recipe for : ${recipe.title} inserted`);
    })
  )

  .then(() =>
  Recipe.deleteOne(
    { title: "Carrot Cake" },
  ).then((delRecipe) => {
    console.log(`deleted: `, delRecipe);
  })
)

.then(()=> mongoose.connection.close())

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
