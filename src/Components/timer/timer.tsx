import './timer.scss';

import { useSnackbar } from 'notistack';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
interface IProps {
  time: number;
  isMaster: boolean;
}

export default function Timer({ time, isMaster }: IProps) {
  const [roundTime, setRoundTime] = useState(time);
  const [inProgress, setInProgress] = useState(false);

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const { enqueueSnackbar } = useSnackbar();
  const currentIssue = appState?.issues.find((el) => el.current === true);

  const padTime = useCallback((time) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  }, []);

  const format = useMemo(() => {
    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime % 60;
    return `${padTime(minutes)}:${padTime(seconds)}`;
  }, [roundTime, padTime]);

  useEffect(() => {
    if (appState?.settings.isRoundStarted) {
      if (roundTime > 0) {
        setTimeout(() => setRoundTime(roundTime - 1), 1000);
        if (appState?.settings.isCardRound) {
          let playersCount = appState?.users.length;
          if (!appState?.settings.isMasterAsPlayer) --playersCount;
          const votesCount = Object.keys(
            currentIssue?.poolResults?.votes as Record<string, string>,
          ).length;
          if (playersCount === votesCount) setRoundTime(0);
        }
      } else {
        if (isMaster) {
          const roomId = appState?.users[0].playerId;
          const settings = {
            ...appState?.settings,
            isRoundStarted: false,
            cardsDeck: appState?.cardsDeck,
          };
          socket?.emit('saveSettings', settings, roomId, (error: string) => {
            if (error) enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
          });
          socket?.emit(
            'setIssueVotingDone',
            currentIssue?.issueID,
            true,
            (error: string) => {
              if (error) enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
            },
          );
        }
      }
      if (!inProgress) {
        setInProgress(true);
      }
    } else {
      setInProgress(false);
      setRoundTime(time);
    }
  }, [roundTime, appState?.settings]);

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
