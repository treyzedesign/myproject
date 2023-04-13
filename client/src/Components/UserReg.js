import axios from 'axios'
import React from 'react'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import "./Comp.css"

const UserReg = () => {
  const [err, setErr] = useState()
  const [inputerr, setInputerr] = useState(false)
  const [loader, setLoader] = useState(false)
  
  const firstref = useRef(null)
  const lastref = useRef(null)
  const emailref = useRef(null)
  const passwordref = useRef(null)

  const registerUser = async()=>{
     const firstName = firstref.current.value
     const lastName = lastref.current.value
     const email = emailref.current.value
     const password = passwordref.current.value
     if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0){
           setLoader(true)

            await axios.post(`http://localhost:3001/api/v1/signup`, {
                firstName,
                lastName,
                email,
                password
            }).then((feedback)=>{
                console.log(feedback)
                setLoader(false)
            }).catch((fail)=>{
                console.log(fail)
                setLoader(false)
                setErr(fail.response.data.msg)
                setInputerr(false)          
            })

     }else{
         setInputerr(true)
     }
  }
  return (
    <div className="mt-5">
        {loader && 
     <div className='load'>
        <div className='loader'></div>
     </div>
     }
         <div className='user-form px-5 py-3 shadow-lg '>
              <form className="form-signin" method='post'>
                <h1 className="h3 mb-3 font-weight-normal text-center">Welcome!, Please sign Up</h1>
                <div className="text-center">
                    {inputerr && <small className="p-2 text-danger">please input all fields</small>}
                    <small className="p-2 text-danger">{err}</small>
                </div>
                <label for="inputfirstname" className="sr-only">firstName</label> 
                <input type="text" id="" className="form-control" ref={firstref} placeholder="First name" required/>
                <label className="sr-only">lastName</label>
                <input type="text"  className="form-control" ref={lastref} placeholder="Last name" required/>
                <label className="sr-only">email</label>
                <input type="email"  className="form-control" ref={emailref} placeholder="Email address" required/>
                <label className="sr-only">password</label>
                <input type="password"  className="form-control" placeholder="set password" ref={passwordref} required/>
                <div className="checkbox mb-3">
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={() => registerUser()}>Sign up</button><hr/>
                <Link to="/login"><button className="btn btn-lg btn-warning btn-block mt-3" type="submit">sign in</button></Link>
            </form>
    
    </div>
    </div>
  )
}

export default UserReg