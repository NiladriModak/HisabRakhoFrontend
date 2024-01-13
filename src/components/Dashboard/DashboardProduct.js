import React from 'react'
import img1 from "../../img1"
import img2 from "../../img2"
import img3 from "../../img3"
import img4 from "../../img4"
import img5 from "../../img5"
function DashboardProduct(props) {
    const arr=[img1,img2,img3,img4,img5]
    let i = props.image
  return (
    <div>
      <img src={arr[i]} alt='hi' style={{"width":"14vmax","height":"14vmax"}}/>
      <p style={{"fontFamily":"Cursive"}}>{props.item.name}</p>  <p style={{"fontFamily":"Cursive"}}>{props.item.totalSold}</p>
    </div>
  )
}

export default DashboardProduct
