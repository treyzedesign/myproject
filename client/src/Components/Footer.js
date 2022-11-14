import React from 'react'
import { FaShoppingBag, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import "./Comp.css"

const Footer = () => {
  return (
    <div className='footer text-white'>
      <div className='col-sm-12'>
      <div className='row pt-5'>
        <div className='col-sm-6'>
        <div class="logo pt-3">
          <Link className='text-white text-decoration-none' to=""><h1><FaShoppingBag className='shop-bag mr-2 mb-2 text-white'/>Fleeks</h1></Link>
          <div className='d-flex'>
          <Link className='text-white text-decoration-none m-1' to="">
            <h3><FaFacebook className='text-white'></FaFacebook></h3>
          </Link>
          <Link className='text-white text-decoration-none m-1' to="">
            <h3><FaInstagram className='text-white'></FaInstagram></h3>
          </Link>
          <Link className='text-white text-decoration-none m-1' to="">
            <h3><FaTwitter className='text-white'></FaTwitter></h3>
          </Link>
          </div>
          
        </div>
        </div>
        <div className='col-sm-6'>
           <h2>Company</h2>
           <div className='d-block'>
            <div><Link  className='text-white text-decoration-none m-1' to="">Products</Link></div>
            <div><Link  className='text-white text-decoration-none m-1' to="">Products</Link></div>
            <div><Link  className='text-white text-decoration-none m-1' to="">Products</Link></div>
            <div><Link  className='text-white text-decoration-none m-1' to="">Products</Link></div>
            <div><Link  className='text-white text-decoration-none m-1' to="">Products</Link></div>
            <div><Link  className='text-white text-decoration-none m-1' to="">Products</Link></div>

           </div>
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default Footer