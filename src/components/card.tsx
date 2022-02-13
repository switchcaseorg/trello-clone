import React from "react";
import { CardContainer } from "../styled-components/container";

interface CardProps {
  text: string;
  index: number;
}

export const Card = ({ text }: CardProps) => {
  return <CardContainer>{text}</CardContainer>;
};
