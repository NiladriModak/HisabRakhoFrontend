import React from 'react'
import img6 from "../../img6"
import img7 from "../../img7"
import img8 from "../../img8"
import img9 from "../../img9"
import img10 from "../../img10"
function DashboardVendor(props) {
    const arr=[img6,img7,img8,img9,img10]
    let i = props.image
  return (
    <div>
      <img src={arr[i]} alt='hi' style={{"width":"14vmax","height":"14vmax"}}/>
      <p style={{"fontFamily":"Cursive"}}>{props.item.vendorName}</p>  <p style={{"fontFamily":"Cursive"}}>{props.item.DueAmt}</p>
    </div>
  )
}

export default DashboardVendor
