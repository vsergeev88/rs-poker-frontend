import './kick-dialog.scss';

import NotInterestedIcon from '@material-ui/icons/NotInterested';
import React, { FC, useContext, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import CustomDialog from '../dialog';

interface IProps {
  target: string;
  playerId: string;
}

const KickDialog: FC<IProps> = ({ target, playerId }) => {
  const [openKickDialog, setKickDialog] = useState(false);

  const appState = useContext(AppContext);
  const socket = useContext(SocketContext);

  const handleKickPlayer = () => {
    const initiator = appState?.users.find((el) => el.playerId === socket?.id);
    if (initiator?.master) {
      socket?.emit('kickPlayer', playerId, 'kicked by master');
    } else {
      socket?.emit('triggerKickPool', playerId, initiator?.playerId);
    }
    closeKickDialog();
  };

  const handleClickOpen = () => {
    setKickDialog(true);
  };

  const closeKickDialog = () => {
    setTimeout(() => {
      setKickDialog(false);
    }, 500);
  };

  return (
    <div>
      <NotInterestedIcon onClick={handleClickOpen} className="kick-icon">
        Connect
      </NotInterestedIcon>
      {openKickDialog && (
        <CustomDialog
          handleNegative={() => {
            closeKickDialog();
          }}
          handlePositive={() => {
            handleKickPlayer();
          }}
          isOpen={openKickDialog}>
          <span className="large-text">Kick player?</span>
          <div className="message-text">
            <span> Do you really want to remove player </span>
            <span className="colored-text">{target}</span>
            <span> from game session?</span>
          </div>
        </CustomDialog>
      )}
    </div>
  );
};

export default KickDialog;
