import React from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./user.css"
const UserNav = ({name}) => {
    const [namer, setnamer] = useState();
    useEffect(()=>{
        setnamer(name)
    },[])
  return (
    <div>
         <div className= ' container-fluid nav text-center'>
    <div className="col-sm-12 mt-2">
        <div className="row">
            <div className="col-sm-5">
                <div className="logo text-left">
                    <h1><FaShoppingBag className='shop-bag mb-2'/>Fleeks</h1>
                </div>
            </div>
            <div className="col-sm-7">
                <div className="links text-right  d-flex justify-content-around mt-3">
                    <span className='text-dark font-weight-bolder dropdown-toggle' data-toggle="dropdown" aria-expanded="false" >Hi, {name}
                    <div className="dropdown-menu">
                      <Link  to='/' className="dropdown-item bg-warning" >Logout</Link>
                    </div>
                    </span>
                    {/* <span><Link to=''  className='text-dark font-weight-bolder'>contact</Link></span>
                    <span><Link to=''  className='text-dark font-weight-bolder'>faq</Link></span> */}

                </div>
            </div>
        </div>
    </div>
    <marquee>Hello {name}, Welcome to your Dashboard, hope you have a nice Experience</marquee>
    </div>
    </div>
  )
}

export default UserNav