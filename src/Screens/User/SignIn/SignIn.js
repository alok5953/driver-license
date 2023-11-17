import React, { useState, useEffect } from "react";
import { useDispatch, useSelector,useParams } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./SignIn.css";
import swal from "sweetalert";
import { userLoginAction, userResendVerifyEmailAction, userPaymentStatusCheckAction,  checkUserSecurityQuestionDoneOrNotAction, checkUserAction, socketConnectAction,createCheckoutSessionAction } from "../../../Redux/Actions";
import info from '../../../Images/info_icon.svg';
import io from "socket.io-client";
import { baseURL } from '../../../Services/BaseApi';
import Modal from "react-bootstrap/Modal";
import { loadStripe } from '@stripe/stripe-js';
// recreating the `Stripe` object on every render.
import { PUBLISH_KEY } from '../../../Utils/StripeConstant'
const stripePromise = loadStripe(PUBLISH_KEY)


 const SignIn = (props) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  //varibale declare
  const [email_or_user_name, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [courseId, setCourseId] = useState("");
  const [resendShow, setResendShow] = useState(false);
  const handleResendClose = () => setResendShow(false);
  const handleResendShow = () => setResendShow(true);
  
  useEffect(() => {
    setCourseId(props.match.params.course_id);
  
  }, []);

  const onSubmit = async (data, e) => {
    try {
      if (!courseId) {
        swal({
          title: "Error!",
          text: 'Signin url is not correct.',
          icon: "error",
          timer: 3000
        });
        return false;
      }
      const response = await dispatch(userLoginAction({ email_or_user_name: email_or_user_name, password: password, course_id: courseId }));
      const loginData = response?.payload;
     
      if (loginData) {
        if (loginData?.data?.code == 200) {
          sessionStorage.setItem("userAccessToken", loginData?.data?.data?.access_token);
          sessionStorage.setItem(
            "refresh_token",
            loginData?.data?.data?.refresh_token
          );
          let userData = loginData?.data?.data?.user
          const token = sessionStorage.getItem('userAccessToken');
          const socket = io(baseURL, { auth: { token } });
          dispatch(socketConnectAction(socket))
          socket.on('connect_error', (res) => res)
          socket.on('disconnect', (res) => res)

          if (userData) {
            var paymentResponse = await dispatch(userPaymentStatusCheckAction(courseId))
            paymentResponse = paymentResponse?.payload;
            if (paymentResponse?.data?.data?.is_paid) {
              if (!userData.address_line_1 || !userData.first_name || !userData.last_name || !userData.user_name || !userData.email ||
                !userData.date_of_birth || !userData.country || !userData.mobile_number || !userData.state ||
                !userData.zipcode || !userData.permit_first_name || !userData.permit_last_name || !userData.permit_suffix || !userData.class_of_permit || !userData.permit_expiration_date || !userData.dmv_id || !userData.document_no) {
                history.push(`/user/profile/${courseId}`);
              } else {
                var securityQuestionResponse = await dispatch(checkUserSecurityQuestionDoneOrNotAction())
                securityQuestionResponse = securityQuestionResponse?.payload;
                if (securityQuestionResponse?.data?.data?.isDone) {

                  var typingDnaResponse = await dispatch(checkUserAction())
                  typingDnaResponse = typingDnaResponse?.payload;

                  if (typingDnaResponse?.data?.count < 2) {
                    history.push(`/user/typingdna/${courseId}`)
                    return false
                  } else {
                    history.push(`/user/verify/${courseId}`)
                  } 
                } else {
                  history.push(`/user/setupsecurityquestion/${courseId}`)
                }
              }
            } else {
              let responseStripe = await dispatch(createCheckoutSessionAction({
                "course_id": courseId,
                "coupon_id": ''
              }))
              responseStripe = responseStripe?.payload
              if (responseStripe?.data?.code == 400) {
                swal({
                  title: "Error!",
                  text: responseStripe?.data?.message,
                  icon: "error",
                  timer: 3000
                });
              }
              if (responseStripe) {
                const stripe = await stripePromise;
                const result = await stripe.redirectToCheckout({
                  sessionId: responseStripe?.data?.session_id,
                });
    
                if (result.error) {
                  console.log(result.error)
                }
              }
            }
          }
        } else if (loginData?.data?.code == 401) {
          swal({
            title: "Error!",
            text: loginData?.data?.message,
            icon: "error",
            timer: 3000
          });
        } else if (loginData?.data?.code == 403) {
          if(!loginData?.data?.data?.verified){
           handleResendShow() 
          }

        } else {
          swal({
            title: "Error!",
            text: loginData?.data?.message,
            icon: "error",
            timer: 3000
          });
        }
      }
    }
    catch (err) {
      history.push(`/user/signin/${courseId}`)
      swal({
        title: "Error!",
        text: err?.response?.data?.err,
        icon: "error",
        timer: 5000
      });

    }
  };

  const userResendVerifyEmail = async () => {
    try {
      handleResendClose()
      let response = await dispatch(userResendVerifyEmailAction({ email_or_user_name: email_or_user_name, course_id: courseId }));
      response = response?.payload;
      if (response) {
        if (response?.data?.code == 200) {
          swal({
            title: "success!",
            text: response?.data?.message,
            icon: "success",
            timer: 3000
          });
        } else {
          swal({
            title: "Error!",
            text: response?.data?.message,
            icon: "error",
            timer: 3000
          });
        }
      }
    }
    catch (err) {
      console.log('*****err', err?.response?.data)
      history.push(`/user/signin/${courseId}`)
      swal({
        title: "Error!",
        text: err?.response?.data?.err,
        icon: "error",
        timer: 5000
      });

    }
  }
  return (
    <div>
      <div className="noHeaderTop welcomeScreen mt-5">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <Row className="justify-content-md-center">
            <Col xl={5} lg={7} md={8} sm={12}>
              <Card className="p-xl-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5">
                <Card.Body>
                  <Card.Title className="text-center mb-0">
                    Welcome Back!
                  </Card.Title>
                  <Card.Text className="text-center">
                    Please login into your account to continue
                  </Card.Text>

                  <Form className="mt-5 pl-md-4 pr-md-4" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Row>
                      <Form.Group as={Col}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="" required
                          onChange={(e) => { setEmail(e.target.value) }}
                        />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-3">
                      <Form.Group as={Col} className="mb-0 eyeinput eyeinput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" placeholder="" required
                          onChange={(e) => { setPassword(e.target.value) }}
                        />

                        <span className="eyeImage">
                          <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
                        </span>
                      </Form.Group>
                    </Form.Row>

                    <Row className="justify-content-md-center">
                      <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                        
                      </Col>

                      <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                      <div className="mt-0 text-right">
                          <span className="forgetPassword">
                            <Link to={`/user/forgotpassword/${courseId}`}>Forgot Password</Link>
                          </span>
                        </div>
                      </Col>
 
                    </Row>

                    <Button variant="primary" type="submit" className="w-100 btnSign mt-4">
                      Sign In
                      {/*  <Link to={"/user/typingdna"}> */}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal
          className="thankyou_modal"
          show={resendShow}
          onHide={handleResendClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Account Not Verified</Modal.Title>
          </Modal.Header>
          <Form noValidate>
            <Modal.Body className="pl-0 pr-0">
              <Row>
                <Col md={12}>
                  <p>We've sent an account verification link to your email address. Please click on the link given in the email to verify your account. </p>

                  <p className="verify_link">
                    If you didn't receive an email, <a onClick={userResendVerifyEmail}>  click here </a>  to resend the verification email.
                  </p>
                  <div className="rating text-center">
                    <Button variant="primary" onClick={handleResendClose} className="w-50 btnSign mt-4">
                    OK
                      {/*  <Link to={"/user/typingdna"}> */}
                    </Button>
                  </div>
                </Col>
              </Row>

            </Modal.Body>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SignIn
