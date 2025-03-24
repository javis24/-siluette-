// authContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  uuid: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/me', { withCredentials: true });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await axios.post(
        'http://localhost:5000/login',
        { email, password },
        { withCredentials: true }
      );
      await fetchUser(); // Actualiza el usuario autenticado
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.delete('http://localhost:5000/logout', { withCredentials: true });
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
