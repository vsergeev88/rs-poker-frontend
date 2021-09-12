/* import TitleAdd1 from '../titles/title-add1';
import TitleAdd2 from '../titles/title-add2';
import TitleMain from '../titles/title-main/';
import Titles from './Titles'; */

import './Titles.scss';

import { Typography } from '@material-ui/core';
import type { FC } from 'react';
import React from 'react';

interface ITitle extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const TitleMain: FC<ITitle> = (props) => (
  <Typography variant="h4" component="h1" gutterBottom>
    {props.children}
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
