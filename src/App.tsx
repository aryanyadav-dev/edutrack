import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { LandingPage } from './components/Landingpage';

// Protect routes that require authentication
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// Public routes are only accessible when not authenticated
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
}

// Layout wrapper for authenticated pages
function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();  // Get the current route

  // Back button handler
  const handleBackClick = () => {
    if (location.pathname === '/dashboard') {
      navigate('/login'); // Go to login page if on the dashboard
    } else if (location.pathname === '/login') {
      navigate('/'); // Go to landing page if on the login page
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {/* Show the back button only on the Dashboard and Login pages */}
          {(location.pathname === '/dashboard' || location.pathname === '/login') && (
            <button onClick={handleBackClick} className="mb-4 p-2 bg-blue-500 text-white rounded">
              Back
            </button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

// Modified landing page with navigation
function LandingPageWrapper() {
  const navigate = useNavigate();
  
  const handleSignIn = () => {
    navigate('/login');
  };

  return <LandingPage onSignInClick={handleSignIn} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPageWrapper />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
