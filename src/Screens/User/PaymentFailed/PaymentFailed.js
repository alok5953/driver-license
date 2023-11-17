import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./PaymentFailed.css";

import Form from "react-bootstrap/Form";

 const PaymentFailed = () => {
  return (
    <div>
      {/* <Header></Header> */}

      <div className="mainSection mt-3 pb-4">
        <Container>
          <Row>
            <Col md={12} className="text-center payment_container pay_failed">
              <h5>Payment Failed !</h5>
              <h4>Your account has been created, please purchase the course to move ahead.</h4>
              {/* <p>Order ID : 000-12-922-0999 | Transaction ID: 123545</p> */}
              <Button variant="primary" className="btnSign mt-4">
                Try again
              </Button>
            </Col>
          </Row>

        </Container>

      </div>
    </div>


  );
};

export default PaymentFailed;
