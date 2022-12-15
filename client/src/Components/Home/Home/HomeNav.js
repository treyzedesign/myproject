import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaShoppingBag, FaCartPlus } from 'react-icons/fa'
import './Home.css'
const HomeNav = ({size, name}) => {
  return (
    <div class="container-fluid nav-wrap">
      <div class="col-sm-12 mt-2">
        <div class="row">
            <div class="col-sm-5">
                <div class="logo">
                    <Link to="/" className='text-decoration-none shop-bag'><h1><FaShoppingBag className='shop-bag mr-2 mb-2'/>Fleeks</h1></Link>
                </div>
            </div>
            <div class="col-sm-7">
                <div class="links text-right  d-flex justify-content-around mt-3">
                    <span><Link to='/about' className='text-dark font-weight-bolder'>about</Link></span>
                    <span><Link to='' className='text-dark font-weight-bolder dropdown-toggle'data-toggle="dropdown" aria-expanded="false" >account</Link>
                    <div class="dropdown-menu">
                      <Link  to='/register' class="dropdown-item bg-warning" >Login</Link>
                      <Link  to=''  class="dropdown-item" >profile</Link>
                      <Link  to=''  class="dropdown-item">orders</Link>
                    </div>
                    </span>
                    <span><Link to='/contact-us'  className='text-dark font-weight-bolder'>contact</Link></span>
                    <span><Link to=''  className='text-dark font-weight-bolder'>faq</Link></span>

                </div>
            </div>
        </div>
    </div>
    <div >
        <div className='col-sm-12 container-fluid search-bg'>
          <div className='row'>
            <div className='col-sm-2'>
                 <div className='pt-2 text-center'><Link to='' className='text-light font-weight-bolder dropdown-toggle'data-toggle="dropdown" aria-expanded="false" >category</Link>
                    <div class="dropdown-menu">
                      <Link  to='' class="dropdown-item" >male fashion</Link>
                      <Link  to=''  class="dropdown-item" >female fashion</Link>
                      <Link  to=''  class="dropdown-item">computing</Link>
                      <Link  to=''  class="dropdown-item">electronics</Link>
                      <Link  to=''  class="dropdown-item">gaming</Link>
                    </div>
                    </div>
            </div>
            <div className='col-sm-8'>
            <form >
              <input class="form-control searcher" type="text" placeholder="Search your products,brands and categories" aria-label="Search"/>
            </form>
            </div>
            <div className='col-sm-2'>
              <div className='pt-2 text-center '>
                <Link to="/cart" className='text-light font-weight-bolder'><FaCartPlus className='cart-icon'/></Link>
                <span className='bg-warning cart-no'>{size}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
        <div className='fixed-icon'>
        <Link to="/cart" className='text-light font-weight-bolder'><FaCartPlus className='cart-icon'/></Link>
                <span className='bg-warning cart-no'>{size}</span>
        </div>
  </div>
   
  )
}

export default HomeNav