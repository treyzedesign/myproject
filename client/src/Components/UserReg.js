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
  const addressref = useRef(null)
  const stateref = useRef(null)
  const countryref = useRef(null)
  const passwordref = useRef(null)

  const registerUser = async()=>{
     const firstName = firstref.current.value
     const lastName = lastref.current.value
     const email = emailref.current.value
     const address = addressref.current.value
     const state = stateref.current.value
     const country = countryref.current.value
     const password = passwordref.current.value
     if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && address.length > 0 && state.length > 0 
        && country.length > 0 && password.length > 0){
           setLoader(true)

            await axios.post(`http://localhost:3001/api/v1/signup`, {
                firstName,
                lastName,
                email,
                address,
                state,
                country,
                password
            }).then((feedback)=>{
                console.log(feedback)
                setLoader(false)
                setErr(false)
            }).catch((fail)=>{
                console.log(fail)
                setLoader(false)
                // setErr(fail)
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
         <div className='container m-0 m-auto w-25 mt-5 text-center'>
              <form className="form-signin" method='post'>
                <h1 className="h3 mb-3 font-weight-normal">Welcome!,Please sign Up</h1>
                <h4>{err }</h4>
                {inputerr && <h4>input credentials</h4>}
                <label for="inputfirstname" className="sr-only">firstName</label> 
                <input type="text" id="" className="form-control" ref={firstref} placeholder="First name" required/>
                <label className="sr-only">lastName</label>
                <input type="text"  className="form-control" ref={lastref} placeholder="Last name" required/>
                <label className="sr-only">email</label>
                <input type="email"  className="form-control" ref={emailref} placeholder="Email address" required/>
                <label className="sr-only">Address</label>
                <input type="text"  className="form-control" ref={addressref} placeholder="Address" required/>
                <select className="browser-default custom-select" ref={stateref}>
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
                </select>
                <select className="browser-default custom-select" ref={countryref}>
                  <option disabled selected>Select Country</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Benin republic">Benin Rep.</option>
                  <option value="Togo">Togo</option>
                </select>
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