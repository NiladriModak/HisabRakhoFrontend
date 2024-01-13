// import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
// import Sidebar from './components/user/Sidebar';
import { HashRouter as Router,Route,Routes} from "react-router-dom";
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Catagories from './components/Catagories';
// import CatagoryBox from './components/CatagoryBox';
import Dashboard from './components/Dashboard/Dashboard';
import Vendors from './components/Vendor/Vendors';
import VendorDetails from './components/Vendor/VendorDetails';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
// import { useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import {store} from "./store"
import React from 'react';
import ProtectedRoute from './Route/ProtectedRoute';
import Home from './components/Home/Home';
// import Loading from './components/layout/Loading';
import MakeBill from './components/MakeBill/MakeBill';
import ForgetPassword from './components/Login/ForgetPassword';
import ResetPassword from './components/Login/ResetPassword';

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.loginUser);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // if (!isAuthenticated) {
    
  //   return null;
  // }

  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path='/forgetPassword' element={<ForgetPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>} />
        <Route
          element={<ProtectedRoute />}
        >
          {/* <Route path="/allProduct" element={<Products />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/makeBill" element={<MakeBill />} />
          <Route path="/allProduct" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/allCatagories" element={<Catagories />} />
          <Route path="/allVendors" element={<Vendors />} />
          <Route path="/allVendors/:id" element={<VendorDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
