import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_Decode from 'jwt-decode'
import { FaShoppingBag, FaCartPlus, FaUser } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import './Home.css'
const HomeNav = ({size, name}) => {
  const [isUser, setIsUser] =useState(false)
  const [user_name, setUser_name] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    const usertoken = Cookies.get("UserLoginToken")
    if (usertoken) {
      const decoder = jwt_Decode(usertoken)
      setUser_name(decoder.Name)
      setIsUser(true)
    }
  },[])
  return (
    <div class="container-fluid nav-wrap">
      <div class="col-sm-12 mt-2">
        <div class="row">
            <div class="col-sm-3">
                <div class="logo">
                    <Link to="/" className='text-decoration-none shop-bag'><h1><FaShoppingBag className='home-icon mr-2 mb-2'/>Fleeks</h1></Link>
                </div>
            </div>
            <div class="col-sm-9">
                <div class="links text-right  d-flex justify-content-around mt-3">
                    <span><Link to='/about' className='text-dark font-weight-bolder'>about</Link></span>
                    <span><Link to='' className='text-dark d-flex font-weight-bolder dropdown-toggle 'data-toggle="dropdown" aria-expanded="true" >{isUser ?
                        <div><FaUser className='mr-1'/>{user_name}</div>
                       :
                       <h6>Account</h6>
                    }</Link>
                    <div class="dropdown-menu">
                      <div to='' class="dropdown-item bg-warning" >{isUser ? 
                      <div onClick={()=>{
                        Cookies.remove("UserLoginToken") 
                        navigate('/')
                        }}>Sign Out</div> : 
                      <div onClick={()=>{
                         navigate('/login')
                         
                         }}>Sign In</div>}</div>
                      <Link  to='/user/profile'  class="dropdown-item" >profile</Link>
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