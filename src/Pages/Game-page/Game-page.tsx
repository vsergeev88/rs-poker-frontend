import './Game-page.scss';

import { Box, Button, Container } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  AddCard,
  Card,
  Issue,
  IssueAdd,
  LinkToLobby,
  PlayerCard,
  ScoreCard,
  Timer,
} from '../../Components';
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

  const roomId = appState?.users[0].playerId || '';

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
        <TitleMain issues={appState?.issues}>Issue for vote: </TitleMain>

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="text-center">Scram master:</TitleAdd1>
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
          <LinkToLobby value={roomId} />
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
        <Box className="issues section" component="section">
          <div className="issues__title">
            <TitleAdd1 className="text-center">Issues:</TitleAdd1>
          </div>
          <Box className="issues__wrapper">
            <Box className="cards-wrapper_column mb-20">
              {appState?.issues &&
                appState?.issues.map((el) => (
                  <Issue issue={el} isLobby={isMaster} key={el.issueID} />
                ))}
              {isMaster && <IssueAdd />}
            </Box>
            <Box className="run__wrapper">
              <Timer time={120} />
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

        {/******************** Add Cards Section ********************/}
        <Container className="add-cards section" component="section">
          <TitleAdd1 className="label-add-cards text-center">Add card values:</TitleAdd1>
          <Box className="cards-wrapper justify-content-start mb-20">
            {isMaster && <AddCard />}
            {appState?.cardsDeck.length
              ? appState?.cardsDeck.map((el, key) => (
                  <Card
                    propCardValue={el}
                    shortScoreType={appState?.settings.scoreTypeShort}
                    allowEdit={true}
                    cardIndex={key}
                    key={key}
                  />
                ))
              : ''}
          </Box>
        </Container>
      </Container>
      <Box className="aside section" component="section">
        <Box>
          <TitleAdd1 className="text-center">Score:</TitleAdd1>
          <Box className="cards__wrapper mb-20">
            <ScoreCard score={10} />
            <ScoreCard score={null} />
            <ScoreCard score={10} />
            <ScoreCard score={null} />
            <ScoreCard score={5} />
            <ScoreCard score={null} />
            <ScoreCard score={null} />
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
