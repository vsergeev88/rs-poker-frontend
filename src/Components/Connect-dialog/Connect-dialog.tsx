import './Connect-dialog.scss';

import { FormControl, Input, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slide from '@material-ui/core/Slide';
// import Switch from '@material-ui/core/Switch';
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
        <DialogTitle id="alert-dialog-slide-title">{'Connect to lobby'}</DialogTitle>
        <DialogContent className="dialog-content">
          <FormControl>
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
