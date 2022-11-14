import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNav from './Home/Home/HomeNav'
import Footer from './Footer'

const SharedLayout = () => {
  return (
    <div>
        <HomeNav/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default SharedLayout