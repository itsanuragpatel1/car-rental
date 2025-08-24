import React from 'react'
import './PromoBanner.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const PromoBanner = () => {

  return (
    <div className='promo-banner'>
        <div className="promo-banner-left">
            <h1>Do You Own a Luxury Car?</h1>
            <p>Monetize your vehicle effortlessly by listing it on CarRental. <br />
We take care of insurance, driver verification and secure payments <br /> so
you can eam passive income, stress-free.</p>
<Link to={'/owner/add-car'}><button>List Your Car</button></Link>
            
        </div>
        <img src={assets.banner_car_image}/>
    </div>
  )
}

export default PromoBanner