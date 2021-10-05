import './issue-copy.scss';

import { Save } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import React, { FC, useContext } from 'react';

import { AppContext } from '../../content/app-state';

const IssueCopy: FC = () => {
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    const issues = appState?.issues;
    if (issues?.length) {
      navigator.clipboard.writeText(JSON.stringify(issues));
      enqueueSnackbar('Issues was copied to clipboard. Save it to file', {
        variant: 'success',
      });
    }
  };

  return (
    <>
      <div
        role="none"
        className={`copy-issue_container mt-20 mb-20 ${
          !appState?.issues.length ? '' : 'copy-issue_active'
        }`}
        onClick={handleClick}>
        <span>Copy Issues</span>
        <Save className="copy-issue_icon" />
      </div>
    </>
  );
};

export default IssueCopy;
