import React, { useRef } from "react";
import { ColumnContainer } from "../styled-components/container";
import { ColumnTitle } from "../styled-components/title";
import { AddNewItem } from "./add-new-item";
import { useAppState } from "../states/app-state-context";
import { Card } from "../components/card";
import { useItemDrag } from "../dispatchers/use-item-drag";
import { isHidden } from "../utils/is-hidden";
import { TypeEnum } from "../enums/type.enum";
import { DragItem } from "../models/drag-item";
import { useDrop } from "react-dnd";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean;
}
export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: [TypeEnum.Column, TypeEnum.Card],
    hover(item: DragItem) {
      if (item.type === TypeEnum.Column) {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
        item.index = hoverIndex;
      } else {
        const dragIndex = item.index;
        const hoverIndex = 0;
        const sourceColumn = item.columnId;
        const targetColumn = id;

        if (sourceColumn === targetColumn) {
          return;
        }

        dispatch({
          type: "MOVE_TASK",
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
        });

        item.index = hoverIndex;
        item.columnId = targetColumn;
      }
    },
  });
  const { drag } = useItemDrag({ type: TypeEnum.Column, id, index, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, TypeEnum.Column, id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card
          id={task.id}
          columnId={id}
          text={task.text}
          key={task.id}
          index={i}
        />
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
