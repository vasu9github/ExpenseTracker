
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ExpenseProvider } from './context/ExpenseContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { token } = useAuth();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
      />
      <Routes>
        <Route 
          path="/login" 
          element={token ? <Navigate to="/" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={token ? <Navigate to="/" /> : <SignupPage />} 
        />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <ExpenseProvider>
                <DashboardPage />
              </ExpenseProvider>
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;