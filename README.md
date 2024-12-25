# Student-Professor ERP System

<img width="1462" alt="Screenshot 2024-12-24 at 12 17 01 AM" src="https://github.com/user-attachments/assets/e62ac950-c498-40c0-b31f-5bffb97744f5" />


## Overview
This project is a web application built using **React.js** and **SQL**. It provides role-based access control with authentication, allowing users to log in as either a **Student** or a **Professor**. Depending on the role, users are directed to different dashboards with distinct functionalities.

### Key Features
#### Student Dashboard:
- **Navbar Items:**
  - Attendance
  - Marks
  - Co-curricular Activities
  - Resources

#### Professor Dashboard:
- **Navbar Items:**
  - Marks Entry
  - Upload Study Resources
  - Marking and Tracking Attendance

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** SQL
- **Authentication:** JSON Web Tokens (JWT) for secure login
- **Styling:** TailwindCSS 

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Steps to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/edutrack.git
   cd edutrack
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory.
   - Add the following variables:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/erp
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development server for both frontend and backend:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Authentication Workflow
1. **Login:**
   - User enters email and password.
   - If credentials are valid, a JWT token is issued.

2. **Role-Based Access:**
   - The JWT token is decoded to determine the user's role (Student or Professor).
   - The frontend renders the appropriate dashboard based on the role.

---

## Usage
### For Students:
- Log in using your credentials.
- Navigate through the dashboard to view your attendance, marks, co-curricular activities, and resources.

### For Professors:
- Log in using your credentials.
- Use the dashboard to:
  - Enter or update student marks.
  - Upload study resources for students.
  - Mark and track student attendance.

This ensures streamlined communication and management between students and professors.
