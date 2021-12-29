let recipes;
let ingredients = [];
let appliances = [];
let ustensils = [];
const recipesFiltered = [];
const selectedTags = { ingredients: [], appliances: [], ustensils: [] };

const dropdownBtns = document.querySelectorAll(".dropdowns .dropdown-toggle");
const searchInput = document.querySelector("#main-search");
let mainInput = "";

const fetchData = async () => {
  const response = await fetch("assets/db.json");
  const data = await response.json();
  return data;
};

fetchData()
  .then((data) => {
    recipes = data.recipes;
    createGallery(recipes);
    getDropdowns(recipes);
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
      element.setAttribute("data-ingredient", ingredient.ingredient);
      element.innerHTML = `<strong>${
        ingredient.ingredient
      }:</strong> ${getUnits(ingredient)}`;
      article.querySelector(".ingredients").appendChild(element);
    });
    gallery.appendChild(article);
  });
}

//need a function to truncate the recipes description in order to create a preview
function truncateString(str, num) {
  //return the string if it's less or equal to the num
  if (str.length <= num) return str;
  //return the string truncated and add ... at the end
  return `${str.slice(0, num)}...`;
}

//In order to display the correct unit and quantity for the ingredients I check if the information is available
function getUnits(ingredient) {
  if (ingredient.quantity) {
    if (ingredient.unit) return `${ingredient.quantity}${ingredient.unit}`;
    return `${ingredient.quantity}`;
  }
  return ``;
}

function getDropdowns(recipes) {
  getNecessary(recipes);
  //go all through all array entries and push everyone into the dropdown list
  makeDropdowns(ingredients, appliances, ustensils, recipes);
}

function getNecessary(recipes) {
  appliances.length = 0;
  ustensils.length = 0;
  ingredients.length = 0;
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

function makeDropdowns(ingredients, appliances, ustensils) {
  //select all 3 dropdowns main element
  const ingredientsDropdown = document.querySelector(".ingredientsDropdown");
  const appliancesDropdown = document.querySelector(".appliancesDropdown");
  const ustensilsDropdown = document.querySelector(".ustensilsDropdown");

  makeDropdown(ingredientsDropdown, ingredients, "ingredients");
  makeDropdown(appliancesDropdown, appliances, "appliances");
  makeDropdown(ustensilsDropdown, ustensils, "ustensils");
}

//Function that will be trigger when the elements have a attributes mutation in order to display the lists properly
function dropDownsListener(dropdownBtns) {
  dropdownBtns.forEach((btn) => {
    const numOfList = btn.parentNode.parentNode.querySelectorAll(
      ".dropdown-menu .row div.p-0"
    ).length;
    if (btn.classList.contains("show")) {
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
      btn.parentNode.parentNode.classList.remove(
        "col-lg-6",
        "col-lg-4",
        "col-lg-3"
      );
      btn.parentNode
        .querySelector("input.form-control")
        .classList.remove("rounded-top");
    }
  });
}

const makeDropdown = (domElement, list, listName, recipes) => {
  domElement.querySelector(".dropdown-menu .row").innerHTML = "";
  splitArray(list).forEach((array, index) => {
    const dropdownCol = document.createElement("div");
    if (splitArray(list).length >= 3) {
      dropdownCol.classList.add("col-4", "p-0");
    } else if (splitArray(list).length === 2) {
      dropdownCol.classList.add("col-6", "p-0");
    } else dropdownCol.classList.add("col-12", "p-0");
    array.forEach((element) => {
      const listElt = document.createElement("div");
      if (index >= 3)
        listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5 isHidden" href="#" data-value="${element}" data-category="${listName}">${element}</a>`;
      else
        listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5" href="#" data-value="${element}" data-category="${listName}">${element}</a>`;
      dropdownCol.appendChild(listElt);
    });
    domElement.querySelector(".dropdown-menu .row").append(dropdownCol);
  });
  dropdownItemListener(domElement);
};

function splitArray(array) {
  // const TempArray = array.slice(0, 30);
  let mainArray = [];
  if (array.length > 30)
    return (mainArray = [
      array.slice(0, 10),
      array.slice(10, 20),
      array.slice(20, 30),
      array.slice(30),
    ]);
  if (array.length > 20 && array.length <= 30) {
    return (mainArray = [
      array.slice(0, 10),
      array.slice(10, 20),
      array.slice(20, 30),
    ]);
  }
  if (array.length > 10 && array.length <= 20) {
    return (mainArray = [array.slice(0, 10), array.slice(10, 20)]);
  }
  if (array.length <= 10) {
    return (mainArray = [array.slice(0, 10)]);
  }
}

function dropdownItemListener(domElement) {
  const dropdownItems = domElement.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      //Need to see if the item is already in the selected tag list
      //if the item is in one of the tags list don't do item
      const itemValue = item.innerText.toLowerCase();
      let isAlreadyInTagList = false;
      Object.values(selectedTags).forEach((list) => {
        if (list.find((elt) => elt === itemValue)) {
          isAlreadyInTagList = true;
        }
      });
      if (!isAlreadyInTagList) {
        const tagSection = document.querySelector(".row.tags");
        const tag = document.createElement("div");
        tag.classList.add("col-auto");
        switch (item.getAttribute("data-category")) {
          case "ingredients":
            tag.innerHTML = `<button class="btn btn-primary text-capitalize" type="button">
                  ${item.innerText} <i class="far fa-times-circle" aria-hidden="true"></i>
                </button>`;
            selectedTags.ingredients.push(itemValue);
            break;
          case "appliances":
            tag.innerHTML = `<button class="btn btn-success text-capitalize" type="button">
                        ${item.innerText} <i class="far fa-times-circle" aria-hidden="true"></i>
                      </button>`;
            selectedTags.appliances.push(itemValue);
            break;
          case "ustensils":
            tag.innerHTML = `<button class="btn btn-danger text-capitalize" type="button">
                            ${item.innerText} <i class="far fa-times-circle" aria-hidden="true"></i>
                          </button>`;
            selectedTags.ustensils.push(itemValue);
            break;
          default:
            break;
        }
        tagSection.appendChild(tag);
        tag.querySelector(".fa-times-circle").addEventListener("click", (e) => {
          tagSection.removeChild(tag);
          removeTag(item);
        });
        if (recipesFiltered.length > 0) {
          filterTags(recipesFiltered);
        } else {
          filterTags(recipes);
        }
      }
    });
  });
}

