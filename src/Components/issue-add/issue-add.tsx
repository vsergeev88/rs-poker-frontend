import './issue-add.scss';

import { Input, MenuItem, Select } from '@material-ui/core';
import { ControlPoint } from '@material-ui/icons';
import React, { FC, useState } from 'react';

import { TPriority } from '../../data/game';
import CustomDialog from '../dialog';

const IssueAdd: FC = () => {
  const [openDialog, setDialog] = useState(false);
  const [title, setTitle] = useState('Issue');
  const [link, setLink] = useState('http://');
  const [priority, setPriority] = useState<TPriority>('Middle');

  const handleKickPlayer = () => {
    closeDialog();
    // TODO!! create new issue on server
    console.log(`Send info - title:${title}, link:${link}, priority:${priority},`);
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const closeDialog = () => {
    setTimeout(() => {
      setDialog(false);
    }, 500);
  };

  return (
    <>
      <div role="none" className="add-issue_container" onClick={handleClickOpen}>
        <span>Create new Issue</span>
        <ControlPoint className="add-issue_icon" />
      </div>
      {openDialog && (
        <CustomDialog
          handleNegative={() => {
            closeDialog();
          }}
          handlePositive={() => {
            handleKickPlayer();
          }}
          isOpen={openDialog}
          anotherButtons={true}>
          <span className="large-text">Create Issue</span>
          <div className="props-container message-text">
            <span>Title:</span>
            <Input
              className="message-text"
              defaultValue={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <span>Lick:</span>
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
