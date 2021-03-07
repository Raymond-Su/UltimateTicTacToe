import './Global.css';

import React, { FC } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import Header from './components/Header';
import StateProvider from './context/AppContext';
import Game from './views/Game';
import OnlineGame from './views/OnlineGame';

const App: FC = () => {
  return (
    <div className="App">
      <StateProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Game} />
            <Route path="/online/*" component={OnlineGame} />
          </Switch>
        </Router>
      </StateProvider>
    </div>
  );
};

export default App;
