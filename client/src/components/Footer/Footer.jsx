import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' >
        <div className="footer-upper">
            <div className="footer-upper-left">
                <img src={assets.logo} height={"40px"}/>
                <p>Premium car rental service with a wide selection of
                    luxury and everyday vehicles for all your driving
                    needs.</p>
                <div className="footer-social-media">
                    <img src={assets.facebook_logo}  />
                    <img src={assets.instagram_logo} />
                    <img src={assets.twitter_logo} />
                    <img src={assets.gmail_logo} />
                </div>
            </div>
            <div className="footer-upper-right">
                <div className="footer-links">
                    <h4>QUICK LINKS</h4>
                    <Link to={'/'} > <p>Home</p></Link>
                    <Link to={'/cars'}><p>Browse Cars </p></Link>
                    <Link to={'/owner/add-car'}><p>List Your Car</p></Link>
                    <p>About Us</p>
                </div>
                <div className="footer-resources">
                    <h4>RESOURCES</h4>
                    <p>Help Center</p>
                    <p>Terms of Service</p>
                    <p>Privacy Policy </p>
                    <p>Insurance</p>
                </div>
                <div className="footer-contact">
                    <h4>CONTACT</h4>
                    <p>15/284 raja nagar</p>
                    <p>new delhi 11001</p>
                    <p>+91 7805800000</p>
                    <p>info@carrental.com</p>
                </div>

            </div>
        </div>
        <hr />
        <div className='footer-lower'>
            <p>@ 2025 Brand. All rights reserved.</p>
            <div className="footer-lower-right">
                <button>Privacy</button>|
                <button>Terms</button>|
                <button>Cookies</button>
            </div>
        </div>
    </div>
  )
}

export default Footer