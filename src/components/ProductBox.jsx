import React from 'react'
import "./ProductBox.css"
import { Link } from 'react-router-dom'
function ProductBox(props) {
  return (
    
    <Link to={`/product/${props.product._id}`} className='ProductBoxContainer'>
      <div className='Nameofproduct'>
        {props.product.name}
      </div>
      <div className='DetailsOfProduct'>
        Catagory:{props.product.catagory}
      </div>
      <div className='PriceOfProduct'>
        Price:{props.product.price}
      </div>
      <div className='QuantityOfProduct'>
        Quantity:{props.product.quantity}
      </div>
    </Link>
  )
}

export default ProductBox
