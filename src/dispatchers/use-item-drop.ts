import { useDrop } from "react-dnd";
import { DragItem } from "../models/drag-item";
import { useAppState } from "../states/app-state-context";

export const useItemDrop = (index: number) => {
  const { dispatch } = useAppState();

  const [, drop] = useDrop({
    accept: ["COLUMN"],
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(dragIndex);
      console.log(hoverIndex);

      if (dragIndex === hoverIndex) {
        return;
      }

      dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } });
      item.index = hoverIndex;
    },
  });
  return { drop };
};
