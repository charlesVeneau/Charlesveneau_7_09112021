class createGallery {
  static init(recipes) {
    recipes.forEach((recipe) => {
      new createCards(recipe);
    });
  }

  constructor(recipes) {}

  buildCardsSections(recipes) {}
}

export { createGallery };
