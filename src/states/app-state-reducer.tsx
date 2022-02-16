import { AppState } from "./app-state-context";
import { Action } from "./app-state-action";
import { nanoid } from "nanoid";
import {
  overrideItemAtIndex,
  findItemIndexById,
  moveItem,
  removeItemAtIndex,
  insertItemAtIndex,
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
    case "MOVE_TASK": {
      const { dragIndex, hoverIndex, sourceColumn, targetColumn } =
        action.payload;

      const sourceListIndex = findItemIndexById(state.lists, sourceColumn);

      console.log(targetColumn);
      const targetListIndex = findItemIndexById(state.lists, targetColumn);

      const sourceList = state.lists[sourceListIndex];
      const task = sourceList.tasks[dragIndex];

      const updatedSourceList = {
        ...sourceList,
        tasks: removeItemAtIndex(sourceList.tasks, dragIndex),
      };

      const stateWithUpdatedSourceList = {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedSourceList,
          sourceListIndex
        ),
      };

      console.log(stateWithUpdatedSourceList);
      console.log(targetListIndex);

      const targetList = stateWithUpdatedSourceList.lists[targetListIndex];

      const updatedTargetList = {
        ...targetList,
        tasks: insertItemAtIndex(targetList.tasks, task, hoverIndex),
      };

      return {
        ...stateWithUpdatedSourceList,
        lists: overrideItemAtIndex(
          stateWithUpdatedSourceList.lists,
          updatedTargetList,
          targetListIndex
        ),
      };
    }
    default: {
      return state;
    }
  }
};
