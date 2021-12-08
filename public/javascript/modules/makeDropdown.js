const makeDropdown = (domElement, list) => {
  splitArray(list).forEach((array) => {
    const dropdownCol = document.createElement("div");
    if (splitArray(list).length === 3) {
      dropdownCol.classList.add("col-4", "p-0");
    } else if (splitArray(list).length === 2) {
      dropdownCol.classList.add("col-6", "p-0");
    } else dropdownCol.classList.add("col-12", "p-0");
    array.forEach((element) => {
      let listElt = document.createElement("div");
      listElt.innerHTML = `<a class="dropdown-item text-white fs-6 fs-md-5" href="#" data-value="${element}">${element}</a>`;
      dropdownCol.appendChild(listElt);
    });
    domElement.querySelector(".dropdown-menu .row").append(dropdownCol);
  });
};

function splitArray(array) {
  const TempArray = array.slice(0, 30);
  let mainArray = [];
  if (TempArray.length > 20) {
    return (mainArray = [
      TempArray.slice(0, 10),
      TempArray.slice(10, 20),
      TempArray.slice(20, 30),
    ]);
  }
  if (TempArray.length > 10 && TempArray.length <= 20) {
    return (mainArray = [TempArray.slice(0, 10), TempArray.slice(10, 20)]);
  }
  if (TempArray.length <= 10) {
    return (mainArray = [TempArray.slice(0, 10)]);
  }
}

export { makeDropdown };
