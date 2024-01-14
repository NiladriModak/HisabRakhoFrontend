import React, { Fragment, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import "./Header.css"
import { AllCatagory, AllVendor, createProduct, getProduct } from '../../actions/productActions';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useAlert } from 'react-alert';
import LogoutIcon from '@mui/icons-material/Logout';
import  { toast,Toaster } from 'react-hot-toast';
import { logout } from '../../actions/userAction';
import Autocomplete from '@mui/material/Autocomplete';

function Header() {
  


  const dispatch=useDispatch();
  // const alert=useAlert();
  const location = useLocation();
  const navigator=useNavigate();
  // const { isAuthenticated, user } = useSelector((state) => state.loginUser);
  const[VendorName,setVendorName]=useState("");
  const[ProductName,setProductName]=useState("");
  const[ProductPrice,setProductPrice]=useState(0);
  const[ProductCatagory,setProductCatagory]=useState("");
  const[ProductQuantity,setProductQuantity]=useState(0);
  const submit=(e)=>{
    const queryString = location.search;
    const queryParams = new URLSearchParams(queryString);
    const catagory = queryParams.get('catagory');
    const vendorName = queryParams.get('vendorName');
    if(location.pathname === "/allProduct")
    dispatch(getProduct(e,catagory));
    else if(location.pathname === "/allCatagories")
    dispatch(AllCatagory(e))
    else if(location.pathname === "/allVendors")
    dispatch(AllVendor(e))
  }
  const {catagory , error:catagoryError} = useSelector((state)=>state.catagory)
  const {vendor , error:VendorError} =useSelector((state)=>state.vendor)
  useEffect(() => {
    if(localStorage.getItem("UserToken")){
      
    
    if(catagoryError||VendorError){
      if(catagoryError)
      toast.error(catagoryError)
      if(VendorError)
      toast.error(VendorError)
    }
    dispatch(AllCatagory())
    dispatch(AllVendor(""))
    const queryString = location.search;
    const queryParams = new URLSearchParams(queryString);
    const catagory = queryParams.get('catagory');
    const vendorName = queryParams.get('vendorName');
    if(location.pathname === "/allProduct"){
      dispatch(getProduct("",catagory));
    }
    else if(location.pathname === "/allCatagories"){
      dispatch(AllCatagory())
    }
    else if(location.pathname === "/allVendors"){
      dispatch(AllVendor(vendorName))
    }
  }
    
  }, [dispatch,location.pathname,location.search,catagoryError,VendorError]);
  
  const [onclick,setonclick] = useState(false);
  const createSubmitHandler=()=>{
    setonclick(true);
  }
  const closeCreateHandler=()=>{
    setonclick(false);
  }


  const { error: createerror } = useSelector(state => state.createProduct);
  const createProductHandler=async ()=>{
    const myForm=new FormData();
    // console.log("name",VendorName,"name",ProductCatagory,"name",ProductName,"name",ProductPrice,"name",ProductQuantity)
    if(VendorName!==""&&ProductName!==""&&ProductCatagory!==""&&ProductPrice!==0&&ProductQuantity!==0){
      myForm.set("vendorName",VendorName);
      myForm.set("name",ProductName);
      myForm.set("catagory",ProductCatagory);
      myForm.set("quantity",ProductQuantity);
      myForm.set("price",ProductPrice);
      await dispatch(createProduct(myForm))
      if(!createerror)
      toast.success("Product Created Successfully")
      setonclick(false)
      window.location.reload();
    }else{
      toast.error("You Must Enter All Details");
    }
  }
  
  const logoutHandler=()=>{
    dispatch(logout())
    localStorage.removeItem("customer")
    navigator("/Login")
  }
  const loc=location.pathname==="/Login"||location.pathname==="/signUp"


  
  // console.log(catagory," + + + ",vendor)

  return (
    <Fragment >
      
      <div className='Header' style={loc ? { display: 'none' } : {}}>
        <div className='Icon'>
          HISAB RAKHO
        </div>
        <TextField className='TextBoxHeader'
          label="Search input"
          onChange={(e)=>submit(e.target.value)}
        />
        
        <div>
        
        <button onClick={createSubmitHandler} className='HeaderBtn'>
          +Create
        </button>
        <Dialog open={onclick} onClose={closeCreateHandler}>
                <DialogTitle>Create a new Product</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Enter Vendor's Name
                    </DialogContentText>
                    <Autocomplete
                      id="VendorName"
                      freeSolo
                      value={VendorName}
                      style={{"width":"28vmax"}}
                      onChange={(event, newValue) => setVendorName(newValue)}
                      options={vendor&&vendor.map((option) => option.vendorName)}
                      renderInput={(params) => <TextField {...params} onChange={(e) => setVendorName(e.target.value)}/>}

                    />
                    <DialogContentText>
                      Enter Product Name
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="ProductName"
                      style={{"width":"28vmax"}}
                      type="String"
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <DialogContentText>
                      Enter price
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="Price"
                      style={{"width":"28vmax"}}
                      type="Number"
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                    <DialogContentText>
                      Enter Catagory
                    </DialogContentText>
                   
                    <Autocomplete
                      id="catagory"
                      freeSolo
                      style={{"width":"28vmax"}}
                      value={ProductCatagory}
                      onChange={(event, newValue) => setProductCatagory(newValue)}
                      options={catagory&&catagory.map((option) => option)}
                      renderInput={(params) => <TextField {...params}  onInput={(e)=>setProductCatagory(e.target.value)}/>}

                    />
                    
                    <DialogContentText>
                      Enter Quantity
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="Quantity"
                      type="Number"
                      style={{"width":"28vmax"}}
                      onChange={(e)=>setProductQuantity(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeCreateHandler}>Cancel</Button>
                  <Button onClick={createProductHandler}>Create</Button>
                </DialogActions>
              </Dialog>
        </div>
        <Link to={localStorage.getItem("UserToken")?"/dashboard":"/Login"} className='ProfileIconDiv'>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </Link>
          <LogoutIcon className='Logout' style={!localStorage.getItem("UserToken")?{"display":"none"}:{}} onClick={logoutHandler} sx={{ fontSize: 40 }}/>

      </div>
    </Fragment>
  )
}

export default Header
