import './kick-dialog.scss';

import NotInterestedIcon from '@material-ui/icons/NotInterested';
import React, { FC, useState } from 'react';

import CustomDialog from '../dialog';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  target: string;
  playerId: number;
}

const KickDialog: FC<IProps> = ({ target, playerId }) => {
  const [openKickDialog, setKickDialog] = useState(false);

  const handleKickPlayer = () => {
    closeKickDialog();
    // TODO send information to server
    console.log(`Send kicking request with playerId: ${playerId}`);
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
