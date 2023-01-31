import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie'
const SecureRoute = ({ children }) => {
    let user = Cookie.get('UserLoginToken')
    // console.log(user);
    if (!user) return <Navigate to="/login" />;
    return children;
  };
export const CheckRoute =({children})=>{
  let user = Cookie.get('UserLoginToken')
  // console.log(user);
  if (!user) return <Navigate to="/shipping_page"/>;
  return children;
}

export default SecureRoute;