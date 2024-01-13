import axios from "../axios_in"
import { FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../Constants/userConstants"
import { CLEAR_ERRORS } from "../Constants/productConstant";
import toast from "react-hot-toast";
export const userLogin=(GivenData)=>async(dispatch)=>{
    try {
        dispatch({type:LOGIN_USER_REQUEST})
        // const port="http://localhost:80";
        const config={
            headers:{"Content-Type": "application/json"},
            withCredentials: true,
        }
        const {data} = await axios.post(`/api/login`,GivenData,config);
        // console.log(data)
        localStorage.setItem("UserToken",data.token)
        localStorage.setItem("UserName",data.user.name)
        dispatch({type:LOGIN_USER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
    }
}
export const loadUser=()=>async(dispatch)=>{
    try {
        // const port="http://localhost:80";
        dispatch({type:LOAD_USER_REQUEST})
        const {data} = await axios.get(`/api/me`);
        dispatch({type:LOAD_USER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:LOAD_USER_FAIL,
        payload:error.response.data.message})
    }
}

export const logout=()=>async(dispatch)=>{
    try {
        // const port="http://localhost:80";
        const {data}=await axios.post(`/api/logout`);
        // console.log(data)
        localStorage.removeItem("UserToken")
        localStorage.removeItem("UserName")
        dispatch({type:LOGOUT_USER_SUCCESS})
    } catch (error) {
        dispatch({type:LOGOUT_USER_FAIL,
        payload:error.response.data.message})
    }
}

// Register
export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config={
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
    }
  
    const { data } = await axios.post(`/api/register`, userData, config);
    // console.log(data)
    localStorage.setItem("UserToken",data.token)
    localStorage.setItem("UserName",data.user.name)
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };


  //forget password
  export const forgetPassword = (email) => async (dispatch) => {
    try {
      dispatch({ type: FORGET_PASSWORD_REQUEST });
      const config={
        headers:{"Content-Type": "application/json"},
        withCredentials: true,
    }
    // console.log("elo")
    const { data } = await axios.post(`/api/password/forgot`,{email},config);
    // console.log(data)


      dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data });
      toast.success(data.message)
    } catch (error) {
      dispatch({
        type: FORGET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message)
    }
  };

//reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearError=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}