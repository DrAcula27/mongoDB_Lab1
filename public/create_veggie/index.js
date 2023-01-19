// Functionality to add a veggie to the database
let submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", async () => {
  let nameString = document.getElementById("name-input").value;
  let colorString = document.getElementById("color-input").value;
  let ageNumber = +document.getElementById("age-input").value;
  let readyBool =
    document.getElementById("ready-bool").value === "true" ? true : false;

  const fruit = {
    nameString,
    colorString,
    ageNumber,
    readyBool,
  };

  let response = await fetch("http://localhost:5000/make_veggie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fruit),
  });
  let uploadStatusTag = document.getElementById("upload-status");
  console.log(response.status);
  if (response.status === 200) {
    uploadStatusTag.classList.remove("hidden");
    uploadStatusTag.textContent = "Upload Completed";
    uploadStatusTag.style.color = "green";
  } else {
    console.log(response);
    uploadStatusTag.classList.remove("hidden");
    uploadStatusTag.textContent = "Upload Failed";
    uploadStatusTag.style.color = "red";
  }
});

// functionality to return to the home page
let homeBtn = document.getElementById("go-home-btn");

homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// functionality to display all fruits currently in the database
let showAllFruitsBtn = document.getElementById("show-all-veggies-btn");

showAllFruitsBtn.addEventListener("click", () => {
  window.location.href = "../display_veggies";
});
