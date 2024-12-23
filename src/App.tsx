import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { LandingPage } from './components/Landingpage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/dashboard" />;
}

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleBackClick = () => {
    if (location.pathname === '/dashboard') {
      logout();
      navigate('/login');
    } else if (location.pathname === '/login') {
      navigate('/');
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (location.pathname === '/dashboard') {
        event.preventDefault();
        logout();
        navigate('/login');
      }
    };

    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location, navigate, logout]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
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

