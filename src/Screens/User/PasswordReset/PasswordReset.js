import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Lock from "../../../../src/Images/svg/padlock.svg";

import "./PasswordReset.css";

export const PasswordReset = () => {
  return (
    <div>
      <div className="noHeaderTop welcomeScreen mt-5">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <Row className="justify-content-md-center">
            <Col xl={5} lg={7} md={8} sm={12}>
              <Card className="p-xl-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5">
                <Card.Body className="otpForm">
                  <div className="text-center mb-4">
                    <img src={Lock} alt="Image" />
                  </div>
                  <Card.Title className="text-center mb-0">
                    Password Reset Successfully!
                  </Card.Title>
                  <Row className="justify-content-md-center">
                    <Col xl={8} lg={8} md={9} sm={12}>
                      <Card.Text className="text-center mt-3">
                        You can now use your new Password to log in to your
                        Account!
                      </Card.Text>
                    </Col>
                  </Row>

                  <Form className="mt-3 pl-md-4 pr-md-4">
                    <Button variant="primary" className="w-100 btnSign mt-4">
                      <Link to={"/user/welcome"}>Login</Link>
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
