// import { createGallery } from "./modules/createGallery.js";

let recipes;

let fetchData = async () => {
  let response = await fetch("../../assets/db.json");
  let data = await response.json();
  return data;
};

fetchData()
  .then((data) => {
    console.log(data);
    recipes = data.recipes;
    // createGallery.init(recipes)
    createGallery(recipes);
  })
  .catch((err) => {
    console.log(err);
  });

function createGallery(recipes) {
  const gallery = document.querySelector(".cardsGallery");
  recipes.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("col", "cardsGallery__card");
    article.setAttribute("data-id", recipe.id);
    article.innerHTML = `<div class="card h-100 bg-dark bg-opacity-10 border-0">
            <img
              src="./public/img/genericImg.svg"
              class="card-img-top"
              width="100%"
              alt=""
            />
            <div class="bg-dark" width="100%" height="178px"></div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-3">
                <div class="card-title">${recipe.name}</div>
                <p class="card-text text-small">
                  <i class="far fa-clock"></i><strong> ${
                    recipe.time
                  } min</strong>
                </p>
              </div>
              <div class="row">
              <div class="col-6 ingredients">
              </div>
                <p class="col-6 card-text text-small">
                  ${truncateString(recipe.description, 183)}
                </p>
              </div>
            </div>
          </div>`;
    recipe.ingredients.forEach((ingredient) => {
      const element = document.createElement("p");
      element.classList.add("card-text", "text-small", "mb-0");
      element.setAttribute("data-ingredient", ingredient);
      element.innerHTML = `<strong>${
        ingredient.ingredient
      }:</strong> ${getUnits(ingredient)}`;
      article.querySelector(".ingredients").appendChild(element);
    });
    gallery.appendChild(article);
  });
}

function truncateString(str, num) {
  //return the string if it's less or equal to the num
  if (str.length <= num) return str;
  //return the string truncated and add ... at the end
  return `${str.slice(0, num)}...`;
}

function getUnits(ingredient) {
  if (ingredient.quantity) {
    if (ingredient.unit) return `${ingredient.quantity}${ingredient.unit}`;
    return `${ingredient.quantity}`;
  } else {
    return ``;
  }
}
