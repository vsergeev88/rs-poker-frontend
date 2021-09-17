import './player-card.scss';

import { Avatar } from '@material-ui/core';
import React, { FC, useContext } from 'react';

import { SocketContext } from '../../content/socket';
import { TPlayer } from '../../data/game';
import { getCapitalLetters } from '../../utils/formatters';
import KickDialog from '../kick-player-dialog';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  player: TPlayer;
}

const PlayerCard: FC<IProps> = ({ player }) => {
  const { name, lastName, imgUrl, playerId, position, master } = player;
  const socket = useContext(SocketContext);
  const isSelf = playerId !== socket?.id;

  return (
    <div role="none" className="player-card_container">
      <Avatar alt={`${name} ${lastName}`} src={imgUrl} className="avatar">
        {!imgUrl ? (name ? getCapitalLetters(name, lastName) : 'NN') : ''}
      </Avatar>
      <div className="player-info_container">
        <span className={isSelf ? 'not-you_text' : 'its-you_text'}>{`IT'S YOU`}</span>
        <span className="player-name_text">{`${name} ${lastName}`}</span>
        <span className="player-position_text">{position}</span>
      </div>
      {!master && isSelf && (
        <KickDialog target={`${name} ${lastName}`} playerId={playerId} />
      )}
    </div>
  );
};

export default PlayerCard;
