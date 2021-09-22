import './settings.scss';

import { Collapse, Container, Grid, Switch, TextField } from '@material-ui/core';
import React, { FC, useState } from 'react';

import { TitleAdd1, TitleAdd2 } from '../../Components/titles';

const Settings: FC = () => {
  const [isMasterAsPlayer, setIsMasterAsPlayer] = useState(false);
  const [isCardRound, setIsCardRound] = useState(true);
  const [isTimerNeed, setIsTimerNeed] = useState(true);
  const [scoreType, setScoreType] = useState('Story point');
  const [isScoreTypeError, setIsScoreTypeError] = useState(false);
  const [scoreTypeShort, setScoreTypeShort] = useState('SP');
  const [isScoreTypeShortError, setIsScoreTypeShortError] = useState(false);
  const [roundTime, setRoundTime] = useState('00:01:30');

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
  );
};

export default Settings;
