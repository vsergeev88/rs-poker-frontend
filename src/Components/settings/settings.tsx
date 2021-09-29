import './settings.scss';

import {
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { TitleAdd1, TitleAdd2 } from '../../Components/titles';
import {
  CARD_DECKS,
  SETTING_CARD_DECK_NUM_DEF,
  SETTING_IS_CAR_ROUND_DEF,
  SETTING_IS_MASTER_AS_PLAYER_DEF,
  SETTING_IS_SCORE_TYPE_ERROR_DEF,
  SETTING_IS_SCORE_TYPE_SHORT_ERROR_DEF,
  SETTING_IS_TIMER_NEED_DEF,
  SETTING_ROUND_TIME_DEF,
  SETTING_SCORE_TYPE_DEF,
  SETTING_SCORE_TYPE_SHORT_DEF,
} from '../../config';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { AddCard, Card } from '..';

const Settings: FC = () => {
  const [isMasterAsPlayer, setIsMasterAsPlayer] = useState(
    SETTING_IS_MASTER_AS_PLAYER_DEF,
  );
  const [isMaster, setMaster] = useState(false);
  const [cardDeckNumber, setCardDeckNumber] = useState(SETTING_CARD_DECK_NUM_DEF);
  const [isCardRound, setIsCardRound] = useState(SETTING_IS_CAR_ROUND_DEF);
  const [isTimerNeed, setIsTimerNeed] = useState(SETTING_IS_TIMER_NEED_DEF);
  const [scoreType, setScoreType] = useState(SETTING_SCORE_TYPE_DEF);
  const [isScoreTypeError, setIsScoreTypeError] = useState(
    SETTING_IS_SCORE_TYPE_ERROR_DEF,
  );
  const [scoreTypeShort, setScoreTypeShort] = useState(SETTING_SCORE_TYPE_SHORT_DEF);
  const [isScoreTypeShortError, setIsScoreTypeShortError] = useState(
    SETTING_IS_SCORE_TYPE_SHORT_ERROR_DEF,
  );
  const [roundTime, setRoundTime] = useState(SETTING_ROUND_TIME_DEF);
  const [isSettingChanged, setSettingsChanged] = useState(false);

  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

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
    handleSaveSettings();
  }, []);

  useEffect(() => {
    console.log(appState?.settings);
  }, [appState?.settings]);

  const handleSaveSettings = () => {
    const roomId = appState?.users[0].playerId;
    const cardsDeck = appState?.cardsDeck;
    socket?.emit(
      'saveSettings',
      {
        isGameStarted: false,
        isMasterAsPlayer,
        cardDeckNumber,
        isCardRound,
        isTimerNeed,
        scoreType,
        scoreTypeShort,
        roundTime,
        cardsDeck,
      },
      roomId,
      (error: string) => {
        error
          ? enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
          : enqueueSnackbar('Settings saved!', { variant: 'success' });
      },
    );
    setSettingsChanged(false);
  };

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
    <>
      <Container className="setting section" component="section">
        <TitleAdd1 className="setting-issues text-center">Game settings:</TitleAdd1>
        <Box className="buttons-game mt-20 mb-20">
          <Button
            className="p-10"
            variant="contained"
            color="primary"
            disabled={!isSettingChanged}
            onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </Box>
        <Grid className="setting-grid" container spacing={3}>
          <Grid item xs={8}>
            <TitleAdd2>Scram master as player:</TitleAdd2>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={isMasterAsPlayer}
              color="primary"
              name="masterAsPlayer"
              onChange={() => {
                setIsMasterAsPlayer(!isMasterAsPlayer);
                setSettingsChanged(true);
              }}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item xs={8}>
            <TitleAdd2>Deck of cards:</TitleAdd2>
          </Grid>
          <Grid item xs={3} className="d-flex justify-content-end">
            <FormControl variant="outlined">
              <Select
                autoWidth={true}
                id="deck-select"
                className="deck-select"
                defaultValue={SETTING_CARD_DECK_NUM_DEF}
                onChange={(e) => {
                  const cardDeckNumber = e.target.value as number;
                  setCardDeckNumber(cardDeckNumber);
                  // May be is not optimal solution
                  appState?.setSettings({
                    isGameStarted: false,
                    isMasterAsPlayer,
                    cardDeckNumber,
                    isCardRound,
                    isTimerNeed,
                    scoreType,
                    scoreTypeShort,
                    roundTime,
                  });
                  appState?.setCardsDeck(
                    cardDeckNumber > 0
                      ? CARD_DECKS[cardDeckNumber].concat(CARD_DECKS[0])
                      : CARD_DECKS[cardDeckNumber],
                  );
                  setSettingsChanged(true);
                }}>
                <MenuItem value={0}>Custom</MenuItem>
                <MenuItem value={1}>Fibonacci</MenuItem>
                <MenuItem value={2}>Cohn</MenuItem>
                <MenuItem value={3}>Powers of two</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TitleAdd2>Changing card in round end:</TitleAdd2>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={isCardRound}
              color="primary"
              name="cardRound"
              onChange={() => {
                setIsCardRound(!isCardRound);
                setSettingsChanged(true);
              }}
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
              onChange={() => {
                setIsTimerNeed(!isTimerNeed);
                setSettingsChanged(true);
              }}
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
              onChange={(e) => {
                handleChangeScoreType(e.target.value);
                setSettingsChanged(true);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TitleAdd2>Score type (short):</TitleAdd2>
          </Grid>
          <Grid item xs={2}>
            <TextField
              error={isScoreTypeShortError}
              id="setting-scrore-type"
              variant="outlined"
              defaultValue={scoreTypeShort}
              onChange={(e) => {
                handleChangeScoreTypeShort(e.target.value);
                setSettingsChanged(true);
              }}
            />
          </Grid>
        </Grid>
        <Collapse in={isTimerNeed} timeout={500}>
          <Grid className="setting-grid mt-10" container spacing={3}>
            <Grid item xs={10}>
              <TitleAdd2>Round time (sec):</TitleAdd2>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="time"
                defaultValue={roundTime}
                variant="outlined"
                onChange={(e) => {
                  setRoundTime(+e.target.value);
                  setSettingsChanged(true);
                }}
                type="number"
              />
            </Grid>
          </Grid>
        </Collapse>
      </Container>

      {/******************** Add Cards Section ********************/}
      <Container className="add-cards section" component="section">
        <TitleAdd1 className="label-add-cards text-center">Add card values:</TitleAdd1>
        <Box className="cards-wrapper justify-content-start mb-20">
          {isMaster && <AddCard />}
          {appState?.cardsDeck.length
            ? appState?.cardsDeck.map((el, key) => (
                <Card
                  propCardValue={el}
                  shortScoreType={scoreTypeShort}
                  allowEdit={true}
                  cardIndex={key}
                  key={key}
                />
              ))
            : ''}
        </Box>
      </Container>
    </>
  );
};

export default Settings;
