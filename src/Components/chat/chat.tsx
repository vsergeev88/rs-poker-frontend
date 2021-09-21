import './chat.scss';

import { Button, Input } from '@material-ui/core';
import React, { FC, useContext, useEffect, useState } from 'react';

import { SocketContext } from '../../content/socket';
import { TPlayer } from '../../data/game';
import PlayerCard from '../player-card';

type TMessage = {
  user: TPlayer;
  message: string;
};

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  playersCount: number;
  isMaster: boolean;
}

const Chat: FC<IProps> = ({ playersCount, isMaster }) => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<TMessage[]>([]);

  useEffect(() => {
    socket?.on('message', (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, [socket]);

  const sendMessage = () => {
    socket?.emit('sendMessage', message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat_wrapper">
      <div className="messages_wrapper">
        {messages.map((el, indx) => (
          <div className="message_container" key={indx}>
            <div className="chat-message">{el.message}</div>
            <PlayerCard
              player={el.user}
              cardType="small"
              isMaster={isMaster}
              playersCount={playersCount}
            />
          </div>
        ))}
      </div>
      <div className="chat_controls">
        <Input
          multiline
          className="input_props"
          placeholder="Type your message here"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          color="primary"
          className="send-btn_props"
          disabled={!message.trim()}
          onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
