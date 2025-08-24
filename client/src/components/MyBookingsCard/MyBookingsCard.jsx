import React from 'react'
import './MyBookingsCard.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const MyBookingsCard = ({booking,id}) => {

    const {getDays}=useAuth();


  return (
    <div className='my-booking-card'>

        <Link to={`/car-details/${booking.car._id}`}>
        <div className="booking-left">
            <img src={booking.car.carImage} alt="" />
            <h1>{booking.car.brand} {booking.car.model}</h1>
            <p>{booking.car.year} • {booking.car.category} • {booking.car.location}</p>
        </div>
        </Link>
        
        <div className="booking-middle">
            <div className="booking-middle-top">
                <p>Booking #{id+1}</p>
                <p className={booking.status=='confirm'?'confirm':''+ booking.status=='cancel'?'cancel':'' } >{booking.status}</p>
            </div>
            <div className='info'>
                <img src={assets.calendar_icon_colored} alt="" />
                <div >
                    <p>Rental Period</p>
                    <p>{booking.picupDate.slice(0,10)} - {booking.returnDate.slice(0,10)}</p>
                </div>
            </div>
            <div className='info'>
                <img src={assets.location_icon_colored} alt="" />
                <div>
                    <p>Picup Location</p>
                    <p>{booking.car.location}</p>
                </div>
            </div>
        </div>
        <div className="booking-right">
            <p>Total Price</p>
            <h4>${(booking.car.price)*(getDays(booking.picupDate,booking.returnDate))}</h4>
            <p>Booked on {booking.createdAt.slice(0,10)}</p>
        </div>
    </div>
  )
}

export default MyBookingsCard