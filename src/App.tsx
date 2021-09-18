import './App.scss';

import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './Components/Footer';
import Header from './Components/Header';
import { AppProvider } from './content/app-state';
import { SocketProvider } from './content/socket';
import GamePage from './Pages/Game-page';
import LobbyPage from './Pages/Lobby-page';
import MainPage from './Pages/Main-page';
import TestPage from './Pages/Test-page';

function App() {
  return (
    <Router>
      <div>
        <Header />
      </div>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={3000}
        preventDuplicate
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
        <SocketProvider>
          <AppProvider>
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
              <Route path="/test">
                <TestPage />
              </Route>
            </Switch>
          </AppProvider>
        </SocketProvider>
      </SnackbarProvider>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
