import React from "react";
import { ColumnContainer } from "../styles/container";
import { ColumnTitle } from "../styles/title";

interface ColumnProps {
  text?: string;
}

export const Column = ({
  text,
  children,
}: React.PropsWithChildren<ColumnProps>) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
    </ColumnContainer>
  );
};
