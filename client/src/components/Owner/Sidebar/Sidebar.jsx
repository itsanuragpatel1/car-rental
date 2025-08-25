import React, { useState } from 'react'
import './Sidebar.css'
import { assets , ownerMenuLinks} from '../../../assets/assets'
import {Link,useLocation} from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Sidebar = () => {

  const [loading,setLoading]=useState(false);

const location=useLocation();
const {user,updateImage}=useAuth();

const handleChange=async(e)=>{
  setLoading(true);
  const file=e.target.files[0];
  const form=new FormData();
  form.append("avatar",file);

  const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/avatar-update`;

  const {data}=await axios.post(endpoint,form,{withCredentials:true})

  if(data.success){
    toast.success(data.message);
  }else{
     toast.error(data.message);
      setLoading(false);
     return
  }


  updateImage(data.userData.avatar);
  setLoading(false);
}


  return (
    <div className='sidebar'>
        <div className="sidebar-profile">
          <div className='images'>
            <img src={loading?assets.loading1:user.avatar?user.avatar:assets.user_profile1}  className='profile'/>
            <label htmlFor="profile"><img src={assets.edit1} alt="" className='edit' /></label>
          </div>
            <input type="file" hidden id='profile' onChange={(e)=>{handleChange(e)}}/>
            <p>{user?user.name:"user"}</p>
        </div>

        {
            ownerMenuLinks.map((ele,index)=>{
                const isActive=ele.path==location.pathname
                
                return (
                    <Link to={ele.path} key={index} >
                        <div className={`sidebar-box ${isActive ?'active' : ''}`}>
                          <img src={isActive?ele.coloredIcon:ele.icon}/>
                          <p>{ele.name}</p>
                        </div>
                    </Link>
                )
                
            })
        }
    </div>
  )
}

export default Sidebar