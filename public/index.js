let createFruitBtn = document.getElementById("create-fruit-btn");
let showFruitsBtn = document.getElementById("show-fruits-btn");
let createVeggieBtn = document.getElementById("create-veggie-btn");
let showVeggiesBtn = document.getElementById("show-veggies-btn");

createFruitBtn.addEventListener("click", () => {
  window.location.href = "./create_fruit";
});

showFruitsBtn.addEventListener("click", () => {
  window.location.href = "./display_fruits";
});

createVeggieBtn.addEventListener("click", () => {
  window.location.href = "./create_veggie";
});

showVeggiesBtn.addEventListener("click", () => {
  window.location.href = "./display_veggies";
});
