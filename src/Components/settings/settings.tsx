import './settings.scss';

import {
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC, useContext, useEffect, useState } from 'react';

import { TitleAdd1, TitleAdd2 } from '../../Components/titles';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { AddCard, Card } from '..';

const Settings: FC = () => {
  const [isMasterAsPlayer, setIsMasterAsPlayer] = useState(false);
  const [isCardRound, setIsCardRound] = useState(true);
  const [isTimerNeed, setIsTimerNeed] = useState(true);
  const [scoreType, setScoreType] = useState('Story point');
  const [isScoreTypeError, setIsScoreTypeError] = useState(false);
  const [scoreTypeShort, setScoreTypeShort] = useState('SP');
  const [isScoreTypeShortError, setIsScoreTypeShortError] = useState(false);
  const [roundTime, setRoundTime] = useState(90);
  const [isSettingChanged, setSettingsChanged] = useState(false);

  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    handleSaveSettings();
  }, []);

  const handleSaveSettings = () => {
    const roomId = appState?.users[0].playerId;
    const cardsDeck = appState?.cardsDeck;
    socket?.emit(
      'saveSettings',
      {
        isMasterAsPlayer,
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
          {appState?.cardsDeck.length
            ? appState?.cardsDeck.map((el, key) => (
                <Card
                  propCardValue={el}
                  shortScoreType={'SP'}
                  allowEdit={true}
                  cardIndex={key}
                  key={key}
                />
              ))
            : ''}
          <AddCard />
        </Box>
      </Container>
    </>
  );
};

export default Settings;
