# Morning Exercise - First Full-Stack Application

## Per Scholas - Week 8 - Front-end, Express, and MongoDB - Assignment: MongoDB_Lab1

1. Add a second Schema/Model File For Vegetables to our app (`veggie.js`).
1. Create the following routes in `server.js`:
    1. `/create_veggie` - this route will get information from the front end and create a new Veggie in the MongoDB collection.
    1. `/veggies` - this route will get all Veggie objects from the database and send them to the front end.
    1. `/veggie/:veggieName` - this route will take the `veggieName` and get that specific veggie from the database and send it to the front end to be displayed.
1. Create the following HTML files:
    1. Show all veggies - this page will wait to get the viggie information from the backend (`/veggies`), when it gets the data, will display it on the page.
    1. Create new veggie - form to create new veggie.
    1. Show single veggie - the JS of this page will make a request to `/veggie/:veggieName` and wait for the response. Will display response on the page.
1. Add 5 Vegetables to a new collection called Veggies (with your HTML form).
1. Make sure all pages work.
