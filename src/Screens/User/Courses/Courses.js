import React, { useState } from "react";
import { Link } from "react-router-dom";

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
// import Logo from "../../../Images/svg/logo.svg";

import "./Courses.css";
import { TopBar } from "../TopBar";
import { Header } from "../Header/Header";
 
export const Courses = () => {
  return (
    <div>
      {/* <Header></Header> */}

      <div className="breadcrumbBg">
        <h1 className="mb-0 mt-2 courseHead">About Pre- licensing course</h1>
        {/* <Breadcrumb>
          <Breadcrumb.Item href="#">Home </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Courses </Breadcrumb.Item>
          <Breadcrumb.Item active> About course</Breadcrumb.Item>
        </Breadcrumb> */}
      </div>

      <div className="mainSection mt-3 pb-4">
        <Container>
          <Row>
            <Col xl={8} lg={8} md={8} sm={12}>
              <div className="courseDescription mt-3">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    width="355"
                    height="200"
                    src="https://www.youtube.com/embed/zpOULjyy-n8"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>

                <div className="courseHeadPara mt-3">
                  <h5 className="mb-3">Overview</h5>

                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet. It uses a dictionary of over 200
                    Latin words, combined with a handful of model sentence
                    structures, to generate Lorem Ipsum which looks reasonable.
                  </p>
                </div>
              </div>
            </Col>

            <Col xl={4} lg={4} md={4} sm={12} className="pl-lg-5">
              <div className="stickyRight enrollBar mt-3">
                <h4>Benefit to Enroll</h4>
                <ul className="benefitList mt-3 pl-5">
                  <li>Benefit to Enroll 1</li>
                  <li>Benefit to Enroll 1</li>
                  <li>Benefit to Enroll 1</li>
                  <li>Benefit to Enroll 1</li>
                  <li>Benefit to Enroll 1</li>
                </ul>

                <div className="priceList">
                  <span className="mt-4">Only</span>
                  <h6> $200.00</h6>
                  <p>Get 10% Insurance Reduction!</p>
                </div>

                <Button variant="primary" className="w-100 btnSign mt-4">
                  <Link to={"/user/signin"}>Enroll Now</Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
