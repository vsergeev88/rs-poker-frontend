import './Lobby-page.scss';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  /*   FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText, */
  Grid,
  IconButton,
  makeStyles,
  Switch,
  TextField,
  Typography,
  /*   Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Input,
  InputLabel,
  Switch,
  TextField, */
} from '@material-ui/core';
/* import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText'; */
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

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
  /*   bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  }, */
  title: {
    fontSize: 14,
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
      <div className="lobby-page">
        <div className="lobby-page-wrapper">Lobby Page</div>
        <Typography variant="h5" component="h2">
          Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
        </Typography>
        <Typography variant="h5" component="h2">
          Scram master:
        </Typography>
        <Card className={classes.root}>
          <CardContent>
            <Avatar>RG</Avatar>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              IT’S YOU
            </Typography>
            <Typography variant="h5" component="h2">
              Rick Giligan
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              lead software engeneer
            </Typography>
          </CardContent>
        </Card>
        <Typography variant="h5" component="h2">
          Link to lobby:
        </Typography>
        <TextField
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
        <Button variant="contained" color="primary" onClick={() => startGame()}>
          Start Game
        </Button>
        <Button variant="outlined" color="primary" onClick={() => cancelGame()}>
          Cancel game
        </Button>
        <Typography variant="h5" component="h2">
          Members:
        </Typography>
        <Card className={classes.root}>
          <CardContent>
            <Avatar alt="Remy Sharp" src="/src/assets/png/avatar-girl.png" />
            <Typography variant="h5" component="h2">
              Rick Giligan 333
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              lead software engeneer
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Block user">
              <BlockIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Avatar alt="Remy Sharp" src="/src/assets/png/avatar-girl.png" />
            <Typography variant="h5" component="h2">
              Rick Giligan 333
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              lead software engeneer
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Block user">
              <BlockIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Avatar alt="Remy Sharp" src="/src/assets/png/avatar-girl.png" />
            <Typography variant="h5" component="h2">
              Rick Giligan 333
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              lead software engeneer
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="Block user">
              <BlockIcon />
            </IconButton>
          </CardActions>
        </Card>
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
      </div>
    </Container>
  );
};

export default LobbyPage;
