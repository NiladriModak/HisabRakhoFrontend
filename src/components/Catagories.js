import React, { useEffect, useState } from 'react'
import Sidebar from './user/Sidebar';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { useDispatch, useSelector } from 'react-redux';
import { AllCatagory } from '../actions/productActions';
import CatagoryBox from './CatagoryBox';
import "./Catagories.css"
function Catagories() {
    const [Click, setClick] = useState(window.screen.width>600);
    const submitHandler=()=>{
        setClick(!Click)
    }
    const {catagory,loading,error} =useSelector((state)=>state.catagory)
    const dispatch=useDispatch();

    useEffect(() => {
      dispatch(AllCatagory(""))
      
    }, [dispatch])
    
  return (
    <div className='FullContainer'>
        
        <ViewHeadlineIcon fontSize='large' onClick={submitHandler}/>
        {Click&&<Sidebar />}

        <div to className='AllCat'>
          {catagory &&
            catagory.map((element,index) => (
              <CatagoryBox key={index} catagory={element} image={index%6}/>
          ))}
        </div>

    </div>
  )
}

export default Catagories
