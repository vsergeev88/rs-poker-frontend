import './Lobby-page.scss';

import { Box, Button, Container, Grid, Switch, TextField } from '@material-ui/core';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import React from 'react';

import Card from '../../Components/card';
import Issue from '../../Components/issue';
import PlayerCard from '../../Components/player-card';
import { TitleAdd1, TitleAdd2, TitleMain } from '../../Components/titles';
import { cardMockData2, issueMockData, playersMockData } from '../../data/game';

const LobbyPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const startGame = () => {
    console.log('startGame');
  };
  const cancelGame = () => {
    console.log('cancelGame');
  };

  const copyUrlLobby = (copyText: string) => {
    console.log('copyUrlLobby');
    navigator.clipboard.writeText(copyText);
  };

  const [copyText, setCopyText] = useState(window.location.host);

  return (
    <Box className="lobby-page">
      <Container className="lobby-page-wrapper">
        <TitleMain>Spring 13 planning (issues 13, 533, 5623, 3252, 6623, ...)</TitleMain>

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="label-scram-master text-center">Scram master:</TitleAdd1>
          <Box className="card-master mb-20">
            <PlayerCard player={playersMockData[0]} key={playersMockData[0].playerId} />
          </Box>
          <Box className="link-to-lobby">
            <TitleAdd1 className="label-link-to-lobby">Link to lobby:</TitleAdd1>
            <Box className="copy-to-lobby">
              <TextField
                disabled
                className="input-link-to-label"
                id="outlined-helperText"
                defaultValue={copyText}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                onChange={(e) => setCopyText(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => copyUrlLobby(copyText)}>
                Copy
              </Button>
            </Box>
          </Box>
          <Box className="buttons-game mt-20 mb-20">
            <Button
              className="p-10"
              variant="contained"
              color="primary"
              onClick={() => startGame()}>
              Start Game
            </Button>
            <Button
              className="p-10"
              variant="outlined"
              color="primary"
              onClick={() => cancelGame()}>
              Cancel game
            </Button>
          </Box>
        </Box>

        {/******************** Members Section ********************/}
        <Box className="members section" component="section">
          <TitleAdd1 className="label-members text-center">Members:</TitleAdd1>
          <Box className="cards-wrapper mb-20">
            {playersMockData.map((el) => (
              <PlayerCard player={el} key={el.playerId} />
            ))}
          </Box>
        </Box>

        {/******************** Issues Section ********************/}
        <Box className="issues section" component="section">
          <TitleAdd1 className="label-issues text-center">Issues:</TitleAdd1>
          <Box className="cards-wrapper mb-20">
            <Issue issue={issueMockData[0]} isLobby={true} />
            <Issue issue={issueMockData[1]} isLobby={false} />
            <Issue issue={issueMockData[2]} isLobby={false} />
          </Box>
        </Box>

        {/******************** Setting Section ********************/}
        <Container className="setting section" component="section">
          <TitleAdd1 className="setting-issues text-center">Game settings:</TitleAdd1>
          <Grid className="setting-grid" container spacing={3}>
            <Grid item xs={8}>
              <TitleAdd2>Scram master as player:</TitleAdd2>
            </Grid>
            <Grid item xs={1}>
              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs={8}>
              <TitleAdd2>Changing card in round end:</TitleAdd2>
            </Grid>
            <Grid item xs={1}>
              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs={8}>
              <TitleAdd2>Is timer needed:</TitleAdd2>
            </Grid>
            <Grid item xs={1}>
              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TitleAdd2>Score type:</TitleAdd2>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="setting-scrore-type"
                label="story point"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TitleAdd2>Score type (Short):</TitleAdd2>
            </Grid>
            <Grid item xs={2}>
              <TextField id="setting-scrore-type" label="SP" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TitleAdd2>Round time:</TitleAdd2>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="time"
                label="Round time"
                type="time"
                defaultValue="00:01:30"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 10, // 5 min
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/******************** Add Cards Section ********************/}
        <Container className="add-cards section" component="section">
          <TitleAdd1 className="label-add-cards text-center">Add card values:</TitleAdd1>
          <Box className="cards-wrapper justify-content-start mb-20">
            {cardMockData2.map((el, key) => (
              <Card
                propCardValue={el.toString()}
                shortScoreType={'SP'}
                allowEdit={true}
                key={key}
              />
            ))}
          </Box>
        </Container>
      </Container>
    </Box>
  );
};

export default LobbyPage;
