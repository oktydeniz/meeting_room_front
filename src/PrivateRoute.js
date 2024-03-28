import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute({ children, allowedRoles }) {
    const { isAuthenticated } = useAuth();
    const userType = localStorage.getItem('userType');
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    } else if (!allowedRoles.includes(userType)) {
      return <Navigate to="/" />;
    }

    return children;
  }