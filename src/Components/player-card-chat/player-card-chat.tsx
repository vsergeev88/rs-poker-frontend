import './player-card-chat.scss';

import { Avatar } from '@material-ui/core';
import React, { FC } from 'react';

import { TPlayer } from '../../data/game';
import { getCapitalLetters, stringToColor } from '../../utils/formatters';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  player: TPlayer;
}

const PlayerCardChat: FC<IProps> = ({ player }) => {
  const { name, lastName, imgUrl } = player;

  return (
    <div className="player-card-chat_container">
      <Avatar
        alt={`${name} ${lastName}`}
        src={imgUrl}
        className="avatar-chat"
        style={{ backgroundColor: `${stringToColor(`${name} ${lastName}`)}` }}>
        {!imgUrl ? (name ? getCapitalLetters(name, lastName) : 'NN') : ''}
      </Avatar>
      <div className="player-info-chat_container">
        <span className="player-name-chat_text">{`${name} ${lastName}`}</span>
      </div>
    </div>
  );
};

export default PlayerCardChat;
