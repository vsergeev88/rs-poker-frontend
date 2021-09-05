import './LobbyPage.scss';

import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

const LobbyPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <div className="lobby-page">
      <div className="lobby-page-wrapper">Lobby Page</div>
    </div>
  );
};

export default LobbyPage;
