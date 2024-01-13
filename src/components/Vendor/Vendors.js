import React, { useEffect, useState } from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { useDispatch, useSelector } from 'react-redux';
import "./Vendor.css"
import { AllVendor, clearError } from '../../actions/productActions';
import Sidebar from '../user/Sidebar';
import VendorBox from './VendorBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import  { toast,Toaster } from 'react-hot-toast';
function Vendors() {
    const [Click, setClick] = useState(window.screen.width>600);
    const submitHandler=()=>{
        setClick(!Click)
    }
    const {vendor,loading,error} =useSelector((state)=>state.vendor)

    const dispatch=useDispatch();
    const location = useLocation();
    const alert=useAlert();
    const navigator=useNavigate();
    useEffect(() => {
      if(!localStorage.getItem("UserToken")){
        navigator("/Login")
      }
      if(error && !localStorage.getItem("UserToken")){
        toast.error(error);
        dispatch(clearError())
      }
      const queryString = location.search;
      const queryParams = new URLSearchParams(queryString);
      const vendorName = queryParams.get('vendorName');
      dispatch(AllVendor(vendorName))
    }, [dispatch,toast])
    
  return (
    <div className='FullContainer'>
          <ViewHeadlineIcon fontSize='large' onClick={submitHandler}/>
          {Click&&<Sidebar />}
        <div to className='AllVendors'>

            {vendor && vendor.map((element,index)=>(
              <VendorBox key={index} element={element} image={index%10}/>
            ))}
        </div>

    </div>
  )
}

export default Vendors
