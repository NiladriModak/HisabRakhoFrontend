import { CLEAR_ERRORS, FORGET_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "../Constants/userConstants";

export const loginUser=(state={user:{}},action)=>{
    switch(action.type){
        case LOGIN_USER_REQUEST:
        case LOAD_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        // case FORGET_PASSWORD_REQUEST:
            return{
                loading:true,
                user:{},
                isAuthenticated:false,
            }
        case LOGIN_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
            return{
                loading:false,
                user:action.payload,
                isAuthenticated:true
            }
        // case FORGET_PASSWORD_SUCCESS:
        //     return{
        //         loading:false,
        //         message:action.payload
        //     }
        case LOGIN_USER_FAIL:
        case REGISTER_USER_FAIL:
        // case FORGET_PASSWORD_FAIL:
            return{
                loading:false,
                error:action.payload,
                isAuthenticated:false
            }
        case LOAD_USER_FAIL:
            return {
                loading:false,isAuthenticated:false,user:null,error:action.payload
            }
        case LOGOUT_USER_SUCCESS:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOGOUT_USER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return{
                state
            }
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGET_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FORGET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
  
      case FORGET_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };