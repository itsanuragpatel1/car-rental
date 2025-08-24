import React from 'react'
import { assets } from '../../assets/assets'
import './styles/ManageCarsCard.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ManageCarsCard = ({car}) => {

  const statusHandler=async(carID)=>{
    const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/owner/change-status/${carID}`;
    const {data}=await axios(endpoint,{withCredentials:true});
    if(data.success){
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
  }

  const deleteHandler=async(carID)=>{
    const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/owner/delete/${carID}`;
    const {data}=await axios(endpoint,{withCredentials:true});
    if(data.success){
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
  }



  return (
    <div className='manage-cars-card'>

      <Link to={`/car-details/${car._id}`}>
      <div className='car-details'>
            <img src={car.carImage} alt="" />
            <div>
                <p className='car-name'>{car.brand} {car.model}</p>
                <p className='more-details'>{car.capacity} seats . {car.transmission}</p>
            </div>
        </div>
      </Link>
        
        <p>{car.category}</p>
        <p>$ {car.price}/day</p>
        <p className={`status ${car.status? 'available' : ''}`}>{car.status?"Available":"Not Available"}</p>
        <div className='actions'>
            <img src={ car.status?assets.eye_close_icon:assets.eye_icon} alt="" onClick={()=>{statusHandler(car._id)}}/>
            <img className='delete' src={assets.delete_icon} alt="" onClick={()=>{deleteHandler(car._id)}} />
        </div>
    </div>
  )
}

export default ManageCarsCard