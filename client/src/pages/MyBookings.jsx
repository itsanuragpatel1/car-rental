import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import MyBookingsCard from '../components/MyBookingsCard/MyBookingsCard'
import '../styles/MyBookings.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'


const MyBookings = () => {

  const [loading,setLoading]=useState(true);
  const [bookings,setBookings]=useState([]);

  useEffect(()=>{
    const fetchBookings=async()=>{
        try {
          const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/booking/user`;
          const {data}=await axios.get(endpoint,{withCredentials:true});
          if(data.success){
            setBookings(data.bookings);
          }else{
            toast.error(data.message)
          }
          
        } catch (error) {
          console.log("error in fetchBooking",error);
          toast.error(error.message)
        } finally {
          setLoading(false)
        }
    };

    fetchBookings();

  },[])

  return (
    <>
    {/* <Navbar/> */}
    <div className='my-bookings'>
        <div className="my-bookings-text">
            <h1>My Bookings</h1>
            <p>View and manage your car bookings</p>
        </div>
        {
          loading?(
            <div className="loader-wrapper">
                        <img src={assets.loading1} alt="Loading..." className="loader" />
            </div>
          ):(
            <div className="my-bookings-list">
            {
              bookings?.map((booking,index)=>{
                  return <MyBookingsCard booking={booking} key={index} id={index}/>
              })
            }
            </div>
          )
        }
        
    </div>
    </>
    
  )
}

export default MyBookings