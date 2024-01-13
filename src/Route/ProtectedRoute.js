import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import Loading from '../components/layout/Loading';


const ProtectedRoute = () => {
  const {  loading } = useSelector((state) => state.loginUser);

  if (loading) {
    return <Loading />;
  }

  if (!localStorage.getItem("UserToken")) {
    // console.log("Redirect to the login page if the user is not authenticated");
    return <Navigate to="/Login" />;
  }

  // console.log("If none of the above conditions are met, render the child components");
  return <Outlet />;
};

export default ProtectedRoute;
