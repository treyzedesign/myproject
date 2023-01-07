import React from 'react'
import { Link } from 'react-router-dom'
import "./admin.css"

const AdminSide = () => {
  return (
    <div className='sidebar'>
        <ul>
            <li className="bar"><Link className="bar-item" to="/admin">Dashboard</Link></li>
            <li className="bar"><Link className="bar-item" to="/admin/products">Products</Link></li>
            <li className="bar"><Link className="bar-item" to="/admin/users">Users</Link></li>
            <li className="bar"><Link className="bar-item" to="/admin/orders">orders</Link></li>
            <li className="bar"><Link className="bar-item" to="/admin/notifications">Inbox</Link></li>
            <li className="bar"><Link className="bar-item" to="/">Go to site</Link></li>

            
        </ul>
    </div>
  )
}

export default AdminSide
