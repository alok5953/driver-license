import React, { useState, useEffect, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  userForgotPasswordAction, OTPverifyAction, forgotPassworForOTPldAction, userOTPverifyAction, logoutUserAction,socketDisconnectAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import OtpInput from "react-otp-input";
import "./Otp.css";
import { Loader } from "../../../Containers/Loader";

const Otp = (props) => {
  const [otp, setOTP] = useState("");
  let history = useHistory();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const result = useSelector(state => state.commonReducer?.email?.data);
  const [courseId, setCourseId] = useState(props.match.params.course_id);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  useEffect(() => {

    if (result?.code == 200) {
    
      setEmail(result.email)

    } else {
     
      history.push(`/user/forgotpassword/${courseId}`)
    }
  }, [result]);

  const resendEmail = async (e) => {
    try {
      e.preventDefault();
      let values = { 'email': email, course_id: courseId }
      const response = await dispatch(userForgotPasswordAction(values))
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
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.message,
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${courseId}`)
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!otp) {
        swal({
          title: "Error!",
          text: 'Please enter otp',
          icon: "error",
          timer: 3000
        });
        return false
      }
      let values = { 'email': email, otp: otp, course_id: courseId }
      const response = await dispatch(userOTPverifyAction(values))
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
            history.push(`/user/newpassword/${courseId}`)
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
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${courseId}`)
      }
    }
  };
  return (
    <div>
      <div className="noHeaderTop welcomeScreen mt-5">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <Row className="justify-content-md-center">
            <Col xl={5} lg={7} md={9} sm={12}>
              <Card className="p-xl-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5">
                <Card.Body className="otpForm">
                  <Card.Title className="text-center mb-0">
                    Enter OTP
                  </Card.Title>
                  <Card.Text className="text-center mt-3">
                    Please enter One-time Password to verify your account
                  </Card.Text>

                  <Card.Text className="otpPara mb-3 text-center">
                    A One-Time Password has been sent to <span>{` ${email} `}</span>

                  </Card.Text>

                  <Form className="mt-5 pl-md-4 pr-md-4 text-center" onSubmit={handleSubmit}>
                    <div className="justify-content-center d-flex">
                      <OtpInput
                        className="inputStyleOtp"
                        onChange={(e) => setOTP(e)}
                        numInputs={4}
                        value={otp}
                        required
                      // separator={<span>-</span>}
                      />
                    </div>

                    <p className="resend mb-4 mt-3">
                      Didn't get code yet? <span onClick={resendEmail}> Resend </span>
                    </p>

                    <Button variant="primary" className="w-100 btnSign mt-4" type="submit">
                      Verify
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Loader />
    </div>
  );
};

export default Otp;