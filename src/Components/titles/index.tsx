import './titles.scss';

import { Typography } from '@material-ui/core';
import type { FC } from 'react';
import React from 'react';

import { TIssue } from '../../data/types';

interface ITitle {
  className?: string;
  issues?: TIssue[] | undefined;
}

const showIssueTitleList = (issues: TIssue[] | undefined) => {
  const maxNumberIssues: Number = 5;
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
