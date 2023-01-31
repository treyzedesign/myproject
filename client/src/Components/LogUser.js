
import axios from 'axios'
import React from 'react'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookie from 'js-cookie'
import "./Comp.css"
import { FaArrowLeft } from 'react-icons/fa'

const LogUser = (props) => {
    const navigate = useNavigate()
    const [err, setErr] = useState()
    const [inputerr, setInputerr] = useState(false)
    const [loader, setLoader] = useState(false)
    // const [data, setdata] = useState([])

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const loginUser = async()=>{
        const email = emailRef.current.value
        const password = passwordRef.current.value

        if(email.length > 0 && password.length > 0){
            setLoader(true)

            await axios.post("http://localhost:3001/api/v1/login", {
                email,
                password
            }).then((feedback)=>{
                console.log(feedback.data.data);
                Cookie.set("UserLoginToken", feedback.data.data , {expires: 7, secure: false, path: "/", sameSite: true})
                navigate("/")
                setLoader(false)
                
                // setdata(feedback.data.data.Name)
                // props.onClick(feedback.data.data.Name)
              
                window.location.reload("/")
            
            }).catch((fail)=>{
                console.log(fail)
                setLoader(false)
            })
        }else{
            setLoader(false)
            setInputerr(true)
        }
    }
  return (
    <div className='mt-5 w-100'>
        {loader && 
     <div className='load'>
        <div className='loader'></div>
     </div>
     }
    <div ><FaArrowLeft className='Arrow ' onClick={()=> navigate('/')}/></div>

    <div className='user-formlog  px-5 py-3 shadow-lg'>
              <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
                {inputerr && <h4>input credentials</h4>}
                {err }
                <label className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" ref={emailRef} placeholder="Email address" required />
                <label  className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" ref={passwordRef} placeholder="Password" required/>
                <div className="checkbox mb-3">
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={()=> loginUser()}>Sign in</button><hr/>
                <Link to="/register"><button className="btn btn-lg btn-warning btn-block mt-3" type="submit">sign up</button></Link>
                <div className='mt-3 text-center'>
                    <Link to="/user/password/forgotPass">Forgot password?</Link>
                </div>
               
            </form>
    </div>    
    </div>
  )
}

export default LogUser