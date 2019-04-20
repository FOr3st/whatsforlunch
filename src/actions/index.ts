import { getRecipes, getIngredients } from "../api";
import { Recipe, Ingredient } from "../types";
import { parseDate } from "../utils";

interface GetIngredientsResponse {
  ingredients: Array<ResponseIngredient>;
}

interface ResponseIngredient {
  title: string;
  ["best-before"]: string;
  ["use-by"]: string;
}

interface GetRecipesResponse {
  recipes: Array<ResponseRecipe>;
}

interface ResponseRecipe {
  title: string;
  ingredients: Array<string>;
}

function ingredientsMapper(arr: Array<ResponseIngredient>): Array<Ingredient> {
  return arr.map(item => ({
    title: item.title,
    bestBefore: parseDate(item["best-before"]),
    useBy: parseDate(item["use-by"])
  }));
}

function recipesMapper(arr: Array<ResponseRecipe>): Array<Recipe> {
  return arr.map(item => item);
}

export function loadIngredients() {
  return getIngredients<GetIngredientsResponse>().then(({ ingredients }) =>
    ingredientsMapper(ingredients)
  );
}

export function loadRecipes() {
  return getRecipes<GetRecipesResponse>().then(({ recipes }) =>
    recipesMapper(recipes)
  );
}
