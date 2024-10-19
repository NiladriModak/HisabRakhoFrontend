import React, { useEffect, useState } from "react";
import Sidebar from "../user/Sidebar";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  AllVendor,
  clearError,
  getLargestSoldProduct,
} from "../../actions/productActions";
import DashboardProduct from "./DashboardProduct";
import DashboardVendor from "./DashboardVendor";
import { useAlert } from "react-alert";
import toast from "react-hot-toast";
import ShortCut from "../layout/ShortCut";
function Dashboard() {
  const { product, loading, error } = useSelector((state) => state.largestSold);
  const {
    vendor,
    Load = loading,
    Error = error,
  } = useSelector((state) => state.vendor);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error || Error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getLargestSoldProduct());
    dispatch(AllVendor());
  }, [dispatch, error, Error]);

  if (vendor)
    var sortedVendor = [...vendor].sort((a, b) => b.DueAmt - a.DueAmt);

  return (
    <ShortCut>
      <div className="FullContainer">
        <div className="Outerdiv">
          <div>
            <h1>
              Hello{" "}
              {localStorage.getItem("UserName")
                ? localStorage.getItem("UserName")
                : "USER"}
            </h1>
          </div>
          <div>
            <h1>Welcome to Hissab Rakkho</h1>
          </div>
          <div>
            <h2>The Largest Saling products are</h2>
            <div
              className="ItemContainer"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="Item1">
                {product && product.length === 0 && (
                  <h3>No Products to show</h3>
                )}
                {product &&
                  product.map((item, index) => (
                    <DashboardProduct
                      key={index}
                      item={item}
                      image={index % 5}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div>
            <h2>The Largest Due Amounts Are</h2>
            <div
              className="ItemContainer"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="Item1">
                {sortedVendor && sortedVendor.length === 0 && (
                  <h3>No Dues Left to pay</h3>
                )}
                {sortedVendor &&
                  sortedVendor.map((item, index) => (
                    <DashboardVendor
                      key={index}
                      item={item}
                      image={index % 5}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShortCut>
  );
}

export default Dashboard;
