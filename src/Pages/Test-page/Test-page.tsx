import './Test-page.scss';

import { Button } from '@material-ui/core';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import React from 'react';

import Issue from '../../Components/issue';
import IssueAdd from '../../Components/issue-add';
import KickMessage from '../../Components/kick-player-message';
import PlayerCard from '../../Components/player-card';
import { issueMockData, playersMockData } from '../../data/game';

const TestPage: FunctionComponent<HTMLAttributes<HTMLDivElement>> = () => {
  const [showMessage, setMessage] = useState(false);

  return (
    <div className="test-page">
      CARDS
      <div className="test-page-wrapper">
        {playersMockData.map((el) => (
          <PlayerCard player={el} key={el.playerId} />
        ))}
      </div>
      ISSUES
      <div className="test-page-wrapper">
        <Issue issue={issueMockData[0]} isLobby={true} />
        <Issue issue={issueMockData[1]} isLobby={false} />
        <Issue issue={issueMockData[2]} isLobby={false} />
        <IssueAdd />
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

export default TestPage;
