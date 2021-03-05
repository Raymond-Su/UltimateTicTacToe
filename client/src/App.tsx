import React, { FC } from 'react';
import StateProvider from './context/AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Game from './views/Game';
import OnlineGame from './views/OnlineGame';

import './Global.css';

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
