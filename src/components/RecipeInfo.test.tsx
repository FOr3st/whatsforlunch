import React from "react";
import ReactDOM from "react-dom";
import { RecipeInfo } from "./RecipeInfo";

describe("<RecipeInfo>", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <RecipeInfo recipe={{ title: "Test recipe", ingredients: [] }} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
