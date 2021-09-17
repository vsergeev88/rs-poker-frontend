import React from "react";
import './ScoreCard.scss';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number | null;
}

export default function ScoreCard({ score }: IProps) {
  return (
    <div role="none" className="score-card__container">
      {!score ? 'In progress' : `${score} SR`}
    </div>
  );
}