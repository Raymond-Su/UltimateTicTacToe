import React, {
  createContext,
  FC,
  ReactNode,
  useReducer,
  useMemo,
  Dispatch,
  useContext
} from 'react';
import { AppState, StateAction } from '../types/context';
import { AppReducer, initialState } from './reducer';

const AppContext = createContext<[AppState, Dispatch<StateAction>]>([
  initialState,
  () => null
]);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({
  children
}: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const value: [AppState, Dispatch<StateAction>] = useMemo(
    () => [state, dispatch],
    [state]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = (): [AppState, Dispatch<StateAction>] =>
  useContext(AppContext);

export default AppContextProvider;
