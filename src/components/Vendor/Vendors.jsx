import React, { useEffect, useState } from "react";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { useDispatch, useSelector } from "react-redux";
import "./Vendor.css";
import { AllVendor, clearError } from "../../actions/productActions";
import VendorBox from "./VendorBox";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ShortCut from "../layout/ShortCut";
function Vendors() {
  const { vendor, error } = useSelector((state) => state.vendor);

  const dispatch = useDispatch();
  const location = useLocation();
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
    const vendorName = queryParams.get("vendorName");
    dispatch(AllVendor(vendorName));
  }, [dispatch, location.search, navigator, error]);

  return (
    <ShortCut>
      <div
        className="FullContainer"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div to className="AllVendors">
          {vendor &&
            vendor.map((element, index) => (
              <VendorBox key={index} element={element} image={index % 10} />
            ))}
          {vendor && vendor.length === 0 && <h2> Vendor list is empty</h2>}
        </div>
      </div>
    </ShortCut>
  );
}

export default Vendors;
