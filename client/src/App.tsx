import React, { FC } from 'react';
import StateProvider from './context/AppContext';
import Game from './views/Game/Game';

import './Global.css';

import { io } from 'socket.io-client';
const URL = 'http://localhost:5000';
const socket = io(URL, { autoConnect: false });
socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.connect();

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
