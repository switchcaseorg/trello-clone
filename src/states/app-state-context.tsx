import React, { createContext, useContext } from "react";
import { Action } from "./app-state-action";
import { DragItem } from "../models/drag-item";

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const appData: AppState = {
  draggedItem: undefined,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

interface Task {
  id: string;
  text: string;
}
interface Column {
  id: string;
  text: string;
  tasks: Task[];
}

export interface AppState {
  lists: Column[];
  draggedItem: DragItem | undefined;
}
