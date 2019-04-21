import React from "react";
import styled from "styled-components";
import { Ingredient, Recipe } from "../types";
import { getSortedAvailableRecipes } from "../utils";
import { RecipeInfo } from "./RecipeInfo";

export interface MainPageProps {
  ingredients: Array<Ingredient>;
  recipes: Array<Recipe>;
}

export interface MainPageState {
  recipesView: boolean;
}

const StyledButton = styled.button`
  background-color: red;
  border-radius: 20px;
  border: 1px solid black;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1.5rem;
`;

const PageContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`;

export class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      recipesView: false
    };
  }

  private viewRecipes = () => {
    this.setState({ recipesView: true });
  };

  render() {
    const { recipesView } = this.state;

    return (
      <PageContainer>
        {recipesView ? this.renderRecipes() : this.renderButton()}
      </PageContainer>
    );
  }

  renderButton() {
    return (
      <StyledButton onClick={this.viewRecipes}>What's for lunch?</StyledButton>
    );
  }

  renderRecipes() {
    const { ingredients, recipes } = this.props;

    const sortedAvailableRecipes = getSortedAvailableRecipes(
      recipes,
      ingredients
    );

    const listItems = sortedAvailableRecipes.map((recipe, ind) => (
      <RecipeInfo key={ind} recipe={recipe} />
    ));

    return <div>{listItems}</div>;
  }
}
