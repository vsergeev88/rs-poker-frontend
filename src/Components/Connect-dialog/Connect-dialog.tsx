import './Connect-dialog.scss';

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Input,
  InputLabel,
  Slide,
  Switch,
  TextField,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import type { FunctionComponent } from 'react';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConnectDialog: FunctionComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [jobPosition, setJobPosition] = React.useState('');
  const [isObserver, setObserver] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName('');
    setLastName('');
    setJobPosition('');
    setObserver(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Connect
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        className="dialog-wrapper">
        <DialogContent className="dialog-content">
          <div className="title-wrapper">
            <span className="large-text">Connect to lobby</span>
            <div className="switch-container">
              <span className="switch-text">Connect as observer</span>
              <Switch
                checked={isObserver}
                onChange={() => {
                  setObserver(!isObserver);
                }}
                color="primary"
                name="observer"
              />
            </div>
          </div>
          <div className="input-wrapper">
            <FormControl required>
              <InputLabel htmlFor="component-simple">Your first name:</InputLabel>
              <Input
                id="component-simple"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Your last name:</InputLabel>
              <Input
                id="component-simple"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="component-simple">Your job position:</InputLabel>
              <Input
                id="component-simple"
                value={jobPosition}
                onChange={(event) => {
                  setJobPosition(event.target.value);
                }}
              />
            </FormControl>
            <div className="choose-file-wrapper">
              <TextField label="Image:" variant="outlined" value="Choose file" disabled />
              <Button variant="contained" color="primary">
                Button
              </Button>
            </div>
            <Avatar alt="Remy Sharp" src="">
              RS
            </Avatar>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConnectDialog;
