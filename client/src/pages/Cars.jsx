import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import '../styles/Cars.css'
import axios from 'axios'
import { CarCard } from '../components/CarCard/CarCard.jsx'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

const Cars = () => {

  const {cars,setCars,test,setTest}=useAuth();

  const [search,setSearch]=useState("");
  const [loading,setLoading]=useState(true)
  // const [cars,setCars]=useState([])

  const timerRef = useRef(null);

  const searchCar=async()=>{
      setLoading(true);
      if(timerRef.current) clearInterval(timerRef.current);
      timerRef.current=setTimeout(async()=>{
        console.log("dfv");
        const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/search`;
        const {data}=await axios.post(endpoint,{search},{withCredentials:true});
        console.log(data);
        if(data.success){
          setCars(data.cars);
        }else{
          toast.error(data.message);
        }
        setLoading(false);
      },500);

  }


  useEffect(()=>{
    const fetchCars=async()=>{
       try {
        const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/all-cars`
        const {data}=await axios.get(endpoint,{withCredentials:true})
        if(data.success){
          setCars(data.cars);
        }else{
          toast(data.message)
        }
      } catch (error) {
        console.log("error in fetching car in cars",error);
        toast.error(error.message)
      } finally {
        setLoading(false);
      }
     }
    
     if(test){
        setLoading(false);
        setTest(false);
     }else if(search.trim()){
      searchCar();
     }else{
      fetchCars();
     }
    
  },[search])


  return (
    <>
    <div className='cars'>
        <div className="cars-section-banner">
            <h1>Available Cars</h1>
            <p>Browse our selection of premium vehicles available for your next adventure</p>
            <div>
                <img src={assets.search_icon} />
                <input type="text" placeholder='Search by make, model or features' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                <img src={assets.filter_icon}/>
            </div>
        </div>
    </div>
        
      {loading?(
        <div className="loader-wrapper">
            <img src={assets.loading1} alt="Loading..." className="loader" />
        </div>):
        (cars.length==0?<p className='notfound'>No Car Found  ☹️</p>:
        <div className="cars-list">
            {cars?.map((car,index)=>{
               return <CarCard car={car} key={index} />
            })}
          </div>
        )
      }
    
    </>
    
  )
}

export default Cars