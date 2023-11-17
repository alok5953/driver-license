import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { TopBar } from "../Screens";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Loader } from "../Containers/Loader";
import tawkTo from "tawkto-react";
import {TAWKTO_KEY, TAWKTO_PROPERTY_ID} from '../Utils/TawktoConstants' 

export const UserRoute = ({ component: Component, ...rest }) => {
  useEffect(()=>{
    tawkTo(TAWKTO_PROPERTY_ID, TAWKTO_KEY);
    const tawk_API = window?.Tawk_API;
    if (tawk_API.onLoaded) {
       tawk_API.setAttributes({
          'name' : 'visitor',
          'email': 'visitor@email.com',
      })
    }
  },[])
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <div> 
            <div>
              <TopBar></TopBar>
            </div>

            <Component {...props} />
            <Loader/>
          </div>
        </>
      )}
    />
  );
};
