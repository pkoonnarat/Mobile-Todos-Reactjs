import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  const login = (userToken) => {
    setToken(userToken);
  };

  const setName = (username) => {
    setUsername(username);
  }

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, setName, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};