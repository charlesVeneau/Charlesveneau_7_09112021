// import { createGallery } from "./modules/createGallery.js";

let recipes;
let ingredients = [];
let appliances = [];
let ustensils = [];

let fetchData = async () => {
  let response = await fetch("../../assets/db.json");
  let data = await response.json();
  return data;
};

fetchData()
  .then((data) => {
    console.log(data);
    recipes = data.recipes;
    createGallery(recipes);
    createDropdowns(recipes);
  })
  .catch((err) => {
    console.log(err);
  });

function createGallery(recipes) {
  const gallery = document.querySelector(".cardsGallery");
  recipes.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("col", "cardsGallery__card", "mt-0", "mb-5");
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

function createDropdowns(recipes) {
  //select the correct section
  const dropdownSection = document.querySelector(".dropdowns");
  //create all 3 dropdowns main element
  const ingredientsDropdown = document.createElement("div");
  ingredientsDropdown.classList.add("ingredients", "col-2");
  ingredientsDropdown.innerHTML = `<div class="input-group"><input
              type="text"
              class="form-control bg-primary border-0 text-white p-3"
              placeholder="Ingrédients"
              aria-label="Ingrédients"
            />
            <button
              type="button"
              class="
                btn
                bg-primary
                text-white
                dropdown-toggle dropdown-toggle-split
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end bg-primary border-0"
            >
            <div class="container"></div>
            </ul></div>`;
  const appliancesDropdown = document.createElement("div");
  appliancesDropdown.classList.add("appliances", "col-2");
  appliancesDropdown.innerHTML = `<div class="input-group"><input
            type="text"
            class="form-control bg-success border-0 text-white p-3"
              placeholder="Appareil"
              aria-label="Appareil"
            />
            <button
              type="button"
              class="
                btn
                bg-success
                text-white
                dropdown-toggle dropdown-toggle-split
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end bg-success border-0"
            >
            <div class="container"></div>
            </ul></div>`;
  const ustensilsDropdown = document.createElement("div");
  ustensilsDropdown.classList.add("ustensils", "col-2");
  ustensilsDropdown.innerHTML = `<div class="input-group"><input
              type="text"
              class="form-control bg-danger border-0 text-white p-3"
              placeholder="Ustensiles"
              aria-label="Ustensiles"
            />
            <button
              type="button"
              class="
                btn
                bg-danger
                text-white
                dropdown-toggle dropdown-toggle-split
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="visually-hidden">Toggle Dropdown</span>
            </button>
            <ul
              class="dropdown-menu dropdown-menu-end bg-danger border-0"
            >
            <div class="container"></div>
            </ul></div>`;
  getNecessary(recipes);
  //go all through all array entries and push everyone into the dropdown list
  ingredients.forEach((ingredient, index) => {
    const listElt = document.createElement("li");
    listElt.innerHTML = `<a class="dropdown-item text-white" href="#" data-value="${ingredient}">${ingredient}</a>`;
    ingredientsDropdown.querySelector(".dropdown-menu").appendChild(listElt);
  });
  dropdownSection.appendChild(ingredientsDropdown);
  appliances.forEach((appliance, index) => {
    const listElt = document.createElement("li");
    listElt.innerHTML = `<a class="dropdown-item text-white" href="#" data-value="${appliance}">${appliance}</a>`;
    appliancesDropdown.querySelector(".dropdown-menu").appendChild(listElt);
  });
  dropdownSection.appendChild(appliancesDropdown);
  ustensils.forEach((ustensil, index) => {
    const listElt = document.createElement("li");
    listElt.innerHTML = `<a class="dropdown-item text-white" href="#" data-value="${ustensil}">${ustensil}</a>`;
    ustensilsDropdown.querySelector(".dropdown-menu").appendChild(listElt);
  });
  dropdownSection.appendChild(ustensilsDropdown);
}

function getNecessary(recipes) {
  //retrive in all the recipes, the appliances ustensils and ingredients
  recipes.forEach((recipe) => {
    appliances.push(recipe.appliance.toLowerCase());
    recipe.ustensils.forEach((ustensil) => {
      ustensils.push(ustensil.toLowerCase());
    });
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient.ingredient.toLowerCase());
    });
  });
  //clean the necessaries array and sort it alphabeticly
  appliances.sort((a, b) => (a < b ? -1 : 1));
  let temp = appliances;
  appliances = temp.filter((v, i) => {
    return temp.indexOf(v) == i;
  });
  ustensils.sort((a, b) => (a < b ? -1 : 1));
  temp = ustensils;
  ustensils = temp.filter((v, i) => {
    return temp.indexOf(v) == i;
  });
  ingredients.sort((a, b) => (a < b ? -1 : 1));
  temp = ingredients;
  ingredients = temp.filter((v, i) => {
    return temp.indexOf(v) == i;
  });
}

function cleanAndSort(array) {
  array.sort((a, b) => (a < b ? -1 : 1));
  let temp = array;
  array = temp.filter((v, i) => {
    return temp.indexOf(v) == i;
  });
  /*   console.log(array);
  return array; */
}

/* 
Supprimer les doublons sur les filtres (ingrédients, appareil et ustensiles)
Limiter les ingrédients à 30 
Terminer l'intégration CSS
Rédiger la documentation pour les algorithmes de recherche */
