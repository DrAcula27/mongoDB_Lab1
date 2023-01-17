const mongoose = require("mongoose");

// Schemas are the structure of our data, and the data types
// Data Types: https://mongoosejs.com/docs/schematypes.html
const veggieSchema = new mongoose.Schema({
  name: String,
  color: String,
  age: Number,
  readyToEat: Boolean,
});

// We make a model from our Schema and point it at the collection we want
// we can the use the model to create, read, update, and delete data in that collection
const MyVeggie = mongoose.model("myveggies", veggieSchema);
// https://mongoosejs.com/docs/models.html
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model MyVeggie is for the myveggies collection in the database.

module.exports = MyVeggie;
