const makeDropdown = (domElement, list, listName) => {
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

export { makeDropdown };
