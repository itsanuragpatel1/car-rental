import React, { useEffect, useState } from 'react'
import './Featured.css'
import { assets } from '../../assets/assets.js'
import { CarCard } from '../CarCard/CarCard.jsx'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Featured = () => {

  const [cars,setCars]=useState([]);

  useEffect(()=>{
    const fetchCars=async()=>{
      const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/preview-cars`;
      const {data}=await axios.get(endpoint,{withCredentials:true});
      setCars(data.cars);
      console.log("featured fetch");
    }

    fetchCars();
  },[])


  return (
    <div className='featured'>
        <div className='featured-text'>
            <h1>Featured Vehicles</h1>
            <p>Explore our selection of premium vehicles available for your next adventure</p>
        </div>
        <div className="car-list">
          {
            cars.map((car,index)=>{
              return <CarCard car={car} key={index}/>
            })
          }
        </div>
        
        <Link to={'/cars'} ><button id='all-cars'>Explore all cars <img src={assets.arrow_icon} alt="" /></button></Link>
        
    </div>
  )
}

export default Featured