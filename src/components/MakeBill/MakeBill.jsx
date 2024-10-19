import React, { useEffect, useState, useRef } from "react";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Sidebar from "../user/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./BillBox.css";
import "./makeBill.css";
import { AddStock, EmptyStock, getProduct } from "../../actions/productActions";
import BillBox from "./BillBox";
import toast from "react-hot-toast";
import ShortCut from "../layout/ShortCut";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../actions/userAction";
import { Button } from "@mui/material";

function MakeBill() {
  const dispatch = useDispatch();
  const [Click, setClick] = useState(window.screen.width > 600);
  const [Product, setProduct] = useState("");
  const [Quantity, setQuantity] = useState(0);
  const [Price, setPrice] = useState(0);
  const { product } = useSelector((state) => state.product);
  const [Bill, setBill] = useState([]);
  const [customerName, setcustomerName] = useState("");
  const pdfContentRef = useRef();
  var tot = 0;
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.loginUser
  );
  const navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      if (error) {
        toast.error(error);
        dispatch(clearError());
      }
      dispatch(getProduct("", ""));
      const myArray = localStorage.getItem("Bill");
      const myArray1 = JSON.parse(myArray) || [];
      setBill(myArray1);
    }
  }, [dispatch, error]);

  const submitHandler = () => {
    setClick(!Click);
  };

  const billSubmit = () => {
    if (!Product || !Quantity || !Price) {
      return;
    }
    dispatch(getProduct("", ""));
    let pid = 0;
    let isPoss = 0;
    for (let i = 0; i < product.length; i++) {
      if (product[i].name === Product) {
        pid = product[i]._id;
        if (product[i].quantity < Quantity) {
          toast.error(`Stock over, you have only ${product[i].quantity}`);
          isPoss = 1;
          return;
        }
      }
    }
    if (isPoss === 0) {
      const billing = {
        Product: Product,
        Quantity: Quantity,
        Price: Price,
      };
      const myForm = new FormData();
      myForm.set("substractProduct", Number(Quantity));
      myForm.set("productId", pid);
      dispatch(EmptyStock(myForm, pid));
      const prevBill = [...Bill, billing];
      setBill(prevBill);
      dispatch(getProduct("", ""));
      const newBill = JSON.stringify(prevBill);
      localStorage.setItem("Bill", newBill);
    }
    setPrice(0);
    setQuantity(0);
    setProduct("");
  };

  //pdf
  const generatePdf = () => {
    const pdfContent = pdfContentRef.current;

    // Adjust the scale to better capture the content
    const scale = 2; // You can increase/decrease the scale to improve resolution
    const options = {
      scale: scale, // Scale up to improve image quality
      useCORS: true, // Use CORS to handle cross-origin issues if necessary
    };

    html2canvas(pdfContent, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Calculate the content dimensions and page size
      const contentWidth = canvas.width / scale;
      const contentHeight = canvas.height / scale;

      // Standard page sizes: jsPDF supports 'pt' (points)
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Check if content fits on one page, otherwise scale it down
      let ratio = Math.min(
        pageWidth / contentWidth,
        pageHeight / contentHeight
      );
      let imgWidth = contentWidth * ratio;
      let imgHeight = contentHeight * ratio;

      // Add the image to the PDF with adjusted dimensions
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      // Save the generated PDF
      pdf.save("bill.pdf");
    });
  };

  const deleteHandler = (index) => {
    const To_Update = Bill.filter((item, i) => i === index);
    const updatedBill = Bill.filter((item, i) => i !== index);
    setBill(updatedBill);

    const newBill = JSON.stringify(updatedBill);
    localStorage.setItem("Bill", newBill);

    const myForm = new FormData();
    myForm.set("addProduct", Number(To_Update[0].Quantity));

    let pid = 0;

    for (let i = 0; i < product.length; i++) {
      if (product[i].name === To_Update[0].Product) {
        pid = product[i]._id;
      }
    }

    myForm.set("productId", pid);
    dispatch(AddStock(myForm, pid));
    dispatch(getProduct("", ""));
  };

  const changeEvent = (e) => {
    const updatedCustomerName = e.target.value;
    setcustomerName(updatedCustomerName);
    localStorage.setItem("customer", updatedCustomerName);
  };
  // const submitResetConfirmButton = () => {
  //   setBill([]);
  //   setPrice(0);
  //   setQuantity(0);
  //   localStorage.removeItem("Bill");
  // };
  // const resetHandler = () => {
  //   console.log("come");

  //   return (
  //     <div>
  //       <h1> Are you sure you want to reset</h1>
  //       <Button type="contained" onClick={() => submitResetConfirmButton}>
  //         Reset
  //       </Button>
  //     </div>
  //   );
  // };
  const [showConfirm, setShowConfirm] = useState(false); // For showing confirmation dialog

  const submitResetConfirmButton = () => {
    setBill([]); // Reset the bill
    setPrice(0); // Reset the price
    setQuantity(0); // Reset the quantity
    localStorage.removeItem("Bill"); // Remove the bill from localStorage
    setShowConfirm(false); // Hide the confirmation dialog after resetting
  };

  const resetHandler = () => {
    setShowConfirm(true); // Show the confirmation dialog
  };

  const generatePdfContent = () => (
    <div className="FullContainerDiv" ref={pdfContentRef}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "12px",
        }}
      >
        <TextField
          style={{ width: "22vmax" }}
          defaultValue={localStorage.getItem("customer")}
          onChange={changeEvent}
          value={customerName}
          placeholder="Enter name of customer"
        />
      </div>

      <div className="Entry">
        <Autocomplete
          id="Product"
          freeSolo
          style={{ width: "18vmax", scrollbarWidth: "2px" }}
          value={Product}
          onChange={(event, newValue) => setProduct(newValue)}
          options={product && product.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Product Name"
              onInput={(e) => setProduct(e.target.value)}
            />
          )}
        />
        <p>Qty</p>
        <TextField
          style={{ width: "15vmax" }}
          value={Quantity}
          type="Number"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <p>Rate</p>
        <TextField
          style={{ width: "15vmax" }}
          value={Price}
          type="Number"
          defaultValue={0}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="BtnAdd" onClick={billSubmit}>
          ADD
        </button>
      </div>

      <div>
        <h2>
          Bill of{" "}
          {customerName ? customerName : localStorage.getItem("customer")}
        </h2>
        <div>
          <div className="BillBoxContainer">
            <div className="TableCell">Qty</div>
            <div className="TableCell">Product</div>
            <div className="TableCell">Price</div>
            <div className="TableCell">Total</div>
            <div className="TableCell">Delete</div>
          </div>
          {Bill.length > 0 &&
            Bill.map((item, index) => {
              tot += parseFloat(item.Quantity) * parseFloat(item.Price);
              return (
                <BillBox
                  key={index}
                  item={item}
                  index={index}
                  onDelete={deleteHandler}
                />
              );
            })}
          <h2>Total Amount To Be Paid = {tot}</h2>
        </div>
      </div>
    </div>
  );

  return (
    <ShortCut>
      <div className="FullContainer">
        {/* <ViewHeadlineIcon fontSize='large' onClick={() => setClick(!Click)} />
      {Click && <Sidebar />} */}

        <div>
          {generatePdfContent()}

          <button className="pdfBtn" onClick={generatePdf}>
            Download PDF
          </button>
          <div>
            <button className="resetBtn" onClick={resetHandler}>
              Reset Bill
            </button>
          </div>
          {showConfirm && (
            <div>
              <h1>Are you sure you want to reset?</h1>
              <Button
                variant="contained"
                onClick={submitResetConfirmButton}
                style={{ marginRight: "4px" }} // Correct function call
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowConfirm(false)} // To cancel reset
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </ShortCut>
  );
}

export default MakeBill;
