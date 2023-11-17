import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { TopBar } from "../Screens";
import { Loader } from "../Containers/Loader";
import tawkTo from "tawkto-react";
import {TAWKTO_KEY, TAWKTO_PROPERTY_ID} from '../Utils/TawktoConstants' 
import io from "socket.io-client";
import { baseURL } from '../Services/BaseApi';
import { socketConnectAction } from "../Redux/Actions";
import { useDispatch } from "react-redux";
import {parse, stringify} from 'flatted';

export const UserPrivateRoute = ({ component: Component,authUserTokens, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    tawkTo(TAWKTO_PROPERTY_ID, TAWKTO_KEY);
    const tawk_API = window?.tawk_API;
    if (tawk_API) {
      tawk_API.visitor = {
        name : 'visitor name',
        email : 'visitor@email.com'
      }
    }
  },[])

  useEffect(()=>{
    socketSuccess()
  },[])

  const socketSuccess = async ( ) => {
    const token = sessionStorage.getItem('userAccessToken');
    const socket =   io(baseURL, {auth: {token}, secure: true, reconnect: true, rejectUnauthorized : false });
     await dispatch(socketConnectAction(socket))
  
  }

  return (
    <Route
      {...rest}
      render={props => (
        authUserTokens ? ( 
        <>
          <div> 
            <div>
              <TopBar></TopBar>
            </div>

            <Component {...props} />
            
          </div>
          <Loader/>
        </>
         ) : (
           
            <Redirect to="/user/signin/:course_id" />
          )
      )}
    />
  );
};