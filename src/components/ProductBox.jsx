import React from "react";
import "./ProductBox.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
function ProductBox(props) {
  console.log(props);

  return (
    <Link to={`/product/${props.product._id}`} className="ProductBoxContainer">
      <Box
        sx={{
          border: "1px solid black",
          width: "20%",
          height: "100%",
          textAlign: "center",
        }}
      >
        {props.product.name}
      </Box>
      <Box
        sx={{
          border: "1px solid black",
          width: "30%",
          height: "100%",
          textAlign: "center",
        }}
      >
        {props.product.catagory}
      </Box>
      <Box
        sx={{
          border: "1px solid black",
          width: "30%",
          height: "100%",
          textAlign: "center",
        }}
        className="PriceOfProduct"
      >
        {props.product.price}
      </Box>
      <Box
        sx={{
          border: "1px solid black",
          width: "19%",
          height: "100%",
          textAlign: "center",
        }}
        className="QuantityOfProduct"
      >
        {props.product.quantity}
      </Box>
    </Link>
  );
}

export default ProductBox;
