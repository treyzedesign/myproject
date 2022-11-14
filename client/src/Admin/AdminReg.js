import React from 'react'
import AdminNav from './AdminNav'
import { Link, useNavigate } from 'react-router-dom'
import { useRef , useState} from "react"
import axios from "axios"
import "./admin.css"
import { FaLine } from 'react-icons/fa'
const AdminReg = () => {
  const [loader, setLoader] = useState(false)
  const [inputerr, setInputerr] = useState(false)
  const [err, setErr] = useState(false)

  const firstnameRef = useRef(null)
  const lastnameRef = useRef(null)
  const emailRef = useRef(null)
  const usernameRef = useRef(null)
  const positionRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()

  const registerUser = async ()=>{
   let firstName = firstnameRef.current.value
   let lastName = lastnameRef.current.value
   let email = emailRef.current.value
   let username = usernameRef.current.value
   let position = positionRef.current.value
   let password = passwordRef.current.value

   setLoader(true)

    if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && username.length > 0 && position.length > 0
       && password.length > 0){
        const storeUsers = await axios.post("http://localhost:3001/api/v1/admin", {
          firstName,
          lastName,
          email,
          username,
          position,
          password
        }).then((feedback)=>{
          console.log(feedback.data.message)
          setLoader(false)
          navigate("/admin")
          sessionStorage.setItem('user', JSON.stringify(feedback.data.message))
          
        }).catch((result)=>{
          console.log(result.response.data.msg)
          setLoader(false)
          setErr(result.response.data.msg)
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
    <div className='container text-center'>
              <form className="form-signin" method='post'>
                <h1 className="h3 mb-3 font-weight-normal">Welcome!,Please sign Up</h1>
                <h4>{err}</h4>
                {inputerr && <h4>input credentials</h4>}
                <label for="inputfirstname" className="sr-only">firstName</label> 
                <input type="text" id="" className="form-control" ref={firstnameRef} placeholder="First name" required/>
                <label className="sr-only">lastName</label>
                <input type="text"  className="form-control" ref={lastnameRef} placeholder="Last name" required/>
                <label className="sr-only">email</label>
                <input type="email"  className="form-control" ref={emailRef} placeholder="email address" required/>
                <label className="sr-only">username</label>
                <input type="text"  className="form-control" ref={usernameRef} placeholder="username" required/>
                {/* <select className="browser-default custom-select" ref={stateRef}>
                  <option disabled selected>Select State</option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross Rive">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="FCT">Federal Capital Territory</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                </select> */}
                {/* <select className="browser-default custom-select" ref={countryRef}>
                  <option disabled selected>Select Country</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Benin republic">Benin Rep.</option>
                  <option value="Togo">Togo</option>
                </select> */}
                <label className="sr-only">position</label>
                <input type="text"  className="form-control" ref={positionRef} placeholder="position" required/>
                <label className="sr-only">password</label>
                <input type="password"  className="form-control" ref={passwordRef} placeholder="set  password" required/>
                <div className="checkbox mb-3">
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={() => registerUser()}>Sign up</button><hr/>
                <Link to="/admin-login"><button className="btn btn-lg btn-warning btn-block mt-3" type="submit">sign in</button></Link>
            </form>
    
    </div>
    </>
  )
}

export default AdminReg