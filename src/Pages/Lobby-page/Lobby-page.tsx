import './Lobby-page.scss';

import { Box, Button, Container } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FC, useContext, useEffect, useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router';

import {
  Chat,
  Issue,
  IssueAdd,
  KickMessage,
  LinkToLobby,
  PlayerCard,
  Settings,
} from '../../Components';
import IssueCopy from '../../Components/issue-copy';
import IssueImport from '../../Components/issue-import';
import { TitleAdd1, TitleAdd3 } from '../../Components/titles';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TKickOptions, TPlayer } from '../../types/types';

const LobbyPage: FC = () => {
  const [isMaster, setMaster] = useState(false);
  const [showKickMessage, setKickMessage] = useState(false);
  const [kickOptions, setKickOptions] = useState<TKickOptions | {}>({});

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const roomId = appState?.users.length ? appState?.users[0].playerId : '';

  useEffect(() => {
    if (appState?.users.length) {
      const id = socket?.id;
      const user = appState?.users.find((user) => user.playerId === id);
      user ? setMaster(user?.master as boolean) : history.push('/');
    } else {
      history.push('/');
    }
  }, [appState?.users]);

  useEffect(() => {
    if (appState?.settings.isGameStarted) {
      history.push('/game');
      if (!isMaster) enqueueSnackbar('Game started!', { variant: 'info' });
    }
  }, [appState?.settings.isGameStarted]);

  useEffect(() => {
    socket?.on('startKickPool', (targetId, initiatorId) => {
      setKickOptions({ targetId, initiatorId });

      const id = socket?.id;
      const masterId = appState?.users[0].playerId;

      if (masterId !== id && id !== initiatorId && id !== targetId) {
        setKickMessage(true);
      }
    });
  }, []);

  const startGame = () => {
    const cardsDeck = appState?.cardsDeck;
    const settings = { ...appState?.settings, isGameStarted: true, cardsDeck };
    socket?.emit('saveSettings', settings, roomId, (error: string) => {
      error
        ? enqueueSnackbar(`Error: ${error}`, { variant: 'error' })
        : enqueueSnackbar('Game created!', { variant: 'success' });
    });
  };

  const cancelGame = () => {
    socket?.emit('cancelGame', roomId, 'Game was closed by master!');
  };

  const exitGame = () => {
    socket?.emit('kickPlayer', socket?.id, 'just left the game');
  };

  const isMemberSectionShow = (usersLength: number | undefined) => {
    const minNumberOfUsers = 1;
    return (usersLength ? usersLength : 0) > minNumberOfUsers;
  };

  return (
    <Box className="lobby-page">
      <Container className="lobby-page-wrapper">
        {isMaster ? (
          <TitleAdd3>Setup your game and push start button</TitleAdd3>
        ) : (
          <TitleAdd3>Waiting for game starts...</TitleAdd3>
        )}

        {/******************** Start Game Section ********************/}
        <Box className="start-game section" component="section">
          <TitleAdd1 className="label-scram-master text-center">Scram master:</TitleAdd1>
          <Box className="card-master mb-20">
            {appState?.users.length && (
              <PlayerCard
                player={appState?.users[0] as TPlayer}
                key={appState?.users[0].playerId}
                playersCount={appState?.users.length}
                isMaster={isMaster}
              />
            )}
          </Box>
          <LinkToLobby value={roomId} />
          {isMaster ? (
            <>
              <Box className="buttons-game mt-20 mb-20">
                <Button
                  className="p-10"
                  variant="contained"
                  color="primary"
                  onClick={() => startGame()}>
                  Start Game
                </Button>
                <Button
                  className="p-10"
                  variant="outlined"
                  color="primary"
                  onClick={() => cancelGame()}>
                  Cancel game
                </Button>
              </Box>
            </>
          ) : (
            <Box className="buttons-game mt-20 mb-20">
              <div></div>
              <Button
                className="p-10"
                variant="outlined"
                color="primary"
                onClick={() => exitGame()}>
                Exit
              </Button>
            </Box>
          )}
        </Box>

        {/******************** Members Section ********************/}
        {isMemberSectionShow(appState?.users.length) && (
          <Box className="members section" component="section">
            <TitleAdd1 className="label-members text-center">Members:</TitleAdd1>
            <Box className="cards-wrapper mb-20">
              {appState?.users.length &&
                appState?.users
                  .filter((e) => !e.master)
                  .map((el) => (
                    <PlayerCard
                      player={el}
                      key={el.playerId}
                      playersCount={appState?.users.length}
                      isMaster={isMaster}
                    />
                  ))}
            </Box>
          </Box>
        )}
        {/******************** Issues Section ********************/}
        {isMaster && (
          <Box className="issues section" component="section">
            <TitleAdd1 className="label-issues text-center">Issues:</TitleAdd1>
            <Box className="issues-add">
              <IssueAdd />
              <IssueImport />
            </Box>
            {appState?.issues.length !== 0 && <IssueCopy />}
            <Box className="cards-wrapper mt-20 mb-20">
              {appState?.issues &&
                appState?.issues.map((el) => (
                  <Issue issue={el} isLobby={true} key={el.issueID} />
                ))}
            </Box>
          </Box>
        )}

        {/******************** Setting Section ********************/}
        {isMaster && <Settings />}
      </Container>

      {/******************** Chat Section ********************/}
      <div className="chat-container">
        <Chat playersCount={appState?.users.length as number} isMaster={isMaster} />
      </div>

      {/******************** Kick-message Section ********************/}
      {showKickMessage && (
        <KickMessage
          kickOptions={kickOptions as TKickOptions}
          isOpen={showKickMessage}
          handle={setKickMessage}
        />
      )}
    </Box>
  );
};

export default LobbyPage;
