import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import toast from 'react-hot-toast'
import axios from 'axios'

const Navbar = (props) => {
  const {user,logout,setCars,setTest}=useAuth();
  const [searchnav,setSearchnav]=useState('')
  const navigate=useNavigate();

  const searchHandler=async(e)=>{
    e.preventDefault();
    // setSearch(searchnav);
    // setSearchnav('');
    const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/search`;
    const {data}=await axios.post(endpoint,{search:searchnav},{withCredentials:true});
    if(data.success){
      setCars(data.cars);
    }else{
      toast.error(data.message);
    }
    setTest(true);
    setSearchnav('');
    navigate('/cars');
  }

  return (
    <>
    <div className='navbar'>
        <div className="navbar-left">
          <Link to={'/'}><img src={assets.logo} alt="logo" /></Link>
        </div>
        <div className="navbar-right">
          <Link to='/' ><p>Home</p></Link>
          <Link to='/cars' ><p>Cars</p></Link>
          <p onClick={()=>{user?navigate('/my-bookings'):toast.error("please login to continue")}}>My Bookings</p>
            <div className="navbar-search">
            <input type="text" placeholder='Search cars' value={searchnav} onChange={(e)=>{setSearchnav(e.target.value)}} onKeyDown={(e)=>{e.key=='Enter'?searchHandler(e):''}} />
                <img src={assets.search_icon} alt="search_icon" onClick={(e)=>{searchHandler(e)}} />
            </div>
            <p onClick={()=>{user?navigate('/owner'):toast.error("please login to continue")}}>Dashboard</p>
            {user?<button onClick={()=>logout()}>Logout</button>:<button onClick={()=>props.setShowLogin(true)}>LogIn</button>}
            
        </div>
    </div>
    <hr className='navbarline' />
    </>
    
  )
}

export default Navbar