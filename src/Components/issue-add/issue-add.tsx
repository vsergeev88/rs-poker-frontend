import './issue-add.scss';

import { Input, MenuItem, Select } from '@material-ui/core';
import { ControlPoint } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { FC, useContext, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TPriority } from '../../data/types';
import CustomDialog from '../dialog';

const IssueAdd: FC = () => {
  const [openDialog, setDialog] = useState(false);
  const [name, setName] = useState('Issue');
  const [link, setLink] = useState('');
  const [priority, setPriority] = useState<TPriority>('Middle');
  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddIssue = () => {
    const roomId = appState?.users[0].playerId;
    const current = appState?.issues.length === 0;
    const poolResults = {
      votes: new Map<string, string>(),
      isVotingPassed: false,
    };
    socket?.emit(
      'addIssue',
      { name, link, priority, current, poolResults },
      roomId,
      (error: string) => {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
      },
    );
    closeDialog();
  };

  const handleClickOpen = () => {
    if (!appState?.settings.isRoundStarted) setDialog(true);
  };

  const closeDialog = () => {
    setTimeout(() => {
      setDialog(false);
      setName('Issue');
      setLink('');
      setPriority('Middle');
    }, 500);
  };

  return (
    <>
      <div
        role="none"
        className={`add-issue_container ${
          !appState?.settings.isRoundStarted ? 'add-issue_active' : ''
        }`}
        onClick={handleClickOpen}>
        <span>Create new Issue</span>
        <ControlPoint className="add-issue_icon" />
      </div>
      {openDialog && (
        <CustomDialog
          handleNegative={() => {
            closeDialog();
          }}
          handlePositive={() => {
            handleAddIssue();
          }}
          isOpen={openDialog}
          anotherButtons={true}>
          <span className="large-text">Create Issue</span>
          <div className="props-container message-text">
            <span>Title:</span>
            <Input
              className="message-text"
              defaultValue={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <span>Link:</span>
            <Input
              className="message-text"
              defaultValue={link}
              onChange={(event) => {
                setLink(event.target.value);
              }}
            />
            <span>Priority:</span>
            <Select
              className="message-text"
              onChange={(e) => setPriority(e.target.value as TPriority)}
              value={priority}>
              <MenuItem value={'Low'}>Low</MenuItem>
              <MenuItem value={'Middle'}>Middle</MenuItem>
              <MenuItem value={'Hight'}>Hight</MenuItem>
            </Select>
          </div>
        </CustomDialog>
      )}
    </>
  );
};

export default IssueAdd;
