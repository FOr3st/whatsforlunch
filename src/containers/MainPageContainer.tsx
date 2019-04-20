import React from "react";
import { loadIngredients, loadRecipes } from "../actions";
import { Ingredient, Recipe } from "../types";
import { MainPage } from "../components";

export interface MainPageContainerState {
  ingredients: Array<Ingredient>;
  recipes: Array<Recipe>;
}

export class MainPageContainer extends React.Component<
  any,
  MainPageContainerState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      ingredients: [],
      recipes: []
    };
  }

  async componentDidMount() {
    const ingredients = await loadIngredients();
    const recipes = await loadRecipes();

    this.setState({ ingredients, recipes });
  }

  render() {
    const { ingredients, recipes } = this.state;

    return <MainPage ingredients={ingredients} recipes={recipes} />;
  }
}
