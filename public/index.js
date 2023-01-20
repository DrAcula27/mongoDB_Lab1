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
  let userQuery = document.getElementById("user-query").value;
  let showFoodArea = document.getElementById("show-food-area");
  if (userQuery === "") {
    showFoodArea.classList.remove("hidden");
    const errorMsg = document.createElement("h2");
    errorMsg.textContent =
      "Please type the name of a fruit or veggie in the search bar before clicking the search button!";
    showFoodArea.appendChild(errorMsg);
  } else {
    console.log("made it to fetch");
    let res = await fetch(`http://localhost:5000/search/${userQuery}`);
    console.log(res);
    let foodItem = await res.json();
    console.log(foodItem);
    showFoodArea.classList.remove("hidden");
    const foodElement = document.createElement("div");
    foodElement.innerHTML = `<p>${foodItem}</p>`;
    showFoodArea.appendChild(foodElement);
  }
});
