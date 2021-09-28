import './Game-page.scss';

import { Box, Button, Container } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Card, Issue, IssueAdd, PlayerCard, ScoreCard, Timer } from '../../Components';
import { TitleAdd1, TitleMain } from '../../Components/titles';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TPlayer } from '../../data/types';

const GamePage: FC = () => {
  const [isMaster, setMaster] = useState(false);

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (appState?.users.length) {
      const id = socket?.id;
      const user = appState?.users.find((user) => user.playerId === id);
      user ? setMaster(user?.master as boolean) : history.push('/');
    } else {
      history.push('/');
    }
  }, [appState?.users]);

  useEffect(() => {
    if (!appState?.settings.isGameStarted) {
      history.push('/lobby');
      if (!isMaster) enqueueSnackbar('Game canceled!', { variant: 'warning' });
    }
  }, [appState?.settings.isGameStarted]);

  const handleClickStopGame = () => {
    if (isMaster) {
      const roomId = appState?.users[0].playerId;
      const cardsDeck = appState?.cardsDeck;
      const settings = { ...appState?.settings, isGameStarted: false, cardsDeck };
      socket?.emit('saveSettings', settings, roomId, (error: string) => {
        error
          ? enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
          : enqueueSnackbar('Game stopped!', { variant: 'success' });
      });
    } else {
      socket?.emit('kickPlayer', socket?.id, 'just left the game');
    }
  };

  const handleClickRunRound = useCallback(() => console.log('runRound'), []);

  return (
    <Box className="game-page">
      <Container className="game-page__wrapper">
        <TitleMain className="title">
          Spring 13 planning (
          {appState?.issues && appState?.issues.map((issue) => issue.name).join(', ')})
        </TitleMain>

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="text-center">Scram master:</TitleAdd1>
          <Box className="card-master-and-timer">
            <Box className="card-master">
              {appState?.users.length && (
                <PlayerCard
                  player={appState?.users[0] as TPlayer}
                  key={appState?.users[0].playerId}
                  playersCount={appState?.users.length}
                  isMaster={isMaster}
                />
              )}
            </Box>
            {isMaster ? null : (
              <Timer
                time={appState?.settings.roundTime ? appState?.settings.roundTime : 0}
              />
            )}
          </Box>
          <Box className="button-stop mb-20">
            <Button
              className="p-10"
              variant="outlined"
              color="primary"
              onClick={handleClickStopGame}>
              {isMaster ? 'Stop game' : 'Exit'}
            </Button>
          </Box>
        </Box>

        {/******************** Issues Section ********************/}
        {isMaster ? (
          <Box className="issues section" component="section">
            <div className="issues__title">
              <TitleAdd1 className="text-center">Issues:</TitleAdd1>
            </div>
            <Box className="issues__wrapper">
              <Box className="cards-wrapper_column mb-20">
                {appState?.issues &&
                  appState?.issues.map((el) => (
                    <Issue issue={el} isLobby={true} key={el.issueID} />
                  ))}
                <IssueAdd />
              </Box>
              <Box className="run__wrapper">
                <Timer
                  time={appState?.settings.roundTime ? appState?.settings.roundTime : 0}
                />
                <Button
                  className="p-10"
                  variant="contained"
                  color="primary"
                  onClick={handleClickRunRound}>
                  Run Round
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box className="cards-wrapper_column mb-20">
              {appState?.issues &&
                appState?.issues.map((el) => (
                  <Issue issue={el} isLobby={false} key={el.issueID} />
                ))}
            </Box>
            <Box className="cards-wrapper justify-content-center mb-20">
              {appState?.cardsDeck.length
                ? appState?.cardsDeck.map((el, key) => (
                    <Card
                      propCardValue={el}
                      shortScoreType={'SP'}
                      allowEdit={false}
                      cardIndex={key}
                      key={key}
                    />
                  ))
                : ''}
            </Box>
          </Box>
        )}
      </Container>

      {/******************** Aside Section ********************/}
      <Box className="aside section" component="section">
        <Box>
          <TitleAdd1 className="text-center">Score:</TitleAdd1>
          <Box className="cards__wrapper mb-20">
            {appState?.users.length &&
              appState?.users.map((el) => <ScoreCard score={null} key={el.playerId}/>)}
          </Box>
        </Box>
        <Box>
          <TitleAdd1 className="text-center">Players:</TitleAdd1>
          <Box className="cards__wrapper mb-20">
            {appState?.users.length &&
              appState?.users
                // .filter((e) => !e.master) // alow master to participate depends of settings
                .map((el) => (
                  <PlayerCard
                    player={el}
                    key={el.playerId}
                    playersCount={appState?.users.length}
                    isMaster={isMaster}
                    cardType="small"
                  />
                ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GamePage;
