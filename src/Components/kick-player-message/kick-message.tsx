import './kick-message.scss';

import React, { Dispatch, FC, SetStateAction, useContext } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TKickOptions } from '../../types/types';
import CustomDialog from '../dialog';

interface IProps {
  kickOptions: TKickOptions;
  isOpen: boolean;
  handle: Dispatch<SetStateAction<boolean>>;
}

const KickMessage: FC<IProps> = ({ kickOptions, isOpen, handle }) => {
  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);
  const { initiatorId, targetId } = kickOptions;
  const initiator = appState?.users.find((el) => el.playerId === initiatorId);
  const target = appState?.users.find((el) => el.playerId === targetId);

  const sendResponseToServer = (answer: boolean) => {
    socket?.emit('setKickDecision', targetId, answer);
  };

  const handleClickClose = (answer: boolean) => {
    sendResponseToServer(answer);
    setTimeout(() => {
      handle(false);
    }, 500);
  };

  return (
    <div>
      <CustomDialog
        handleNegative={() => {
          handleClickClose(false);
        }}
        handlePositive={() => {
          handleClickClose(true);
        }}
        isOpen={isOpen}>
        <span className="large-text">Kick</span>
        <div className="message-text">
          <div>
            <span className="colored-text">{`${initiator?.name} ${initiator?.lastName}`}</span>
            <span> wants to kick member </span>
            <span className="colored-text">{`${target?.name} ${target?.lastName}`}.</span>
          </div>
          <span className="centred-text">Do you agree with it?</span>
        </div>
      </CustomDialog>
    </div>
  );
};

export default KickMessage;
