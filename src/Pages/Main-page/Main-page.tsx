import './Main-page.scss';

import { Button, TextField } from '@material-ui/core';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

import ConnectDialog from '../../Components/Connect-dialog';

const MainPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="main-page">
      <div className="main-page-wrapper">
        <img src="src/assets/img/poker-planing.jpg" alt="poker-planing" />
        <span className="large-text">Start your planing:</span>
        <div className="input-wrapper">
          <span>Create session:</span>
          <Button variant="contained" color="primary">
            Start new game
          </Button>
        </div>
        <span className="large-text text-center">OR:</span>
        <div className="input-wrapper">
          <TextField
            id="outlined-basic"
            label="Connect to lobby by URL"
            variant="outlined"
          />
          <ConnectDialog />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
