import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import jwt_Decode from 'jwt-decode'
import { FaShoppingBag, FaCartPlus, FaUser, FaSearchengin, FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import './Home.css'
const HomeNav = ({size, finderbtn}) => {
  const [isUser, setIsUser] =useState(false)
  const [user_name, setUser_name] = useState()
  const [isAdmin, setisAdmin] = useState();
  const [search, setSearch] = useState("")
  const navigate = useNavigate()
  // console.log(search);
  
  useEffect(()=>{
    const usertoken = Cookies.get("UserLoginToken")
    if (usertoken) {
      const decoder = jwt_Decode(usertoken)
      setUser_name(decoder.Name)
      setIsUser(true)
      if(decoder.isAdmin == true){
        setisAdmin(decoder.isAdmin)
      }
      else if (decoder.superAdmin == true){
        setisAdmin(decoder.superAdmin)
      }
    }
  },[])
  return (
    <div className="container-fluid nav-wrap">
      <div className="col-sm-12 mt-2">
        <div className="row">
            <div className="col-sm-3">
                <div className="logo">
                    <Link to="/" className='text-decoration-none shop-bag'><h1><FaShoppingBag className='home-icon mr-2 mb-2'/>Fleeks</h1></Link>
                </div>
            </div>
            <div className="col-sm-9">
                <div className="links text-right  d-flex justify-content-around mt-3">
                    <span><Link to='/about' className='text-dark font-weight-bolder'>about</Link></span>
                    <span><div className='text-dark d-flex font-weight-bolder dropdown-toggle 'data-toggle="dropdown" aria-expanded="true" >{isUser ?
                        <div><FaUser className='mr-1'/>{user_name}</div>
                       :
                       <h6>Account</h6>
                    }</div>
                    <div className="dropdown-menu">
                      <div to='' className="dropdown-item bg-warning" >{isUser ? 
                      <div onClick={()=>{
                        Cookies.remove("UserLoginToken") 
                        localStorage.removeItem("cart")
                        localStorage.removeItem("userAddress")
                        navigate('/')
                        setTimeout(()=>{
                          window.location.reload()
                        },1)
                        }}>Sign Out</div> 
                        :
                      <div onClick={()=>{
                         navigate('/login')
                         }}>Sign In</div>}</div>
                      <Link  to='/user'  className="dropdown-item" >profile</Link>
                      <Link  to='/user/user_orders'  className="dropdown-item">orders</Link>
                    </div>
                    </span>
                    <span><Link to='/contact-us'  className='text-dark font-weight-bolder'>contact</Link></span>
                    <span>{isAdmin ? 
                        <Link to='/Admin'  className='text-dark font-weight-bolder'>Admin</Link> :
                        <Link to=''  className='text-dark font-weight-bolder'>Faq</Link>
                        
                    }</span>

                </div>
            </div>
        </div>
    </div>
    <div >
        <div className='col-sm-12 container-fluid search-bg'>
          <div className='row'>
            <div className='col-sm-2'>
                 <div className='pt-2 text-center'><Link to='' className='text-light font-weight-bolder dropdown-toggle'data-toggle="dropdown" aria-expanded="false" >category</Link>
                    <div className="dropdown-menu">
                      <Link  to='' className="dropdown-item" >male fashion</Link>
                      <Link  to=''  className="dropdown-item" >female fashion</Link>
                      <Link  to=''  className="dropdown-item">computing</Link>
                      <Link  to=''  className="dropdown-item">electronics</Link>
                      <Link  to=''  className="dropdown-item">gaming</Link>
                    </div>
                    </div>
            </div>
            <div className='col-sm-8'>
            <form className='d-flex'>
              <input className="form-control searcher" type="text" placeholder="Search your products,brands and categories" onChange={(e)=>{setSearch(e.target.value)}} aria-label="Search"/>
              <button type='button' className='search-btn-div btn btn-light' onClick={()=> finderbtn(search)} ><FaSearch className='search-btn'/></button>
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