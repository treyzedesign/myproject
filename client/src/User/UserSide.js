import React from 'react'
import { FaEdit, FaParachuteBox, FaPassport, FaPhone, FaUserAstronaut, FaUserEdit, FaShieldAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import "./user.css"
const UserSide = () => {
  return (
    <div className='side shadow-lg'>
      <Link to="" className='text-decoration-none side-link'>
        <div>
          <h6><FaUserAstronaut/> Account Info</h6>
        </div>
      </Link>
      <Link to="/user/profile/update_account"  className='text-decoration-none side-link'>
        <div>
          <h6><FaUserEdit/> Edit Profile</h6>
        </div>
      </Link>
      <Link to="/user/user_orders"  className='text-decoration-none side-link'>
        <div>
          <h6><FaParachuteBox/> orders</h6>
        </div>
      </Link>
      <Link to="/user/change-user-password"  className='text-decoration-none side-link'>
        <div>
          <h6><FaShieldAlt/> change password</h6>
        </div>
      </Link>
      <Link to="/contact-us"  className='text-decoration-none side-link'>
        <div>
          <h6><FaPhone/> Contact Us</h6>
        </div>
      </Link>
    </div>
  )
}

export default UserSide