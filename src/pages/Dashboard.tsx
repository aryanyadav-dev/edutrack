import React from 'react';
import { useAuth } from '../context/AuthContext';
import { StudentDashboard } from './student/StudentDashboard';
import { ProfessorDashboard } from './professor/ProfessorDashboard';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex-1 p-8">
      {user.role === 'student' ? <StudentDashboard /> : <ProfessorDashboard />}
    </div>
  );
}