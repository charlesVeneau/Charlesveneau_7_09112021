// import { createGallery } from "./modules/createGallery.js";

let recipes;
let ingredients = [];
let appliances = [];
let ustensils = [];

let fetchData = async () => {
  let response = await fetch("assets/db.json");
  let data = await response.json();
  return data;
};

fetchData()
  .then((data) => {
    //console.log(data);
    recipes = data.recipes;
    createGallery(recipes);
    getDropdowns(recipes);
    console.log(recipes);
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

function getDropdowns(recipes) {
  getNecessary(recipes);
  //go all through all array entries and push everyone into the dropdown list
  makeDropdowns(ingredients, appliances, ustensils);
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

function splitArray(array) {
  const TempArray = array.slice(0, 30);
  const mainArray = [
    TempArray.slice(0, 10),
    TempArray.slice(10, 20),
    TempArray.slice(20, 30),
  ];
  return mainArray;
}

function makeDropdowns(ingredients, appliances, ustensils) {
  //select all 3 dropdowns main element
  const ingredientsDropdown = document.querySelector(".ingredientsDropdown");
  const appliancesDropdown = document.querySelector(".appliancesDropdown");
  const ustensilsDropdown = document.querySelector(".ustensilsDropdown");

  splitArray(ingredients).forEach((array) => {
    const dropdownCol = document.createElement("div");
    dropdownCol.classList.add("col-4", "p-0");
    array.forEach((ingredient) => {
      let listElt = document.createElement("li");
      listElt.innerHTML = `<a class="dropdown-item text-white" href="#" data-value="${ingredient}">${ingredient}</a>`;
      dropdownCol.appendChild(listElt);
    });
    ingredientsDropdown
      .querySelector(".dropdown-menu .row")
      .append(dropdownCol);
  });

  splitArray(appliances).forEach((array) => {
    const dropdownCol = document.createElement("div");
    dropdownCol.classList.add("col-4", "p-0");
    array.forEach((appliance) => {
      let listElt = document.createElement("li");
      listElt.innerHTML = `<a class="dropdown-item text-white" href="#" data-value="${appliance}">${appliance}</a>`;
      dropdownCol.appendChild(listElt);
    });
    appliancesDropdown.querySelector(".dropdown-menu .row").append(dropdownCol);
  });

  splitArray(ustensils).forEach((array) => {
    const dropdownCol = document.createElement("div");
    dropdownCol.classList.add("col-4", "p-0");
    array.forEach((ustensil) => {
      let listElt = document.createElement("li");
      listElt.innerHTML = `<a class="dropdown-item text-white" href="#" data-value="${ustensil}">${ustensil}</a>`;
      dropdownCol.appendChild(listElt);
    });
    ustensilsDropdown.querySelector(".dropdown-menu .row").append(dropdownCol);
  });
}

//Adapt the dropdown width by changing the class list
const dropdownBtns = document.querySelectorAll(".dropdowns .dropdown-toggle");
dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.classList.contains("show")) {
      this.parentNode.parentNode.classList.remove("col-2");
      this.parentNode.parentNode.classList.add("col-6");
      this.parentNode
        .querySelector("input.form-control")
        .classList.add("rounded-top");
    } else {
      this.parentNode.parentNode.classList.add("col-2");
      this.parentNode.parentNode.classList.remove("col-6");
      this.parentNode
        .querySelector("input.form-control")
        .classList.remove("rounded-top");
    }
    /* dropdownBtns.forEach((btn) => {
      if (btn != this && btn.classList.contains("show")) {
        this.parentNode.parentNode.classList.add("col-2");
        this.parentNode.parentNode.classList.remove("col-6");
        this.parentNode
          .querySelector("input.form-control")
          .classList.remove("rounded-top");
      }
    }); */
  });
});

/* document.body.addEventListener("click", (e) => {
  document
    .querySelectorAll(".dropdowns .dropdown-toggle")
    .forEach(function (btn) {
      if (
        !e.target.classList.contains("dropdown-toggle") &&
        btn.classList.contains("show")
      ) {
        btn.parentNode.parentNode.classList.remove("col-2");
        btn.parentNode.parentNode.classList.add("col-6");
        this.parentNode
          .querySelector("input.form-control")
          .classList.add("rounded-top");
      } else {
        btn.parentNode.parentNode.classList.add("col-2");
        btn.parentNode.parentNode.classList.remove("col-6");
        this.parentNode
          .querySelector("input.form-control")
          .classList.remove("rounded-top");
      }
    });
}); */
