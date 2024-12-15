import React from 'react';
import { Calendar, FileText, Award, BookOpen, Clipboard, Activity, FileText as AssignmentIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function StudentDashboard() {
  const stats = [
    { name: 'Attendance', value: '85%', icon: Calendar, color: 'bg-green-100 text-green-600' },
    { name: 'Current CGPA', value: '9.8', icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { name: 'Activities', value: '5', icon: Award, color: 'bg-purple-100 text-purple-600' },
    { name: 'Resources', value: '12', icon: BookOpen, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const attendanceData = [
    { name: 'Mon', value: 80 },
    { name: 'Tue', value: 85 },
    { name: 'Wed', value: 90 },
    { name: 'Thu', value: 85 },
    { name: 'Fri', value: 87 },
    { name: 'Sat', value: 85 },
    { name: 'Sun', value: 88 },
  ];

  const cgpaData = [
    { name: 'Week 1', value: 9.5 },
    { name: 'Week 2', value: 9.6 },
    { name: 'Week 3', value: 9.7 },
    { name: 'Week 4', value: 9.8 },
    { name: 'Week 5', value: 9.8 },
    { name: 'Week 6', value: 9.9 },
    { name: 'Week 7', value: 9.9 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Student Dashboard</h1>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
                      <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graph Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900">Attendance Trend</h2>
            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900">CGPA Progress</h2>
            <div className="mt-4 h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cgpaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2196F3" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Upcoming Classes and Activities Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clipboard className="mr-2" /> Upcoming Classes
            </h2>
            <div className="mt-4 space-y-4">
              {[{ subject: 'Database Management', time: '10:00 AM' },
                { subject: 'Computer Networks', time: '11:30 AM' },
                { subject: 'Data Structures and Algorithms', time: '2:00 PM' }].map(({ subject, time }) => (
                <div key={subject} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{subject}</p>
                    <p className="text-sm text-gray-500">Room 101</p>
                  </div>
                  <span className="text-sm text-gray-500">{time}</span>
                </div>
              ))}
            </div>
          </div>


          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="mr-2" /> Recent Activities
            </h2>
            <div className="mt-4 space-y-4">
              {[
                'Submitted Mathematics Assignment',
                'Attempted DLDCA FA',
                'Completed DSA Project',
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

     {/* Upcoming Assignments Section */}
     <div className="mt-8 flex justify-center">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full sm:w-11/12 lg:w-1/2 text-center">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center justify-center">
              <AssignmentIcon className="mr-2" /> Upcoming Assignments
            </h2>
            <div className="mt-4 space-y-4">
              {[
                { subject: 'Computer Graphics', dueDate: '2024-12-20', description: 'Assignment' },
                { subject: 'DLDCA', dueDate: '2024-12-22', description: 'Lab Report' },
                { subject: 'Database Management', dueDate: '2024-12-25', description: 'Project Submission' },
              ].map((assignment, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className={assignment.subject === 'Computer Science' ? "text-center" : "text-left"}>
                    <p className="text-sm font-medium text-gray-900">{assignment.subject}</p>
                    <p className="text-sm text-gray-500">{assignment.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{assignment.dueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
