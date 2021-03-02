import React, { createContext, FC, ReactNode, useContext } from 'react';
import GameStore from './stores/gameStore';

const AppContext = createContext<GameStore>({} as GameStore);

interface AppContextProviderProps {
  children: ReactNode;
}

const StateProvider: FC<AppContextProviderProps> = ({
  children
}: AppContextProviderProps) => (
  <AppContext.Provider value={new GameStore()}>{children}</AppContext.Provider>
);

export const useStateValue = (): GameStore => useContext(AppContext);

export default StateProvider;
