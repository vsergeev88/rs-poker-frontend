import './player-card.scss';

import { Avatar } from '@material-ui/core';
import React, { FC, useContext, useMemo } from 'react';

import { PLAYER_CARD_NAME_LENGTH } from '../../config';
import { SocketContext } from '../../content/socket';
import { TPlayer } from '../../types/types';
import { truncate } from '../../utils/formatters';
import { getCapitalLetters, stringToColor } from '../../utils/formatters';
import KickDialog from '../kick-player-dialog';

interface IProps {
  player: TPlayer;
  playersCount: number;
  isMaster: boolean;
  cardType?: 'big' | 'small';
}

const PlayerCard: FC<IProps> = ({ player, cardType, playersCount, isMaster }) => {
  const { name, lastName, imgUrl, playerId, position, master } = player;

  const socket = useContext(SocketContext);
  const isSelf = playerId === socket?.id;

  const format = useMemo(() => {
    return cardType === 'small' ? 'player-card_container_aside' : '';
  }, [cardType]);

  return (
    <div role="none" className={`player-card_container ${format}`}>
      <Avatar
        alt={`${name} ${lastName}`}
        src={imgUrl}
        className="avatar"
        style={{ backgroundColor: `${stringToColor(`${name} ${lastName}`)}` }}>
        {!imgUrl ? (name ? getCapitalLetters(name, lastName) : 'NN') : ''}
      </Avatar>
      <div className="player-info_container">
        <span className={!isSelf ? 'not-you_text' : 'its-you_text'}>{`IT'S YOU`}</span>
        <span className="player-name_text" title={`${lastName} ${name}`}>
          {truncate(`${lastName} ${name}`, PLAYER_CARD_NAME_LENGTH)}
        </span>
        <span className="player-position_text">{position}</span>
      </div>
      {!master && !isSelf && cardType !== 'small' && (playersCount > 3 || isMaster) && (
        <KickDialog target={`${lastName} ${name}`} playerId={playerId} />
      )}
    </div>
  );
};

export default PlayerCard;
