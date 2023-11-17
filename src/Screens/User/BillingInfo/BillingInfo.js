import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Paypal from "../../../Images/checkout/paypal.png";
import American from "../../../Images/checkout/american_express.png";
import Visa from "../../../Images/checkout/visa.png";
import Jcb from "../../../Images/checkout/jcb.png";
import {
  createCheckoutSessionAction
} from "../../../Redux/Actions";
import "./BillingInfo.css";
import { TopBar } from "../TopBar";
import { Header } from "../Header/Header";
import swal from 'sweetalert';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid

// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('');


export const BillingInfo = () => {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  
  const handleSubmit = async (e) => {
    try {
      // const form = e.currentTarget;
      // if (form.checkValidity() === false) {
      //   e.preventDefault();
      //   e.stopPropagation();
      // }
      // setValidated(true)
      // if (form.checkValidity()) {
        e.preventDefault();
        const stripe = await stripePromise;
        
        let response = await dispatch(createCheckoutSessionAction({
          "course_id": "a94cbf05-2ad6-4357-9d4d-a1873348497d"
         }))
      response = response?.payload
      if (response) {
            const result = await stripe.redirectToCheckout({
              sessionId:response?.data?.session_id,
            });
        
            if (result.error) {
              console.log(result.error)
             
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer
              // using `result.error.message`.
            }
            
          
        }
      
    }
    catch (err) {
      console.log(err)
      swal({
        title: "Error!",
        text: err?.response?.data?.data?.err,
        icon: "error",
        timer: 5000
      });
    }
  }
  return ( 
    <div>
      {/* <Header></Header> */}

      <div className="breadcrumbBg breadcrumbHeader">
        <h1 className="mb-0 mt-2">Billing and payment Info</h1>
        {/* <Breadcrumb>
          <Breadcrumb.Item href="#">Home </Breadcrumb.Item>
          <Breadcrumb.Item active> Checkout</Breadcrumb.Item>
        </Breadcrumb> */}
      </div>

      <div className="mainSection mt-3 pb-4">
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col xl={7} lg={7} md={7} sm={12}>
                <h5 className="mb-3">Checkout</h5>

                <div className="checkoutRadio mb-5">
                  <Form.Row className="mb-3">
                    <Form.Group as={Col} xl="12" lg="12" md="12" sm="12">
                      <input type="radio" id="radio1" />
                      <label className="custom-radio" for="radio1"></label>
                      <span className="label-text">
                        Paypal
                        <img src={Paypal} className="pl-2" alt="Image" />
                      </span>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row className="mb-3">
                    <Form.Group as={Col} xl="12" lg="12" md="12" sm="12">
                      <input type="radio" id="radio1" defaultChecked />
                      <label className="custom-radio" for="radio1"></label>
                      <span className="label-text">
                        Credit or Debit card
                        <img src={American} className="pl-2" alt="Image" />
                        <img src={Visa} className="pl-2" alt="Image" />
                        <img src={Jcb} className="pl-2" alt="Image" />
                      </span>
                    </Form.Group>
                  </Form.Row>
                </div>

                <h5 className="mb-3 mt-3">Add student Information</h5>

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Full Name on card</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>

                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control type="date" placeholder="" />
                  </Form.Group>

                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>CVV/CVC</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Promo Code</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mt-3">
                  <Form.Group as={Col} xl="12" className="w-100 samecheckbox">
                    <div className="custom-control custom-checkbox text-left">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        for="customCheck1"
                      >
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                      </label>
                    </div>
                  </Form.Group>
                </Form.Row>

                <h5 className="mb-4 mt-3">Add ons</h5>

                <div className="checkoutButtons">
                  <Row>
                    <Col xl={4} lg={4} md={12} sm={12} className="pl-2 pr-2">
                      <Button variant="outline-primary btnShip w-100 mb-3">
                        + Shipping Options
                      </Button>
                    </Col>

                    <Col xl={4} lg={4} md={12} sm={12} className="pl-2 pr-2">
                      <Button variant="outline-primary btnBonus w-100 mb-3">
                        + Additional Bonus
                      </Button>
                    </Col>

                    <Col xl={4} lg={4} md={12} sm={12} className="pl-2 pr-2">
                      <Button variant="outline-primary btnAudio w-100 mb-3">
                        + Narrations Audio
                      </Button>
                    </Col>
                  </Row>
                </div>

              </Col>

              <Col xl={5} lg={5} md={5} sm={12} className="pl-lg-5">
                <div className="stickyRight mt-3">
                  <h3>Summary</h3>
                  <ul className="topSummary mt-3 p-0">
                    <li>
                      <span> Pre- licensing course </span>
                      <span className="price"> $200.00</span>
                    </li>

                    <li>
                      <span> Shipping Option </span>
                      <span className="price"> $5.00</span>
                    </li>
                  </ul>

                  <ul className="totalSummary mt-3 p-0 mb-3">
                    <li>
                      <span> Total</span>
                      <span className="price"> $205.00</span>
                    </li>
                  </ul>

                  <p>
                    By completing your purchase you agree to these{" "}
                    <Link to={"#"}> Terms of Service.</Link>
                  </p>

                  <Button variant="primary" type="submit" className="w-100 btnSign mt-4">
                    Checkout
                </Button>

                  <div className="text-center mt-3">
                    <Button >

                      Back
                </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};
