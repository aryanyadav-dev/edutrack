import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  FileText, 
  Award,
  BookOpen,
  CheckSquare,
  FileText as FileTextIcon,
  Upload,
  Users,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const studentLinks = [
    { to: '/attendance', icon: Calendar, label: 'Attendance' },
    { to: '/marks', icon: FileText, label: 'Marks' },
    { to: '/activities', icon: Award, label: 'Co-curricular' },
    { to: '/resources', icon: BookOpen, label: 'Resources' },
  ];

  const professorLinks = [
    { to: '/mark-attendance', icon: CheckSquare, label: 'Mark Attendance' },
    { to: '/enter-marks', icon: FileTextIcon, label: 'Enter Marks' },
    { to: '/manage-resources', icon: Upload, label: 'Manage Resources' },
    { to: '/students', icon: Users, label: 'Students' },
  ];

  const links = user?.role === 'professor' ? professorLinks : studentLinks;

  return (
    <div className={`h-full bg-blue-800 text-white shadow-lg ${isCollapsed ? 'w-12' : 'w-52'} transition-all duration-300`}>
      <div className="flex justify-between items-center p-4">
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="text-white p-2 rounded-full focus:outline-none hover:bg-blue-700"
        >
          {isCollapsed ? <X className="h-4 w-4" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <nav className="mt-5 px-2">
        <div className="space-y-4">
          {/* Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `group flex items-center px-3 py-3 text-sm font-medium transition-all duration-300 rounded-full ${
                isActive
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:bg-blue-700 hover:text-white'
              }`
            }
          >
            <div className="mr-4 flex-shrink-0">
              <Home className="h-5 w-5" aria-hidden="true" />
            </div>
            {!isCollapsed && 'Home'}
          </NavLink>

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 text-sm font-medium transition-all duration-300 rounded-full ${
                  isActive
                    ? 'bg-green-500 text-white'
                    : 'text-gray-400 hover:bg-blue-700 hover:text-white'
                }`
              }
            >
              <div className="mr-4 flex-shrink-0">
                <link.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              {!isCollapsed && link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}