import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Sidebar, Navigationbar } from "../Screens";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Loader } from "../Containers/Loader";

export const PrivateRoute =({ component: Component, authTokens ,...rest })=> {
   
  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <>
             <div>
      <div>
        <Navigationbar></Navigationbar>
      </div>
      <Container fluid>
        <Row>
          <Col xl={2} lg={3} md={4} sm={4}>
            <Sidebar />
          </Col>
          <Col
            xl={10}
            lg={9}
            md={8}
            sm={12}
            className="tabbmain_container text-left"
          >
          <Component {...props} />
          </Col>
        </Row>
        
      </Container>
      <Loader/>
    </div>
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
} 

