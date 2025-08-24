import React, { useState } from 'react'
import {assets} from '../../assets/assets.js'
import './Hero.css'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const [picupDate,setPicupDate]=useState("");
    const [returnDate,setReturnDate]=useState("");
    const [location,setLocation]=useState('')

    const {setCars,setTest}=useAuth();
    const navigate=useNavigate();

    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/booking/check-availbilty`;
            const {data}=await axios.post(endpoint,{location,picupDate,returnDate},{withCredentials:true});
            if(data.success){
                setCars(data.cars);
            }else{
                toast.error(data.message);
            }
            setTest(true);
            navigate('/cars');
        } catch (error) {
            console.log("error in submit handler",error)
        }
    }


  return (
    <div className='hero'>
        <h1>Luxary cars on Rent</h1>
        <form action="" onSubmit={(e)=>{submitHandler(e)}}>
            <div>
                <p>Pickup Location</p>
                <select name="location" id="" value={location} onChange={(e)=>{setLocation(e.target.value)}}>
                    <option value="" disabled selected>Select a Location</option>
                    <option value="rewa">Rewa</option>
                    <option value="satna">Satna</option>
                    <option value="sidhi">Sidhi</option>
                    <option value="mauganj">Mauganj</option>
                    <option value="singrauli">Singrauli</option>
                </select>
                {/* <input type='text' name='picup-location' placeholder='Picup Location' required/> */}
            </div>
            <div>
                <p>Pick-up Date</p>
                <input type='date' name='picup-date' min={new Date().toISOString().split('T')[0] } required value={picupDate} onChange={(e)=>{setPicupDate(e.target.value)}}/>
            </div>
            <div>
                <p>Return Date</p>
                <input type='date' name='return-date' min={picupDate} required value={returnDate} onChange={(e)=>{setReturnDate(e.target.value)}}/>
            </div>
            <button>
                <img src={assets.search_white} alt="" height={'18px'} />
                Search
            </button>
        </form>
        <img className='main-car' src={assets.main_car} name="main-car" />
    </div>
  )
}

export default Hero