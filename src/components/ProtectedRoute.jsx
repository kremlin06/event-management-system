import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/useAuth';

import LoadingSpinner from './LoadingSpinner';









const ProtectedRoute = ({ children, redirectTo = '/login', allowedRoles }) => {


  const { isAuthenticated, user, loading } = useAuth();

  const location = useLocation();



  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <LoadingSpinner />
      </div>
    );
  }




  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }




  if (allowedRoles && allowedRoles.length > 0 && user?.role) {
    if (!allowedRoles.includes(user.role)) {


      const isAdminRole = ['Admin', 'Staff', 'Organizer'].includes(user.role);
      return <Navigate to={isAdminRole ? '/dashboard' : '/attendee/portal'} replace />;
    }
  }



  return children;
};

export default ProtectedRoute;
