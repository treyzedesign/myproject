import React from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// import "../Components/Home/Home.css"
import Cookie from "js-cookie"
import "./admin.css"

const AdminNav = () => {
  return (
    <>
    <div className= ' container-fluid navigate text-center'>
    <div className="col-sm-12 ">
        <div className="row">
            <div className="col-sm-5">
                <div className="logo text-left">
                    <h1><FaShoppingBag className='shop-bag mb-2'/>Fleeks</h1>
                </div>
            </div>
            <div className="col-sm-7">
            </div>
        </div>
    </div>
    <marquee>Welcome to the Admin panel, hope you have a nice Experience</marquee>
    </div>
    </>
  )
}

export default AdminNav