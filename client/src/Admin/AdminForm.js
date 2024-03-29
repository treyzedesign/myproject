import React from 'react'
import AdminNav from './AdminNav'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import "./admin.css"
import axios from 'axios'
const AdminForm = () => {
  const [loader, setLoader] = useState(false)
  const [inputerr, setInputerr] = useState(false)
  const [err, setErr] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()
  const loginUser = async()=>{
    const email =  emailRef.current.value
    const password = passwordRef.current.value 
        setLoader(true)
    if(email.length > 0 && password.length > 0){
      const logUser = await axios.post("/api/v1/admin-login", {
        email,
        password
      }).then((feedback)=>{
        if(feedback){
        console.log(feedback)
        navigate(`/admin`)
        setLoader(false)
        // Cookie.set(feedback)
        }
      }).catch((result)=>{
        console.log(result)
        setLoader(false)
        setErr(true)
      })
    }else{
      setInputerr(true)
      setLoader(false)
    }
}

  return (
    <>
    {/* <AdminNav/> */}
    {loader && 
     <div className='load'>
        <div className='loader'></div>
     </div>
     }
    <div className='admin-formlog px-5 py-3 shadow-lg'>
              <form className="form-signin">
                <h1 className="h3 mb-3 text-center font-weight-normal">Please sign in</h1>
                <div className='text-center p-1'>
                {inputerr && <small className='text-danger text-center p-3'>input credentials</small>}
                {err && <small className='text-danger text-center p-3'>invalid credentials</small> }
                </div>
                <label className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" ref={emailRef} placeholder="Email address" required />
                <label  className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" ref={passwordRef} placeholder="Password" required/>
                <div className="checkbox mb-3">
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=> loginUser()}>Sign in</button><hr/>
                <Link to="/admin-register"><button className="btn btn-lg btn-warning btn-block mt-3" type="submit">sign up</button></Link>
            </form>
    
    </div>
    </>
  )
}

export default AdminForm