import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Users,
  CheckSquare,
  FileText,
  BookOpen,
  BarChart2,
  Activity,
  TrendingUp,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function ProfessorDashboard() {
  const stats = [
    { name: 'Total Students', value: '120', icon: Users, color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Classes Today', value: '4', icon: CheckSquare, color: 'bg-teal-100 text-teal-600' },
    { name: 'Pending Grades', value: '25', icon: FileText, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Resources Shared', value: '18', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
  ];

  const studentAttendanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Students Attended',
        data: [100, 110, 105, 120],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const pendingGradesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Pending Grades',
        data: [30, 25, 20, 25],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Professor Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 p-6"
          >
            <div className="flex items-center space-x-4">
              <div className={`flex-shrink-0 p-4 rounded-md ${stat.color}`}>
                <stat.icon className="h-8 w-8 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Students Attended Graph */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <BarChart2 className="mr-2 text-indigo-500" /> Students Attended
          </h2>
          <Line
            data={studentAttendanceData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>

        {/* Pending Grades Graph */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <BarChart2 className="mr-2 text-yellow-500" /> Pending Grades
          </h2>
          <Line
            data={pendingGradesData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>

      {/* Schedule and Updates */}
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Schedule */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <Activity className="mr-2 text-teal-500" /> Today's Schedule
          </h2>
          <div className="space-y-4">
            {[
              { class: 'Database Management', time: '9:00 AM', room: 'Room 201' },
              { class: 'DBMS Practical', time: '11:00 AM', room: 'Lab 101' },
              { class: 'Data Structures and Algorithms', time: '2:00 PM', room: 'Room 305' },
            ].map((schedule) => (
              <div
                key={schedule.class}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{schedule.class}</p>
                  <p className="text-sm text-gray-500">{schedule.room}</p>
                </div>
                <span className="text-sm text-gray-500">{schedule.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <TrendingUp className="mr-2 text-yellow-500" /> Recent Updates
          </h2>
          <div className="space-y-4">
            {[
              'Graded Mathematics Assignment',
              'Updated Course Materials',
              'Posted New Assignment',
            ].map((update, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <p className="text-sm font-medium text-gray-900">{update}</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
