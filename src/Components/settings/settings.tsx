import './settings.scss';

import {
  Box,
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
  SETTING_IS_SCORE_TYPE_ERROR_DEF,
  SETTING_IS_SCORE_TYPE_SHORT_ERROR_DEF,
} from '../../config';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { AddCard, Card } from '..';

const Settings: FC = () => {
  const [isMaster, setMaster] = useState(false);
  const [isScoreTypeError, setIsScoreTypeError] = useState(
    SETTING_IS_SCORE_TYPE_ERROR_DEF,
  );
  const [isScoreTypeShortError, setIsScoreTypeShortError] = useState(
    SETTING_IS_SCORE_TYPE_SHORT_ERROR_DEF,
  );

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

  const handleSaveSettings = () => {
    const roomId = appState?.users[0].playerId;
    socket?.emit(
      'saveSettings',
      { ...appState?.settings, cardsDeck: appState?.cardsDeck },
      roomId,
      (error: string) => {
        error
          ? enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
          : enqueueSnackbar('Settings saved!', { variant: 'success' });
      },
    );
  };

  const handleChangeScoreTypeShort = (value: string) => {
    const maxLength = 2;
    let scoreTypeShort = value;
    if (value.length > maxLength) {
      setIsScoreTypeShortError(true);
      scoreTypeShort = value.substring(0, maxLength);
    } else {
      setIsScoreTypeShortError(false);
    }
    appState?.setSettings({
      ...appState?.settings,
      scoreTypeShort: scoreTypeShort.toUpperCase(),
    });
  };

  const handleChangeScoreType = (value: string) => {
    const maxLength = 15;
    let scoreType = value;
    if (value.length > maxLength) {
      setIsScoreTypeError(true);
      scoreType = value.substring(0, maxLength);
    } else {
      setIsScoreTypeError(false);
    }
    appState?.setSettings({ ...appState?.settings, scoreType });
  };

  const handleRoundTimeChange = (value: number) => {
    appState?.setSettings({
      ...appState?.settings,
      roundTime: value < 0 ? 0 : value,
    });
  };

  return (
    <>
      <Container className="setting section" component="section">
        <TitleAdd1 className="setting-issues text-center">Game settings:</TitleAdd1>
        <Grid className="setting-grid" container spacing={3}>
          <Grid item xs={8}>
            <TitleAdd2>Scram master as player:</TitleAdd2>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={appState?.settings.isMasterAsPlayer}
              color="primary"
              name="masterAsPlayer"
              onChange={() => {
                appState?.setSettings({
                  ...appState?.settings,
                  isMasterAsPlayer: !appState?.settings.isMasterAsPlayer,
                });
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
                  appState?.setSettings({
                    ...appState?.settings,
                    cardDeckNumber,
                  });
                  appState?.setCardsDeck(
                    cardDeckNumber > 0
                      ? CARD_DECKS[cardDeckNumber].concat(CARD_DECKS[0])
                      : CARD_DECKS[cardDeckNumber],
                  );
                }}>
                <MenuItem value={0}>Custom</MenuItem>
                <MenuItem value={1}>Fibonacci</MenuItem>
                <MenuItem value={2}>Cohn</MenuItem>
                <MenuItem value={3}>Powers of two</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TitleAdd2>Rotate cards when all voted:</TitleAdd2>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={appState?.settings.isCardRound}
              color="primary"
              name="cardRound"
              onChange={() => {
                appState?.setSettings({
                  ...appState?.settings,
                  isCardRound: !appState?.settings.isCardRound,
                });
              }}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <Grid item xs={8}>
            <TitleAdd2>Is timer needed:</TitleAdd2>
          </Grid>
          <Grid item xs={1}>
            <Switch
              checked={appState?.settings.isTimerNeed}
              color="primary"
              name="timerNeed"
              onChange={() => {
                appState?.setSettings({
                  ...appState?.settings,
                  isTimerNeed: !appState?.settings.isTimerNeed,
                });
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
              value={appState?.settings.scoreType}
              onChange={(e) => {
                handleChangeScoreType(e.target.value);
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
              value={appState?.settings.scoreTypeShort}
              onChange={(e) => {
                handleChangeScoreTypeShort(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Collapse in={appState?.settings.isTimerNeed} timeout={500}>
          <Grid className="setting-grid mt-10" container spacing={3}>
            <Grid item xs={10}>
              <TitleAdd2>Round time (sec):</TitleAdd2>
            </Grid>
            <Grid item xs={2}>
              <TextField
                id="time"
                value={appState?.settings.roundTime}
                variant="outlined"
                onChange={(e) => {
                  handleRoundTimeChange(+e.target.value);
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
                  shortScoreType={appState?.settings.scoreTypeShort}
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
