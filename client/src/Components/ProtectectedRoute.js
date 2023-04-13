import { Navigate } from 'react-router-dom';
import Cookie from 'js-cookie'
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  let user = Cookie.get('UserLoginToken')
  // console.log(user);
  let decoder = jwt_decode(user)
  console.log(decoder);
  if(!user){
    return <Navigate to="/404" />;
  }else{
    if(decoder.isAdmin == true || decoder.superAdmin == true){
      return children;
    } 
    return <Navigate to="/404" />;
    
  }

  
};

export default ProtectedRoute

