import './issue-import.scss';

import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC, useContext, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TIssue } from '../../types/types';

const IssueImport: FC = () => {
  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>();
  const [selectedFileName, setSelectedFileName] = useState<string>();

  const roomId = appState?.users.length ? appState?.users[0].playerId : '';

  const handleChange = (event: any) => {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      if (typeof event.target?.result === 'string') {
        setSelectedFile(event.target?.result);
        setSelectedFileName(file.name);
      }
      enqueueSnackbar('Issues was copied to clipboard. Save it to file', {
        variant: 'success',
      });
    };

    reader.readAsText(file);
  };

  const handleSubmission = () => {
    let current = appState?.issues.length === 0;
    const poolResults = {
      votes: new Map<string, string>(),
      isVotingPassed: false,
    };
    const issues: TIssue[] = JSON.parse(selectedFile?.toString() || '');
    issues.forEach(function (issueItem, idx) {
      if (current === true && idx > 0) current = false;
      socket?.emit(
        'addIssue',
        { ...issueItem, current, poolResults },
        roomId,
        (error: string) => {
          enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
        },
      );
    });
    enqueueSnackbar('File was imported', {
      variant: 'success',
    });
  };

  return (
    <>
      <div className="choose-import-wrapper">
        <label htmlFor={'import_issues'} className="choose-import_label">
          {selectedFileName ? selectedFileName : `Choose file`}
        </label>
        <input
          id={'import_issues'}
          className="choose-import_input"
          type="file"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmission}
          disabled={!selectedFile}>
          Import issues
        </Button>
      </div>
    </>
  );
};

export default IssueImport;
