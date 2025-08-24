import React from 'react'
import NavbarOwner from '../../../components/Owner/NavbarOwner/NavbarOwner'
import Sidebar from '../../../components/Owner/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './Layout.css'


const Layout = () => {

  return (
    <>
    <NavbarOwner/>
    <div className='layout' >
        <Sidebar/>
        <Outlet/>
    </div>
    </>
    
  )
}

export default Layout