import React, { useEffect, useState } from 'react'
import './ManageBookings.css'
import { assets } from '../../../assets/assets';
import ManageBookingCard from '../../../components/Owner/ManageBookingCard';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageBookings = () => {

//   const carList = [
//   {
//     name: "Toyota Corolla",
//     details: "5 seats • automatic",
//     category: "Economy",
//     price: "$45/day",
//     status: "Available",
//     image: assets.car_image1,
//   },
//   {
//     name: "Honda Civic",
//     details: "5 seats • automatic",
//     category: "Economy",
//     price: "$48/day",
//     status: "Not Available",
//     image: assets.car_image4,
//   },
//   {
//     name: "BMW 3 Series",
//     details: "5 seats • automatic",
//     category: "Luxury",
//     price: "$95/day",
//     status: "Available",
//     image: assets.car_image3,
//   },
//   {
//     name: "Tesla Model 3",
//     details: "5 seats • automatic",
//     category: "Luxury",
//     price: "$120/day",
//     status: "Available",
//     image: assets.car_image2,
//   },
// ];

  const [bookings,setBookings]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
      const fetchBookings=async()=>{
        try {
          const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/booking/owner`;
          const {data}=await axios.get(endpoint,{withCredentials:true});
          if(data.success){
            setBookings(data.bookings);
          }else{
            toast.error(data.message);
          }
        } catch (error) {
          console.log("error in fetchbooking in owner",error);
          toast.error(error.message)
        } finally {
          setLoading(false);
        }
      }

      fetchBookings();
    })

  return (
    <div className='manage-bookings'>
        <h1>Manage Bookings</h1>
        <p className='desc'>Track all customer bookings, approve or cancel requests, and manage  booking statuses</p>

        <div className="manage-bookings-lower">
          <div className="header">
            <p>car</p>
            <p>Date Range</p>
            <p>Total</p>
            <p>Payment</p>
            <p>Actions</p>
          </div>

          {
            loading?(
            <div className="loader-wrapper">
                <img src={assets.loading1} alt="Loading..." className="loader" />
            </div>
            ):(bookings.length==0?<p className='notfound'>No Bookings Present ☹️</p>:
            bookings?.map((booking,index)=>{
              return <ManageBookingCard booking={booking} key={index} />
            }))
          }
      </div>
    </div>
  )
}

export default ManageBookings