import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNav from './Home/Home/HomeNav'
import Footer from './Footer'
import "./Comp.css"

const SharedLayout = ({size, name}) => {
  return (
    <div>
        <HomeNav size={size} name={name}/>
        <Outlet className="outlet"/>
        <Footer/>
    </div>
  )
}

export default SharedLayout