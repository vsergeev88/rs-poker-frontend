import './Lobby-page.scss';

import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';
import {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import React from 'react';
import { useHistory } from 'react-router';

import AddCard from '../../Components/Add-card';
import Card from '../../Components/card';
import Chat from '../../Components/chat';
import Issue from '../../Components/issue';
import IssueAdd from '../../Components/issue-add';
import PlayerCard from '../../Components/player-card';
import { TitleAdd1, TitleAdd2, TitleMain } from '../../Components/titles';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { deck2 } from '../../data/deck';
import { TPlayer } from '../../data/game';

const LobbyPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const startGame = () => {
    console.log('startGame');
  };
  const cancelGame = () => {
    console.log('cancelGame');
  };
  const exitGame = () => {
    console.log('exitGame');
  };
  const copyUrlLobby = (copyText: string | undefined) => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      setCopyTextBtn('Copied');
    }
  };

  const [copyText, setCopyText] = useState<string | undefined>('');
  const [copyTextBtn, setCopyTextBtn] = useState('Copy');
  const [isMasterAsPlayer, setIsMasterAsPlayer] = useState(false);
  const [isCardRound, setIsCardRound] = useState(true);
  const [isTimerNeed, setIsTimerNeed] = useState(true);
  const [scoreType, setScoreType] = useState('Story point');
  const [isScoreTypeError, setIsScoreTypeError] = useState(false);
  const [scoreTypeShort, setScoreTypeShort] = useState('SP');
  const [isScoreTypeShortError, setIsScoreTypeShortError] = useState(false);
  const [roundTime, setRoundTime] = useState('00:01:30');
  const [isMaster, setMaster] = useState(false);

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const history = useHistory();

  useEffect(() => {
    console.log(appState?.users);
    console.log(appState?.issues);

    if (appState?.users.length) {
      setCopyText(appState?.users[0].playerId);

      const id = socket?.id;
      const user = appState?.users.find((user) => user.playerId === id);
      user ? setMaster(user?.master as boolean) : history.push('/');
    }
  }, [appState?.users, appState?.issues]);

  const handleChangeScoreTypeShort = (event: string) => {
    const maxLength = 2;
    if (event.length > maxLength) {
      setIsScoreTypeShortError(true);
      setScoreTypeShort(event.substring(0, maxLength));
    } else {
      setIsScoreTypeShortError(false);
      setScoreTypeShort(event);
    }
  };

  const handleChangeScoreType = (event: string) => {
    const maxLength = 15;
    if (event.length > maxLength) {
      setIsScoreTypeError(true);
      setScoreType(event.substring(0, maxLength));
    } else {
      setIsScoreTypeError(false);
      setScoreType(event);
    }
  };

  return (
    <Box className="lobby-page">
      <Container className="lobby-page-wrapper">
        <TitleMain>Spring 13 planning (issues 13, 533, 5623, 3252, 6623, ...)</TitleMain>

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="label-scram-master text-center">Scram master:</TitleAdd1>
          <Box className="card-master mb-20">
            {appState?.users.length && (
              <PlayerCard
                player={appState?.users[0] as TPlayer}
                key={appState?.users[0].playerId}
              />
            )}
          </Box>
          {isMaster ? (
            <>
              <Box className="link-to-lobby">
                <TitleAdd1 className="label-link-to-lobby">Lobby ID:</TitleAdd1>
                <Box className="copy-to-lobby">
                  <TextField
                    disabled
                    className="input-link-to-label"
                    id="outlined-helperText"
                    value={copyText}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) => {
                      setCopyText(e.target.value);
                      setCopyTextBtn('Copy');
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => copyUrlLobby(copyText)}>
                    {copyTextBtn}
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
            </>
          ) : (
            <Box className="buttons-game mt-20 mb-20">
              <div></div>
              <Button
                className="p-10"
                variant="outlined"
                color="primary"
                onClick={() => exitGame()}>
                Exit
              </Button>
            </Box>
          )}
        </Box>

        {/******************** Members Section ********************/}
        <Box className="members section" component="section">
          <TitleAdd1 className="label-members text-center">Members:</TitleAdd1>
          <Box className="cards-wrapper mb-20">
            {appState?.users.length &&
              appState?.users
                .filter((e) => !e.master)
                .map((el) => <PlayerCard player={el} key={el.playerId} />)}
          </Box>
        </Box>
        {/******************** Issues Section ********************/}
        {isMaster && (
          <Box className="issues section" component="section">
            <TitleAdd1 className="label-issues text-center">Issues:</TitleAdd1>
            <Box className="cards-wrapper mb-20">
              {appState?.issues &&
                appState?.issues.map((el) => (
                  <Issue issue={el} isLobby={true} key={el.issueID} />
                ))}
              <IssueAdd />
            </Box>
          </Box>
        )}

        {/******************** Setting Section ********************/}
        {isMaster && (
          <Container className="setting section" component="section">
            <TitleAdd1 className="setting-issues text-center">Game settings:</TitleAdd1>
            <Grid className="setting-grid" container spacing={3}>
              <Grid item xs={8}>
                <TitleAdd2>Scram master as player:</TitleAdd2>
              </Grid>
              <Grid item xs={1}>
                <Switch
                  checked={isMasterAsPlayer}
                  color="primary"
                  name="masterAsPlayer"
                  onChange={() => setIsMasterAsPlayer(!isMasterAsPlayer)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
              <Grid item xs={8}>
                <TitleAdd2>Changing card in round end:</TitleAdd2>
              </Grid>
              <Grid item xs={1}>
                <Switch
                  checked={isCardRound}
                  color="primary"
                  name="cardRound"
                  onChange={() => setIsCardRound(!isCardRound)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
              <Grid item xs={8}>
                <TitleAdd2>Is timer needed:</TitleAdd2>
              </Grid>
              <Grid item xs={1}>
                <Switch
                  checked={isTimerNeed}
                  color="primary"
                  name="timerNeed"
                  onChange={() => setIsTimerNeed(!isTimerNeed)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TitleAdd2>Score type:</TitleAdd2>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  error={isScoreTypeError}
                  id="setting-scrore-type"
                  variant="outlined"
                  defaultValue={scoreType}
                  onChange={(e) => handleChangeScoreType(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TitleAdd2>Score type (Short):</TitleAdd2>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  error={isScoreTypeShortError}
                  id="setting-scrore-type"
                  variant="outlined"
                  defaultValue={scoreTypeShort}
                  onChange={(e) => handleChangeScoreTypeShort(e.target.value)}
                />
              </Grid>
            </Grid>
            <Collapse in={isTimerNeed} timeout={1000}>
              <Grid className="setting-grid mt-10" container spacing={3}>
                <Grid item xs={10}>
                  <TitleAdd2>Round time:</TitleAdd2>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="time"
                    type="time"
                    defaultValue={roundTime}
                    onChange={(e) => setRoundTime(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 10, // 5 min
                    }}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Container>
        )}

        {/******************** Add Cards Section ********************/}
        {isMaster && (
          <Container className="add-cards section" component="section">
            <TitleAdd1 className="label-add-cards text-center">
              Add card values:
            </TitleAdd1>
            <Box className="cards-wrapper justify-content-start mb-20">
              {deck2.map((el, key) => (
                <Card
                  propCardValue={el.toString()}
                  shortScoreType={scoreTypeShort}
                  allowEdit={true}
                  key={key}
                />
              ))}
              <AddCard />
            </Box>
          </Container>
        )}
      </Container>

      {/******************** Chat Section ********************/}
      <div className="chat-container">
        <Chat />
      </div>
    </Box>
  );
};

export default LobbyPage;
