import React, { useState } from "react";
import { NewItemButton } from "../styled-components/button";
import { NewItemFormContainer } from "../styled-components/container";
import { NewItemInput } from "../styled-components/form";
import { useFocus } from "../utils/use-focus";

interface NewItemFormProps {
  onAdd(text: string): void;
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useFocus();
  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
};
