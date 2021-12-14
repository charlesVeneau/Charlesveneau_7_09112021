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
      let listElt = document.createElement("div");
      if (index >= 3)
        listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5 isHidden" href="#" data-value="${element}" data-category="${listName}">${element}</a>`;
      else
        listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5" href="#" data-value="${element}" data-category="${listName}">${element}</a>`;
      dropdownCol.appendChild(listElt);
    });
    domElement.querySelector(".dropdown-menu .row").append(dropdownCol);
  });
  dropdownItemListener(domElement, recipes);
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

function dropdownItemListener(domElement, recipes) {
  const dropdownItems = domElement.querySelectorAll(".dropdown-item");
  const displayedRecipes = Array.from(
    document.querySelectorAll(".cardsGallery__card")
  );

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
      //data-value data-ingredient
      const itemValue = item.getAttribute("data-value");
      const itemCategory = item.getAttribute("data-category");
      // console.log(itemCategory);
      // console.log(recipes);
      const filteredRecipes = recipes
        .filter((recipe) => {
          if (itemCategory == "ingredients") {
            recipe.ingredients.forEach((ingredient) => {
              return ingredient.ingredient.toLowerCase() == itemValue;
            });
          } else if (itemCategory == "appliances") {
            return recipe.appliance.toLowerCase() == itemValue;
          } else if (itemCategory == "ustensils") {
            console.log(recipe.ustensils);
            recipe.ustensils
              .map((ustensil) => ustensil.toLowerCase())
              .includes(itemValue);
          }
        })
        .map((recipe) => recipe.id);
      console.log(filteredRecipes);
      displayedRecipes.forEach((recipe) => {
        if (!filteredRecipes.includes(parseInt(recipe.getAttribute("data-id"))))
          recipe.classList.add("isHidden");
      });
      // console.log(filteredRecipes);
    });
  });
}

export { makeDropdown };

/*Au clic sur un tag, il est ajouté dans la section correspondante
faire un tableau des recettes correspondant aux recettes affichées. puis faire un tableau contenant l'id des recettes contenant le tag
ce tableau sert d'element de comparaison pour afficher ou cacher la recette
*/
