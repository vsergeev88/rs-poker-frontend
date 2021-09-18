import './chat.scss';

import { Button, Input } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../content/app-state';
import { SocketContext } from '../../content/socket';
import { TPlayer } from '../../data/game';
import PlayerCardChat from '../player-card-chat';

type TMessage = {
  playerId: string;
  text: string;
};

const Chat = () => {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [players, setPlayers] = useState<TPlayer[]>([]);

  const appState = useContext(AppContext);

  useEffect(() => {
    socket?.on('message', (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, [socket]);

  useEffect(() => {
    const user = appState?.users.find(
      (el) => el.playerId === messages[messages.length - 1].playerId,
    );

    if (user && !players.find((el) => el.playerId === user?.playerId)) {
      setPlayers((prev) => [...prev, user as TPlayer]);
    }
  }, [messages]);

  useEffect(() => {
    console.log(players);
  }, [players]);

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
        {messages.map((el, indx) => {
          const user = players.find((user) => user.playerId === el.playerId);
          if (user) {
            return (
              <div className="message_container" key={indx}>
                <div className="chat-message">{el.text}</div>
                <PlayerCardChat player={user as TPlayer} />
              </div>
            );
          }
        })}
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
