import './Main-page.scss';

import { TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FC, useContext, useEffect, useState } from 'react';
import React from 'react';

import imgUrl from '../../assets/img/poker-planing.jpg';
import ConnectDialog from '../../Components/connect-dialog';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';

const MainPage: FC = () => {
  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const [roomId, setRoomId] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socket?.on('users', (users) => {
      appState?.setUsers(users);
    });
    socket?.on('issues', (issues) => {
      appState?.setIssues(issues);
    });
    socket?.on('settings', (settings) => {
      const {
        isGameStarted,
        isMasterAsPlayer,
        isCardRound,
        isTimerNeed,
        scoreType,
        scoreTypeShort,
        roundTime,
        cardsDeck,
      } = settings;
      appState?.setSettings({
        isGameStarted,
        isMasterAsPlayer,
        isCardRound,
        isTimerNeed,
        scoreType,
        scoreTypeShort,
        roundTime,
      });
      appState?.setCardsDeck(cardsDeck);
    });
    socket?.on('notification', ({ description }) => {
      enqueueSnackbar(description, { variant: 'info' });
    });
    socket?.on('warning', ({ description }) => {
      enqueueSnackbar(description, { variant: 'warning' });
    });
  });

  return (
    <div className="main-page">
      <div className="main-page-wrapper">
        <img src={imgUrl} alt="poker-planing" />
        <span className="large-text">Start your planing:</span>
        <div className="input-wrapper">
          <span>Create session:</span>
          <ConnectDialog createMode={true} />
        </div>
        <span className="large-text text-center">OR:</span>
        <div className="input-wrapper">
          <TextField
            id="outlined-basic"
            label="Connect to lobby by ID"
            variant="outlined"
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
          />
          <ConnectDialog roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
