import React from "react";
import ReactDOM from "react-dom";
import { MainPageContainer } from "./MainPageContainer";

describe("<MainPageContainer>", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    
    ReactDOM.render(<MainPageContainer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
