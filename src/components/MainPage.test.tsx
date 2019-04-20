import React from "react";
import ReactDOM from "react-dom";
import { MainPage } from "./MainPage";

describe("<MainPage>", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(<MainPage ingredients={[]} recipes={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
