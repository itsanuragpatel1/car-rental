import React from 'react'

const MonthlyRevenue = (props) => {
  return (
    <div className='monthly-revenue'>
        <h3>Monthly Revenue</h3>
        <p>Revenue for current month</p>
        <h1>$ {props.revenue}</h1>
    </div>
  )
}

export default MonthlyRevenue