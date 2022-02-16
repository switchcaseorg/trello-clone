import { useDrop } from "react-dnd";
import { TypeEnum } from "../enums/type.enum";
import { CardDragItem, DragItem } from "../models/drag-item";
import { useAppState } from "../states/app-state-context";

function dispatchForColumn(
  item: DragItem,
  hoverIndex: number,
  dispatch: Function
) {
  const dragIndex = item.index;
  if (dragIndex === hoverIndex) {
    return;
  }
  dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
}

function dispatchForCard(
  item: CardDragItem,
  hoverIndex: number,
  targetColumn: string,
  dispatch: Function
) {
  const dragIndex = item.index;
  const sourceColumn = item.columnId;
  dispatch({
    type: "MOVE_TASK",
    payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
  });
  item.index = hoverIndex;
  item.columnId = targetColumn;
}

export const useItemDrop = (
  index: number,
  columnId: string,
  type: TypeEnum
) => {
  const { dispatch } = useAppState();

  const [, drop] = useDrop({
    accept: [TypeEnum.Column, TypeEnum.Card],
    hover(item: DragItem) {
      const hoverIndex = index.toString() === columnId ? 0 : index;
      if (item.type === TypeEnum.Column) {
        dispatchForColumn(item, hoverIndex, dispatch);
      } else {
        dispatchForCard(
          item,
          type === TypeEnum.Card ? hoverIndex : 0,
          columnId,
          dispatch
        );
      }

      item.index = hoverIndex;
    },
  });
  return { drop };
};
