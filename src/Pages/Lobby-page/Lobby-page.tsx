import './Lobby-page.scss';

import { Box, Button, Container, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { FC, useContext, useEffect, useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router';

import {
  Chat,
  Issue,
  IssueAdd,
  KickMessage,
  PlayerCard,
  Settings,
} from '../../Components';
import { TitleAdd1, TitleMain } from '../../Components/titles';
import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TIssue, TKickOptions, TPlayer } from '../../data/types';

const LobbyPage: FC = () => {
  const startGame = () => {
    console.log('startGame');
  };
  const cancelGame = () => {
    console.log('cancelGame');
  };
  const exitGame = () => {
    console.log('exitGame');
  };
  const copyUrlLobby = (copyText: string | undefined) => {
    if (copyText) {
      navigator.clipboard.writeText(copyText);
      setCopyTextBtn('Copied');
      enqueueSnackbar('Copied', { variant: 'success' });
    }
  };

  const [copyText, setCopyText] = useState<string | undefined>('');
  const [copyTextBtn, setCopyTextBtn] = useState('Copy');
  const [isMaster, setMaster] = useState(false);
  const [showKickMessage, setKickMessage] = useState(false);
  const [kickOptions, setKickOptions] = useState<TKickOptions | {}>({});

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (appState?.users.length) {
      const id = socket?.id;
      const user = appState?.users.find((user) => user.playerId === id);
      user ? setMaster(user?.master as boolean) : history.push('/');

      setCopyText(appState?.users[0].playerId);
    }
  }, [appState?.users, appState?.issues]);

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

  const isMemberSectionShow = (usersLength: number | undefined) => {
    const minNumberOfUsers = 1;
    return (usersLength ? usersLength : 0) > minNumberOfUsers;
  };

  const showIssueTitleList = (issues: TIssue[] | undefined) => {
    const maxNumberIssues: Number = 5;
    let titleList: Array<String> = [];
    issues &&
      issues.map((el) => titleList.length < maxNumberIssues && titleList.push(el.name));
    return titleList.join(', ');
  };

  return (
    <Box className="lobby-page">
      <Container className="lobby-page-wrapper">
        <TitleMain>
          Subject of discussion:&nbsp;
          {appState?.issues && showIssueTitleList(appState?.issues)}
        </TitleMain>

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
          {isMaster ? (
            <>
              <Box className="link-to-lobby">
                <TitleAdd1 className="label-link-to-lobby text-center">
                  Lobby ID:
                </TitleAdd1>
                <Box className="copy-to-lobby">
                  <TextField
                    disabled
                    className="input-link-to-label"
                    id="outlined-helperText"
                    value={copyText}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) => {
                      setCopyText(e.target.value);
                      setCopyTextBtn('Copy');
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => copyUrlLobby(copyText)}>
                    {copyTextBtn}
                  </Button>
                </Box>
              </Box>
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
            <IssueAdd />
            <Box className="cards-wrapper mb-20">
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
