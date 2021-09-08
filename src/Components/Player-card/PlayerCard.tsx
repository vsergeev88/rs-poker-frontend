import './PlayerCard.scss';

import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

const PlayerCard: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="player-card">
      <div className="player-card--avatar">
        <img
          className="player-card--avatar-img"
          src="/src/assets/temp/avatar-girl.png"
          alt="Rick Giligan"
        />
      </div>
      <div className="player-card--user-info">
        <span className="player-card--you">IT’S YOU</span>
        <span className="player-card--name">Rick Giligan</span>
        <span className="player-card--level">sinior software engeneer</span>
      </div>
      <div className="player-card--action">
        <button className="player-card--btn-remove"></button>
      </div>
    </div>
  );
};

export default PlayerCard;
