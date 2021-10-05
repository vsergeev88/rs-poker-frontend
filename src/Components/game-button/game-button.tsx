import './game-button.scss';

import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { FC, useContext, useEffect } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TIssue } from '../../data/types';

interface IProps {
  currentIssue: TIssue | undefined;
  roomId: string;
}

const GameButton: FC<IProps> = ({ currentIssue, roomId }) => {
  const socket = useContext(SocketContext);
  const appState = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const finishVoting = () => {
    const settings = {
      ...appState?.settings,
      isRoundStarted: false,
      cardsDeck: appState?.cardsDeck,
    };
    socket?.emit('saveSettings', settings, roomId, (error: string) => {
      if (error) enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
    });
    socket?.emit('setIssueVotingDone', currentIssue?.issueID, true, (error: string) => {
      if (error) enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
    });
  };

  const startVoting = () => {
    const settings = {
      ...appState?.settings,
      isRoundStarted: true,
      cardsDeck: appState?.cardsDeck,
    };
    socket?.emit('saveSettings', settings, roomId, (error: string) => {
      if (error) enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
    });
  };

  useEffect(() => {
    if (currentIssue?.poolResults?.votes) {
      if (appState?.settings.isCardRound && !appState?.settings.isTimerNeed) {
        let playersCount = appState?.users.length;
        if (!appState?.settings.isMasterAsPlayer) --playersCount;
        const votesCount = Object.keys(
          currentIssue?.poolResults?.votes as Record<string, string>,
        ).length;
        if (playersCount === votesCount) {
          finishVoting();
        }
      }
    }
  }, [
    currentIssue?.poolResults?.votes
      ? Object.keys(currentIssue?.poolResults?.votes as Record<string, string>).length
      : null,
  ]);

  const handleClickRunRound = () => {
    if (currentIssue?.poolResults?.isVotingPassed) {
      appState?.setIssues(
        appState?.issues.map((el) => {
          const issue = { ...el, poolResults: { isVotingPassed: false, votes: {} } };
          return issue;
        }),
      );
      socket?.emit('resetVotes', currentIssue.issueID, (error: string) => {
        if (error) enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
      });
    }
    if (!appState?.settings.isTimerNeed) {
      appState?.settings.isRoundStarted ? finishVoting() : startVoting();
    } else {
      startVoting();
    }
  };

  return (
    <>
      <Button
        className="p-10"
        variant="contained"
        color="primary"
        onClick={handleClickRunRound}
        disabled={
          !appState?.issues.length ||
          appState?.users.length < 2 ||
          (appState?.settings.isRoundStarted && appState?.settings.isTimerNeed)
        }>
        {currentIssue?.poolResults?.isVotingPassed
          ? 'Restart Round'
          : `${
              appState?.settings.isRoundStarted && !appState?.settings.isTimerNeed
                ? 'Finish round'
                : 'Run Round'
            }`}
      </Button>
    </>
  );
};

export default GameButton;
