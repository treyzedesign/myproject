import React from 'react'
import axios from 'axios'
import "./Comp.css"
import {  useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

const ChangePassword = () => {
    const navigate = useNavigate()
    const password = useRef(null)
    const confirm = useRef(null)
    const [inputErr, setinputErr] = useState("")
    const {id} = useParams()
    const changeBtn =  async ()=>{
        const newPassword = password.current.value
        const newConfirm = confirm.current.value
        if (newPassword.length == 0 &&  newConfirm.length == 0){
            setinputErr("please fill the form")
        }
        else if (newPassword != newConfirm){
            setinputErr("password doesn't match")
        }
        else if (newPassword.length < 8 || newConfirm.length < 8){
            setinputErr("password characters less than 8")
        }
        else{
            let data ={
                id : id,
                password : newConfirm
            }
            await axios.patch('http://localhost:3001/api/v1/signup/changePassword', data).then((feedback)=>{
                console.log(feedback);
                navigate('/login')
            })
        }


    }
     
   
    
 
  return ( 
    <div>
        <div className='user-formlog  px-5 py-3 shadow-lg'>
          <form className="form-signin">
            <h3 className='text-primary'>Change Password</h3><hr/>
            <small className='text-danger'>{inputErr}</small>
            <label className="sr-only mb-2">new password</label>
            <input type="password"  className="form-control my-3" ref={password}  placeholder="new password" required />
            <label className="sr-only mb-2">confirm password</label>
            <input type="password"  className="form-control my-3" ref={confirm} placeholder="confirm password" required />
             <small className='my-3 text-center'>password minimum of 8 characters</small>
             <div>
                <button className="btn btn-lg btn-primary btn-block mt-2" type="button" onClick={()=> changeBtn()} >Continue</button><hr/>
             </div>          
        </form>
       </div>    
    </div>
  )
}

export default ChangePassword