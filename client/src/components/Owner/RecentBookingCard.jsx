import React from 'react'
import { assets } from '../../assets/assets'

const RecentBookingCard = ({name,date,price,status}) => {
  return (
    <div className='recent-booking-card'>
        <div className="card-left">
            <img src={assets.listIconColored} />
            <div>
                <h4>{name}</h4>
                <p>{date}</p>
            </div>
        </div>
        <div className="card-right">
              <p className='check'>{price}</p>
              <p className='status'>{status}</p>     
        </div> 
    </div>
  )
}

export default RecentBookingCard