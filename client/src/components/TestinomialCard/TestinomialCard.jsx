import React from 'react'
import './TestinomialCard.css'
import { assets } from '../../assets/assets'

const TestinomialCard = ({testimonial}) => {

  const stars=[];
  for(let i=0;i<testimonial.rating;i++){
    stars.push(<img src={assets.star_icon} />)
  }



  return (
    <div className='testimonial-card'>
        <div className="testimonial-card-profile">
            <img src={assets.image} alt="" />
            <div>
                <h4>{testimonial.name}</h4>
                <p>{testimonial.location}</p>
            </div>
        </div>
        <div className='testimonial-stars'>
          {
            stars
          }
            {/* <img src={assets.star_icon} />
            <img src={assets.star_icon} />
            <img src={assets.star_icon} />
            <img src={assets.star_icon} />
            <img src={assets.star_icon} /> */}
        </div>
        <p>{testimonial.feedback}</p>
    </div>
  )
}

export default TestinomialCard