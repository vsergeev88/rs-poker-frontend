import './Main-page.scss';

import { TextField } from '@material-ui/core';
import { FC, useContext, useEffect, useState } from 'react';
import React from 'react';

import ConnectDialog from '../../Components/Connect-dialog';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';

const MainPage: FC = () => {
  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    socket?.on('users', (users) => {
      console.log(users);
      appState?.setUsers(users);
    });
  });

  return (
    <div className="main-page">
      <div className="main-page-wrapper">
        <img src="src/assets/img/poker-planing.jpg" alt="poker-planing" />
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
