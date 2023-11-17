import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
// import Logo from "../../../Images/svg/logo.svg";

import "./Header.css";

export const Header = () => {
  return (
    <div className="menuHeader">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container fluid className="pl-md-4 pr-md-4">
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="javascript:;">
                <Link className="navLink" to={"#"}>
                  Home
                </Link>
              </Nav.Link>

              <Nav.Link href="javascript:;">
                <Link className="navLink" to={"#"}>
                  Pages
                </Link>
              </Nav.Link>
              <Nav.Link href="javascript:;">
                <Link className="navLink active" to={"/user/courses"}>
                  Courses
                </Link>
              </Nav.Link>
              <Nav.Link href="javascript:;">
                <Link className="navLink" to={"#"}>
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link href="javascript:;">
                <Link className="navLink" to={"#"}>
                  Faq's
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form inline>
            <Form.Group className="has-search">
              <span className="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search course..."
              />
            </Form.Group>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};
