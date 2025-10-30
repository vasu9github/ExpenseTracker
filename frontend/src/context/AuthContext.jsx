import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;\
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      }
    } else {
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'token') {
        const newToken = e.newValue;
        setToken(newToken);
      }
      if (e.key === 'user') {
        const newUser = e.newValue;
        setUser(newUser ? JSON.parse(newUser) : null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const payload = res.data?.data || {};
      const receivedToken = payload.token;
      const userData = { ...payload };
      delete userData.token;

      if (!receivedToken) {
        toast.error('Login failed: no token received');
        return false;
      }

      setToken(receivedToken);
      setUser(userData);
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

      toast.success('Login successful! Welcome.');
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      toast.error(errorMessage);
      return false;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      const payload = res.data?.data || {};
      const receivedToken = payload.token;
      const userData = { ...payload };
      delete userData.token;

      if (!receivedToken) {
        toast.error('Signup failed: no token received');
        return false;
      }

      setToken(receivedToken);
      setUser(userData);
      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

      toast.success('Account created successfully! Welcome.');
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Signup failed. Please try again.';
      toast.error(errorMessage);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    toast.info('You have been logged out.');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup, isLoading: loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
