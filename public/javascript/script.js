// import { createGallery } from "./modules/createGallery.js";
import { makeDropdown } from "./modules/makeDropdown.js";

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
    // console.log(recipes);
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

  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const tagSection = document.querySelector(".row.tags");
      const tag = document.createElement("div");
      tag.classList.add("col-auto");
      switch (item.getAttribute("data-category")) {
        case "ingredients":
          tag.innerHTML = `<button class="btn btn-primary text-capitalize" type="button">
                ${item.innerText} <i class="far fa-times-circle" aria-hidden="true"></i>
              </button>`;
          break;
        case "appliances":
          tag.innerHTML = `<button class="btn btn-success text-capitalize" type="button">
                      ${item.innerText} <i class="far fa-times-circle" aria-hidden="true"></i>
                    </button>`;
          break;
        case "ustensils":
          tag.innerHTML = `<button class="btn btn-danger text-capitalize" type="button">
                          ${item.innerText} <i class="far fa-times-circle" aria-hidden="true"></i>
                        </button>`;
          break;
        default:
          break;
      }
      tagSection.appendChild(tag);
      tag.querySelector(".fa-times-circle").addEventListener("click", (e) => {
        tagSection.removeChild(tag);
      });
    });
  });
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

function makeDropdowns(ingredients, appliances, ustensils) {
  //select all 3 dropdowns main element
  const ingredientsDropdown = document.querySelector(".ingredientsDropdown");
  const appliancesDropdown = document.querySelector(".appliancesDropdown");
  const ustensilsDropdown = document.querySelector(".ustensilsDropdown");

  makeDropdown(ingredientsDropdown, ingredients, "ingredients");
  makeDropdown(appliancesDropdown, appliances, "appliances");
  makeDropdown(ustensilsDropdown, ustensils, "ustensils");
}

function dropDownsListener(dropdownBtns) {
  dropdownBtns.forEach((btn) => {
    const numOfList = btn.parentNode.parentNode.querySelectorAll(
      ".dropdown-menu .row div.p-0"
    ).length;
    if (
      btn.classList.contains("show") /* || btn.getAttribute("aria-expanded")*/
    ) {
      btn.parentNode.parentNode.classList.remove("col-lg-2", "col-sm-4");
      if (numOfList >= 3) btn.parentNode.parentNode.classList.add("col-lg-6");
      else if (numOfList === 2)
        btn.parentNode.parentNode.classList.add("col-lg-4");
      else btn.parentNode.parentNode.classList.add("col-lg-3");
      btn.parentNode
        .querySelector("input.form-control")
        .classList.add("rounded-top");
    } else {
      btn.parentNode.parentNode.classList.add("col-lg-2", "col-sm-4");
      if (numOfList >= 3)
        btn.parentNode.parentNode.classList.remove("col-lg-6");
      else if (numOfList === 2)
        btn.parentNode.parentNode.classList.remove("col-lg-4");
      else btn.parentNode.parentNode.classList.remove("col-lg-3");
      btn.parentNode
        .querySelector("input.form-control")
        .classList.remove("rounded-top");
    }
  });
}

const dropdownBtns = document.querySelectorAll(".dropdowns .dropdown-toggle");

const mutationCallback = (mutationList) => {
  for (const mutation of mutationList) {
    if (
      mutation.type == "attributes" ||
      mutation.attributeName == "aria-expanded"
    ) {
      dropDownsListener(dropdownBtns);
    }
  }
};

const observer = new MutationObserver(mutationCallback);

//Adapt the dropdown width by changing the class list
dropdownBtns.forEach((btn) => {
  observer.observe(btn, { attributeFilter: ["aria-expanded"] });
});

/* main input listener, check if the user type 3 characters and print them it the console */
const searchInput = document.querySelector("#main-search");
let mainInput = "";

searchInput.addEventListener("keyup", (e) => {
  if (e.target.value.length >= 3) {
    mainInput = e.target.value;
    // console.log(mainInput);
  }
});

function filterDropdown(e) {
  const tagSearch = e.target;
  const listName = tagSearch.getAttribute("data-listitems");
  const tagsList =
    tagSearch.getAttribute("data-listitems") == "ingredients"
      ? ingredients
      : tagSearch.getAttribute("data-listitems") === "appliances"
      ? appliances
      : ustensils;
  const tagsListFiltered = tagsList.filter((tag) =>
    tag.includes(tagSearch.value)
  );
  console.log(tagsListFiltered);
  makeDropdown(tagSearch.parentNode.parentNode, tagsListFiltered, listName);
}

//dropdown input listener
const dropdownInputs = document.querySelectorAll(".dropdowns .form-control");
dropdownInputs.forEach((input) => {
  input.addEventListener("keyup", filterDropdown);
});
