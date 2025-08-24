import React from 'react'
import './Testimonials.css'
import TestinomialCard from '../TestinomialCard/TestinomialCard'
import { testimonials } from '../../assets/assets'

const Testimonials  = () => {


  return (
    <div className='testimonial'> 
        <div className="testimonial-text">
            <h1>What Our Customers Say</h1>
            <p>Discover why discerning travelers choose StayVenture for their luxury accommodations
around the world.</p>
        </div>
        <div className="testimonials-list">
          {
            testimonials.map((testimonial)=>(
              <TestinomialCard testimonial={testimonial}/>
            ))
          }
        </div>

    </div>
  )
}

export default Testimonials 