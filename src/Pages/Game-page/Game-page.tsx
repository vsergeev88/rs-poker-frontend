import './Game-page.scss';

import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

import PlayerCard from '../../Components/player-card';
import { playersMockData } from '../../data/game';

const GamePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="game-page">
      <div className="game-page-wrapper">
        {playersMockData.map((el) => (
          <PlayerCard player={el} key={el.playerId} />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
