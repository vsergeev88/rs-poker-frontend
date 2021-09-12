import './Lobby-page.scss';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

import PlayerCard from '../../Components/player-card';
import { playersMockData } from '../../data/game';

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
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  h1: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
});

const LobbyPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  return (
    <Container className="lobby-page">
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
        <Typography variant="h5" component="h2">
          Issues:
        </Typography>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Issues 542
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Low priority
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Delete">
              <DeleteIcon color="primary" />
            </IconButton>
            <IconButton aria-label="Delete">
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Create New Issues
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Add">
              <AddIcon color="primary" fontSize="large" />
            </IconButton>
          </CardActions>
        </Card>
        <Typography variant="h5" component="h2">
          Game settings:
        </Typography>
        {/* <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={
                <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
              }
              label="Gilad Gray"
            />
            <FormControlLabel
              control={
                <Switch checked={state.jason} onChange={handleChange} name="jason" />
              }
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Switch checked={state.antoine} onChange={handleChange} name="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl> */}
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography variant="h6" component="h2">
              Scram master as player:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Switch
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" component="h2">
              Changing card in round end:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" component="h2">
              Is timer needed:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Switch
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2">
              Score type:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField id="setting-scrore-type" label="story point" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2">
              Score type (Short):
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField id="setting-scrore-type" label="SP" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="h2">
              Round time:
            </Typography>
          </Grid>
          <Grid item xs={6}>
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
        <Typography variant="h5" component="h2">
          Add card values:
        </Typography>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.pos} color="textSecondary">
              12
            </Typography>
            <Typography variant="h5" component="h2">
              SP
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Delete">
              <DeleteIcon color="primary" />
            </IconButton>
            <IconButton aria-label="Delete">
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <AddCircleOutlineIcon color="primary" fontSize="large" />
          </CardContent>
        </Card>
      </Container>
    </Container>
  );
};

export default LobbyPage;
