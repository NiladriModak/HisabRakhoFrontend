import React, { useEffect, useState } from 'react'
// import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearError, getProduct } from '../actions/productActions';
import ProductBox from './ProductBox';
import Sidebar from './user/Sidebar';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import "./Product.css"
import toast from 'react-hot-toast';

function Products() {
    // const alert=useAlert();
    const dispatch=useDispatch();
    const {error,product}=useSelector((state)=>state.product)
    const location = useLocation();
    // const {isAuthenticated} = useSelector((state)=>state.loginUser)
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
      const catagory = queryParams.get('catagory');
      dispatch(getProduct("",catagory));
    }, [dispatch,error,location.search,navigator]);
    
    const [Click, setClick] = useState(window.screen.width>600);
    const submitHandler=()=>{
        setClick(!Click)
    }

  return (
    <div className='ProductConatiner'>
      <ViewHeadlineIcon fontSize='large' onClick={submitHandler}/>
      {Click&&<Sidebar />}
      <div className='EachProduct'>
        {product && product.map(item=>(
          <ProductBox key={item._id} product={item}/>
        ))}
      </div>
    </div>
  )
}

export default Products
