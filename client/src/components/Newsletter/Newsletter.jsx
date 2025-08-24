import React from 'react'
import './Newsletter.css'
const NewsletterSignup = () => {
  return (
    <div className='newsletter'>
        <h1>Never Miss a Deal!</h1>
        <p>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
        <div>
            <input type="text" placeholder='Enter your email id'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsletterSignup