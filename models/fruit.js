const mongoose = require("mongoose");

// Schemas are the structure of our data, and the data types
// Data Types: https://mongoosejs.com/docs/schematypes.html
const fruitSchema = new mongoose.Schema({
  name: String,
  color: String,
  age: Number,
  readyToEat: Boolean,
});

// We make a model from our Schema and point it at the collection we want
// we can the use the model to create, read, update, and delete data in that collection
const MyFruit = mongoose.model("myfruits", fruitSchema);
// https://mongoosejs.com/docs/models.html
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model MyFruit is for the myfruits collection in the database.

module.exports = MyFruit;
