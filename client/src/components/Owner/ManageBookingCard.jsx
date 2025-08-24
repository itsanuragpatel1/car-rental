import React from 'react'
import './styles/ManageBookingCard.css'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ManageBookingCard = ({booking}) => {

  const {getDays}=useAuth();

  const actionHandler=async(e)=>{
    try {
      const status=e.target.value;
      const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/booking/status`
      const {data}=await axios.post(endpoint,{status,bookingId:booking._id},{withCredentials:true})
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error in action handler",error)
    }
  }
  

  return (
    <div className='manage-booking-card'>
      <Link to={`/car-details/${booking.car._id}`}>
          <div className='car-details'>
            <img src={booking.car.carImage} alt="" />
            <p className='car-name'>{booking.car.brand} {booking.car.model}</p>
        </div>
      </Link>
        
        <p>{booking.picupDate.slice(0,10)} To {booking.returnDate.slice(0,10)}</p>
        <p>{getDays(booking.picupDate,booking.returnDate)*booking.car.price}</p>
        <p className={'payment'}>offline</p>
        <div className='actions'>
          {
            booking.status=='pending'?<select name="action" id="" onChange={(e)=>{actionHandler(e)}}>
            <option value="pending">pending</option>
            <option value="cancel">cancel</option>
            <option value="confirm">confirm</option>
        </select>: <p className={`status ${booking.status=='confirm'?'confirm':'cancel'}`}>{booking.status}ed</p>
          }
        
        </div>
    </div>
  )
}

export default ManageBookingCard