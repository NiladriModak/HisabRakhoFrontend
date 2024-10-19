import React, { useEffect, useState } from "react";
// import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearError, getProduct } from "../actions/productActions";
import ProductBox from "./ProductBox";
import Sidebar from "./user/Sidebar";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import "./Product.css";
import toast from "react-hot-toast";
import ShortCut from "./layout/ShortCut";
import { Box } from "@mui/material";

function Products() {
  // const alert=useAlert();
  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.product);
  const location = useLocation();
  // const {isAuthenticated} = useSelector((state)=>state.loginUser)
  const navigator = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("UserToken")) {
      navigator("/Login");
    }
    if (error && !localStorage.getItem("UserToken")) {
      toast.error(error);
      dispatch(clearError());
    }
    const queryString = location.search;
    const queryParams = new URLSearchParams(queryString);
    const catagory = queryParams.get("catagory");
    dispatch(getProduct("", catagory));
  }, [dispatch, error, location.search, navigator]);
  // console.log("product", product);

  return (
    <ShortCut>
      <div className="ProductConatiner">
        <div className="EachProduct">
          <Box
            className="ProductBoxContainer"
            style={{ backgroundColor: "#8af8fa", marginBottom: "1vmax" }}
          >
            <Box
              sx={{
                border: "1px solid #43e5e8",
                width: "20%",
                height: "100%",
                textAlign: "center",
              }}
            >
              Name
            </Box>
            <Box
              sx={{
                border: "1px solid #43e5e8",
                width: "30%",
                height: "100%",
                textAlign: "center",
              }}
            >
              Catagory
            </Box>
            <Box
              sx={{
                border: "1px solid #43e5e8",
                width: "30%",
                height: "100%",
                textAlign: "center",
              }}
              className="PriceOfProduct"
            >
              Price
            </Box>
            <Box
              sx={{
                border: "1px solid #43e5e8",
                width: "19%",
                height: "100%",
                textAlign: "center",
              }}
              className="QuantityOfProduct"
            >
              Quantity
            </Box>
          </Box>

          {product &&
            product.map((item) => <ProductBox key={item._id} product={item} />)}
          {product && product.length === 0 && (
            <h2>
              No product has been created Please create a product from Navbar
            </h2>
          )}
        </div>
      </div>
    </ShortCut>
  );
}

export default Products;
