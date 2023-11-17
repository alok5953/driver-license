import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Setting/Setting.css";

const AppSetting = () => {
  return ( 
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <h1 className="d-md-inline-block d-block mb-3">App Setting</h1>
          </Col>
        </Row>

        <div className="sectionBorder"></div>

        <div className="text-left app-section pl-md-3 pl-3 mt-4">
          <h4 className="mb-3">Notification setting</h4>

          <Form className="mb-4">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Notifications on mobile Phone"
            />
          </Form>

          <Form>
            <Form.Check
              type="switch"
              id="custom-switch1"
              label="Notifications on Email"
            />
          </Form>

          <h4 className="mb-3 mt-4">Typing DNA test</h4>

          <Form className="mb-4">
            <Form.Check
              type="switch"
              id="custom-switch2"
              label="Sign up-Email"
            />
          </Form>

          <Form className="mb-4">
            <Form.Check
              type="switch"
              id="custom-switch3"
              label="Sign up-Password"
            />
          </Form>

          <div className="custom-control-label1">
            {" "}
            Small phrase(Paragraph)
            <div className="pl-3">
              <Form className="mb-4 mt-3">
                <Form.Check 
                  type="switch"
                  id="custom-switch4"
                  label="Sign up-Email"
                />
              </Form>
              <Form className="mb-4">
                <Form.Check
                  type="switch"
                  id="custom-switch5"
                  label="Sign up-Password"
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSetting;