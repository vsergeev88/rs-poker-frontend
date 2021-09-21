import './timer.scss';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
interface IProps {
  time: number;
}

export default function Timer({ time }: IProps) {
  const [roundTime, setRoundTime] = useState(time);

  const padTime = useCallback((time) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  }, []);

  const format = useMemo(() => {
    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
  }, [roundTime, padTime]);

  useEffect(() => {
    if (roundTime > 0) {
      setTimeout(() => setRoundTime(roundTime - 1), 1000);
    }
  }, [roundTime]);

  return (
    <div className="timer">
      <div className="timer__label">
        <div>minutes</div>
        <div>seconds</div>
      </div>
      <div className="timer__time">{roundTime === 0 ? '00:00' : format}</div>
    </div>
  );
}
