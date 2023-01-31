import React from 'react'
import { Outlet } from 'react-router-dom'
import HomeNav from './Home/Home/HomeNav'
import Footer from './Footer'
import "./Comp.css"

const SharedLayout = ({size, name, finderbtn}) => {
  return (
    <div>
        <HomeNav size={size} name={name} finderbtn={finderbtn}/>
        <Outlet className="outlet"/>
        <Footer/>
    </div>
  )
}

export default SharedLayout