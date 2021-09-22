import './App.scss';

import { SnackbarProvider } from 'notistack';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Footer, Header } from './Components';
import { AppProvider } from './content/app-state';
import { SocketProvider } from './content/socket';
import { GamePage, LobbyPage, MainPage, TestPage } from './Pages';

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
