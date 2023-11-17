import React, { useEffect, useState } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./SuccessfullPayment.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getReceiptAction,userCheckFeedbackAction } from "../../../Redux/Actions";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { updateUserSurveyAction, getUserDetailByTokenAction, userResendVerifyEmailAction, logoutUserAction, socketDisconnectAction,userPaymentStatusCheckAction } from "../../../Redux/Actions";


const SuccessfullPayment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let params = useParams();
  const [courseId, setCourseId] = useState(params.course_id);
  const [thankyouShow, setThankYouShow] = useState(false);
  const handleThankYouClose = () => setThankYouShow(false);
  const handleThankYouShow = () => setThankYouShow(true);

  const [overall_exp, set_overall_exp] = useState('');
  const [likely_to_recommend, set_likely_to_recommend] = useState('')
  const [surveyResponse, setSurveyResponse] = useState([])

  const [resendShow, setResendShow] = useState(false);
  const handleResendClose = () => setResendShow(false);
  const handleResendShow = () => setResendShow(true);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })

  useEffect(() => {
    
    checkUserfeeback()
    paymentStatusCheck()
   
  }, []);

  const paymentStatusCheck = async () => {
    var paymentResponse = await dispatch(userPaymentStatusCheckAction(params?.course_id))
    paymentResponse = paymentResponse?.payload;
    if (paymentResponse?.data?.data?.is_paid) {
    } else {
      swal({
        title: "Error!",
        text: 'Your payment is due.',
        icon: "error",
        timer: 5000
      });
     
      dispatch(logoutUserAction())
      history.push(`/user/signin/${params.course_id}`)
    }
  }

  const getReceipt = async () => {
    try {
 
      let response = await dispatch(getReceiptAction(courseId))
      response = response?.payload;
      if (response) {
        if (response?.data) {
          if (response?.data?.code == 200) {
            window.open(response?.data?.data?.url);
          } else {
            // error message
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              timer: 6000
            });
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
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  }
  
  const checkUserfeeback = async () => {
    try {

      let response = await dispatch(userCheckFeedbackAction())
      response = response?.payload;
      if (response) {
        if (response?.data) {
          if (response?.data?.code == 200) {
            if(response?.data?.data?.is_already_done){

            } else{
              handleThankYouShow()
            }
          } else {
            // error message
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              timer: 6000
            });
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
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  }


  const handleSurveyInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    const response = { name: name, response: value }

    if (name == 'rating1') {
      set_overall_exp(value)
    }
    if (name == 'rating2') {
      set_likely_to_recommend(value)
    }

   
  }

  const handleSurveyUpdate = async (e) => {
    try {
      const data = {
        "course_id": courseId ,
        "likely_to_recommend_rating": likely_to_recommend,
        "overall_experience_rating": overall_exp
      }
      e.preventDefault()
      let response = await dispatch(updateUserSurveyAction(data))
      response = response?.payload;
      if (response) {
        if (response?.data) {
          if (response?.data?.code == 200) {
            // window.open(response?.data?.data?.url);
            swal("Thanks for sharing your feedback!", {
              // title: "Thanks for sharing your feedback!",
              // text: response.data.message,
              icon: "success",
              timer: 6000,
              button: false,
            });
            handleThankYouClose()
          } else {
            // error message
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              timer: 6000
            });
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
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  }

  const verifyAccountCheck = async () => {
    try {
      let response = await dispatch(getUserDetailByTokenAction())
      response = response?.payload;
      if (response) {
        if (response?.data) {
          if (response?.data?.code == 200) {
            if (response?.data?.data.is_active) {
              history.push(`/user/profile/${params.course_id}`)
            } else {
              handleResendShow()
            }
          } else {
            // error message
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              timer: 6000
            });
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
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  }

  const userLoginState = useSelector(state => state.userAuthReducer?.userLoginData);
  const email = userLoginState?.data?.data?.user.email
  const userResendVerifyEmail = async () => {
    try {
      handleResendClose()
      let response = await dispatch(userResendVerifyEmailAction({ email_or_user_name: email, course_id: courseId }));
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
      dispatch(socketDisconnectAction(socket))
      dispatch(logoutUserAction())
      console.log('*****err', err?.response?.data)
      history.push(`/user/signin/${params.course_id}`)
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
      {/* <Header></Header> */}

      <div className="mainSection mt-3 pb-4">
        <Container>
          <Row>
            <Col md={12} className="text-center payment_container">
              <h5>Payment Successful !</h5>
              {/* <h4>Thank you! your payment of $ 50.00 has been received.</h4> */}
              {/* <p>Order ID : 000-12-922-0999 | Transaction ID: 123545</p> */}
              <Button variant="primary" className="btnSign mt-4" onClick={getReceipt}>
                Print Reciept
              </Button>
              <a onClick={verifyAccountCheck}><p className="link_profile">Go to My profile</p></a>
            </Col>
          </Row>

        </Container>

        {/* thank you */}
        <Modal
          className="thankyou_modal"
          show={thankyouShow}
          onHide={handleThankYouClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thank you for your order</Modal.Title>
          </Modal.Header>
          <Form noValidate onSubmit={handleSurveyUpdate} name="form" onChange={handleSurveyInput}>
            <Modal.Body className="pl-0 pr-0">
              <Row>
                <Col md={12}>
                  <h5>
                    How would you rate your overall experience so far?
                  </h5>
                  <div className="rating star-rating">
                    <input type="radio" name="rating1" value="1" className="fa fa-star-o mr-3 checked" /><i></i>
                    <input type="radio" name="rating1" value="2" /><i></i>
                    <input type="radio" name="rating1" value="3" /><i></i>
                    <input type="radio" name="rating1" value="4" /><i></i>
                    <input type="radio" name="rating1" value="5" /><i></i>
                  </div>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={12}>
                  <h5>
                    How likely are you to recommend our site to others?
                  </h5>
                  <div className="rating star-rating">
                    <input type="radio" name="rating2" value="1" className="fa fa-star-o mr-3 checked" /><i></i>
                    <input type="radio" name="rating2" value="2" /><i></i>
                    <input type="radio" name="rating2" value="3" /><i></i>
                    <input type="radio" name="rating2" value="4" /><i></i>
                    <input type="radio" name="rating2" value="5" /><i></i>
                  </div>
                </Col>
              </Row>

              <Button variant="primary" className="btnSign btn_modal mt-4" type="submit">
                Submit
              </Button>
            </Modal.Body>
          </Form>
        </Modal>

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

export default SuccessfullPayment;