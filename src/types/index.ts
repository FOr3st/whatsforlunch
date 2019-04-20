export interface Ingredient {
  title: string;
  bestBefore: Date;
  useBy: Date
}

export interface Recipe {
  title: string;
  ingredients: Array<string>;
}