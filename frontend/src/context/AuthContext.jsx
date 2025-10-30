import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    loadUserFromToken();
  }, [token]);

  const login = async (email, password, navigate) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token, data: userData } = res.data;

      setToken(token);
      setUser(userData);
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toast.success('Login successful! Welcome.');
      navigate('/');
      return true;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Login failed. Please try again.';
      toast.error(errorMessage);
      return false;
    }
  };

  const signup = async (name, email, password, navigate) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });

      const { token, data: userData } = res.data;

      setToken(token);
      setUser(userData);
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toast.success('Account created successfully! Welcome.');
      navigate('/');
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
  return useContext(AuthContext);
};
