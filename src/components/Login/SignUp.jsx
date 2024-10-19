import React, { useEffect, useState } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, register } from "../../actions/userAction";
import toast from "react-hot-toast";
function SignUp() {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.loginUser
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/allProduct");
    }
    // console.log("from signup.js auth = ",isAuthenticated)
  }, [dispatch, toast, error, isAuthenticated, navigate]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    setDisable(true);
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", username);
    myForm.set("password", password);
    console.log("hi1");
    await dispatch(register(myForm));
    console.log("hi3");

    toast.success("registered successfully");
    setDisable(false);
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
          <h2>Sign Up</h2>
          <h3>Enter the Name</h3>
          <div>
            <input onChange={(e) => setName(e.target.value)} />
          </div>
          <h3>Enter the Username</h3>
          <div>
            <input type="email" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <h3>Enter the Password</h3>
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to={"/Login"}>Login</Link>
          <div>
            <button
              disabled={disable}
              onClick={(event) => submitHandler(event)}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
