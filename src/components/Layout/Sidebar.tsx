import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, Award, BookOpen, CheckSquare, Upload, Users, Menu, MessageCircle, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const studentLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/projects', icon: FileText, label: 'Projects' },
    { to: '/resources', icon: BookOpen, label: 'Resources' },
    { to: '/community', icon: Users, label: 'Community' },  
    { to: '/chatbot', icon: MessageCircle, label: 'Chatbot' },  
  ];

  const professorLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/mark-attendance', icon: CheckSquare, label: 'Mark Attendance' },
    { to: '/enter-marks', icon: FileText, label: 'Enter Marks' },
    { to: '/manage-resources', icon: Upload, label: 'Manage Resources' },
    { to: '/students', icon: Users, label: 'Students' },
  ];

  const links = user?.role === 'professor' ? professorLinks : studentLinks;

  const handleLogout = () => {
    logout();
    // Redirect to login page will be handled by the AuthContext
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 p-2 bg-blue-800 text-white rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />} {/* Increased size to h-8 w-8 */}
      </button>

      <div
        className={`fixed left-0 top-0 h-screen w-56 bg-blue-800 text-white shadow-lg z-10 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full pt-14"> {/* Increased padding-top to pt-14 */}
          <div className="flex items-center justify-between p-4 md:mt-0 mt-16">
            <span className="text-lg font-bold">Menu</span>
            <button
              className="md:hidden"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-grow mt-4 px-2 overflow-y-auto">
            <div className="space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-green-500 text-white'
                        : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span className="truncate">{link.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="p-3 space-y-3">
            <div className="bg-blue-900 rounded-md p-2 text-sm">
              <div className="font-medium truncate">{user?.name}</div>
              <div className="text-xs text-gray-400">{user?.role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-2 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
