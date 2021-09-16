import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import { SocketProvider } from './content/socket';
import GamePage from './Pages/Game-page';
import LobbyPage from './Pages/Lobby-page';
import MainPage from './Pages/Main-page';

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <SocketProvider>
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
      </SocketProvider>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
