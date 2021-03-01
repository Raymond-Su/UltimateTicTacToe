import React, { FC } from 'react';
import './App.css';
import AppContextProvider from './context/AppContext';
import Game from './views/Game/Game';

const App: FC = () => {
  return (
    <div className="App">
      <AppContextProvider>
        <Game />
      </AppContextProvider>
    </div>
  );
};

export default App;
