import './titles.scss';

import { Typography } from '@material-ui/core';
import { FC, useContext } from 'react';
import React from 'react';

import { AppContext } from '../../content/app-state';
import { TIssue } from '../../types/types';

interface ITitle {
  className?: string;
  issues?: TIssue[] | undefined;
  currentIssue?: TIssue;
}

const showIssueTitleList = (issues: TIssue[] | undefined) => {
  const maxNumberIssues: Number = 1;
  let titleList: Array<String> = [];
  issues &&
    issues.map((el) => titleList.length < maxNumberIssues && titleList.push(el.name));
  return titleList.join(', ');
};

export const TitleMain: FC<ITitle> = (props) => (
  <Typography className={props.className} variant="h4" component="h1" gutterBottom>
    {props.children}
    {props.issues && showIssueTitleList(props.issues)}
  </Typography>
);

export const TitleAdd1: FC<ITitle> = (props) => (
  <Typography className={props.className} variant="h5" component="h2" gutterBottom>
    {props.children}
  </Typography>
);

export const TitleAdd2: FC<ITitle> = (props) => (
  <Typography variant="h6" component="h3">
    {props.children}
  </Typography>
);

export const TitleAdd3: FC<ITitle> = (props) => (
  <Typography className={props.className} variant="h4" component="h1" gutterBottom>
    {props.children}
  </Typography>
);

export const TitleGame: FC<ITitle> = ({ currentIssue }) => {
  const appState = useContext(AppContext);

  return (
    <Typography variant="h4" component="h1" gutterBottom>
      {appState?.issues.length ? (
        <>
          <span>Voting for: </span>
          <span className="title_current-issue">{currentIssue?.name}</span>
          {appState?.settings.isRoundStarted ? (
            <span>
              {' - '}
              <span className="title-message_choose">choose card!</span>
            </span>
          ) : currentIssue?.poolResults?.isVotingPassed ? (
            <span>
              {' - '}
              <span className="title-message_finished">voting finished!</span>
            </span>
          ) : (
            <span className="title-message_waiting"> - waiting for round starts...</span>
          )}
        </>
      ) : (
        <div>No issues added yet</div>
      )}
    </Typography>
  );
};
