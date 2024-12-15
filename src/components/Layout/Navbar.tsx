import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg font-roboto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <h1 className="text-white font-bold text-xl tracking-wide">EduTrack</h1>
              </a>
            </div>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-white font-medium">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-white bg-blue-700 hover:bg-blue-800 transition duration-200"
            >
              <div className="flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-white bg-blue-700 hover:bg-blue-800 transition duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="text-white block px-3 py-2 font-medium">{user?.name}</div>
            <button
              onClick={handleLogout}
              className="text-white block px-3 py-2 w-full text-left bg-blue-700 hover:bg-blue-800 transition duration-200 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}