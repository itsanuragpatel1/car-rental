import React from 'react'
import { assets } from '../../../assets/assets'
import './NavbarOwner.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const NavbarOwner = () => {
  const {user}=useAuth();
  // console.log(user);
  return (
    <div className='navbar-owner'>
      <Link to={'/'} ><img src={assets.logo} alt="" /></Link>   
        <p>welcome, {user?user.name:"user"}</p>
    </div>
  )
}

export default NavbarOwner