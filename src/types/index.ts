export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'professor';
}

export interface Course {
  id: string;
  name: string;
  code: string;
}

export interface Attendance {
  date: string;
  status: 'present' | 'absent';
  course: string;
}

export interface Mark {
  courseId: string;
  type: string;
  score: number;
  totalMarks: number;
}

export interface Resource {
  id: string;
  title: string;
  type: string;
  url: string;
  uploadedBy: string;
  courseId: string;
}