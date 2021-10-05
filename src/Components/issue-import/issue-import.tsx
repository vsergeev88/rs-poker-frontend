import './issue-import.scss';

import { useSnackbar } from 'notistack';
import React, { FC, useContext, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { TImportFile } from '../../data/types';

/* type TMessage = {
  user: TPlayer;
  message: string;
}; */

const IssueImport: FC = () => {
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFile, setSelectedFile] = useState<TImportFile>();
  const [isSelected, setIsSelected] = useState(false);

  const handleChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    const issues = appState?.issues;
    console.log('file was detected');
    console.log(event.target.files[0]);
    enqueueSnackbar('Issues was copied to clipboard. Save it to file', {
      variant: 'success',
    });
    console.log(issues);
  };

  const handleSubmission = () => {};

  return (
    <>
      <input type="file" name="file" onChange={handleChange} />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile ? selectedFile?.name : ''}</p>
          <p>Filetype: {selectedFile?.type}</p>
          <p>Size in bytes: {selectedFile?.size}</p>
          <p>lastModifiedDate: {selectedFile?.lastModifiedDate.toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
};

export default IssueImport;
