import { appData } from "./app-state-context";
import { useReducer } from "react";
import { AppStateContext } from "./app-state-context";
import { appStateReducer } from "./app-state-reducer";

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
