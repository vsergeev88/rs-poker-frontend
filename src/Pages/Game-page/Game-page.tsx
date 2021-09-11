import './Game-page.scss';

import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

const GamePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="game-page">
      <div className="game-page-wrapper">Game Page</div>
    </div>
  );
};

export default GamePage;
