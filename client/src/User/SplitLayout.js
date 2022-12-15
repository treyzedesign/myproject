import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNav from './UserNav'
import UserSide from './UserSide'
import "./user.css"
const SplitLayout = ({name}) => {
  return (
    <div>
         <UserNav name={name}/>
         <div>
            <UserNav/>
            <Outlet/>
         </div>
    </div>
  )
}

export default SplitLayout