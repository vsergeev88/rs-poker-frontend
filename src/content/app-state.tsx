import React, { FC, useState } from 'react';

import { TIssue, TPlayer } from '../data/types';

type TAppState = {
  users: TPlayer[];
  setUsers: React.Dispatch<React.SetStateAction<TPlayer[]>>;
  issues: TIssue[];
  setIssues: React.Dispatch<React.SetStateAction<TIssue[]>>;
};

const AppContext = React.createContext<TAppState | undefined>(undefined);

const AppProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<TPlayer[]>([]);
  const [issues, setIssues] = useState<TIssue[]>([]);

  return (
    <AppContext.Provider value={{ users, setUsers, issues, setIssues }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
