import React, { useState, useEffect, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import OtpInput from "react-otp-input";
import {
  forgotPassAction, OTPverifyAction, forgotPassworForOTPldAction
} from "../../../Redux/Actions";
import swal from "sweetalert"; 
import "./EnterOtp.css";
import { Loader } from "../../../Containers/Loader";

const EnterOtp = props => {
  const [otp, setOTP] = useState("");
  let history = useHistory();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const  result =useSelector(state =>  state.commonReducer?.email?.data); 

  useEffect(() => { 
   
      if(result?.code==200){ 
        setEmail(result.email)
      } else{
        history.push('/forgotpassword')
      }
  }, [result]);

  const resendEmail = async (e) => {
    try {
      e.preventDefault();
        let values = { 'email': email}
        const response = await dispatch(forgotPassAction(values))
        const updateSuccessData = response?.payload;
        if (updateSuccessData) {
          if (updateSuccessData.data) {
            if (updateSuccessData.data.code == 200) {
              swal({
                title: "Success!",
                text: updateSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              
            } else if (updateSuccessData.data.code == 401) {
              swal({
                title: "Success!",
                text: updateSuccessData.data.message,
                icon: "success",
                timer: 3000
              });

            } else {
              swal({
                title: "Error!",
                text: updateSuccessData.data.message,
                icon: "error",
                timer: 3000
              });
            }
          }
        }
    }
    catch (err) {
      if (err.response.data.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  };
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
        if(!otp){
          swal({
            title: "Error!",
            text: 'Please enter otp',
            icon: "error",
            timer: 3000
          });
          return false
        }
        let values = { 'email': email,otp:otp}
        const response = await dispatch(OTPverifyAction(values))
        const updateSuccessData = response?.payload;
        if (updateSuccessData) {
          if (updateSuccessData.data) {
            if (updateSuccessData.data.code == 200) {
              swal({
                title: "Success!",
                text: updateSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              dispatch(forgotPassworForOTPldAction(otp))
              history.push('/newpassword')
            } else if (updateSuccessData.data.code == 401) {
              swal({
                title: "Success!",
                text: updateSuccessData.data.message,
                icon: "success",
                timer: 3000
              });

            } else {
              swal({
                title: "Error!",
                text: updateSuccessData.data.message,
                icon: "error",
                timer: 3000
              });
            }
          }
        }
    }
    catch (err) {
      if (err.response.data.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  };

 
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
              <Form className="login_form forgotForm otpForm" onSubmit={handleSubmit}>
                <h1 className="mb-2">Enter OTP</h1>
                <p className="mb-3">
                  Please enter One-time Password to verify your account
                </p>
                <p className="otpPara mb-3">
                  One-Time Password has been sent to <span> {email}</span>
                </p>

                <div>
                  <OtpInput
                    className="inputStyleOtp"
                    onChange={(e)=>setOTP(e)}
                    numInputs={4}
                    value={otp}
                    required
                    // separator={<span>-</span>}
                  />
                </div>

                <p className="resend mb-4 mt-3">
                  Didn't get code yet? <span onClick={resendEmail}> Resend </span>
                </p>

                <Form.Row className="mt-3 mt-md-3 mt-lg-4">
                  <Form.Group as={Col} xl="12" className="w-100">
                    <Button className="login_btn mt-0" type="submit">
                     Verify
                    </Button>
                  </Form.Group>
                </Form.Row>

                {/* <div className="form-group">
                  <button className="login_btn mt-0">
                    <Link to={"/newpassword"}>Verify</Link>
                  </button>
                </div> */}
              </Form>
            </Col>
          </Row>
        </Container>
        <Loader/>
      </div>
    </>
  );
};

export default EnterOtp;