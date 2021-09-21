import './Game-page.scss';

import { Box, Button, Container } from '@material-ui/core';
import {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import React from 'react';

// import { useHistory } from 'react-router-dom';
import Issue from '../../Components/issue';
import IssueAdd from '../../Components/issue-add';
import PlayerCard from '../../Components/player-card';
import ScoreCard from '../../Components/ScoreCard';
import Timer from '../../Components/Timer';
import { TitleAdd1, TitleMain } from '../../Components/titles';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TPlayer } from '../../data/game';

const GamePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [isMaster, setMaster] = useState(false);

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  // const history = useHistory();

  useEffect(() => {
    if (appState?.users.length) {
      const id = socket?.id;
      const user = appState?.users.find((user) => user.playerId === id);
      user ? setMaster(user?.master as boolean) : ''; //history.push('/');
    }
  }, [appState?.users, appState?.issues]);

  const handleClickStopGame = useCallback(() => console.log('stopGame'), []);

  const handleClickRunRound = useCallback(() => console.log('runRound'), []);

  return (
    <Box className="game-page">
      <Container className="game-page__wrapper">
        <TitleMain className="title">
          Spring 13 planning (issues 13, 533, 5623, 3252, 6623, ...)
        </TitleMain>

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
          <Box className="button-stop mb-20">
            <Button
              className="p-10"
              variant="outlined"
              color="primary"
              onClick={handleClickStopGame}>
              Stop game
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
                  <Issue issue={el} isLobby={true} key={el.issueID} />
                ))}
              <IssueAdd />
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
