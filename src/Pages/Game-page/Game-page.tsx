import './Game-page.scss';

import { Box, Button, Container } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FC, useContext, useEffect, useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Card,
  GameButton,
  Issue,
  IssueAdd,
  PlayerCard,
  ScoreCard,
  Statistics,
  Timer,
} from '../../Components';
import { TitleAdd1, TitleGame } from '../../Components/titles';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TIssue, TPlayer } from '../../types/types';

const GamePage: FC = () => {
  const [isMaster, setMaster] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<TIssue | undefined>(undefined);

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const roomId = appState?.users.length ? appState?.users[0].playerId : '';

  useEffect(() => {
    setCurrentIssue(appState?.issues.find((el) => el.current === true));
  }, [appState?.issues]);

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
    } else {
      if (appState?.settings.showResults) {
        history.push('/game-result');
      }
    }
  }, [appState?.settings.isGameStarted, appState?.settings.showResults]);

  useEffect(() => {
    if (appState?.settings.isRoundStarted) {
      enqueueSnackbar('Round started!', { variant: 'info' });
    } else {
      if (currentIssue?.poolResults?.isVotingPassed)
        enqueueSnackbar('Round ended!', { variant: 'info' });
    }
  }, [appState?.settings.isRoundStarted, currentIssue?.poolResults?.isVotingPassed]);

  const handleClickStopGame = () => {
    if (isMaster) {
      const settings = {
        ...appState?.settings,
        isGameStarted: false,
        isRoundStarted: false,
        cardsDeck: appState?.cardsDeck,
      };
      socket?.emit('saveSettings', settings, roomId, (error: string) => {
        error
          ? enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
          : enqueueSnackbar('Game stopped!', { variant: 'success' });
      });
    } else {
      socket?.emit('kickPlayer', socket?.id, 'just left the game');
    }
  };

  const handleClickFinishGame = () => {
    const settings = {
      ...appState?.settings,
      isRoundStarted: false,
      showResults: true,
      cardsDeck: appState?.cardsDeck,
    };
    socket?.emit('saveSettings', settings, roomId, (error: string) => {
      error
        ? enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
        : enqueueSnackbar('Game finished!', { variant: 'info' });
    });
  };

  return (
    <Box className="game-page">
      <Container className="game-page__wrapper">
        <Box className="card-master">
          <TitleGame currentIssue={currentIssue} />
          {isMaster && (
            <Button
              className="p-10"
              variant="outlined"
              color="primary"
              onClick={handleClickFinishGame}>
              Finish game
            </Button>
          )}
        </Box>

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="text-left">Scram master:</TitleAdd1>
          <Box className="card-master">
            {appState?.users.length && (
              <PlayerCard
                player={appState?.users[0] as TPlayer}
                key={appState?.users[0].playerId}
                playersCount={appState?.users.length}
                isMaster={isMaster}
              />
            )}
            {appState?.settings.isTimerNeed && (
              <Timer time={appState?.settings.roundTime as number} isMaster={isMaster} />
            )}
            <Box className="button-stop mb-20">
              <Button
                className="p-10"
                variant="outlined"
                color="secondary"
                onClick={handleClickStopGame}>
                {isMaster ? 'Back to lobby' : 'Exit'}
              </Button>
            </Box>
          </Box>
        </Box>

        {/******************** Issues Section ********************/}
        <Box className="issues section" component="section">
          <div className="issues__title">
            <TitleAdd1 className="text-left">Issues:</TitleAdd1>
          </div>
          <Box className="issues__wrapper">
            <Box className="cards-wrapper_column mb-20">
              {appState?.issues &&
                appState?.issues.map((el) => (
                  <Issue
                    issue={el}
                    isLobby={false}
                    key={el.issueID}
                    isMaster={isMaster}
                  />
                ))}
              {isMaster && <IssueAdd />}
            </Box>
            <div className="issues-nav-stats__wrapper">
              <Box className="run__wrapper">
                {isMaster && <GameButton currentIssue={currentIssue} roomId={roomId} />}
              </Box>
              {currentIssue?.poolResults?.isVotingPassed && (
                <Statistics data={currentIssue?.poolResults?.votes} />
              )}
            </div>
          </Box>
        </Box>

        {/******************** Add Cards Section ********************/}
        {((appState?.settings.isMasterAsPlayer && isMaster) || !isMaster) && (
          <Container className="add-cards section" component="section">
            <TitleAdd1 className="label-add-cards text-left">Cards available:</TitleAdd1>
            <Box className="cards-wrapper justify-content-start mb-20">
              {appState?.cardsDeck.length
                ? appState?.cardsDeck.map((el, key) => (
                    <Card
                      propCardValue={el}
                      shortScoreType={appState?.settings.scoreTypeShort}
                      allowEdit={false}
                      cardIndex={key}
                      key={key}
                    />
                  ))
                : ''}
            </Box>
          </Container>
        )}
      </Container>
      <Box className="aside section" component="section">
        <Box>
          <TitleAdd1 className="text-center">Score:</TitleAdd1>
          <Box className="cards__wrapper mb-20">
            {appState?.users.length &&
              appState?.users
                .filter(
                  (el) =>
                    !el.master || (el.master && appState?.settings.isMasterAsPlayer),
                )
                .map((el) => (
                  <ScoreCard
                    poolResults={currentIssue?.poolResults}
                    userID={el.playerId}
                    key={el.playerId}
                    isRoundStarted={appState?.settings.isRoundStarted}
                  />
                ))}
          </Box>
        </Box>
        <Box>
          <TitleAdd1 className="text-center">Players:</TitleAdd1>
          <Box className="cards__wrapper mb-20">
            {appState?.users.length &&
              appState?.users
                .filter(
                  (el) =>
                    !el.master || (el.master && appState?.settings.isMasterAsPlayer),
                )
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
