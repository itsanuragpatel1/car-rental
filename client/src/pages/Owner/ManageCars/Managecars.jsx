import React, { useEffect, useState } from 'react'
import './ManageCars.css'
import { assets } from '../../../assets/assets';
import ManageCarsCard from '../../../components/Owner/ManageCarsCard';
import axios from 'axios';
import toast from 'react-hot-toast';

const Managecars = () => {

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

const [carList,setCarList]=useState([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{
  const fetchCars=async()=>{
    try {
      const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/owner/my-cars`;
      const {data}=await axios.get(endpoint,{withCredentials:true});
      setCarList(data.cars);
    } catch (error) {
      console.error("Error fetching cars", error);
      toast.error(error.message)
    } finally{
      setLoading(false);
    }
  }

  fetchCars();
 
})

  return (
    <div className='manage-cars'>
      <h1>Manage Cars</h1>
      <p className='desc'>View all listed cars, update their details, or remove them from the booking platform.</p>

      <div className="manage-cars-lower">
          <div className="header">
            <p>car</p>
            <p>Category</p>
            <p>Price</p>
            <p>Status</p>
            <p>Actions</p>
          </div>

          {
            loading?(
              <div className="loader-wrapper">
                  <img src={assets.loading1} alt="Loading..." className="loader" />
              </div>
            ):(carList.length==0?<p className='notfound'>No Cars Present ☹️</p>:
              carList?.map((car,index)=>{
              return <ManageCarsCard car={car} key={index} />
            })
            )
            
          }
      </div>

    </div>
  )
}

export default Managecars