import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth(); 

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">
              SidLabs Tracker
            </h1>
          </div>
          <div className="flex items-center">
            {user && (
              <span className="text-sm text-gray-500 mr-4">
                Welcome, {user.name}
              </span>
            )}
            <button
              onClick={logout}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;