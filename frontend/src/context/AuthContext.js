import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Page refresh hone par user ka data wapas nikalne ke liye
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        // Agar data corrupt hai toh clear kar do
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  // Ye function Login page se call hoga data milne ke baad
  const loginAction = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    // Logout hote hi seedha Home page par redirect
    // window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);