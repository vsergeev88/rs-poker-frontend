import './LobbyPage.scss';

import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

import Issue from '../../Components/Issue';
import PlayerCard from '../../Components/Player-card';

const LobbyPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="lobby-page">
      <div className="lobby-page-wrapper">Lobby Page</div>
      <PlayerCard></PlayerCard>
      <Issue></Issue>
    </div>
  );
};

export default LobbyPage;
