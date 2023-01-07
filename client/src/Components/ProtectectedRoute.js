import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie'
const ProtectedRoute = ({ children }) => {
  let user = Cookie.get('AccessToken')
  console.log(user);
  if (!user) return <Navigate to="/admin-login" />;
  return children;
};

export default ProtectedRoute

