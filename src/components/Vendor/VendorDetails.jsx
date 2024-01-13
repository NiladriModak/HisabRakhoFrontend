import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { UpdatePayments, getSingleVendor } from '../../actions/productActions';
import {  useParams } from 'react-router-dom';
// import img11 from "../../img11";
import "./VendorDetails.css";
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import Sidebar from '../user/Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import  { toast } from 'react-hot-toast';
import { clearError } from '../../actions/userAction';
function VendorDetails() {

    const [addPaid,setaddPaid] =useState(0);
    const [Click, setClick] = useState(window.screen.width>600);
    const [openPayDialog, setOpenPayDialog] = React.useState(false);
    const [openRecordDialog,setOpenRecordDialog] = useState(false);
    const handleClickOpenPayDialog = () => {
        setOpenPayDialog(true);
      };
    
    const handleClosePayDialog = () => {
        setOpenPayDialog(false);
    };
    const handleClickOpenRecordDialog = () => {
      setOpenRecordDialog(true);
    };
  
    const handleCloseReocordDialog = () => {
        setOpenRecordDialog(false);
    };
    const submitHandler=()=>{
        setClick(!Click)
    }
    
    const dispatch=useDispatch();
    const params=useParams();
    const {vendor,error} = useSelector((state)=>state.vendorDetails)

    useEffect(() => {
      if(!localStorage.getItem("UserToken")){
        navigator("/Login")
      }
      if(error && !localStorage.getItem("UserToken")){
        toast.error(error);
        dispatch(clearError())
      }
      dispatch(getSingleVendor(params.id))
    }, [dispatch,error,params.id])
    


    const handlePayStock= async()=>{
        const myForm = new FormData();
        if(!addPaid){
          toast.error("Enter something")
          return ;
        }
        if(vendor.DueAmt<addPaid){
          toast.error("Enter correct amount")
          return ;
        }
        myForm.set("paid", Number(addPaid));

        await dispatch(UpdatePayments(params.id,myForm))
        setOpenPayDialog(false);
        window.location.reload();//to reload window
      }


  return (
    <div className='FullContainer'>
        <ViewHeadlineIcon fontSize='large' onClick={submitHandler}/>
            {Click&&<Sidebar />}
        <div>
            <div>
                <h2>Vendor's Name</h2>
                <p>{vendor.vendorName}</p>
            </div>
            <div>
                <h2>Vendor's Id</h2>
                <p>{vendor._id}</p>
            </div>
            <div>
                <h2>Vendor's Due Amount</h2>
                <p>{vendor.DueAmt}</p>
            </div>
            <div>
                <h2>Payment Details</h2>
                <button onClick={handleClickOpenRecordDialog}>Payment History Of {vendor.vendorName}</button>
                <Dialog open={openRecordDialog} onClose={handleCloseReocordDialog}>
                  <DialogTitle>Payment Details:-{vendor.vendorName}</DialogTitle>
                    <DialogContent>
                    {
                        vendor && vendor.Record &&vendor.Record.map(item=>(
                          <h3>{item[0]} Date on {item[1].substr(8,2)}/{item[1].substr(5,2)}/{item[1].substr(0,4)}</h3>
                        ))
                      }
                    </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseReocordDialog}>Cancel</Button>
                    {/* <Button onClick={handlePayStock}>Pay</Button> */}
                  </DialogActions>
                </Dialog>
            </div>
            <div>
                <h2>Make Payment</h2>
                <button onClick={handleClickOpenPayDialog}>Pay {vendor.vendorName}</button>
                <Dialog open={openPayDialog} onClose={handleClosePayDialog}>
                <DialogTitle>Pay {vendor.vendorName}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Enter the amount tp be paid
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="paid"
                      label="paid"
                      type="Number"
                      variant="standard"
                      onChange={(e) => setaddPaid(e.target.value>=0?Number(e.target.value):0)}
                      min={0}
                    />
                    
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClosePayDialog}>Cancel</Button>
                    <Button onClick={handlePayStock}>Pay</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
        <div>
            <img src='/img11' alt='hi' style={{"width":"25vmax"}}/>
        </div>

    </div>
    
  )
}

export default VendorDetails
