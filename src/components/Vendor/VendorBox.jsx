import React from 'react'
// import img1 from "../../img1"
// import img2 from "../../img2"
// import img3 from "../../img3"
// import img4 from "../../img4"
// import img5 from "../../img5"
// import img6 from "../../img6"
// import img7 from "../../img7"
// import img8 from "../../img8"
// import img9 from "../../img9"
// import img10 from "../../img10"
import { Link } from 'react-router-dom'
import "./VendorBox.css"
function VendorBox(props) {
    const arr=['/img1','/img2','/img3','/img4','/img5','/img6','/img7','/img8','/img9','/img10']
    let i=props.image
  return (
    <Link to={`/allVendors/${props.element._id}`} className='VendorBox'>
      <img src={arr[i]} alt='hi' style={{"width":"14vmax","height":"12vmax"}}/>
      <p>{props.element.vendorName}</p>
    </Link>
  )
}

export default VendorBox
