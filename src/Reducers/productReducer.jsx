import { ADD_FAIL, ADD_REQUEST, ADD_SUCCESS, ALL_CATAGORY_FAIL, ALL_CATAGORY_REQUEST, ALL_CATAGORY_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_VENDOR_FAIL, ALL_VENDOR_REQUEST, ALL_VENDOR_SUCCESS, CLEAR_ERRORS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, EMPTY_FAIL, EMPTY_REQUEST, EMPTY_SUCCESS, LARGEST_SOLD_FAIL, LARGEST_SOLD_REQUEST, LARGEST_SOLD_SUCCESS, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS, SINGLE_VENDOR_FAIL, SINGLE_VENDOR_REQUEST, SINGLE_VENDOR_SUCCESS, UPDATE_PAYMENTS_FAIL, UPDATE_PAYMENTS_REQUEST, UPDATE_PAYMENTS_SUCCESS } from "../Constants/productConstant";

export const ProductReducer=(state={product:[]},action)=>{
        switch(action.type){
            case ALL_PRODUCT_REQUEST:
                return{
                    loading : true,
                    product:[]
                }
            case ALL_PRODUCT_SUCCESS:
                return{
                    loading:false,
                    product:action.payload.product
                }
            case ALL_PRODUCT_FAIL:
                return{
                    loading:false,
                    error:action.payload
                }
            case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
            default:
                return state
        }
}

export const singleProductRecuder=(state = { product: {} },action)=>{
    switch(action.type){
        case SINGLE_PRODUCT_REQUEST:
        case EMPTY_REQUEST:
        case ADD_REQUEST:
            return{
                loading : true,
                product:{}
            }
        case SINGLE_PRODUCT_SUCCESS:
        case EMPTY_SUCCESS:
        case ADD_SUCCESS:
            return{
                loading:false,
                product:action.payload
            }
        case SINGLE_PRODUCT_FAIL:
        case EMPTY_FAIL:
        case ADD_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}


export const CatagoryReducer=(state={catagory:[]},action)=>{
    switch(action.type){
        case ALL_CATAGORY_REQUEST:
            return{
                loading : true,
                catagory:[]
            }
        case ALL_CATAGORY_SUCCESS:
            return{
                loading:false,
                catagory:action.payload
            }
        case ALL_CATAGORY_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}
export const VendorReducer=(state={catagory:[]},action)=>{
    switch(action.type){
        case ALL_VENDOR_REQUEST:
            return{
                loading : true,
                catagory:[]
            }
        case ALL_VENDOR_SUCCESS:
            return{
                loading:false,
                vendor:action.payload.vendor
            }
        case ALL_VENDOR_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}
export const largestSoldProductReducer=(state={product:[]},action)=>{
    switch(action.type){
        case LARGEST_SOLD_REQUEST:
            return{
                loading:true,
                product:[],
            }
        case LARGEST_SOLD_SUCCESS:
            return{
                loading:false,
                product:action.payload.products
            }
        case LARGEST_SOLD_FAIL:
            return {
                loading:false,
                error:action.error
            }
        default:
            return state
    }
}

export const VendorDetails=(state={vendor:{}},action)=>{
    switch(action.type){
        case SINGLE_VENDOR_REQUEST:
            return {
                loading:true,
                vendor:{}
            }
        case SINGLE_VENDOR_SUCCESS:
            return {
                loading:false,
                vendor:action.payload
            }
        case SINGLE_VENDOR_FAIL:
            return{
                loading:false,
                vendor:action.error
            }
        default:
            return state
    }
}

export const UpdatePayments=(state={vendor:{}},action)=>{
    switch(action.type){
        case UPDATE_PAYMENTS_REQUEST:
            return {
                loading:true,
                vendor:{}
            }
        case UPDATE_PAYMENTS_SUCCESS:
            return {
                loading:false,
                vendor:action.payload
            }
        case UPDATE_PAYMENTS_FAIL:
            return{
                loading:false,
                vendor:action.error
            }
        default:
            return state
    }
}

export const createProductReducer=(state={product:{}},action)=>{
    switch(action){
        case CREATE_PRODUCT_REQUEST:
            return{
                loading:true,
                product:{}
            }
        case CREATE_PRODUCT_SUCCESS:
            return{
                loading:false,
                product:action.payload
            }
        case CREATE_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.error
            }
        default:
            return state
    }
}


export const editProductReducer=(state={product:{}},action)=>{
    switch(action){
        case EDIT_PRODUCT_REQUEST:
            return{
                loading:true,
                product:{}
            }
        case EDIT_PRODUCT_SUCCESS:
            return{
                loading:false,
                product:action.payload.prod
            }
        case EDIT_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.error
            }
        default:
            return state
    }
}