import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { FaPlusCircle, FaUserCheck } from 'react-icons/fa'
import axios from 'axios';
import "./Comp.css"
const EmailVerify = () => {
  const {email} = useParams();
  const {token} = useParams();
   const [isValidToken, setisValidToken] = useState(false)
  const verifyEmailtoken = async(mail, emailtoken)=>{
      const emailAndToken ={
        email : mail,
        token: emailtoken
      }
      // console.log(emailAndToken);
      await axios.post(`http://localhost:3001/api/v1/verifyEmail`, {
        emailAndToken
      }).then((feedback)=>{
        console.log(feedback);
        const response = feedback.data.status
        if(response === "okay"){
          setisValidToken(true)
        }
      }).catch((fail)=>{
        console.log(fail)
      })
  }
  useEffect(()=>{
     verifyEmailtoken(email, token)
    //  console.log(email, token);
  },[])
  return (
    <div className='bg-grey email-body'>
      <div className='email-card'>
        {isValidToken ? 
            <div>
               <h1 className='success'><FaUserCheck/></h1>
              <h3>Email has been verified you can now sign in</h3>
              <Link to="/login">Signin</Link>
              <h1></h1>
            </div>
            : <div> 
               <h1 className='fail'><FaPlusCircle/></h1>
              <h3>Could not verify email or token is no longer valid</h3>
              <Link to="/register">SignUp</Link>      
              </div>}
      </div>
    </div>
  )
}

export default EmailVerify