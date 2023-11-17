import React, { useEffect, useState } from "react";
import { Link, useHistory,useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./PaymentCancel.css";
import swal from "sweetalert";
import { Header } from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { userPaymentStatusCheckAction,createCheckoutSessionAction, socketDisconnectAction, logoutUserAction } from "../../../Redux/Actions";
import Form from "react-bootstrap/Form";
import { loadStripe } from '@stripe/stripe-js';
// recreating the `Stripe` object on every render.
import { PUBLISH_KEY } from '../../../Utils/StripeConstant'
const stripePromise = loadStripe(PUBLISH_KEY)

const PaymentCancel = () => {
  const history = useHistory();
  const dispatch = useDispatch();
 
  const params = useParams();
  const course_id = params?.course_id
  const [courseId, setCourseId] = useState(params?.course_id);

  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const paymentSubmit = async (data, e) => {
    try {
      var paymentResponse = await dispatch(userPaymentStatusCheckAction(courseId))
      paymentResponse = paymentResponse?.payload;
      if (!paymentResponse?.data?.data?.is_paid) {
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
      } else{
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        swal({
          title: "Error!",
          text: paymentResponse?.data?.message,
          icon: "error",
          timer: 5000
        });
      }
    }
    catch (err) {
      history.push(`/user/signin?${courseId}`)
      swal({
        title: "Error!",
        text: err?.response?.data?.err,
        icon: "error",
        timer: 5000
      });

    }
  };

  return (
    <div>
       {/* <Header></Header> */}

<div className="mainSection mt-3 pb-4">
  <Container>
    <Row>
        <Col md={12} className="text-center payment_container pay_failed">
            <h5>Payment Canceled!</h5>
            
            {/* <p>Order ID : 000-12-922-0999 | Transaction ID: 123545</p> */}
            <Button variant="primary" className="btnSign mt-4" onClick={paymentSubmit}>
            Try again
            </Button>
        </Col>
    </Row>
    
  </Container>
</div>
    </div>


  );
};

export default PaymentCancel;