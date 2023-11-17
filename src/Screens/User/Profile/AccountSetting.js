import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Profile.css";
import { changeUserPasswordAction,socketDisconnectAction,logoutUserAction } from '../../../Redux/Actions'
import swal from 'sweetalert';
import { useHistory, useParams } from "react-router-dom";
import info from '../../../Images/info_icon.svg';

export const AccountSetting = (props) => {
  const history = useHistory();
  let params = useParams();
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  //varibale declare
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const userLoginState = useSelector(state => state.userAuthReducer?.userLoginData);

  useEffect(() => {
    if (userLoginState?.data?.data?.user) {
      setEmail(userLoginState?.data?.data?.user?.email)
    }
  }, [userLoginState]);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let value = {
        "old_password": old_password,
        "new_password": new_password,
        "confirm_password": confirm_password
      }
      if (new_password !== confirm_password) {
        swal({
          title: "Error!",
          text: 'New password and confirm password does not match',
          icon: "error",
          timer: 3000
        });
        return false
      }

      const response = await dispatch(changeUserPasswordAction(value))
      const changePasswordSuccessData = response?.payload;

      if (changePasswordSuccessData) {
        if (changePasswordSuccessData.data) {
          if (changePasswordSuccessData.data.code == 200) {
            setOldPassword('')
            setNewPassword('');
            setConfirmPassword('');
            swal({
              title: "Success!",
              text: changePasswordSuccessData.data.message,
              icon: "success",
              timer: 3000
            });
            setValidated(false);

          } else {
            swal({
              title: "Error!",
              text: changePasswordSuccessData.data.message,
              icon: "error",
              timer: 6000
            });

            setValidated(false);

          }
        }
      }
      //}
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())

        history.push(`/user/signin/${params.course_id}`)
      }
    }
  }
  return (
    <>
      <div className="admin_user">
        <form className="mt-5 pl-md-4 pr-md-4" onSubmit={handleSubmit}>
          <h5 className="mt-4 mb-4">Account</h5>
          <Form.Row>
            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="adamkelvin@test.com"
                value={email} readOnly

              />
            </Form.Group>
          </Form.Row>

          <h5 className="mt-4 mb-4">Change Pasword</h5>
          <Form.Row>
            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12" className="eyeinput eyeinput1">
              <Form.Label>Enter Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" placeholder="" value={old_password} onChange={e => (setOldPassword(e.target.value))}
              />
              <span className="eyeImage">
                <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
              </span>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12" className="eyeinput eyeinput1">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="" required
                value={new_password} onChange={e => (setNewPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
              />
              <span className="eyeImage">
                <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
              </span>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xl="4" lg="4" md="5" sm="12" className="eyeinput eyeinput1">
              <Form.Label>Re-type New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="" value={confirm_password}
                required placeholder="" onChange={e => (setConfirmPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
              />

              <span className="eyeImage">
                <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
              </span>
            </Form.Group>
          </Form.Row>

          <Button
            variant="primary"
            className="btnSign mt-4 mb-3 pl-5 pr-5 pt-1 pb-1"
            type="submit"
          >
            Change Password
          </Button>
        </form>
      </div>
    </>
  );
};
