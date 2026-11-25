import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

// Demo credentials – replace with a call to the backend auth API when available.
const DEMO_USER = { id: 'u1', name: 'Alex Reader', email: 'demo@bookstore.com' };
const DEMO_PASSWORD = 'password123';

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null);

  // Simulated async API call
  const login = (email, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_PASSWORD) {
          setUser(DEMO_USER);
          resolve(DEMO_USER);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 700);
    });

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
