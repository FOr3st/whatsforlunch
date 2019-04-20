import React from "react";
import { MainPageContainer } from "./containers";
import { GlobalStyles } from "./GlobalStyles";
import styled from "styled-components";

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
