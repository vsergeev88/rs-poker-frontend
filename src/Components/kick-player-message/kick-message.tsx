import './kick-message.scss';

import React, { Dispatch, FC, SetStateAction } from 'react';

import CustomDialog from '../dialog';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  initiator: string;
  target: string;
  idPlayer: number;
  isOpen: boolean;
  handle: Dispatch<SetStateAction<boolean>>;
}

const KickMessage: FC<IProps> = ({ initiator, target, idPlayer, isOpen, handle }) => {
  const sendResponseToServer = (answer: boolean) => {
    // TODO!! send information to server
    console.log(`kick player - id = ${idPlayer}: ${answer}`);
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
            <span className="colored-text">{initiator}</span>
            <span> wants to kick member </span>
            <span className="colored-text">{target}.</span>
          </div>
          <span className="centred-text">Do you agree with it?</span>
        </div>
      </CustomDialog>
    </div>
  );
};

export default KickMessage;
