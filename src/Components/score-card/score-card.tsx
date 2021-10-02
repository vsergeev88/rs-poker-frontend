import './score-card.scss';

import React from 'react';

import { TPoolResults } from '../../data/types';

interface IProps {
  poolResults: TPoolResults | undefined;
  userID: string;
  isRoundStarted: boolean | undefined;
}

export default function ScoreCard({ poolResults, userID, isRoundStarted }: IProps) {
  let result = poolResults?.votes[userID] ? poolResults?.votes[userID] : 'not voted';
  if (Number.isInteger(+result)) {
    result += ' SR';
  }
  return (
    <div role="none" className="score-card__container">
      {isRoundStarted ? 'In progress' : `${result}`}
    </div>
  );
}
