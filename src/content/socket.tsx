import React, { FC } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

const SocketContext = React.createContext<
  Socket<DefaultEventsMap, DefaultEventsMap> | undefined
>(undefined);

const SocketProvider: FC = ({ children }) => {
  const ENDPOINT = 'https://pocker-server.herokuapp.com';
  // const ENDPOINT = 'localhost:5000';

  const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
