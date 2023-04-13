import React from 'react'
import AdminNav from './AdminNav'
import AdminSide from './AdminSide'
import Admindash from './Admindash'
import { useEffect, useState } from 'react'
import "./admin.css"
import axios from 'axios'
import { Router, Routes, Route } from 'react-router-dom'
import BarChart from './BarChart'
import PieChart from './PieChart'

const Admin = () => {
  const [alluser, setAlluser] = useState([])
  const [allproduct, setAllproduct] = useState([])
  const [allorder, setallorder] = useState()
  const [OrderAmount, setOrderAmount] = useState()
  const [chart, setchart] = useState([])

  
  const url = `http://localhost:3001/api/v1/signup/total`
  const url2 =`http://localhost:3001/api/v1/products/total`
  const url3 ='http://localhost:3001/api/v1/allorder/'
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
      setallorder(feedback.data.length)
      setOrderAmount(cal)
      setchart(feedback.data)
    })
  }
  console.log(chart);

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
          <div className='t-product shadow-lg m-2'>
          <div className='text-center'>
              <h3 className='mt-2 p-2'><b>Total Orders</b></h3>
              <h1><b> {allorder}</b></h1>
          </div>
          </div>
        </div>
       
      </div>
      <div className='container-fluid'>
      <div className='col-lg-12'>
          <div className='row d-flex justify-content-between'>
            <div className='col-lg-4'>
              <div className='text-center'>
                <PieChart className='bar-chart p-5 text-center' alluser={alluser} allproduct={allproduct} chart={chart}/>    
              </div>
            </div>
            <div className='col-lg-8'>
              <div className=' px-4 text-center'>
                <BarChart className='bar-chart p-5' chart={chart}/>    
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Admin 