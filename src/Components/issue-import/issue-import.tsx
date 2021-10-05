import './issue-import.scss';

import { useSnackbar } from 'notistack';
import React, { FC, useContext, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TIssue } from '../../data/types';

/* type TMessage = {
  user: TPlayer;
  message: string;
}; */

const IssueImport: FC = () => {
  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>();
  const [isSelected, setIsSelected] = useState(false);

  const roomId = appState?.users.length ? appState?.users[0].playerId : '';

  const handleChange = (event: any) => {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
      console.log(event.target?.result);
      if (typeof event.target?.result === 'string') setSelectedFile(event.target?.result);
      setIsSelected(true);
      enqueueSnackbar('Issues was copied to clipboard. Save it to file', {
        variant: 'success',
      });
    };

    reader.readAsText(file);
  };

  const handleSubmission = () => {
    socket?.emit('deleteAllIssues', roomId, 'Issues was cleared!');
    const issues: TIssue[] = JSON.parse(selectedFile?.toString() || '');
    issues.forEach(function (issueItem) {
      socket?.emit('addIssue', { ...issueItem }, roomId, (error: string) => {
        enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
      });
    });
  };
  const handleClear = () => {
    socket?.emit('deleteAllIssues', roomId, 'Issues was cleared!');
  };

  return (
    <>
      <input type="file" name="file" onChange={handleChange} />
      {isSelected ? (
        <div>
          <p>File was reading. Does it send?</p>
        </div>
      ) : (
        <p>Select a file</p>
      )}
      <button onClick={handleSubmission}>Submit</button>
      <button onClick={handleClear}>Clear</button>
    </>
  );
};

export default IssueImport;
