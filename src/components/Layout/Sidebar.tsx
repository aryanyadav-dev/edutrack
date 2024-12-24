import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, FileText, Award, BookOpen, CheckSquare, Upload, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { user } = useAuth();

  const studentLinks = [
    { to: '/projects', icon: FileText, label: 'Projects' },
    { to: '/marks', icon: FileText, label: 'Marks' },
    { to: '/activities', icon: Award, label: 'Co-curricular' },
    { to: '/resources', icon: BookOpen, label: 'Resources' },
  ];

  const professorLinks = [
    { to: '/mark-attendance', icon: CheckSquare, label: 'Mark Attendance' },
    { to: '/enter-marks', icon: FileText, label: 'Enter Marks' },
    { to: '/manage-resources', icon: Upload, label: 'Manage Resources' },
    { to: '/students', icon: Users, label: 'Students' },
  ];

  const links = user?.role === 'professor' ? professorLinks : studentLinks;

  return (
    <div className="fixed left-0 top-0 h-screen w-56 bg-blue-800 text-white shadow-lg z-10"> 
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-bold">Menu</span>
        </div>

        <nav className="flex-grow mt-5 px-2 overflow-y-auto">
          <div className="space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                }`
              }
            >
              <Home className="h-5 w-5 mr-3" aria-hidden="true" />
              <span>Home</span>
            </NavLink>

            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-500 text-white'
                      : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                  }`
                }
              >
                <link.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="p-4">
          <div className="bg-blue-900 rounded-lg p-3">
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-gray-400">{user?.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
