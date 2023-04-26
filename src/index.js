// write your code here
document.addEventListener("DOMContentLoaded", () => {
    // Step 1: Display all ramen images
    getRamen().then(displayRamen);
  
    // Step 2: Display ramen details on click
    const ramenMenu = document.querySelector("#ramen-menu");
    ramenMenu.addEventListener("click", (event) => {
      if (event.target.matches("img")) {
        const ramenId = event.target.dataset.id;
        getRamenById(ramenId).then(displayRamenDetail);
      }
    });
  
    // Step 3: Create new ramen
    const newRamenForm = document.querySelector("#new-ramen");
    newRamenForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const ramen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target.comment.value,
      };
      addNewRamen(ramen).then(() => {
        event.target.reset();
        displayRamen([ramen]);
      });
    });
  });
  
  // Step 1 helper functions
  function getRamen() {
    return fetch("http://localhost:3000/ramens").then((response) =>
      response.json()
    );
  }
  
  function displayRamen(ramens) {
    const ramenMenu = document.querySelector("#ramen-menu");
    ramenMenu.innerHTML = ramens
      .map((ramen) => `<img src="${ramen.image}" data-id="${ramen.id}" />`)
      .join("");
  }
  
  // Step 2 helper functions
  function getRamenById(id) {
    return fetch(`http://localhost:3000/ramens/${id}`).then((response) =>
      response.json()
    );
  }
  
  function displayRamenDetail(ramen) {
    const ramenDetail = document.querySelector("#ramen-detail");
    ramenDetail.innerHTML = `
      <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
      <h2 class="name">${ramen.name}</h2>
      <h3 class="restaurant">${ramen.restaurant}</h3>
    `;
    const ratingDisplay = document.querySelector("#rating-display");
    ratingDisplay.textContent = ramen.rating;
    const commentDisplay = document.querySelector("#comment-display");
    commentDisplay.textContent = ramen.comment;
  }
  
  // Step 3 helper function
  function addNewRamen(ramen) {
    return fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ramen),
    }).then((response) => response.json());
  }
  