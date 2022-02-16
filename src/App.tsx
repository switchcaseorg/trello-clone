import React from "react";
import "./styles/index.scss";
import { AppContainer } from "./styled-components/container";
import { Column } from "./components/column";
import { AddNewItem } from "./components/add-new-item";
import { useAppState } from "./states/app-state-context";
import CustomDragLayer from "./components/custom-drag-layer";

const App = () => {
  const { state, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </AppContainer>
  );
};

export default App;
