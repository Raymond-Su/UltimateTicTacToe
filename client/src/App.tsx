import React, { FC } from 'react';
import './App.css';
import StateProvider from './context/AppContext';
import Game from './views/Game/Game';

const App: FC = () => {
  return (
    <div className="App">
      <StateProvider>
        <Game />
      </StateProvider>
    </div>
  );
};

export default App;
