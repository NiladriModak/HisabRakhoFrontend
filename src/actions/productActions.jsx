import { ADD_FAIL, ADD_REQUEST, ADD_SUCCESS, ALL_CATAGORY_FAIL, ALL_CATAGORY_REQUEST, ALL_CATAGORY_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_VENDOR_FAIL, ALL_VENDOR_REQUEST, ALL_VENDOR_SUCCESS, CLEAR_ERRORS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EMPTY_FAIL, EMPTY_REQUEST, EMPTY_SUCCESS, LARGEST_SOLD_FAIL, LARGEST_SOLD_REQUEST, LARGEST_SOLD_SUCCESS, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS, SINGLE_VENDOR_FAIL, SINGLE_VENDOR_REQUEST, SINGLE_VENDOR_SUCCESS } from "../Constants/productConstant";
import axios from "../axios_in"
// import axios from "axios"
export const getProduct=(keyword = "",category)=>async(dispatch)=>{
    try{
        const port="http://localhost:80";
        dispatch({type: ALL_PRODUCT_REQUEST});
        const config={
            headers:{
                "Content-Type": "application/json",
                // "Cookie": `token=${localStorage.getItem("UserToken")}`
            },
            withCredentials: true,
        }
        let link = `/api/allProducts?keyword=${keyword}`;

        if (category) {
            link = `/api/allProducts?keyword=${keyword}&&catagory=${category}`;
        }
        const {data} = await axios.get(link,config);
        // console.log("The all product user action  - ",data)
        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data});
    }catch(error){
        dispatch({type:ALL_PRODUCT_FAIL,payload:error.response.data.message,})
    }
}




export const getSingleProductDetails=(id)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type: SINGLE_PRODUCT_REQUEST});
        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.get(`/api/product/${id}`,config)
        // console.log("single",data)
        dispatch({type:SINGLE_PRODUCT_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:SINGLE_PRODUCT_FAIL,payload:error.response.data.message,})
    }
}

export const AddStock=(GivenData,id)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type: ADD_REQUEST});

        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.put(`/api/product/${id}/AddStock`,GivenData,config)

        dispatch({type:ADD_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:ADD_FAIL,payload:error.response.data.message,})
    }
}


export const EmptyStock=(GivenData,id)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type: EMPTY_REQUEST});

        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.put(`/api/product/${id}/EmptyStock`,GivenData,config)

        dispatch({type:EMPTY_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:EMPTY_FAIL,payload:error.response.data.message,})
    }
}

export const AllCatagory=(keyword="")=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type: ALL_CATAGORY_REQUEST});

        const config={
            headers:{"Content-Type": "application/json",
                // 'Cookie': `token=${localStorage.getItem("UserToken")}`
            },
            withCredentials: true,
        }

        const {data} = await axios.get(`/api/allCatagory`,config)
        
        let tobesend=data.p;

        const filteredCategories = tobesend.filter(category =>
            category.toLowerCase().includes(keyword.toLowerCase())
          );

        dispatch({type:ALL_CATAGORY_SUCCESS,payload:filteredCategories});
    } catch (error) {
        dispatch({type:ALL_CATAGORY_FAIL,payload:error.response.data.message,})
    }
}

export const getLargestSoldProduct=()=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type: LARGEST_SOLD_REQUEST});
        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.get(`/api/largestSalingProduct`,config)

        dispatch({type:LARGEST_SOLD_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:LARGEST_SOLD_FAIL,payload:error.response.data.message,})
    }
        
}

export const AllVendor=(vendorName)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type: ALL_VENDOR_REQUEST});

        const config={
            headers:{"Content-Type": "application/json",
            // 'Cookie': `token=${localStorage.getItem("UserToken")}`
        },
            withCredentials: true,
        }

        let link = `/api/allVendor`;
        if (vendorName) {
            link = `/api/allVendor?vendorName=${vendorName}`;

        }
        const {data} = await axios.get(link,config);

        dispatch({type:ALL_VENDOR_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:ALL_VENDOR_FAIL,payload:error.response.data.message,})
    }
}

export const getSingleVendor=(id)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type:SINGLE_VENDOR_REQUEST})
        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.get(`/api/allVendor/${id}`,config)
        dispatch({type:SINGLE_VENDOR_SUCCESS,payload:data.vendor})
    } catch (error) {
        dispatch({type:SINGLE_VENDOR_FAIL,payload:error.response.data.message})
    }
}

export const UpdatePayments=(id,GivenData)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type:SINGLE_VENDOR_REQUEST})
        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.put(`/api/allVendor/${id}/updatePayment`,GivenData,config)
        dispatch({type:SINGLE_VENDOR_SUCCESS,payload:data.vendor})
    } catch (error) {
        dispatch({type:SINGLE_VENDOR_FAIL,payload:error.response.data.message})
    }
}

export const createProduct=(GivenData)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type:CREATE_PRODUCT_REQUEST});
        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.post(`/api/create`,GivenData,config)

        dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data.product}) 
    } catch (error) {
        dispatch({type:CREATE_PRODUCT_FAIL,payload:error.response.data.message})
    }

}


export const editProduct=(GivenData,id)=>async(dispatch)=>{
    try {
        const port="http://localhost:80";
        dispatch({type:EDIT_PRODUCT_REQUEST});
        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.put(`/api/product/${id}`,GivenData,config)

        dispatch({type:EDIT_PRODUCT_SUCCESS,payload:data.product}) 
    } catch (error) {
        dispatch({type:EDIT_PRODUCT_FAIL,payload:error.response.data.message})
    }

}

export const clearError=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}