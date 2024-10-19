import React, { useEffect, useState } from "react";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Sidebar from "../user/Sidebar";
function ShortCut({ children }) {
  const [onClick, setonClick] = useState(true);
  const submitHandler = () => {
    setonClick(!onClick);
  };
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        height: !isSmallScreen ? "100vh" : "auto",
        width: "100%",
        flexDirection: !isSmallScreen ? "row" : "column",
        // justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          width: isSmallScreen ? "95%" : "25%",
          height: "100%",
          margin: 0,
        }}
      >
        <ViewHeadlineIcon
          sx={{
            margin: "0.8 vmax",
            fontSize: "3vmax",
            display: isSmallScreen ? "flex" : "none",
          }}
          onClick={submitHandler}
        />
        {onClick && <Sidebar />}
      </div>
      <div style={{ width: isSmallScreen ? "100%" : "70%" }}>{children}</div>
    </div>
  );
}

export default ShortCut;
