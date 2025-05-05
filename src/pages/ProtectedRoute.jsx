import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Jika belum login, redirect ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan halaman
  return children;
};

export default ProtectedRoute;
