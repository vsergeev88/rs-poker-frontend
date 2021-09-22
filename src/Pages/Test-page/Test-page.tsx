import './Test-page.scss';

import React, { FC } from 'react';

import Issue from '../../Components/issue';
import IssueAdd from '../../Components/issue-add';
import PlayerCard from '../../Components/player-card';
import { issueMockData, playersMockData } from '../../data/game';

const TestPage: FC = () => {
  return (
    <div className="test-page">
      CARDS
      <div className="test-page-wrapper">
        {playersMockData.map((el) => (
          <PlayerCard player={el} key={el.playerId} isMaster={false} playersCount={5} />
        ))}
      </div>
      ISSUES
      <div className="test-page-wrapper">
        <Issue issue={issueMockData[0]} isLobby={true} />
        <Issue issue={issueMockData[1]} isLobby={false} />
        <Issue issue={issueMockData[2]} isLobby={false} />
        <IssueAdd />
      </div>
    </div>
  );
};

export default TestPage;
