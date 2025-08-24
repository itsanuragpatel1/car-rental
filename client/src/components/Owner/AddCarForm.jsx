import React from 'react'
import { assets } from '../../assets/assets'
import './styles/AddCarForm.css'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const AddCarForm = () => {
    const [loading,setLoading]=useState(false)
    const [image,setImage]=useState('');
    const [car,setCar]=useState({
        brand:'',model:'',year:'',price:'',category:'',location:'',description:'',transmission:'',fuelType:'',capacity:''
    })

    const changeHandler=(e)=>{
        setCar((prevCar)=>{
            return {...prevCar, [e.target.name]:e.target.value }
        })
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        if(loading) return;
        try {
            setLoading(true)
            const baseUrl=import.meta.env.VITE_BACKEND_URL;
            const endpoint=`${baseUrl}/api/owner/add-car`;
          
            const formData=new FormData();
            formData.append('image',image);
            formData.append('carData',JSON.stringify(car))
           
            const {data}=await axios.post(endpoint,formData,{withCredentials:true});
    
            if(data.success){
                toast.success(data.message);
                setCar({brand:'',model:'',year:'',price:'',category:'',location:'',description:'',transmission:'',fuelType:'',capacity:''})
                setImage('')
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log("error in add car submit handler",error);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

  return (
    <form className='add-car-form' onSubmit={(e)=>{submitHandler(e)}} encType="multipart/form-data">
        <div className='layer-one'>
            <input type="file" id='upload-image' name='carImage' onChange={(e)=>{setImage(e.target.files[0])}}/>
            <label htmlFor="upload-image">
                <img src={image? URL.createObjectURL(image): assets.upload_icon} />
            </label>
            <p>Upload a picture of your  car</p>
        </div>
        <div className='layer-two'>
            <div>
                <p>Brand</p>
                <input type="text" name='brand' placeholder='e.g. BMW, Mercedes, Audi...' onChange={(e)=>{changeHandler(e)}} value={car.brand} required />
            </div>
            <div>
                <p>model</p>
                <input type="text" name='model' placeholder='e.g. X5, E-Class, M$...' onChange={(e)=>{changeHandler(e)}} value={car.model} required/>
            </div>
        </div>
        <div className='layer-three'>
            <div>
                <p>Year</p>
                <input type="number" name='year' placeholder='2025' onChange={(e)=>{changeHandler(e)}} value={car.year} required/>
            </div>
            <div>
                <p>Daily Price($)</p>
                <input type="text" name='price' placeholder='100' onChange={(e)=>{changeHandler(e)}} value={car.price} required/>
            </div>
            <div>
                <p>Category</p>
                <select name="category" id="" onChange={(e)=>{changeHandler(e)}} value={car.category} required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="van">van</option>
                </select>
            </div>
        </div>
        <div className='layer-four'>
            <div>
                <p>Transmission</p>
                <select name="transmission" id="" onChange={(e)=>{changeHandler(e)}} value={car.transmission} required>
                    <option value="" disabled selected>Select a Transmission</option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    <option value="semi_automatic">Semi-Automatic</option>
                </select>
            </div>
            <div>
                <p>Fuel Type </p>
                <select name="fuelType" id="" onChange={(e)=>{changeHandler(e)}} value={car.fuelType} required>
                    <option value="" disabled selected>Select a fuel type</option>
                    <option value="gas">Gas</option>
                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>
            <div>
                <p>Seating Capcity</p>
                <input type="number" name='capacity' onChange={(e)=>{changeHandler(e)}} value={car.capacity} required/>
            </div>
        </div>
        <div className='layer-five'>
                <p>Location</p>
                <select name="location" id="" onChange={(e)=>{changeHandler(e)}} value={car.location} required>
                    <option value="" disabled selected>select a location</option>
                    <option value="rewa">Rewa</option>
                    <option value="satna">Satna</option>
                    <option value="sidhi">Sidhi</option>
                    <option value="mauganj">Mauganj</option>
                    <option value="singrauli">Singrauli</option>
                </select>
        </div>
        <div className='layer-six'>
                <p>Description</p>
                <textarea name="description" id="" placeholder='e.g. A luxurious SUV With a spacious interior and a powerful engine.'  onChange={(e)=>{changeHandler(e)}} value={car.description}></textarea>
        </div>
        <button> <img src={assets.tick_icon} /> {loading?'Listing...':'List Your Car'} </button>
    </form>
  )
}

export default AddCarForm