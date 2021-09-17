import './player-card.scss';

import { Avatar } from '@material-ui/core';
import React, { FC, useMemo } from 'react';

import { TPlayer } from '../../data/game';
import { getCapitalLetters } from '../../utils/formatters';
import KickDialog from '../kick-player-dialog';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  player: TPlayer;
  cardType: 'big' | 'small';
}

const PlayerCard: FC<IProps> = ({ player, cardType }) => {
  const { name, lastName, imgUrl, playerId, position, master } = player;

  const format = useMemo(() => {
    return cardType === 'small' ? 'player-card_container_aside' : '';
  }, [cardType]);

  return (
    <div role="none" className={`player-card_container ${format}`}>
      <Avatar alt={`${name} ${lastName}`} src={imgUrl} className="avatar">
        {!imgUrl ? (name ? getCapitalLetters(name, lastName) : 'NN') : ''}
      </Avatar>
      <div className="player-info_container">
        <span className={!master ? 'not-you_text' : 'its-you_text'}>{`IT'S YOU`}</span>
        <span className="player-name_text">{`${name} ${lastName}`}</span>
        <span className="player-position_text">{position}</span>
      </div>
      {!master && <KickDialog target={`${name} ${lastName}`} playerId={playerId} />}
    </div>
  );
};

export default PlayerCard;
