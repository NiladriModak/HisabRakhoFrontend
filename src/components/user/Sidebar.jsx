import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import SellIcon from "@mui/icons-material/Sell";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="SideBarDiv">
      <div className="AllOptions">
        <Link to="/dashboard">
          <DashboardIcon />
          Dashboard
        </Link>
        <Link to="/allProduct">
          {" "}
          <InventoryIcon />
          Product
        </Link>
        <Link to="/allCatagories">
          <CategoryIcon />
          Catagories
        </Link>
        <Link to="/allVendors">
          <PersonIcon />
          Vendors
        </Link>
        <Link to="/makeBill">
          <SellIcon />
          Make Bill
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
