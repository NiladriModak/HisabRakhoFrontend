import React, { useEffect, useState } from 'react'
import Sidebar from '../user/Sidebar';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import "./Dashboard.css"
import {useDispatch, useSelector} from "react-redux"
import { AllVendor, clearError, getLargestSoldProduct } from '../../actions/productActions';
import DashboardProduct from './DashboardProduct';
import DashboardVendor from './DashboardVendor';
import { useAlert } from 'react-alert';
import toast from 'react-hot-toast';
function Dashboard() {
  const [Click, setClick] = useState(window.screen.width>600);
    const submitHandler=()=>{
        setClick(!Click)
    }

    const {product,loading,error} = useSelector((state)=>state.largestSold)
    const {vendor,Load=loading,Error=error} = useSelector((state)=>state.vendor)
    const dispatch=useDispatch();
    const alert = useAlert();
    useEffect(() => {
      if(error||Error){
        toast.error(error);
        dispatch(clearError())
      }
      dispatch(getLargestSoldProduct())
      dispatch(AllVendor())
    }, [dispatch,error,Error])
    
    if(vendor)
    var sortedVendor=[...vendor].sort((a,b)=>b.DueAmt-a.DueAmt)

  return (
    <div className='FullContainer'>
      <ViewHeadlineIcon fontSize='large' onClick={submitHandler}/>
      {Click&&<Sidebar />}
      <div className='Outerdiv'>
        <div>
            <h1>Hello {localStorage.getItem("UserName")?localStorage.getItem("UserName"):"USER"}</h1>
        </div>
        <div>
            <h1>Welcome to Hissab Rakkho</h1>
        </div>
        <div>
            <h2>The Largest Saling products are</h2>
            <div className='ItemContainer'>
              <div className='Item1'>
              {product && product.map((item, index) => (
                  <DashboardProduct key={index} item={item} image={index%5} />
              ))}
              </div>
            </div>  
        </div>
        <div>
            <h2>The Largest Due Amounts Are</h2>
            <div className='ItemContainer'>
              <div className='Item1'>
              {sortedVendor && sortedVendor.map((item, index) => (
                  <DashboardVendor key={index} item={item} image={index%5} />
              ))}
              </div>
            </div>  
        </div>
        
      </div>
      
    </div>
  )
}

export default Dashboard
