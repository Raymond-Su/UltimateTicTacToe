import React, { FC } from 'react';
import StateProvider from './context/AppContext';
import Game from './views/Game/Game';

import './Global.css';

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
