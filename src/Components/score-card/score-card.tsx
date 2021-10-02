import './score-card.scss';

import React from 'react';

interface IProps {
  score: string | null;
}

export default function ScoreCard({ score }: IProps) {
  return (
    <div role="none" className="score-card__container">
      {!score ? 'In progress' : `${score} SR`}
    </div>
  );
}
