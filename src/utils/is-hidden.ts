import { DragItem } from "../models/drag-item";

export const isHidden = (
  isPreview: boolean | undefined,
  draggedItem: DragItem | undefined,
  itemType: string,
  id: string
): boolean => {
  return Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  );
};
