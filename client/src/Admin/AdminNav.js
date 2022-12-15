import React from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// import "../Components/Home/Home.css"
import "./admin.css"

const AdminNav = () => {
  const logout = ()=>{
    sessionStorage.removeItem('user')
  }
  return (
    <>
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
                    <span><Link to='' className='text-dark font-weight-bolder dropdown-toggle'data-toggle="dropdown" aria-expanded="false" >account</Link>
                    <div className="dropdown-menu">
                      <Link  to='/admin-login' onClick={()=> logout()} className="dropdown-item bg-warning" >Log out</Link>
                    </div>
                    </span>
                    <span><Link to=''  className='text-dark font-weight-bolder'>contact</Link></span>
                    <span><Link to=''  className='text-dark font-weight-bolder'>faq</Link></span>

                </div>
            </div>
        </div>
    </div>
    <marquee>Welcome to the Admin panel, hope you have a nice Experience</marquee>
    </div>
    </>
  )
}

export default AdminNav