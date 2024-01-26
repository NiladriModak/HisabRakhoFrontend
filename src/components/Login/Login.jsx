import React, { useEffect, useState } from "react";
import "./Login.css";
// import img0  from "../../img0"
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, userLogin } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { toast, Toaster } from "react-hot-toast";
function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, error } = useSelector(
    (state) => state.loginUser
  );
  const loading = true;
  const alert = useAlert();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (localStorage.getItem("UserToken") && isAuthenticated) {
      navigate("/allProduct");
    }
    // console.log("from login.js auth = ",isAuthenticated)
  }, [dispatch, toast, error, isAuthenticated, navigate]);
  const submitHandler = async (event) => {
    const myForm = new FormData();
    // console.log(username,password)
    myForm.set("email", username);
    myForm.set("password", password);
    await dispatch(userLogin(myForm));
  };
  return (
    <div className="MainContainer">
      <div className="firstDiv">
        <img src="/img0" alt="hi" />
      </div>
      <div className="secDiv">
        <h2>This is inventory management website</h2>

        <h1>Hisab Rakkho App</h1>
        <div className="LoginBox">
          <h2>Login</h2>
          <h3>Enter the Username</h3>
          <div>
            <input
              type="email"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <h3>Enter the Password</h3>
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to={"/forgetPassword"}>Forget Password</Link>
          <Link to={"/signUp"}>Sign Up</Link>
          <div>
            <button onClick={(event) => submitHandler(event)}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
