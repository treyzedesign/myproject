import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { FaEnvelope} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "./Comp.css"
const ResendMail = () => {
    const {email} = useParams()
    const {firstName} = useParams()
    const Remail = async()=>{
        await axios.post(`http://localhost:3001/api/v1/resend_mail`,{
            email,firstName
        }).then((feedback)=>{
            console.log(feedback);
        }).catch((err)=>{
            console.log(err);
        })
    }
    toast.success("email has been sent to you")
  return (
    <div>
    <div className=' email-body'>
      <div className='email-card-resend bg-light  shadow-lg'>
       <div><FaEnvelope/></div>
       <div>
        <h5>
            A mail has ben sent to your inbox.
        </h5>
        <h6>
            if you did not recieve one kindly click the button
        </h6>
        <button className='btn btn-warning' onClick={()=> Remail()}>Resend</button>
       </div>
      </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default ResendMail