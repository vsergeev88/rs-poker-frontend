import React, { FC, useState } from 'react';

type TAppState = {
  users: never[];
  setUsers: React.Dispatch<React.SetStateAction<never[]>>;
};

const AppContext = React.createContext<TAppState | undefined>(undefined);

const AppProvider: FC = ({ children }) => {
  const [users, setUsers] = useState([]);

  return (
    <AppContext.Provider value={{ users, setUsers }}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
