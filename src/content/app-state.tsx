import React, { FC, useState } from 'react';

import { INITAL_DECK } from '../config';
import { TIssue, TPlayer, TSettings } from '../data/types';

type TAppState = {
  users: TPlayer[];
  setUsers: React.Dispatch<React.SetStateAction<TPlayer[]>>;
  issues: TIssue[];
  setIssues: React.Dispatch<React.SetStateAction<TIssue[]>>;
  settings: TSettings;
  setSettings: React.Dispatch<React.SetStateAction<TSettings>>;
  cardsDeck: string[];
  setCardsDeck: React.Dispatch<React.SetStateAction<string[]>>;
};

const InitialSettings: TSettings = {
  isGameStarted: false,
  isCardRound: true,
  isMasterAsPlayer: false,
  cardDeckNumber: 0,
  isTimerNeed: true,
  roundTime: 90,
  scoreType: 'Story point',
  scoreTypeShort: 'SP',
};

const AppContext = React.createContext<TAppState | undefined>(undefined);

const AppProvider: FC = ({ children }) => {
  const [users, setUsers] = useState<TPlayer[]>([]);
  const [issues, setIssues] = useState<TIssue[]>([]);
  const [settings, setSettings] = useState<TSettings>(InitialSettings);
  const [cardsDeck, setCardsDeck] = useState<string[]>(INITAL_DECK);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        issues,
        setIssues,
        settings,
        setSettings,
        cardsDeck,
        setCardsDeck,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
