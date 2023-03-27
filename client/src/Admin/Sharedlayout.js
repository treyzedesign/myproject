import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'
import AdminSide from './AdminSide'
import "./admin.css"

const Sharedlayout = () => {
  return (
    <div>
        <AdminNav/>
        <div className='d-flex'>
           <div>
           <AdminSide/>
           </div>
           <div className='outlet'>
            <Outlet/>
           </div>
        </div>
    </div>
  )
}

export default Sharedlayout