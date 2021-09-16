import React, { FC, useState } from 'react';

type TUsersState = {
  users: never[];
  setUsers: React.Dispatch<React.SetStateAction<never[]>>;
};

const UsersContext = React.createContext<TUsersState | undefined>(undefined);

const UsersProvider: FC = ({ children }) => {
  const [users, setUsers] = useState([]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>
  );
};

export { UsersContext, UsersProvider };
