import './kick-dialog.scss';

import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import React, { FC, useState } from 'react';

import { Transition } from '../transition';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  target: string;
  playerId: number;
}

const KickDialog: FC<IProps> = ({ target, playerId }) => {
  const [open, setOpen] = useState(false);

  const handleKickPlayer = () => {
    // TODO send information to server
    console.log(`Send kicking request with playerId: ${playerId}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <NotInterestedIcon onClick={handleClickOpen} className="kick-icon">
        Connect
      </NotInterestedIcon>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        className="dialog-wrapper">
        <DialogContent className="dialog-content">
          <span className="large-text">Kick player?</span>
          <div className="message-text">
            <span> Are you really want to remove player </span>
            <span className="colored-text">{target}</span>
            <span> from game session?</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleKickPlayer();
              handleClickClose();
            }}
            color="primary">
            Yes
          </Button>
          <Button
            onClick={() => {
              handleClickClose();
            }}
            color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default KickDialog;
