import { get } from "./api";

const BASE_URL = process.env.REACT_APP_BACKEND || "http://www.mocky.io/v2";

export function getIngredients<T>() {
  return get<T>(`${BASE_URL}/5cb016f83100006c00e131b0`);
}

export function getRecipes<T>() {
  return get<T>(`${BASE_URL}/5c85f7a1340000e50f89bd6c`);
}
