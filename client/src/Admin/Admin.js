import React from 'react'
import AdminNav from './AdminNav'
import AdminSide from './AdminSide'
import Admindash from './Admindash'
import { useEffect, useState } from 'react'
import "./admin.css"
import axios from 'axios'
import { Router, Routes, Route } from 'react-router-dom'

const Admin = () => {
  const [alluser, setAlluser] = useState([])
  const [allproduct, setAllproduct] = useState([])
  
  const url = `http://localhost:3001/api/v1/signup/total`
  const url2 = `http://localhost:3001/api/v1/products/total`
  const fetchUsers = async(url, url2)=>{
    const alluser = await axios.get(url).then((feedback)=>{
      // console.log(feedback.data.data)
      setAlluser(feedback.data.data)
    })
    const allprod = await axios.get(url2).then((products)=>{
      // console.log(products.data);
      setAllproduct(products.data.data)
    })
  }
  useEffect(()=>{
    fetchUsers(url, url2)
  },[])
     
  return (
    <>
    <div className='container-fluid'>
      <div className='col-md-12 mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className=' card bg-white py-5 boxx'>
                <div className='d-flex '>
                  <h2 className='pt-4'>Total Number of Users on Fleeks</h2>
                   <h1 className='number '>{alluser}</h1>
                </div>
            </div>
          </div>
          <div className='col-sm-6'>
          <div className=' card bg-white py-5 boxx'>
                <div className='d-flex '>
                  <h2 className='pt-4'>Total Number of Products on Fleeks</h2>
                   <h1 className='number '>{allproduct}</h1>
                </div>
            </div>
          </div>

        </div>
      </div>
      <div className='col-md-12 mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <div className=' card bg-white py-5 boxx'>
                <div className='d-flex '>
                  <h2 className='pt-4'>Total Number of Users on Fleeks</h2>
                   <h1 className='number '>{alluser}</h1>
                </div>
            </div>
          </div>
          <div className='col-sm-6'>
          <div className=' card bg-white py-5 boxx'>
                <div className='d-flex '>
                  <h2 className='pt-4'>Total Number of Products on Fleeks</h2>
                   <h1 className='number '>{allproduct}</h1>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default Admin 