import React, { createContext, FC, ReactNode, useContext } from 'react';

import RootStore from './stores/rootStore';

const AppContext = createContext<RootStore>({} as RootStore);

interface AppContextProviderProps {
  children: ReactNode;
}

const StateProvider: FC<AppContextProviderProps> = ({
  children
}: AppContextProviderProps) => (
  <AppContext.Provider value={new RootStore()}>{children}</AppContext.Provider>
);

export const useStateValue = (): RootStore => useContext(AppContext);

export default StateProvider;
