import React, { FC } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import { IS_LOCAL_PROJECT, LOCAL_SOCKET_SERVER, REMOVED_SOCKET_SERVER } from '../config';

const SocketContext = React.createContext<
  Socket<DefaultEventsMap, DefaultEventsMap> | undefined
>(undefined);

const SocketProvider: FC = ({ children }) => {
  const ENDPOINT = IS_LOCAL_PROJECT ? LOCAL_SOCKET_SERVER : REMOVED_SOCKET_SERVER;

  const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
