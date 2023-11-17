import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  passwordResetAction, forgotPassworForOTPldAction, forgotPassworForEmaildAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import "./NewPassword.css";
import { Loader } from "../../../Containers/Loader";
import info from '../../../Images/info_icon.svg';

const NewPassword = props => {
  const [otp, setOTP] = useState("");
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  //varibale declare
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const resultEmail = useSelector(state => state.commonReducer?.email?.data);
  const resultOtp = useSelector(state => state.commonReducer?.otp?.data);

  useEffect(() => {

    if (resultEmail?.code == 200) {
      setEmail(resultEmail.email)
    } else {
      history.push('/enterotp')
    }
    if (resultOtp?.code == 200) {
      setOTP(resultOtp.otp)
    } else {
      history.push('/enterotp')
    }
  }, [resultEmail, resultOtp]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); 
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        let regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
       
        if (!new_password) {
          swal({
            title: "Error!",
            text: 'Please enter new password.',
            icon: "error",
            timer: 3000
          });
          return false
        }
        else {
          if (regex.exec(new_password) == null) {
            swal({
              title: "Error!",
              text: 'New password pattern does not match.',
              icon: "error",
              timer: 3000
            });
            return false
          }
        }
        if (!confirm_password) {
          swal({
            title: "Error!",
            text: 'Please enter confirm password.',
            icon: "error",
            timer: 3000
          });
          return false
        }
        else {
          if (regex.exec(confirm_password) == null) {
            swal({
              title: "Error!",
              text: 'Confirm password pattern does not match.',
              icon: "error",
              timer: 3000
            });
          }
          return false
        }

      }
      setValidated(true)
      if (form.checkValidity()) {
        let value = {
          "email": email,
          "otp": otp,
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

        const response = await dispatch(passwordResetAction(value))
        const changePasswordSuccessData = response?.payload;

        if (changePasswordSuccessData) {
          if (changePasswordSuccessData.data) {
            if (changePasswordSuccessData.data.code == 200) {
              setNewPassword('');
              setConfirmPassword('');
              swal({
                title: "Success!",
                text: changePasswordSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              setValidated(false);
              history.push('/')
              dispatch(forgotPassworForEmaildAction({}))
              dispatch(forgotPassworForOTPldAction({}))
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
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  }
  return (
    <>
      <div className="login">
        <Container fluid className="">
          <Row className="nopadd">
            <Col md={6} className="nopadd login_imgcontainer">
              <img src="/assets/Images/login.png" alt="Image" />
              <div className="img_containertext">
                <h4 className="welcome_text">Welcome to</h4>
                <h3 className="traffic_safety">Online Traffic Safety</h3>
              </div>
            </Col>

            <Col md={6}>
              <Form className="login_form forgotForm" noValidate validated={validated} onSubmit={handleSubmit}>
                <h1 className="mb-2">Create a New Password</h1>
                <p className="mb-3">Enter New Password for your Account</p>


                <Form.Row className="mt-3 mt-md-3 mt-lg-4">
                  <Form.Group as={Col} xl="12" className="w-100 pl-2 eyeinput eyeinput1">
                    <Form.Label className="">New Password</Form.Label>
                    <Form.Control type="password"
                      placeholder=""
                      value={new_password} required onChange={e => (setNewPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />

                  <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols"/>
                  </span>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mt-3 mt-md-3 mt-lg-3">
                  <Form.Group as={Col} xl="12" className="w-100 pl-2 eyeinput eyeinput1">
                    <Form.Label className="">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="" 
                      required placeholder="" onChange={e => (setConfirmPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />

                  <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols"/>
                  </span>
                  </Form.Group>
                </Form.Row>


                <Form.Row className="mt-3 mt-md-3 mt-lg-4">
                  <Form.Group as={Col} xl="12" className="w-100">
                    <Button className="login_btn mt-0" type="submit">
                      Change Password
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
        <Loader />
      </div>
    </>
  );
};

export default NewPassword;