import React from "react";
import { Recipe } from "../types";

export interface RecipeInfoProps {
  recipe: Recipe;
}

export const RecipeInfo: React.SFC<RecipeInfoProps> = ({
  recipe: { title, ingredients }
}) => (
  <div>
    <h3>{title}</h3>
    <h5>What you'll need:</h5>

    <ul>
      {ingredients.map(name => (
        <li>{name}</li>
      ))}
    </ul>
  </div>
);
