import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNav from './UserNav'
import UserSide from './UserSide'
import HomeNav from '../Components/Home/Home/HomeNav'
import Footer from '../Components/Footer'
import "./user.css"
const SplitLayout = ({size}) => {
  // console.log(name)
  return (
    <div >
         <HomeNav size={size}/>
         <div className='col-lg-12 splitlayout '>
          <div className='row'>
            <div className='col-sm-3'><UserSide/></div>
            <div className='col-sm-9 layout'><Outlet/></div>
          </div>
         </div>
         <Footer/>
    </div>
  )
}

export default SplitLayout