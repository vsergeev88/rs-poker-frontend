import './Game-page.scss';

import { Button } from '@material-ui/core';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import React from 'react';

import Issue from '../../Components/issue';
import KickMessage from '../../Components/kick-player-message';
import PlayerCard from '../../Components/player-card';
import { issueMockData, playersMockData } from '../../data/game';

const GamePage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [showMessage, setMessage] = useState(false);

  return (
    <div className="game-page">
      CARDS
      <div className="game-page-wrapper">
        {playersMockData.map((el) => (
          <PlayerCard player={el} key={el.playerId} />
        ))}
      </div>
      ISSUES
      <div className="game-page-wrapper">
        <Issue issue={issueMockData[0]} isLobby={true} />
        <Issue issue={issueMockData[1]} isLobby={false} />
        <Issue issue={issueMockData[2]} isLobby={false} />
      </div>
      KICK MESSAGE
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setMessage(true);
        }}>
        Trow kick message
      </Button>
      {showMessage && (
        <KickMessage
          idPlayer={4}
          target="Dayana Ross"
          initiator="David Blane"
          isOpen={showMessage}
          handle={setMessage}
        />
      )}
    </div>
  );
};

export default GamePage;
