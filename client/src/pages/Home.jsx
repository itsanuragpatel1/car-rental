import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Featured from '../components/Featured/Featured'
import PromoBanner from '../components/PromoBanner/PromoBanner'
import Testimonials from '../components/Testimonials/Testimonials '
import Newsletter from '../components/Newsletter/Newsletter'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <>
        {/* <Navbar/> */}
        <Hero/>
        <Featured/>
        <PromoBanner/>
        <Testimonials/>
        <Newsletter/>
        {/* <Footer/> */}
    </>
  )
}

export default Home