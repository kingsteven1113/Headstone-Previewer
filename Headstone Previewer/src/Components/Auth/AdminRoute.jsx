import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (String(user?.role || '').toUpperCase() !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
