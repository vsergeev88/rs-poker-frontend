import React, { useCallback, useEffect, useMemo, useState } from "react";
import './Timer.scss';

export default function Timer() {
  const [roundTime, setRoundTime] = useState(120);

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
      <div className="timer__time">
        {roundTime === 0 ? '00:00' : format}
      </div>
    </div>
  );
}