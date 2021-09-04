import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import GamePage from './Pages/GamePage';
import LobbyPage from './Pages/LobbyPage';
import MainPage from './Pages/MainPage';

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/lobby">
          <LobbyPage />
        </Route>
        <Route path="/game">
          <GamePage />
        </Route>
      </Switch>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
