import React from 'react';
import { Link, NavLink, Route, Routes, BrowserRouter } from 'react-router-dom';
import Previewer from './Components/Previewer/Previewer.jsx';
import Landing from './Components/Landing/Landing.jsx';
import Login from './Components/Auth/Login.jsx';
import Signup from './Components/Auth/Signup.jsx';
import ProtectedRoute from './Components/Auth/ProtectedRoute.jsx';
import AdminRoute from './Components/Auth/AdminRoute.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import AdminDashboard from './Components/Dashboard/AdminDashboard.jsx';
import Pricing from './Components/Pricing/Pricing.jsx';
import Quote from './Components/Quote/Quote.jsx';
import QuoteFeaturePage from './Components/Quote/QuoteFeaturePage.jsx';
import QuoteRequest from './Components/Quote/QuoteRequest.jsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import { canGenerateQuotes } from './utils/accessRules';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error boundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>The app hit a runtime error. Please refresh the page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppShell() {
  const { isAuthenticated, logout, user, plan } = useAuth();
  const quoteToolEnabled = canGenerateQuotes({ isAuthenticated, plan });
  const quoteNavTarget = quoteToolEnabled ? '/quote' : '/quote-feature';

  return (
    <div className="app-shell">
      <header className="top-nav">
        <Link className="brand" to="/">
          Headstone Previewer
        </Link>

        <nav className="nav-links">
          {isAuthenticated ? (
            <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/preview">
              Preview
            </NavLink>
          ) : null}
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/pricing">
            Pricing
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to={quoteNavTarget}>
            Quote
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/dashboard">
                Dashboard
              </NavLink>
              {String(user?.role || '').toUpperCase() === 'ADMIN' ? (
                <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/admin">
                  Admin
                </NavLink>
              ) : null}
              <span className="nav-user">{user?.name || 'Member'}</span>
              <button className="nav-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/login">
                Login
              </NavLink>
              <NavLink className="nav-cta" to="/signup">
                Create account
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/preview"
            element={
              <ProtectedRoute>
                <Previewer />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/quote-feature" element={<QuoteFeaturePage />} />
          <Route
            path="/quote"
            element={
              quoteToolEnabled ? (
                <ProtectedRoute>
                  <Quote />
                </ProtectedRoute>
              ) : (
                <QuoteFeaturePage />
              )
            }
          />
          <Route path="/quote-request" element={<QuoteRequest />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
