// functionality to move to the create a fruit page
let createFruitBtn = document.getElementById("create-fruit-btn");

createFruitBtn.addEventListener("click", () => {
  window.location.href = "./create_fruit";
});

// functionality to move to the display all fruits page
let showFruitsBtn = document.getElementById("show-fruits-btn");

showFruitsBtn.addEventListener("click", () => {
  window.location.href = "./display_fruits";
});

// functionality to move to the create a veggie page
let createVeggieBtn = document.getElementById("create-veggie-btn");

createVeggieBtn.addEventListener("click", () => {
  window.location.href = "./create_veggie";
});

// functionality to move to the display all veggies page
let showVeggiesBtn = document.getElementById("show-veggies-btn");

showVeggiesBtn.addEventListener("click", () => {
  window.location.href = "./display_veggies";
});

// functionality to search for a fruit or veggie
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let showFoodArea = document.getElementById("show-food-area");
  let userQuery = document.getElementById("user-query").value;
  if (userQuery === "") {
    showFoodArea.classList.remove("hidden");
    showFoodArea.style.color = "red";
    showFoodArea.innerHTML =
      "<h2>Please type the name of a fruit or veggie in the search bar before clicking the search button!</h2>";
  } else {
    let res = await fetch(`http://localhost:5000/search/${userQuery}`);
    let foodItem = await res.json();
    console.log(foodItem);
    try {
      showFoodArea.classList.remove("hidden");
      if (foodItem[0].readyToEat === true) {
        showFoodArea.style.color = "green";
      } else {
        showFoodArea.style.color = "red";
      }
      showFoodArea.innerHTML = `
    <p>Name: ${foodItem[0].name}</p>
    <p>Color: ${foodItem[0].color}</p>
    <p>Age (in days): ${foodItem[0].age}</p>
    <p>Ready to eat?: ${foodItem[0].readyToEat}</p>
  `;
    } catch (error) {
      showFoodArea.style.color = "red";
      showFoodArea.innerHTML =
        "<h2>That food item is not in the database. Please search for another item.</h2>";
    }
  }
});
