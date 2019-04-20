import React from "react";
import styled from "styled-components";
import { MainPageContainer } from "./containers";
import { GlobalStyles } from "./GlobalStyles";

const StyledMain = styled.main`
  height: 100%;
`;

export class App extends React.Component {
  render() {
    return (
      <StyledMain>
        <GlobalStyles />
        <MainPageContainer />
      </StyledMain>
    );
  }
}
