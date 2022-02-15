import { AppState } from "./app-state-context";
import { Action } from "./app-state-action";
import { nanoid } from "nanoid";
import {
  overrideItemAtIndex,
  findItemIndexById,
  moveItem,
} from "../utils/array-utils";

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] },
        ],
      };
    }
    case "ADD_TASK": {
      const targetListIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      );
      const targetList = state.lists[targetListIndex];
      const updatedTargetList = {
        ...targetList,
        tasks: [
          ...targetList.tasks,
          { id: nanoid(), text: action.payload.text },
        ],
      };
      return {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedTargetList,
          targetListIndex
        ),
      };
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload;
      return {
        ...state,
        lists: moveItem(state.lists, dragIndex, hoverIndex),
      };
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload };
    }
    default: {
      return state;
    }
  }
};
