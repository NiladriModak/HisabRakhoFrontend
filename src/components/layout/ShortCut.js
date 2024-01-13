import React, { useState } from 'react'
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import Sidebar from '../user/Sidebar';
function ShortCut() {
    const [onClick, setonClick] = useState(false);
    const submitHandler=()=>{
        setonClick(!onClick)
    }
  return (
    <div>
      <ViewHeadlineIcon onClick={submitHandler}/>
      {onClick&&<Sidebar/>}
    </div>
  )
}

export default ShortCut
