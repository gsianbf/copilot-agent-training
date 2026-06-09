import { createContext, useContext, useState, useCallback } from 'react';

const SESSION_KEY = 'jwt_token';
const USER_KEY = 'jwt_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(SESSION_KEY));
  const [user, setUser] = useState(() => sessionStorage.getItem(USER_KEY));

  const saveSession = useCallback((accessToken, username) => {
    sessionStorage.setItem(SESSION_KEY, accessToken);
    sessionStorage.setItem(USER_KEY, username);
    setToken(accessToken);
    setUser(username);
  }, []);

  const clearSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, saveSession, clearSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
