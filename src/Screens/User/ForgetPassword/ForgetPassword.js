import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link, useHistory,useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./ForgetPassword.css";
import { userForgotPasswordAction, forgotPassworForEmaildAction,socketDisconnectAction, logoutUserAction } from "../../../Redux/Actions";
import swal from "sweetalert";
import { Loader } from "../../../Containers/Loader";

const ForgetPassword = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  //varibale declare
  const [email, setEmail] = useState('');
  const { register, handleSubmit } = useForm();
  const [validated, setValidated] = useState(false);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })

  const onSubmit = async (data, e) => {
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
        const response = await dispatch(userForgotPasswordAction({ email: email, course_id: params?.course_id }));
        const forgetPasswordData = response?.payload;
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
        if (forgetPasswordData) {
          if (forgetPasswordData?.data?.code == 200) {
            dispatch(forgotPassworForEmaildAction(email));
            swal({
              title: "success!",
              text: forgetPasswordData?.data?.message,
              icon: "success",
              timer: 3000
            });
            history.push(`/user/otp/${params.course_id}`)
          } else if (forgetPasswordData?.data?.code == 401) {
            swal({
              title: "Error!",
              text: forgetPasswordData?.data?.message,
              icon: "error",
              timer: 3000
            });
          } else {
            swal({
              title: "Error!",
              text: forgetPasswordData?.data?.message,
              icon: "error",
              timer: 3000
            });
          }
        }
      }
    }
    catch (err) {
      dispatch(socketDisconnectAction(socket))
      dispatch(logoutUserAction())
      history.push(`/user/signin/${params.course_id}`)
      swal({
        title: "Error!",
        text: err.response.data.err,
        icon: "error",
        timer: 5000
      });
    }
  };

  return (
    <div>
      <div className="noHeaderTop welcomeScreen mt-5">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <Row className="justify-content-md-center">
            <Col xl={5} lg={7} md={8} sm={12}>
              <Card className="p-xl-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5">
                <Card.Body>
                  <Card.Title className="text-center mb-0">
                    Forgot your Password
                  </Card.Title>

                  <Row className="justify-content-md-center">
                    <Col xl={8} lg={9} md={10} sm={12}>
                      <Card.Text className="text-center mt-3">
                        Please enter the e-mail address you used while
                        creating your account
                      </Card.Text>
                    </Col>
                  </Row>
                  <Form className="mt-5 pl-md-4 pr-md-4" validated={validated} onSubmit={handleSubmit(onSubmit)}>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={(e) => { setEmail(e.target.value) }} required />
                      </Form.Group>
                    </Form.Row>

                    <Button
                      variant="primary"
                      className="w-100 btnSign mt-4 mb-3"
                      type="submit"
                    >
                      Reset Password
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

export default ForgetPassword;