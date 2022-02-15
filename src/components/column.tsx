import React, { useRef } from "react";
import { ColumnContainer } from "../styled-components/container";
import { ColumnTitle } from "../styled-components/title";
import { AddNewItem } from "./add-new-item";
import { useAppState } from "../states/app-state-context";
import { Card } from "../components/card";
import { useItemDrag } from "../dispatchers/use-item-drag";
import { useItemDrop } from "../dispatchers/use-item-drop";
import { isHidden } from "../utils/is-hidden";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}
export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drop } = useItemDrop(index);
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

  drag(drop(ref));
  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card text={task.text} key={task.id} index={i} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) =>
          dispatch({ type: "ADD_TASK", payload: { text, listId: id } })
        }
        dark
      />
    </ColumnContainer>
  );
};
