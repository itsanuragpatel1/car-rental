import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Home from './pages/Home'
import Cars from './pages/Cars'
import { Routes ,Route, useLocation} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import MyBookings from './pages/MyBookings'
import CarDetails from './pages/CarDetails'
import Login from './components/Login/Login'
import Layout from './pages/Owner/Layout/Layout'
import Dashboard from './pages/Owner/Dashboard/Dashboard'
import ManageBookings from './pages/Owner/ManageBookings/ManageBookings'
import Managecars from './pages/Owner/ManageCars/Managecars'
import AddCar from './pages/Owner/AddCar/AddCar'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './context/ProtectedRoute'

const App = () => {
  const isOwnerPath=useLocation().pathname.startsWith('/owner')
  // console.log(useLocation());

  const [showLogin,setShowLogin]=useState(false);

  return (
    <div>
      <Toaster/>

      {showLogin && <Login setShowLogin={setShowLogin} />}

      {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}
    
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cars' element={ <Cars/> }/>
        <Route path='/my-bookings' element={ <ProtectedRoute setShowLogin={setShowLogin}><MyBookings/></ProtectedRoute> } />
        <Route path='/car-details/:carID' element={ <CarDetails/> } />
        <Route path='/owner' element={<ProtectedRoute><Layout/></ProtectedRoute>}>
            <Route index element={<Dashboard/>} />
            <Route path='add-car' element={<AddCar/>} />
            <Route path='manage-bookings' element={<ManageBookings/>} />
            <Route path='manage-cars' element={<Managecars/>} />
        </Route>
      </Routes>


      {!isOwnerPath && <Footer/>}
    </div>
  )
}

export default App