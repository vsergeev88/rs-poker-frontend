import './statistics.scss';

import React, { useContext } from 'react';

import { AppContext } from '../../content/app-state';

interface IProps {
  data: Record<string, string>;
}

export default function Statistics({ data }: IProps) {
  const appState = useContext(AppContext);

  const votesNumber = Object.keys(data).length;
  const votedStats: Record<string, number> = {};
  for (let keys in data) {
    votedStats[data[keys]] = votedStats[data[keys]] + 1 || 1;
  }
  const displayData = Object.entries(votedStats);

  let numberedVotesCount = 0;
  const averageVote = displayData.reduce((acc, el) => {
    if (Number.isInteger(+el[0])) {
      numberedVotesCount++;
      return acc + +el[0];
    }
    return acc;
  }, 0);

  return (
    <div role="none" className="statistics__container">
      <span className="statistics__container-title">Statistics:</span>
      {displayData.map((el) => {
        let [card, number] = el;
        if (Number.isInteger(+card)) card += ` ${appState?.settings.scoreTypeShort}`;
        return (
          <div key={card} className="stats-card__wrapper">
            <span className="stats-card-text__name">{card}</span>
            <span>{((number / votesNumber) * 100).toFixed(1)}%</span>
          </div>
        );
      })}
      {!!averageVote && (
        <span className="statistics__container-title">
          Average:{' '}
          {`${(averageVote / numberedVotesCount).toFixed(1)} ${
            appState?.settings.scoreTypeShort
          }`}
        </span>
      )}
    </div>
  );
}
