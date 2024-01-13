import React from 'react'
import "./BillBox.css"
function BillBox(props) {

    const DeleteHandler = () => {
        props.onDelete(props.index);
      };
  return (
    <div className='BillBoxContainer'>
      <div className='TableCell'>{props.item.Quantity}</div>
      <div className='TableCell'>{props.item.Product}</div>
      <div className='TableCell'>{props.item.Price}</div>
      <div className='TableCell'>{parseFloat(props.item.Quantity)*parseFloat(props.item.Price)}</div>
      <div className='TableCell'><button onClick={DeleteHandler}>Del</button></div>
    </div>
  )
}

export default BillBox
