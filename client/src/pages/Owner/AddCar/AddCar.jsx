import React from 'react'
import './AddCar.css'
import AddCarForm from '../../../components/Owner/AddCarForm'

const AddCar = () => {
  return (
    <div className='add-car'>
      <h1>Add New Car</h1>
      <p className='desc'>Fill in details to list a new car for booking, including pricing, availability, and car
specifications.</p>

      <AddCarForm/>
    </div>
  )
}

export default AddCar