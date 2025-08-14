import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../auth/authService'
import type { User } from '../auth/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const signOut = () => {
    logout();
    setUser(null);
  };

  return { user, signOut };
}
