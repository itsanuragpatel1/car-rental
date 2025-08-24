import React from 'react'
import RecentBookingCard from './RecentBookingCard'
import { useAuth } from '../../context/AuthContext'

const RecentBookings = ({recents}) => {

    const {getDays}=useAuth();
  return (
    <div className='recent-bookings'>
        <h3>Recent Bookings</h3>
        <p className='desc'>Latest Customer Bookings</p>


        <div className="recent-bookings-list">
            {
                recents?.map((ele,index)=>{
                    return (
                        <RecentBookingCard name={ele.car.brand+' '+ele.car.model} date={ele.createdAt.slice(0,10)} status={ele.status} price={getDays(ele.picupDate,ele.returnDate)*ele.car.price} key={index}/>
                    )
                })
            }
        </div>
        
    </div>
  )
}

export default RecentBookings