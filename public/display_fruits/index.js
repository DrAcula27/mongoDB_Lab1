// functionality to display all the fruit currently in the database
let containerElement = document.getElementById("container");

const getData = async () => {
  let data = await fetch("http://localhost:5000/show_all_fruits");
  data.json().then((parsedData) => {
    console.log(parsedData); // array of objects
    parsedData.forEach((object) => {
      let pTag = document.createElement("p");
      pTag.textContent = object.name;
      if (object.readyToEat !== true) {
        pTag.style.color = "red";
      } else {
        pTag.style.color = "green";
      }
      containerElement.appendChild(pTag);
    });
  });
};
getData();

// functionality to return to the home page
let homeBtn = document.getElementById("go-home-btn");

homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// functionality to delete fruit that have no name
let deleteButton = document.getElementById("delete");

deleteButton.addEventListener("click", async () => {
  let response = await fetch("http://localhost:5000/delete_nameless_fruit", {
    method: "delete",
  });

  let parsedData = await response.json();
  console.log(parsedData);
});
