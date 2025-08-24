import React from 'react'
import './CarCard.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

export const CarCard = ({car}) => {
  return (
    <Link to={`/car-details/${car._id}`}>
        <div className='car-card'>
        <div className="car-card-upper">
            <img src={car.carImage} alt="" className='car-image'/>
            <p className='availablity'>Available Now</p>
            <p className='charges'><span>${car.price}</span>/day</p>
        </div>
        <div className="car-card-lower">
            <div className="car-main-details">
                <h3>{car.brand} {car.model}</h3>
                <h4>{car.category} {car.year}</h4>
            </div>
            <div className="car-additional-details">
                <div><img src={assets.users_icon} alt="" />{car.capacity} seats</div>
                <div><img src={assets.fuel_icon} alt="" />{car.fuelType}</div>
                <div><img src={assets.car_icon} alt="" />{car.transmission}</div>
                <div><img src={assets.location_icon} alt="" />{car.location}</div>
            </div>
        </div>
    </div>
    </Link>
    
  )
}
