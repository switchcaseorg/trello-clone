import React from "react";
import "./styles/index.scss";
import { AppContainer } from "./styles/container";
import { Card } from "./components/card";
import { Column } from "./components/column";

const App = () => {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Generate app scaffold" />
      </Column>
      <Column text="In Progress">
        <Card text="Learn Typescript" />
      </Column>
      <Column text="Done">
        <Card text="Begin to use static typing" />
      </Column>
    </AppContainer>
  );
};

export default App;
