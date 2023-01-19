const express = require("express");
const mongoose = require("mongoose");

// allows us to use information from .env in this file
require("dotenv").config();

// import MyFruit and MyVeggie objects
const MyFruit = require("./models/fruit");
const MyVeggie = require("./models/veggies");

// create app by calling express function
const app = express();

// parses (makes readable) string JSON back into actual objects found in req.body
app.use(express.json());

// allow use of queries in URL (?limit=2&color=green)
// extended allows nested objects in URL
app.use(express.urlencoded({ extended: true }));

// tells express to serve our public folder by default when someone makes a request to this port
app.use(express.static("public"));

// string we get from MongoDB - we hide our username and password in our .env file
let connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongosetupcluster.muoiuud.mongodb.net/FoodDatabase?retryWrites=true&w=majority`;

// by default mongoose 'strictQuery' is true (strict) meaning we cant ask for information not in our schema
// see more here: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// function will activate once to let us know we are connected
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// '/make_fruit' -> this route will get information from the front end and create a new Fruit in the collection
app.post("/make_fruit", async (req, res) => {
  // destructuring - see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  // renaming variable while destrucutring: https://wesbos.com/destructuring-renaming
  const {
    nameString: name,
    colorString: color,
    ageNumber: age,
    readyBool: readyToEat,
  } = req.body;

  // Model methods usually give us a promise, so we can wait for the response
  let returnedValue = await MyFruit.create({
    name,
    color,
    age,
    readyToEat,
  });
  console.log(returnedValue);
  if (returnedValue) {
    console.log("upload complete");
  }
  res.send(returnedValue);
});

// '/make_veggie' -> this route will get information from the front end and create a new Veggie in the collection
app.post("/make_veggie", async (req, res) => {
  // destructuring - see more here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  // renaming variable while destrucutring: https://wesbos.com/destructuring-renaming
  const {
    nameString: name,
    colorString: color,
    ageNumber: age,
    readyBool: readyToEat,
  } = req.body;

  // Model methods usually give us a promise, so we can wait for the response
  let returnedValue = await MyVeggie.create({
    name,
    color,
    age,
    readyToEat,
  });
  console.log(returnedValue);
  if (returnedValue) {
    console.log("upload complete");
  }
  res.send(returnedValue);
});

// '/show_all_fruits' -> this route will get all Fruit objects from the database and send them to the front end
app.get("/show_all_fruits", async (req, res) => {
  // get data from database
  let response = await MyFruit.find({});
  console.log(response);
  // send it back to front end
  res.json(response);
});

// '/show_all_veggies' -> this route will get all Veggie objects from the database and send them to the front end
app.get("/show_all_veggies", async (req, res) => {
  // get data from database
  let response = await MyVeggie.find({});
  console.log(response);
  // send it back to front end
  res.json(response);
});

// '/search/:foodName' -> this route will take the value of the user's search and get that specific fruit or veggie from the database and send it to the front end to be displayed
app.get("/search/:foodName", async (req, res) => {
  let foodToShow = req.params.foodName;
  // let fruitRes = await MyFruit.find({ foodToShow });
  let veggieRes = await MyVeggie.find({ name: foodToShow });
  console.log(veggieRes);
  res.send(veggieRes);
});

// '/delete_nameless_fruit' -> this route will delete all fruits that do not have a name
app.delete("/delete_nameless_fruit", async (req, res) => {
  let fruitResponse = await MyFruit.deleteMany({ name: "" });

  console.log(`${fruitResponse}`);

  res.send({ data: `deleted ${fruitResponse.deletedCount} fruits.` });
});

// '/delete_nameless_veggies' -> this route will delete all veggies that do not have a name
app.delete("/delete_nameless_veggies", async (req, res) => {
  let veggieResponse = await MyVeggie.deleteMany({ name: "" });

  console.log(`${veggieResponse}`);

  res.send({ data: `deleted ${veggieResponse.deletedCount} veggies.` });
});

// tell server where to listen
app.listen(5000, () => {
  console.log(`Server is Listening on port 5000`);
});
