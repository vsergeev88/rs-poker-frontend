import './issue-copy.scss';

import { Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { FC, useContext } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';

const IssueCopy: FC = () => {
  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const roomId = appState?.users.length ? appState?.users[0].playerId : '';

  const handleClick = () => {
    const issues = appState?.issues;
    if (issues?.length) {
      navigator.clipboard.writeText(JSON.stringify(issues));
      enqueueSnackbar('Issues was copied to clipboard. Save it to file', {
        variant: 'success',
      });
    }
  };

  const handleClear = () => {
    socket?.emit('deleteAllIssues', roomId, 'Issues was cleared!');
  };

  return (
    <>
      <div className="issue_support_btn_wrapper">
        <div
          role="none"
          className={`copy-issue_container mt-20 mb-20 ${
            !appState?.issues.length ? '' : 'copy-issue_active'
          }`}
          onClick={handleClick}>
          <span>Copy Issues</span>
          <Save className="copy-issue_icon" />
        </div>
        <Button
          className="p-10"
          variant="contained"
          color="secondary"
          onClick={() => handleClear()}
          disabled={!appState?.issues.length}>
          Remove all issues
        </Button>
      </div>
    </>
  );
};

export default IssueCopy;
