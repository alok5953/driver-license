import React, { useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  forgotPassAction, forgotPassworForEmaildAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import { Loader } from "../../../Containers/Loader";
import "./ForgotPassword.css";

const ForgotPassword = props => { 
  let history = useHistory();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  // form submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true)
      if (form.checkValidity()) {
        e.preventDefault();
        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (emailRegex.exec(email) == null) {
          swal({
            title: "Error!",
            text: 'Email Id pattern does not match.',
            icon: "error",
            timer: 3000
          });
          return false
        }
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
              setValidated(false);
              dispatch(forgotPassworForEmaildAction(email))
              history.push('/enterotp')
            } else if (updateSuccessData.data.code == 401) {
              swal({
                title: "Success!",
                text: updateSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              setValidated(false);
            } else {
              swal({
                title: "Error!",
                text: updateSuccessData.data.message,
                icon: "error",
                timer: 3000
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
              <Form className="login_form forgotForm" noValidate validated={validated} onSubmit={handleSubmit}>
                <h1>Forgot your Password</h1>
                <p>
                  Please enter your email address below, and we'll send you an 
                  email allowing you to reset your password.
                </p>

                <Form.Row className="mt-3 mt-md-3 mt-lg-4">
                  <Form.Group as={Col} xl="12" className="w-100 pl-2">
                    <Form.Label className="">Email Address</Form.Label>
                    <Form.Control type="email"  value={email}
                    required
                    onChange={e => setEmail(e.target.value)}/>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mt-3 mt-md-3 mt-lg-4">
                  <Form.Group as={Col} xl="12" className="w-100">
                    <Button className="login_btn mt-0" type="submit">
                     Reset Password
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
        <Loader/>
      </div>
    </>
  );
};

export default ForgotPassword;