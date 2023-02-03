import React from 'react'
import AdminNav from './AdminNav'
import AdminSide from './AdminSide'
import Admindash from './Admindash'
import { useEffect, useState } from 'react'
import "./admin.css"
import axios from 'axios'
import { Router, Routes, Route } from 'react-router-dom'
import BarChart from './BarChart'

const Admin = () => {
  const [alluser, setAlluser] = useState([])
  const [allproduct, setAllproduct] = useState([])
  const [OrderAmount, setOrderAmount] = useState()
  const [chart, setchart] = useState([])

  
  const url = `http://localhost:3001/api/v1/signup/total`
  const url2 =`http://localhost:3001/api/v1/products/total`
  const url3 ='http://localhost:3001/api/v1/order/'
  const fetchUsers = async(url, url2, url3)=>{
    const alluser = await axios.get(url).then((feedback)=>{
      let data = feedback.data.data
      setAlluser(feedback.data.data)
    })
    const allprod = await axios.get(url2).then((products)=>{
      setAllproduct(products.data.data)
    })
    await axios.get(url3).then((feedback)=>{
      let cal =  feedback.data.reduce((acc, item)=>{
        return acc += item.amount
       },0)
       console.log(cal);
       setOrderAmount(cal)
      setchart(feedback.data)
    })
  }
  

  useEffect(()=>{
    fetchUsers(url, url2, url3)
  },[])
    
  return (
    <>
      <div className='mt-5'>
        <div className='total'>
          <div className='t-product shadow-lg m-2'>
            <div className='text-center'>
              <h3 className='mt-2 p-2'><b>INCOME</b></h3>
              <h1><b>&#8358; {OrderAmount}</b></h1>
            </div>
          </div>
          <div className='t-product shadow-lg m-2'>
            <div className='text-center'>
              <h3 className='mt-2 p-2'><b>Total Users</b></h3>
              <h1><b> {alluser}</b></h1>
            </div>
          </div>
          <div className='t-product shadow-lg m-2'>
          <div className='text-center'>
              <h3 className='mt-2 p-2'><b>Total Products</b></h3>
              <h1><b> {allproduct}</b></h1>
          </div>
          </div>
        </div>
        <div className='mt-5 px-4'>
          <BarChart className='bar-chart p-5' chart={chart}/>    
        </div>
      </div>
      
    </>
  )
}

export default Admin 