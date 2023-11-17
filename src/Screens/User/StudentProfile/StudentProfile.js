import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./StudentProfile.css";
import { TopBar } from "../TopBar";
import { Header } from "../Header/Header";
import { LaptopWindowsOutlined } from "@material-ui/icons";

export const StudentProfile = () => {
  return (
    <div>
      {/* <Header></Header> */} 

      <div className="mainSection mt-4 pb-4">
        <Container>
          <div className="studentForm">
            <h1>Complete Student Profile</h1>
            <Form>
              <h5 className="mt-4 mb-3">Personal Info</h5>

              <Form.Row>
                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>
              </Form.Row>

              <Form.Row className="mt-3">
                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="" required />
                </Form.Group>
              </Form.Row>

              <h5 className="mt-4 mb-3">Shipping Address</h5>

              <Form.Row className="mt-3">
                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Country</Form.Label>

                  <div className="select_input">
                    <Form.Control as="select">
                      <option>United State</option>
                      <option>United State</option>
                      <option>United State</option>
                    </Form.Control>
                  </div>
                </Form.Group>
              </Form.Row>

              <Form.Row className="mt-3">
                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>State</Form.Label>

                  <div className="select_input">
                    <Form.Control as="select">
                      <option>New York City</option>
                      <option>New York City</option>
                    </Form.Control>
                  </div>
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>ZIP code</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>
              </Form.Row>

              <h5 className="mt-4 mb-3">Driving Permit Information</h5>

              <Form.Row className="mt-3">
                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label className="fullName">
                    Full Name to be Printed on permit
                  </Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control type="date" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Class of Permit</Form.Label>

                  <div className="select_input">
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                    </Form.Control>
                  </div>
                </Form.Group>
              </Form.Row>

              <Form.Row className="mt-3">
                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control type="date" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Client ID</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>

                <Form.Group as={Col} xl="4" lg="4" md="6" sm="12">
                  <Form.Label>Document Number</Form.Label>
                  <Form.Control type="text" placeholder="" required />
                </Form.Group>
              </Form.Row>

              <Form.Row className="mt-3 mt-md-3 mt-lg-4">
                <Form.Group as={Col} xl="12" className="">
                  <Button className="btnSign pl-5 pr-5 mt-0">
                    <Link to={"#"}>Submit</Link>
                  </Button>

                  <Button className="btnCancel pl-5 pr-5 mt-0 ml-3">
                    <Link to={"#"}>Cancel</Link>
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};
