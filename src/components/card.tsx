import React, { useRef } from "react";
import { useItemDrag } from "../dispatchers/use-item-drag";
import { useItemDrop } from "../dispatchers/use-item-drop";
import { TypeEnum } from "../enums/type.enum";
import { useAppState } from "../states/app-state-context";
import { CardContainer } from "../styled-components/container";
import { isHidden } from "../utils/is-hidden";

interface CardProps {
  text: string;
  index: number;
  id: string;
  columnId: string;
  isPreview?: boolean;
}
export const Card = ({ text, id, index, columnId, isPreview }: CardProps) => {
  const { state } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({
    type: TypeEnum.Card,
    id,
    index,
    text,
    columnId,
  });
  console.log(columnId);
  const { drop } = useItemDrop(index, columnId, TypeEnum.Card);
  drag(drop(ref));
  return (
    <CardContainer
      isHidden={isHidden(isPreview, state.draggedItem, TypeEnum.Card, id)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};
