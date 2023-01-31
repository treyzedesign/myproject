import React from 'react'
import axios from 'axios'
import "./Comp.css"
import {  useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const ForgotPass = () => {
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const forPassword = async()=>{
        const email = emailRef.current.value
        let data = {
          email : email
        }
        await axios.post('http://localhost:3001/api/v1/signup/password', data).then((feedback)=>{
          console.log(feedback);
        }).catch((fail)=>{
          console.log(fail);
        })
    }
  return (
    <div>
        <div ><FaArrowLeft className='Arrow ' onClick={()=> navigate("/login")}/></div>

        <div className='user-formlog  px-5 py-3 shadow-lg'>
          <form className="form-signin">
            <h3 className='text-primary'>Forgotten Password</h3><hr/>
            <small className='text-muted'>Please enter the email address registered with your account.</small>
            <label className="sr-only mb-2">Email address</label>
            <input type="email" id="inputEmail" className="form-control my-3" ref={emailRef} placeholder="Address@domain.com" required />
           
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=> forPassword()}>Continue</button><hr/>
          
           
        </form>
</div>    
    </div>
  )
}

export default ForgotPass