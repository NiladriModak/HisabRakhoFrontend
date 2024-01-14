import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddStock, AllCatagory, AllVendor, EmptyStock, clearError, editProduct, getProduct, getSingleProductDetails } from '../actions/productActions';
import Sidebar from './user/Sidebar';
import "./ProductDetails.css"
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import Loading from './layout/Loading';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function ProductDetails() {
  const {product,loading,error} = useSelector((state)=>state.singleProduct)
  const [open, setOpen] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openRecordDialog, setOpenRecordDialog] = React.useState(false);
  const [addProduct,setaddProduct] =useState(0);
  const [addProductAmt,setaddProductAmt] =useState(0);
  const [substractProduct,setsubstractProduct] =useState(0);
  // const [record,setRecord] = useState([]);
  // const[VendorName,setVendorName]=useState("");
  const[ProductName,setProductName]=useState("");
  const[ProductPrice,setProductPrice]=useState(0);
  const[ProductCatagory,setProductCatagory]=useState("");
  // const[ProductQuantity,setProductQuantity]=useState(0);

  //Record
  const handleClickOpenRecordDialog = () => {
    // setRecord(product.Record)
    setOpenRecordDialog(true);
  };

  const handleCloseRecordDialog = () => {
    setOpenRecordDialog(false);
  };
  //Add Stock
  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  //Substarct stock
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // router dom compnents
  const params=useParams();
  const dispatch=useDispatch();

  //add stock handler
  const handleAddStock=async ()=>{
    const myForm = new FormData();
    if(!addProduct){
      toast.error("Enter something")
      return ;
    }
    
    myForm.set("addProduct", Number(addProduct));
    myForm.set("amount",Number(addProductAmt));

    myForm.set("productId", params.id);

    await dispatch(AddStock(myForm,params.id))

    setOpen(false);

    await dispatch(getSingleProductDetails(params.id))
    handleCloseAddDialog();
  }

  //Substract Stock handler
  const handleSubstractStock= async ()=>{
    const myForm = new FormData();

    if(!substractProduct){
      toast.error("Enter something")
      return ;
    }
    if(product.product.quantity<substractProduct){
      toast.error("Enter valid quantity")
      return ;
    }
    myForm.set("substractProduct", Number(substractProduct));

    myForm.set("productId", params.id);

    await dispatch(EmptyStock(myForm,params.id))
    setOpen(false);
    await dispatch(getSingleProductDetails(params.id))
    window.location.reload();
  }

  //Filter from state
  const {catagory,caterror=error} = useSelector((state)=>state.catagory)
  // const {vendor} =useSelector((state)=>state.vendor)
  const [editOpen,seteditOpen]=useState(false)

  //Edit box open close
  const editProductHandler=()=>{
    seteditOpen(true)
  }
  const handleCloseEdit=()=>{
    seteditOpen(false)
  }

  //edit handler
  const handleEditProductButton=async()=>{
    if(ProductName==="" && ProductCatagory==="" && ProductPrice===0){
      toast.error("Please enter the details to be updated")
      return ;
    }
    const myForm = new FormData();;
    myForm.set("name",ProductName||product.product?.name);
    myForm.set("catagory",ProductCatagory||product.product?.catagory);
    myForm.set("price",ProductPrice||product.product?.price);
    await dispatch(editProduct(myForm,params.id))
    await dispatch(getSingleProductDetails(params.id))
    handleCloseEdit();
  }
  // const navigator = useNavigate();

  //useEffect
  useEffect(() => {
    if(localStorage.getItem("UserToken")){
      //return navigator("/Login")
    
    if(caterror||error || !localStorage.getItem("UserToken")){
      toast.error(error);
      dispatch(clearError())
    }
    dispatch(getSingleProductDetails(params.id))
    dispatch(getProduct("",""));
    dispatch(AllCatagory())
    dispatch(AllVendor(""))
  }
  }, [dispatch,params.id,error,caterror])
  
  //SideBar Click
  const [Click, setClick] = useState(window.screen.width>600);
    const submitHandler=()=>{
        setClick(!Click)
    }


  return (
    <>
      {loading?<Loading/>:<div className='Container'>
      <ViewHeadlineIcon fontSize='large' onClick={submitHandler}/>
      {Click&&<Sidebar />}
      <div className='Box'>
        <div className='Details'>
          <div>
            <h1>Product Id</h1>
            <h3>{product.product?._id}</h3>
          </div>
          <div>
            <h1>Product Name:</h1>
            <h3>{product.product?.name}</h3>
          </div>
          <div>
            <h1>Catagory:</h1> 
            <h3>{product.product?.catagory}</h3>
          </div>
          <div>
            <h1>Quantity Available:</h1> 
            <h3>{product.product?.quantity}</h3>
          </div>
          <div>
            <h1>Weight:</h1>
            <h3>{product.product?.weight}</h3>
          </div>
          <div>
            <h1>Price:</h1> 
            <h3>{product.product?.price}</h3>
          </div>
        </div>


        <div className='Options'>
          <div className='AddProduct'>
          <button variant="outlined" onClick={handleClickOpenAddDialog}>Add to stock</button>
            <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
                <DialogTitle>Add Stock</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please Enter The Number Of Product To Be Added 
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="addProduct"
                      label="Add"
                      type="Number"
                      variant="standard"
                      onChange={(e) => setaddProduct(e.target.value>=0?Number(e.target.value):0)}
                      min={0}
                    />

                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="addProductAmt"
                      label="Add"
                      type="Number"
                      variant="standard"
                      onChange={(e) => setaddProductAmt(e.target.value>=0?Number(e.target.value):0)}
                      min={0}
                    />
                    
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAddDialog}>Cancel</Button>
                  <Button onClick={handleAddStock}>Add</Button>
                </DialogActions>
              </Dialog>
          </div>



            <div className='EmptyProduct'>
              <button variant="outlined" onClick={handleClickOpen}>Empty stock</button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Empty Stock</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please Enter The Number Of Product To Be Removed
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="substractProduct"
                      label="Substract"
                      type="Number"
                      variant="standard"
                      onChange={(e) => setsubstractProduct(e.target.value>=0?Number(e.target.value):0)}
                      min={0}
                    />
                    
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubstractStock}>Remove</Button>
                </DialogActions>
              </Dialog>
          </div>


          <div className='Record'>
            <button variant="outlined" onClick={handleClickOpenRecordDialog}>Record</button>
            <Dialog open={openRecordDialog} onClose={handleCloseRecordDialog}>
                <DialogTitle>Total Record Of Adding and Removing Quantity</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {
                        product.product && product.product.Record.map(item=>(
                          <h3>{item[0]} Date on {item[1].substr(8,2)}/{item[1].substr(5,2)}/{item[1].substr(0,4)}</h3>
                        ))
                      }
                    </DialogContentText>
                    
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseRecordDialog}>Cancel</Button>
                </DialogActions>
              </Dialog>

          </div>



          <div className='Edit Prouduct'>
            <button onClick={editProductHandler}>Edit Product</button>
              <Dialog open={editOpen} onClose={handleCloseEdit}>
                <DialogTitle>Enter the necessary feilds</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Update Product Name
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="editProductName"
                      label="edit"
                      type="String"
                      variant="standard"
                      onChange={(e) =>setProductName(e.target.value) }
                    />
                    <DialogContentText>
                      Update Product Price
                    </DialogContentText>
                    <input
                      className='DialogInputFeild'
                      autoFocus
                      margin="dense"
                      id="editProductPrice"
                      label="edit"
                      type="Number"
                      variant="standard"
                      onChange={(e) =>setProductPrice(e.target.value) }
                    />
                    <DialogContentText>
                      Update Product Catagory
                    </DialogContentText>
                    <Autocomplete
                      id="catagory"
                      freeSolo
                      style={{"width":"28vmax"}}
                      value={ProductCatagory}
                      onChange={(event, newValue) => setProductCatagory(newValue)}
                      options={catagory&&catagory.map((option) => option)}
                      renderInput={(params) => <TextField {...params} onChange={(e) =>setProductCatagory(e.target.value)} />}

                    />
                    </DialogContent>
                  <DialogActions>
                  <Button onClick={handleCloseEdit}>Cancel</Button>
                  <Button onClick={handleEditProductButton}>Edit</Button>
                </DialogActions>
              </Dialog>
          </div>
        </div>
      </div>
    </div>}
    </>
    
    
  )
}

export default ProductDetails
