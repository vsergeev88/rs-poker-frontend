import './Lobby-page.scss';

import {
  Box,
  Button,
  // Card,
  // CardActions,
  // CardContent,
  Container,
  Grid,
  // IconButton,
  // makeStyles,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

import Card from '../../Components/card';
import Issue from '../../Components/issue';
import PlayerCard from '../../Components/player-card';
import { cardMockData2, issueMockData, playersMockData } from '../../data/game';

/* const [state, setState] = React.useState({
  gilad: true,
  jason: false,
  antoine: true,
}); */

/* const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setState({ ...state, [event.target.name]: event.target.checked });
}; */

const copyUrlLobby = () => {
  console.log('copyUrlLobby');
};
const startGame = () => {
  console.log('startGame');
};
const cancelGame = () => {
  console.log('cancelGame');
};

const LobbyPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  // const classes = useStyles();
  return (
    <Box className="lobby-page">
      <Container className="lobby-page-wrapper">
        <Typography variant="h4" component="h1" gutterBottom>
          Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
        </Typography>
        <Box className="start-game section" component="section">
          <Typography
            className="label-scram-master text-center"
            variant="h5"
            component="h2"
            gutterBottom>
            Scram master:
          </Typography>
          <Box className="card-master mb-20">
            <PlayerCard player={playersMockData[0]} key={playersMockData[0].playerId} />
          </Box>
          <Box className="link-to-lobby">
            <Typography
              className="label-link-to-lobby"
              variant="h5"
              component="h2"
              gutterBottom>
              Link to lobby:
            </Typography>
            <Box className="copy-to-lobby">
              <TextField
                className="input-link-to-label"
                disabled
                id="outlined-helperText"
                label="http://pockerplanning.com"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button variant="contained" color="primary" onClick={() => copyUrlLobby()}>
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
        <Box className="members section" component="section">
          <Typography
            className="label-members text-center"
            variant="h5"
            component="h2"
            gutterBottom>
            Members:
          </Typography>
          <Box className="cards-wrapper mb-20">
            {playersMockData.map((el) => (
              <PlayerCard player={el} key={el.playerId} />
            ))}
          </Box>
        </Box>
        <Box className="issues section" component="section">
          <Typography
            className="label-issues text-center"
            variant="h5"
            component="h2"
            gutterBottom>
            Issues:
          </Typography>
          <Box className="cards-wrapper mb-20">
            <Issue issue={issueMockData[0]} isLobby={true} />
            <Issue issue={issueMockData[1]} isLobby={false} />
            <Issue issue={issueMockData[2]} isLobby={false} />
          </Box>
        </Box>
        <Container className="setting section" component="section">
          <Typography
            className="setting-issues text-center"
            variant="h5"
            component="h2"
            gutterBottom>
            Game settings:
          </Typography>
          <Grid className="setting-grid" container spacing={3}>
            <Grid item xs={8}>
              <Typography variant="h6" component="h3">
                Scram master as player:
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="h3">
                Changing card in round end:
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6" component="h3">
                Is timer needed:
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Switch
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="h3">
                Score type:
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="setting-scrore-type"
                label="story point"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="h3">
                Score type (Short):
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <TextField id="setting-scrore-type" label="SP" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="h3">
                Round time:
              </Typography>
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
        <Container className="add-cards section" component="section">
          <Typography
            className="label-add-cards text-center"
            variant="h5"
            component="h2"
            gutterBottom>
            Add card values:
          </Typography>
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
