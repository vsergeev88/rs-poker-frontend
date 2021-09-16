import './Game-page.scss';

import { Box, Button, Container, Grid } from '@material-ui/core';
import {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import React from 'react';

import Issue from '../../Components/issue';
import PlayerCard from '../../Components/player-card';
import { TitleAdd1, TitleMain } from '../../Components/titles';
import { issueMockData, playersMockData } from '../../data/game';
import Timer from '../../Components/Timer';

const GamePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {

  const handleClickStopGame = useCallback(() => console.log('stopGame'), []);

  const handleClickRunRound = useCallback(() => console.log('runRound'), []);

  return (
    <Box className="game-page">
      <Container className="game-page-wrapper">
        <TitleMain>Spring 13 planning (issues 13, 533, 5623, 3252, 6623, ...)</TitleMain>

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="label-scram-master text-center">Scram master:</TitleAdd1>
          <Box className="card-master mb-20">
            <PlayerCard player={playersMockData[0]} key={playersMockData[0].playerId} />
          </Box>
          <Box className="button-game mt-20 mb-20">
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
          <TitleAdd1 className="label-issues text-center">Issues:</TitleAdd1>
          <Box className="issues-wrapper">
            <Box className="cards-wrapper-column mb-20">
              <Issue issue={issueMockData[0]} isLobby={false} />
              <Issue issue={issueMockData[1]} isLobby={false} />
              <Issue issue={issueMockData[2]} isLobby={false} />
            </Box>
            <Box className="run-wrapper">
              <Grid item xs={2}>
                <Timer />
              </Grid>
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
    </Box>
  );
};

export default GamePage;
