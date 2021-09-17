import './Game-page.scss';

import { Box, Button, Container, Grid } from '@material-ui/core';
import { FunctionComponent, HTMLAttributes, useCallback } from 'react';
import React from 'react';

import Issue from '../../Components/issue';
import PlayerCard from '../../Components/player-card';
import Timer from '../../Components/Timer';
import { TitleAdd1, TitleMain } from '../../Components/titles';
import { issueMockData, playersMockData } from '../../data/game';
import IssueAdd from '../../Components/issue-add';
import ScoreCard from '../../Components/ScoreCard';

const GamePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const handleClickStopGame = useCallback(() => console.log('stopGame'), []);

  const handleClickRunRound = useCallback(() => console.log('runRound'), []);

  return (
    <Box className="game-page">
      <Container className="game-page__wrapper">
        <TitleMain className="title">Spring 13 planning (issues 13, 533, 5623, 3252, 6623, ...)</TitleMain>

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="text-center">Scram master:</TitleAdd1>
          <Box className="card-master">
            <PlayerCard player={playersMockData[0]} key={playersMockData[0].playerId} cardType='big' />
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
              <Issue issue={issueMockData[2]} isLobby={false} />
              <Issue issue={issueMockData[1]} isLobby={false} />
              <Issue issue={issueMockData[0]} isLobby={false} />
              <IssueAdd />
            </Box>
            <Box className="run__wrapper">
                <Timer />
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
            <PlayerCard player={playersMockData[0]} key={playersMockData[0].playerId} cardType='small' />
            <PlayerCard player={playersMockData[2]} key={playersMockData[2].playerId} cardType='small'/>
            <PlayerCard player={playersMockData[5]} key={playersMockData[5].playerId} cardType='small'/>
            <PlayerCard player={playersMockData[7]} key={playersMockData[7].playerId} cardType='small'/>
            <PlayerCard player={playersMockData[3]} key={playersMockData[3].playerId} cardType='small'/>
            <PlayerCard player={playersMockData[4]} key={playersMockData[4].playerId} cardType='small'/>
            <PlayerCard player={playersMockData[6]} key={playersMockData[6].playerId} cardType='small'/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GamePage;
