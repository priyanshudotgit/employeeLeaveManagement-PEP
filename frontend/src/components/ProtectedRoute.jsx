import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-charcoal-50 dark:bg-charcoal-900 text-charcoal-900 dark:text-charcoal-50">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'manager') return <Navigate to="/manager/dashboard" replace />;
        return <Navigate to="/employee/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
