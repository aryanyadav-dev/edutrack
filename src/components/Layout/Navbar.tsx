import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Home, Book, Folder, Bell, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Book, label: 'Resources', href: '/resources' }, 
    { icon: Folder, label: 'Projects', href: '/projects' }, 
  ];

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg font-roboto z-[10000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14"> 
          {/* Logo */}
          <div className="flex items-center ml-8">
            <a href="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              <h1 className="text-white font-bold text-xl tracking-wide">EduTrack</h1>
            </a>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-blue-100 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
            <div className="relative group">
              <button className="text-blue-100 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out flex items-center space-x-1">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-blue-600"></span>
              </button>
              <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl z-20 hidden group-hover:block">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notification 1</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Notification 2</a>
              </div>
            </div>

            {/* Profile Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsProfileMenuOpen(true)}
              onMouseLeave={() => setIsProfileMenuOpen(false)}
            >
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <img className="h-10 w-10 rounded-full" src={user?.avatar || 'https://via.placeholder.com/40'} alt={user?.name} />
                <span className="text-blue-100 font-medium">{user?.name}</span>
              </div>
              {isProfileMenuOpen && (
                <div className="absolute right-0 w-48 py-1 bg-white rounded-md shadow-xl z-20">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-blue-100 hover:bg-blue-700 hover:text-white transition duration-150 ease-in-out"
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
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-blue-100 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out flex items-center space-x-2"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
            <div className="flex items-center space-x-2 px-3 py-2">
              <img className="h-10 w-10 rounded-full" src={user?.avatar || 'https://via.placeholder.com/40'} alt={user?.name} />
              <span className="text-blue-100 font-medium">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-blue-100 hover:bg-blue-600 hover:text-white block px-3 py-3 rounded-md text-base font-medium w-full text-left transition duration-150 ease-in-out"
            >
              <div className="flex items-center space-x-2">
                <LogOut className="h-6 w-6" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
