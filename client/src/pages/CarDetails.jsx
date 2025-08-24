import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import '../styles/CarDetails.css'
import { assets } from '../assets/assets'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const CarDetails = () => {
    const {carID}=useParams();

    const [car,setCar]=useState(null);
    const [picupDate,setPicupDate]=useState('');
    const [returnDate,setReturnDate]=useState('');

    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const fetchCar=async()=>{
        try {
            const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/get-car/${carID}`;
            const {data}=await axios(endpoint,{withCredentials:true});
            if(data.success){
                setCar(data.car);
            }else{
                toast.error(data.message);
            }
            
        } catch (error) {
            console.log("error in fetching car ",error);
            toast.error(error.message);
        } finally{
            setLoading(false)
        }
        }

        fetchCar();
    },[])

    const submitHandler=async()=>{
        try {
            const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/booking/create`;
            const {data}=await axios.post(endpoint,{picupDate,returnDate,carID},{withCredentials:true})
            if(data.success){
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error in cardetails submit ",error)
            toast.error(error.message)
        }
    }

  return (
    <>
    {
        loading?
        (
            <div className="loader-wrapper">
                <img src={assets.loading1} alt="Loading..." className="loader" />
            </div>
        ):
        (car?<div className='car-details'>
        
        <div className="car-details-left">
           <Link to={'/cars'} ><p> <img src={assets.arrow_icon}  className='arrow-icon'/> Back to all cars </p></Link>

            <img src={car.carImage} className='main-img'/>
            <h1>{car.brand} {car.model}</h1>
            <p className='model'> {car.category} • {car.year}</p>
            <hr />
            <div className="car-details-left-card">
                <div><img src={assets.users_icon}/> <p>{car.capacity} Seats</p> </div>
                <div><img src={assets.fuel_icon}/> <p>{car.fuelType}</p> </div>
                <div><img src={assets.car_icon}/> <p>{car.transmission}</p> </div>
                <div><img src={assets.location_icon}/> <p>{car.location}</p> </div>
            </div>
            <h3>Description</h3>
            <p>{car.description}</p>
            <h3>Features</h3>
            <div className="car-details-left-features">
                <p> <img src={assets.check_icon}/> Air Conditioning </p>
                <p> <img src={assets.check_icon}/> GPS Navigation </p>
                <p> <img src={assets.check_icon}/> Premium Sound System </p>
                <p> <img src={assets.check_icon}/> Parking Sensors </p>
                <p> <img src={assets.check_icon}/> Cruise Control </p>
            </div>
        </div>
        <div className="car-details-right">
            <div className="car-details-right-top">
                <h2>${car.price}</h2>
                <p>per day</p>
            </div>
            <hr />
            <div className="dates">
                <p>Pickup Date</p>
                <input type="date" value={picupDate}  min={new Date().toISOString().split('T')[0]} onChange={(e)=>{setPicupDate(e.target.value)}}  required/>
            </div>
            <div className="dates">
                <p>Return Date</p>
                <input type="date" value={returnDate} onChange={(e)=>{setReturnDate(e.target.value)}} min={picupDate} required />
            </div>
            <button onClick={()=>{submitHandler()}}>Book Now</button>
            <p>No credit card required to reverse</p>
        </div>
    </div>: <p className='notfound'>No Car Found ☹️</p>

        )
    }


     
    </>
   
  )
}

export default CarDetails