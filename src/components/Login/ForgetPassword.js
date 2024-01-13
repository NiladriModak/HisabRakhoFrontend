import React, { useState } from 'react'
import { useDispatch,} from 'react-redux'
import { forgetPassword } from '../../actions/userAction';


function ForgetPassword() {
  const [email, setemail] = useState('')
  const dispatch=useDispatch();
  // const {error,message} = useSelector((state)=>state.loginUser)
  
  
  const submiHandler=()=>{
    // console.log("email =",email)
    dispatch(forgetPassword(email));
    
  }
  return (
    <div style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center"}}>
      <h1>Forgot Password</h1>
      <div className='ForgetDiv' style={{"textAlign":"center"}}>
        <h2>Enter the registered email where the mail will be send </h2>
        <input style={{"height":"3vmax","width":"34vmax","padding":"2vmax","fontSize":"1.2rem"}} className='emailInputBox' placeholder='Enter the email' onChange={(e)=>setemail(e.target.value)} />
        <button style={{"padding":"2vmax","fontSize":"1.3rem"}}onClick={submiHandler}>Send email</button>
      </div>
    </div>
  )
}

export default ForgetPassword
