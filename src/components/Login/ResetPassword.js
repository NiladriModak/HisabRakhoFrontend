import React, { Fragment, useEffect, useState } from 'react'
import Loading from '../layout/Loading'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, resetPassword } from '../../actions/userAction';

function ResetPassword() {
  const dispatch = useDispatch();
  const navigator=useNavigate();
  const alert = useAlert();
  const params=useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigator("/login");
    }
  }, [dispatch,  toast, navigator, success]);
  return (
    <Fragment>
      {/* {loading ? (
        <Loading />
      ) : ( */}
        <Fragment>
          {/* <MetaData title="Change Password" /> */}
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  {/* <LockOpenIcon /> */}
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  {/* <LockIcon /> */}
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      {/* ) */}
      {/* } */}
    </Fragment>
  )
}

export default ResetPassword
