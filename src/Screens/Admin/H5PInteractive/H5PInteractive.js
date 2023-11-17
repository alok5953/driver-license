import React, { useState } from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import Edit from "../../../Images/edit.svg";

import ContentListComponent from './components/ContentListComponent';
import {ContentService } from './services/ContentService'
import "./H5PInteractive.css";

const H5PInteractive = () => {
 
  
  const [customFieldShow, setcustomFieldShow] = useState(false);
  const contentService  = new ContentService('/h5p');

  const handlecustomFieldClose = () => setcustomFieldShow(false);
  const handlecustomFieldShow = () => setcustomFieldShow(true);

  return (
    <>
            <div className="tabbing_container pt-4 pl-lg-5 pr-lg-5 pl-3 pr-3 pb-4 mb-4 coursesection">
              <h1>H5P Interactive</h1>
              <h3>
                <span> 01</span>
                <span className="title"> Interactive Elements </span>
              </h3>

              <div className="sectionBorder"></div>

              <div className="formBody mt-4">
                <h5 className="mb-4"> </h5>

{/* H5P React Component : contentService is passed a params with the server address */}

                <ContentListComponent
                        contentService={contentService}
                ></ContentListComponent>

              <div className="sectionBorder"></div>

                <Form>
                  <Row>
                    <Col
                      xl={6}
                      lg={6}
                      md={6}
                      sm={12}
                      className="text-md-left text-center"
                    >
                      {/* <Button
                        variant="primary"
                        className="btnSame btnPadding btnBorder mt-4"
                        onClick={handlecustomFieldShow}
                      >
                        Add Custom Field
                      </Button> */}
                    </Col>
                    <Col
                      xl={6}
                      lg={6}
                      md={6}
                      sm={12}
                      className="text-md-right text-center"
                    >
                      {/* <Button
                        variant="primary"
                        className="btnSame btnPadding mt-4"
                      >
                        <Link to={"/courses/coursemodule"}> Course Creation </Link>
                      </Button> */}
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>

            {/* modal - Not in USE  */}
            <Modal
              className="add_usermodal"
              show={customFieldShow}
              onHide={handlecustomFieldClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  Create custom Field
                  <span className="customfieldSpan">1/10</span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={8}>
                    <div className="select_input">
                      <Form.Group>
                        <Form.Control as="select">
                          <option>Text field</option>
                          <option>Drop down</option>
                          <option>Checkbox</option>
                          <option>Radio Buttons</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md={8}>
                    <Form.Group>
                      <Form.Control type="text" placeholder="Text field Name" />
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  className="btnSame mt-4 add_user"
                  type="submit"
                >
                  Save & Next
                </Button>
                <Button
                  className="cancel_btn"
                  variant="secondary"
                  onClick={handlecustomFieldClose}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
         </>
  );
};

export default H5PInteractive;
