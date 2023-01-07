import React from 'react'
import { FaEdit, FaParachuteBox, FaUserAstronaut } from 'react-icons/fa'
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
          <h6><FaEdit/> Edit Profile</h6>
        </div>
      </Link>
      <Link to=""  className='text-decoration-none side-link'>
        <div>
          <h6><FaParachuteBox/> orders</h6>
        </div>
      </Link>
      <Link to=""  className='text-decoration-none side-link'>
        <div>
          <h6>Update Account</h6>
        </div>
      </Link>
    </div>
  )
}

export default UserSide