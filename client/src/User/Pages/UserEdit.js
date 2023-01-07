import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useRef} from 'react'
import Cookies from 'js-cookie'

const UserEdit = ({fname, lname, address, email, state, country, id}) => {
    const firstref = useRef(null)
    const lastref = useRef(null)
    const emailref = useRef(null)
    const addressref = useRef(null)
    const stateref = useRef(null)
    const countryref = useRef(null)
      
    const update = async()=>{
      const cookie = Cookies.get("UserLoginToken")
      const firstName = firstref.current.value
      const lastName = lastref.current.value
      const email = emailref.current.value
      const address = addressref.current.value
      const state = stateref.current.value
      const country = countryref.current.value
      if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && address.length > 0 && state.length > 0 
        && country.length > 0 ){
      await axios.patch(`http://localhost:3001/api/v1/signup/${id}`, {
        firstName, lastName, email, address, state, country
      }, {headers: {
        "usertoken" : cookie
      }}).then((feedback)=>{
        console.log(feedback);
        window.location.reload()
      }).catch((fail)=>{
        console.log(fail);
      })
    }else{
      console.log("enter your new information");
    }
    }
  return (
    <div>
        <div className='mb-5'>
            <h3 className='text-center'>Edit Profile</h3>
        </div>
        <div className='w-50 m-auto mt-5'>
        <label for="inputfirstname" className="sr-only">firstName</label> 
                <input type="text" id="" className="form-control mt-2" ref={firstref} placeholder={fname} required/>
                <label className="sr-only">lastName</label>
                <input type="text"  className="form-control mt-2" ref={lastref} placeholder={lname} required/>
                <label className="sr-only">email</label>
                <input type="email"  className="form-control mt-2" ref={emailref} value={email} required/>
                <label className="sr-only">Address</label>
                <input type="text"  className="form-control mt-2" ref={addressref}  placeholder={address} required/>
                <select className="browser-default mt-2 custom-select" ref={stateref} >
                  <option disabled selected>{state}</option>
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
                <select className="browser-default mt-2 custom-select" ref={countryref} >
                  <option disabled selected>{country}</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Benin republic">Benin Rep.</option>
                  <option value="Togo">Togo</option>
                </select>
                <div>
                    <button className='btn btn-warning my-3 px-5' onClick={()=> update()}>Update</button>
                </div>
        </div>
    </div>
  )
}

export default UserEdit