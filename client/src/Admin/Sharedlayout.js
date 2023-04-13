import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'
import AdminSide from './AdminSide'
import "./admin.css"

const Sharedlayout = () => {
  return (
    <div>
        <AdminNav/>
        <div className='col-lg-12 sharedlayout' style={{paddingLeft:"0px"}} >
          <div className='row '>
            <div className='col-sm-2 ad-side' style={{paddingLeft: "0px"}}><AdminSide/></div>
            <div className='col-sm-10 a-layout'><Outlet/></div>
          </div>
        </div>
    </div>
  )
}

export default Sharedlayout