import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user) return <Navigate to="/admin-login" />;
  return children;
};

export default ProtectedRoute