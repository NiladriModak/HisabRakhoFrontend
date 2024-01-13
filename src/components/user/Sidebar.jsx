import React from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./Sidebar.css"
function Sidebar() {
  return (
    <div className='SideBarDiv'>
        <div className='AllOptions'>
            <Link to="/dashboard">
                <DashboardIcon/>Dashboard 
            </Link>
            <Link to="/allProduct">
                Product 
            </Link>
            <Link to="/allCatagories">
                Catagories
            </Link>
            <Link to="/allVendors">
                Vendors
            </Link>
            <Link to="/history">
                History
            </Link>
            <Link to="/makeBill">
                Make Bill
            </Link>
        </div>
      
    </div>
  )
}

export default Sidebar
