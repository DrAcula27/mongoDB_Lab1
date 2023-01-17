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

// '/create_fruit' -> this route will get information from the front end and create a new Fruit in the collection
app.post("/create_fruit", async (req, res) => {
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

// '/create_veggie' -> this route will get information from the front end and create a new Veggie in the collection
app.post("/create_veggie", async (req, res) => {
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

// '/fruits' -> this route will get all Fruit objects from the database and send them to the front end
app.get("/get_fruit_data", async (req, res) => {
  // get data from database
  let response = await MyFruit.find({});
  console.log(response);
  // send it back to front end
  res.json(response);
});

// '/veggies' -> this route will get all Veggie objects from the database and send them to the front end
app.get("/veggies", (req, res) => {
  // Get data from MonogoDB,
  // res.json(data)
  res.setHeader("Content-Type", "application/json");

  console.log("request received at /get_data");
  console.log(process.env.MONGOPASSWORD);
  res.json({ data: "Response from server" });
});

// '/veggie/:veggieName' -> this route will take the veggieName and get that specific veggie from the database and send it to the front end to be displayed


// '/delete_nameless_data' -> this route will delete all data that does not have a name
app.delete("/delete_nameless_data", async (req, res) => {
  let fruitResponse = await MyFruit.deleteMany({ name: "" });
  let veggieResponse = await MyVeggie.deleteMany({ name: "" });

  console.log(`${fruitResponse}\n${veggieResponse}`);

  res.send({ data: `deleted ${fruitResponse.deletedCount} fruits and ${veggieResponse.deletedCount} veggies.` });
});

// tell server where to listen
app.listen(5000, () => {
  console.log(`Server is Listening on port 5000`);
});
