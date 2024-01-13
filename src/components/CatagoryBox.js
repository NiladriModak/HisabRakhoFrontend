import React from 'react'
import "./CatagoryBox.css"
import { Link } from 'react-router-dom'
import img13 from "../img13"
import img14 from "../img14"
import img15 from "../img15"
// import img16 from "../img16"
import img17 from "../img17"
import img18 from "../img18"
import img19 from "../img19"
import img20 from "../img20"
function CatagoryBox(props) {
  let arr=[img13,img14,img15,img17,img18,img19,img20]
  let i=props.image
  return (
    <Link to={`/allProduct?catagory=${props.catagory}`} className='CatagoryBox'>
      <img src={arr[i]} alt='hi' style={{"width":"10vmax" , "height":"10vmax"}}/>
      <div>{props.catagory}</div>
    </Link>
  )
}

export default CatagoryBox
