import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard,MdOutlineSettings} from 'react-icons/md'  
import { AiFillDatabase } from 'react-icons/ai'
import { FaBoxes, FaOpencart, FaUsers} from 'react-icons/fa'


import "./admin.css"

const AdminSide = () => {
  
  return (
    <div className='sidebar shadow-lg'>
        <ul type="none" style={{paddingLeft: "15px"}}>
            <li className="bar nav-item"><Link className="bar-item nav-link" to="/admin"><span className='pr-2'><MdDashboard/></span> <span>dashboard</span></Link></li>
            <li className="bar nav-item"><Link className="bar-item nav-link" to="/admin/post-product"><span className='pr-2'><AiFillDatabase/></span> <span>post item</span></Link></li>
            <li className="bar nav-item"><Link className="bar-item nav-link" to="/admin/products"><span className='pr-2'><FaBoxes/></span> <span>products</span></Link></li>
            <li className="bar nav-item"><Link className="bar-item nav-link" to="/admin/users"><span className='pr-2'><FaUsers/></span> <span>customers</span></Link></li>
            <li className="bar nav-item"><Link className="bar-item nav-link" to="/admin/orders"><span className='pr-2'><FaOpencart/></span> <span>orders</span></Link></li>
            <li className="bar nav-item"><Link className="bar-item nav-link" to="/admin/settings"><span className='pr-2'><MdOutlineSettings/></span> <span>settings</span></Link></li>
            <li className="bar nav-item"><Link className="bar-item nav-link" to="/">Go to site</Link></li>
        </ul>
    </div>
  )
}

export default AdminSide
