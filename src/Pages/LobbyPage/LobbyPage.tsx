import './LobbyPage.scss';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  makeStyles,
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
import AddIcon from '@material-ui/icons/Add';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

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
      </div>
    </Container>
  );
};

export default LobbyPage;
