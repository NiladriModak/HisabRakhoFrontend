import React, { useEffect, useState } from "react";
import Sidebar from "./user/Sidebar";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { useDispatch, useSelector } from "react-redux";
import { AllCatagory } from "../actions/productActions";
import CatagoryBox from "./CatagoryBox";
import "./Catagories.css";
import ShortCut from "./layout/ShortCut";
function Catagories() {
  const [Click, setClick] = useState(window.screen.width > 600);
  const submitHandler = () => {
    setClick(!Click);
  };
  const { catagory } = useSelector((state) => state.catagory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllCatagory(""));
  }, [dispatch]);

  return (
    <ShortCut>
      <div className="FullContainer">
        <div to className="AllCat">
          {catagory &&
            catagory.map((element, index) => (
              <CatagoryBox key={index} catagory={element} image={index % 6} />
            ))}
          {catagory && catagory.length === 0 && <h2> No catagory to show</h2>}
        </div>
      </div>
    </ShortCut>
  );
}

export default Catagories;
