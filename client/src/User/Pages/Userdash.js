import React from 'react'
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import axios from 'axios'
const Userdash = ({fname, lname, email, address, state, country, tel}) => {
 
  return (
    <div>
      <div>
        <div className='text-center user-icon '>
          <h3>Account Information</h3>
          <FaUserCircle className='shadow-lg rounded-circle'/>
          <h3>hi! {fname}</h3>
        </div>
        <div className='pl-5 pt-2'>
          <div className='ac-info p-3'>
            <span className='font-weight-bolder'>FullName: </span> {fname} {lname}
          </div>
          <div className='ac-info p-3'>
            <span className='font-weight-bolder'>E-mail: </span> {email}
          </div>
          <div className='ac-info p-3'>
            <span className='font-weight-bolder'>Phone No.:</span> {tel}
          </div>
          <div className='ac-info p-3'>
            <span className='font-weight-bolder'>Address: </span> {address}
          </div>
          <div className='ac-info p-3'>
            <span className='font-weight-bolder'>State: </span> {state}
          </div>
          <div className='ac-info p-3'>
            <span className='font-weight-bolder'>Country: </span> {country}
          </div>
          <div className='ac-info p-3'>
            <span className='font-weight-bolder'>Status: </span> Verified <FaCheckCircle className='verify-check'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userdash