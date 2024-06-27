import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [kinesiologoId, setKinesiologoId] = useState(null);

  const login = (id) => {
    setKinesiologoId(id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setKinesiologoId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, kinesiologoId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
