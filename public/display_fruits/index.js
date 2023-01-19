let containerElement = document.getElementById("container");

const getData = async () => {
  let data = await fetch("http://localhost:5000/show_all_fruits");
  data.json().then((parsedData) => {
    console.log(parsedData); // array of objects
    // map through and put in HTML
    // push each individual one,  or push an array of HTML
    parsedData.forEach((object) => {
      // if not ready to eat- red text
      let pTag = document.createElement("p"); // <p></p>
      pTag.textContent = object.name; // <p>apple</p>
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
