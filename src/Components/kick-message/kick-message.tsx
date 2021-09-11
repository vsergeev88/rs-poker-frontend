import './kick-message.scss';

import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import React, { FC, useState } from 'react';

import { Transition } from '../transition';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  initiator: string;
  target: string;
  idPlayer: number;
}

const KickMessage: FC<IProps> = ({ initiator, target, idPlayer }) => {
  const [open, setOpen] = useState(true);

  const sendResponseToServer = (answer: boolean) => {
    // TODO send information to server
    console.log(`kick player #${idPlayer}: ${answer}`);
  };

  const handleClickClose = (answer: boolean) => {
    sendResponseToServer(answer);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        className="dialog-wrapper">
        <DialogContent className="kick-message-content">
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

export default KickMessage;
