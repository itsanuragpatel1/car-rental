import React, { useEffect, useState } from 'react'
import { assets } from '../../../assets/assets'
import DashboardStats from '../../../components/Owner/DashboardStats'
import MonthlyRevenue from '../../../components/Owner/MonthlyRevenue'
import RecentBookings from '../../../components/Owner/RecentBookings'
import './Dashboard.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const Dashboard = () => {
  

  const [loading,setLoading]=useState(true);
  const [dashboard,setDashboard]=useState([]);


  useEffect(()=>{
    const fetchDashboard=async()=>{
      try {
        const endpoint=`${import.meta.env.VITE_BACKEND_URL}/api/owner/dashboard`
        const {data}=await axios.get(endpoint,{withCredentials:true});
        console.log(data);
        if(data.success){
          setDashboard(data.dashboard);
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        console.log("error in fecthing dashboard data",error)
        toast.error(error.message);
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  },[])

  return (
    <div className='dashboard'>
      <h1>Admin Dashboard</h1>
      <p className='desc'>Monitor overall platform performance including total cars, bookings, revenue, and recent activities</p>
      
      {
        loading?(
          <div className="loader-wrapper">
              <img src={assets.loading1} alt="Loading..." className="loader" />
          </div>
        ):(
          <>
          <div className="stats-list">
              <DashboardStats cardName='Total Cars' count={dashboard.totalCars} icon={assets.carIconColored}  />
              <DashboardStats cardName='Total Bookings' count={dashboard.totalBookings} icon={assets.listIconColored}  />
              <DashboardStats cardName='Pending Bookings' count={dashboard.pendingBookings} icon={assets.cautionIconColored}  />
              <DashboardStats cardName='Completed Bookings' count={dashboard.completedBookings} icon={assets.listIconColored}  />
          </div>

          <div className="dashboard-lower">
              <RecentBookings recents={dashboard.recentBookings} />
              <MonthlyRevenue revenue={dashboard.monthlyRevenue}/>
          </div>
          </>
        )
      }      
    </div>
  )
}

export default Dashboard