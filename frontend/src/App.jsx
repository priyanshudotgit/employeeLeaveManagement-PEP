import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplyLeave from './pages/ApplyLeave';
import Reimbursements from './pages/Reimbursements';
import ManagerLeaves from './pages/ManagerLeaves';
import AdminReimbursements from './pages/AdminReimbursements';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <div className="min-h-screen bg-charcoal-50 text-charcoal-900 dark:bg-charcoal-900 dark:text-charcoal-50 font-sans transition-colors duration-200">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes Wrapper */}
        <Route element={<Layout />}>
          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<ProtectedRoute allowedRoles={['employee']}> <EmployeeDashboard /> </ProtectedRoute>} />
          <Route path="/employee/apply-leave" element={<ProtectedRoute allowedRoles={['employee']}> <ApplyLeave /> </ProtectedRoute>} />
          <Route path="/employee/reimbursements" element={<ProtectedRoute allowedRoles={['employee', 'manager']}> <Reimbursements /> </ProtectedRoute>} />

          {/* Manager Routes */}
          <Route path="/manager/dashboard" element={<ProtectedRoute allowedRoles={['manager']}> <ManagerDashboard /> </ProtectedRoute>} />
          <Route path="/manager/leaves" element={<ProtectedRoute allowedRoles={['manager', 'admin']}> <ManagerLeaves /> </ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}> <AdminDashboard /> </ProtectedRoute>} />
          <Route path="/admin/reimbursements" element={<ProtectedRoute allowedRoles={['admin']}> <AdminReimbursements /> </ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}> <AdminUsers /> </ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;