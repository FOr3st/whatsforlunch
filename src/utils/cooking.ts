import { Ingredient, Recipe } from "../types";

export function filterEdibleIngrediends(
  ingredients: Array<Ingredient>,
  date: Date
) {
  return ingredients.filter(({ useBy }) => date.getTime() < useBy.getTime());
}

export function filterNotFreshIngrediends(
  ingredients: Array<Ingredient>,
  date: Date
) {
  return ingredients.filter(
    ({ bestBefore }) => date.getTime() > bestBefore.getTime()
  );
}

export function getAvailableIngredients(
  recipe: Recipe,
  ingredients: Array<Ingredient>
) {
  return ingredients.filter(({ title }) => recipe.ingredients.includes(title));
}

export function recipeCanBePrepared(
  recipe: Recipe,
  ingrediends: Array<Ingredient>
) {
  const availableIngredients = getAvailableIngredients(recipe, ingrediends);
  return availableIngredients.length === recipe.ingredients.length;
}

export function filterRecipesByIngredients(
  recipes: Array<Recipe>,
  ingrediends: Array<Ingredient>
) {
  return recipes.filter(recipe => recipeCanBePrepared(recipe, ingrediends));
}

export function freshnessCompareFunction(
  ingrediends: Array<Ingredient>,
  bestBeforeDate: Date
) {
  return function(a: Recipe, b: Recipe) {
    const ingrediendsA = getAvailableIngredients(a, ingrediends);
    const notFreshIngredientsA = filterNotFreshIngrediends(
      ingrediendsA,
      bestBeforeDate
    );
    const ingrediendsB = getAvailableIngredients(b, ingrediends);
    const notFreshIngredientsB = filterNotFreshIngrediends(
      ingrediendsB,
      bestBeforeDate
    );

    return notFreshIngredientsA.length - notFreshIngredientsB.length;
  };
}

export function getSortedAvailableRecipes(
  recipes: Array<Recipe>,
  ingredients: Array<Ingredient>,
  date: Date = new Date(),
) {
  const edibleIngredients = filterEdibleIngrediends(ingredients, date);
  const availableRecipes = filterRecipesByIngredients(
    recipes,
    edibleIngredients
  );
  const compareFunction = freshnessCompareFunction(edibleIngredients, date);

  return availableRecipes.sort(compareFunction);
}
