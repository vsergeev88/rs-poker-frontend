import './dialog.scss';

import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import React, { FC, useState } from 'react';

import Transition from '../transition';

interface IProps {
  handlePositive(): void;
  handleNegative(): void;
  isOpen: boolean;
  anotherButtons?: boolean | undefined;
}

const CustomDialog: FC<IProps> = ({
  handlePositive,
  handleNegative,
  isOpen,
  anotherButtons,
  children,
}) => {
  const [open, setOpen] = useState(isOpen);

  const handleClickClose = () => {
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
        <DialogContent className="dialog-content">{children}</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleClickClose();
              handlePositive();
            }}
            color="primary">
            {anotherButtons ? 'Confirm' : 'Yes'}
          </Button>
          <Button
            onClick={() => {
              handleClickClose();
              handleNegative();
            }}
            color="primary">
            {anotherButtons ? 'Cancel' : 'No'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomDialog;