//Remove the tag from the selectedTags in order to display the correct searchRecipes
function removeTag(item) {
  let TempArray;
  switch (item.getAttribute("data-category")) {
    case "ingredients":
      TempArray = selectedTags.ingredients;
      selectedTags.ingredients = TempArray.filter(
        (ingredient) => ingredient != item.innerText.toLowerCase()
      );
      break;
    case "appliances":
      TempArray = selectedTags.appliances;
      selectedTags.appliances = TempArray.filter(
        (appliances) => appliances != item.innerText.toLowerCase()
      );
      break;
    case "ustensils":
      TempArray = selectedTags.ustensils;
      selectedTags.ustensils = TempArray.filter(
        (ustensil) => ustensil != item.innerText.toLowerCase()
      );
      break;
  }
  if (recipesFiltered.length > 0) {
    filterTags(recipesFiltered);
  } else {
    filterTags(recipes);
  }
}

//Adapt the dropdown width by changing the class list
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

dropdownBtns.forEach((btn) => {
  observer.observe(btn, { attributeFilter: ["aria-expanded"] });
});

/* main input listener, check if the user type 3 characters and print them it the console */
searchInput.addEventListener("keyup", (e) => {
  if (e.target.value.length >= 3) {
    mainInput = e.target.value.toLowerCase().trim();
    findRecipe(recipes);
  } else {
    createGallery(recipes);
    getDropdowns(recipes);
    recipesFiltered.length = 0;
  }
});

function findRecipe(array) {
  //loop through all the array elements
  recipesFiltered.length = 0;
  const regex = `[^]*${mainInput}`;
  for (let i = 0; i < array.length; i++) {
    //for every element
    //is the mainInput is in the title or description

    if (
      array[i].name.toLowerCase().match(regex) ||
      array[i].description.toLowerCase().match(regex)
    )
      //if yes, then push the element into the recipesFiltered array
      recipesFiltered.push(array[i]);
    //else is the mainInput is in the ingredients array
    else {
      for (let j = 0; j < array[i].ingredients.length; j++) {
        //if yes, then push the element into the recipesFiltered array
        if (array[i].ingredients[j].ingredient.toLowerCase().match(regex))
          recipesFiltered.push(array[i]);
      }
    }
    i++;
  }
  //create a new gallery with the filtered recipes
  if (recipesFiltered.length > 0) {
    createGallery(recipesFiltered);
    getDropdowns(recipesFiltered);
    // getDropdowns(recipesFiltered);
  }
  //else display the not found message
  else errorMessage();
}

function filterDropdown(e) {
  const tagSearch = e.target;
  const listName = tagSearch.getAttribute("data-category");
  const tagsList =
    listName == "ingredients"
      ? ingredients
      : listName === "appliances"
      ? appliances
      : ustensils;
  const tagsListFiltered = tagsList.filter((tag) =>
    tag.includes(tagSearch.value)
  );
  makeDropdown(tagSearch.parentNode.parentNode, tagsListFiltered, listName);
}

//Depending on the clicked item category, we will search for the correspondante recipes inside the display ones
function filterTags(recipesList) {
  let tempArray = recipesList;
  Object.entries(selectedTags).forEach((section) => {
    const [key, array] = section;
    if (array.length > 0) {
      if (key == "ingredients") {
        tempArray = tempArray.filter((recipe) => {
          const ingredientsList = recipe.ingredients.map(
            (ingredient) => ingredient.ingredient
          );
          return array.every((entry) =>
            ingredientsList.find(
              (ingredient) => ingredient.toLowerCase() == entry.toLowerCase()
            )
          );
        });
      } else if (key == "appliances") {
        tempArray = tempArray.filter((recipe) =>
          array.includes(recipe.appliance.toLowerCase())
        );
      } else if (key == "ustensils") {
        tempArray = tempArray.filter((recipe) => {
          return array.every((entry) => {
            return recipe.ustensils.find(
              (ustensil) => ustensil.toLowerCase() == entry.toLowerCase()
            );
          });
        });
      }
    }
  });

  createGallery(tempArray);
  getDropdowns(tempArray);
}

//dropdown input listener
const dropdownInputs = document.querySelectorAll(".dropdowns .form-control");
dropdownInputs.forEach((input) => {
  input.addEventListener("keyup", filterDropdown);
});

function errorMessage() {
  const gallery = document.querySelector(".cardsGallery");
  gallery.innerHTML = "";
  gallery.classList.add("justify-content-center");
  const message = document.createElement("p");
  message.innerText = ` Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
  gallery.appendChild(message);
}
