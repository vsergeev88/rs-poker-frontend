import React, { FC, useState } from 'react';

import { TPlayer } from '../data/game';

type TAppState = {
  users: TPlayer[];
  setUsers: React.Dispatch<React.SetStateAction<TPlayer[]>>;
};

const AppContext = React.createContext<TAppState | undefined>(undefined);

const AppProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<TPlayer[]>([]);

  return (
    <AppContext.Provider value={{ users, setUsers }}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
