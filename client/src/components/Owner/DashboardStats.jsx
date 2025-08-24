import React from 'react'
import './styles/AdminComponets.css'

const DashboardStats = (props) => {
  return (
    <div className='dashboard-stats'>
        <p> {props.cardName}  <br /> <span>{props.count}</span></p>
        <img src={props.icon}/>
    </div>
  )
}

export default DashboardStats