import './kick-player.scss';

import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import React, { FC, useState } from 'react';

import { Transition } from '../transition';

interface KickPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  initiator: string;
  target: string;
}

const KickPlayer: FC<KickPlayerProps> = ({ initiator, target }) => {
  const [open, setOpen] = useState(false);

  const sendResponseToServer = (answer: boolean) => {
    // TODO send information to server
    console.log(answer);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = (answer: boolean) => {
    sendResponseToServer(answer);
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
          <span className="large-text">Kick</span>
          <div className="message-text">
            <div>
              <span className="colored-text">{initiator}</span>
              <span> wants to kick member </span>
              <span className="colored-text">{target}.</span>
            </div>
            <span className="centred-text">Do you agree with it?</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleClickClose(true);
            }}
            color="primary">
            Yes
          </Button>
          <Button
            onClick={() => {
              handleClickClose(false);
            }}
            color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default KickPlayer;
