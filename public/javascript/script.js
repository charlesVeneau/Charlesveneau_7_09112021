// import { createGallery } from "./modules/createGallery.js";

let recipes;
let ingredients = [];
let appliances = [];
let ustensils = [];
let recipesFiltered = [];

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
    // console.log(recipes);
  })
  .catch((err) => {
    console.log(err);
  });

function createGallery(recipes) {
  const gallery = document.querySelector(".cardsGallery");
  if (gallery.classList.contains("justify-content-center"))
    gallery.classList.remove("justify-content-center");
  gallery.innerHTML = "";
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
  getDropdowns(recipes);
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
  appliances.length = 0;
  ustensils.length = 0;
  ingredients.length = 0;
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

/* function cleanAndSort(array) {
  array.sort((a, b) => (a < b ? -1 : 1));
  let temp = array;
  array = temp.filter((v, i) => {
    return temp.indexOf(v) == i;
  });
  return array;
} */

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
  const ingredientsDropdown = document.querySelector(
    ".ingredientsDropdown .dropdown-menu .row"
  );
  ingredientsDropdown.innerHTML = "";
  const appliancesDropdown = document.querySelector(
    ".appliancesDropdown .dropdown-menu .row"
  );
  appliancesDropdown.innerHTML = "";
  const ustensilsDropdown = document.querySelector(
    ".ustensilsDropdown .dropdown-menu .row"
  );
  ustensilsDropdown.innerHTML = "";

  splitArray(ingredients).forEach((array) => {
    const dropdownCol = document.createElement("div");
    dropdownCol.classList.add("col-4", "p-0");
    array.forEach((ingredient) => {
      let listElt = document.createElement("div");
      listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5" href="#" data-value="${ingredient}">${ingredient}</a>`;
      dropdownCol.appendChild(listElt);
    });
    ingredientsDropdown.append(dropdownCol);
  });

  splitArray(appliances).forEach((array) => {
    const dropdownCol = document.createElement("div");
    dropdownCol.classList.add("col-4", "p-0");
    array.forEach((appliance) => {
      let listElt = document.createElement("div");
      listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5" href="#" data-value="${appliance}">${appliance}</a>`;
      dropdownCol.appendChild(listElt);
    });
    appliancesDropdown.append(dropdownCol);
  });

  splitArray(ustensils).forEach((array) => {
    const dropdownCol = document.createElement("div");
    dropdownCol.classList.add("col-4", "p-0");
    array.forEach((ustensil) => {
      let listElt = document.createElement("div");
      listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5" href="#" data-value="${ustensil}">${ustensil}</a>`;
      dropdownCol.appendChild(listElt);
    });
    ustensilsDropdown.append(dropdownCol);
  });
}

//Adapt the dropdown width by changing the class list
const dropdownBtns = document.querySelectorAll(".dropdowns .dropdown-toggle");
dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (this.classList.contains("show")) {
      this.parentNode.parentNode.classList.remove("col-lg-2", "col-sm-4");
      this.parentNode.parentNode.classList.add("col-lg-6");
      this.parentNode
        .querySelector("input.form-control")
        .classList.add("rounded-top");
    } else {
      this.parentNode.parentNode.classList.add("col-lg-2", "col-sm-4");
      this.parentNode.parentNode.classList.remove("col-lg-6");
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

/* main input listener, check if the user type 3 characters and print them it the console */
const searchInput = document.querySelector("#main-search");
let mainInput = "";

searchInput.addEventListener("keyup", (e) => {
  //set an interval to let the user finish is interaction with is research
  setTimeout(() => {
    if (e.target.value.length >= 3) {
      mainInput = e.target.value.trim();
      findRecipe(recipes);
    } else {
      createGallery(recipes);
    }
  }, 1000);
});

function findRecipe(array) {
  //loop through all the array elements
  console.log(recipes);
  recipesFiltered.length = 0;
  for (let i = 0; i < array.length; i++) {
    //for every element
    //is the mainInput is in the title or description
    if (
      array[i].name.includes(mainInput) ||
      array[i].description.includes(mainInput)
    )
      //if yes, then push the element into the recipesFiltered array
      recipesFiltered.push(array[i]);
    //else is the mainInput is in the ingredients array
    else {
      for (let j = 0; j < array[i].ingredients.length; j++) {
        //if yes, then push the element into the recipesFiltered array
        if (array[i].ingredients[j].ingredient.includes(mainInput))
          recipesFiltered.push(array[i]);
      }
    }
    i++;
  }
  //create a new gallery with the filtered recipes
  if (recipesFiltered.length > 0) {
    createGallery(recipesFiltered);
    // getDropdowns(recipesFiltered);
  }
  //else display the not found message
  else errorMessage();
}

function errorMessage() {
  const gallery = document.querySelector(".cardsGallery");
  gallery.classList.add("justify-content-center");
  gallery.innerHTML = "";
  const message = document.createElement("p");
  message.classList.add("col-8", "justify-content-center");
  message.innerText = ` Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;

  gallery.appendChild(message);
}
