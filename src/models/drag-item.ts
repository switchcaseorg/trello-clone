import { TypeEnum } from "../enums/type.enum";

export type CardDragItem = {
  index: number;
  id: string;
  columnId: string;
  text: string;
  type: TypeEnum.Card;
};

export type ColumnDragItem = {
  index: number;
  id: string;
  text: string;
  type: TypeEnum.Column;
};

export type DragItem = CardDragItem | ColumnDragItem;
