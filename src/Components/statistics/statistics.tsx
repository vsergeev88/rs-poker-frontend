import './statistics.scss';

import React from 'react';

interface IProps {
  data: Record<string, string>;
}

export default function Statistics({ data }: IProps) {
  const votesNumber = Object.keys(data).length;
  const votedStats: Record<string, number> = {};
  for (let keys in data) {
    votedStats[data[keys]] = votedStats[data[keys]] + 1 || 1;
  }
  const displayData = Object.entries(votedStats);

  return (
    <div role="none" className="statistics__container">
      <span className="statistics__container-title">Statistics:</span>
      {displayData.map((el) => {
        let [card, number] = el;
        if (Number.isInteger(+card)) card += ' SR';
        return (
          <div key={card} className="stats-card__wrapper">
            <span className="stats-card-text__name">{card}</span>
            <span>{((number / votesNumber) * 100).toFixed(1)}%</span>
          </div>
        );
      })}
    </div>
  );
}
