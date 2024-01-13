import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import { CatagoryReducer, ProductReducer, UpdatePayments, VendorDetails, VendorReducer, createProductReducer, editProductReducer, largestSoldProductReducer, singleProductRecuder } from "./Reducers/productReducer";
import { forgotPasswordReducer, loginUser } from "./Reducers/userReducer";

const reducer=combineReducers({
    product: ProductReducer,
    singleProduct:singleProductRecuder,
    catagory:CatagoryReducer,
    largestSold:largestSoldProductReducer,
    vendor:VendorReducer,
    vendorDetails:VendorDetails,
    updatePayments:UpdatePayments,
    createProduct:createProductReducer,
    loginUser:loginUser,
    editProduct:editProductReducer,
    forgotPassword: forgotPasswordReducer,
});
let initialState={
};
const middleware = [thunk];
const store = createStore(
    reducer,
    
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export { store };
