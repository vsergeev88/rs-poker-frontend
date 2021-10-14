import './score-card.scss';

import React, { useContext } from 'react';

import { AppContext } from '../../content/app-state';
import { TPoolResults } from '../../types/types';

interface IProps {
  poolResults: TPoolResults | undefined;
  userID: string;
  isRoundStarted: boolean | undefined;
}

export default function ScoreCard({ poolResults, userID, isRoundStarted }: IProps) {
  const appState = useContext(AppContext);

  let result = poolResults?.votes[userID] ? poolResults?.votes[userID] : 'not voted';
  if (Number.isInteger(+result)) {
    result += ` ${appState?.settings.scoreTypeShort}`;
  }
  return (
    <div role="none" className="score-card__container">
      {isRoundStarted ? 'In progress' : `${result}`}
    </div>
  );
}
