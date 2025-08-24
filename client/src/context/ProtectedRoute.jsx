import React from 'react'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import { assets } from '../assets/assets';

const ProtectedRoute = ({children,setShowLogin}) => {
  const {user,loading}=useAuth();
  const navigate=useNavigate();

  if(loading){
    return (
      <div className="loader-wrapper">
          <img src={assets.loading1} alt="Loading..." className="loader" />
      </div>
    )
  }

  if(!user){
    toast.error("Please login to continue");
    navigate('/');
    setShowLogin(true);
    return null;
  }

  return children;
}

export default ProtectedRoute;