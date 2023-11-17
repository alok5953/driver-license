import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { SIGN_IN } from "../../../Routes/RoutesContants";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { LOGOUT } from "../../../Redux/Actions/ActionTypes/ActionTypes";
import { logoutAction, refreshTokenAction, getPersonalDetailAction } from "../../../Redux/Actions";
import "./Navigationbar.css";
import { getItemLocalStorage } from "../../../Utils/Util";
import Chat from "../../../Images/header/chat.svg";
import Notification from "../../../Images/header/notification.svg";
import Avatar from "../../../Images/header/avatar.png";
import { setItemLocalStorage } from "../../../Utils/Util";
import swal from "sweetalert";

export const Navigationbar = props => {
  useEffect(() => {
    //setInterval(function(){ 
      netConnection() //}, 1000);
  }, []);
  const netConnection= () =>{
    var ifConnected = window.navigator.onLine;
    if (!ifConnected)   {
      swal({
        title: "Error!",
        text: "You are offline.",
        icon: "error",
        timer: 5000
      });
      return false
    }
  }
  let history = useHistory();
  var refreshTokenResult;
  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const handleOnClick = async () => {
    try {
      const logoutDetailSuccess = await dispatch(logoutAction({}, LOGOUT));
      const response = logoutDetailSuccess?.payload?.data;

      if (response.code == 200) {
        history.push(SIGN_IN);
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        history.push('/')
      }
    }
  };

  useEffect(() => {
    // token save in locastorage that time call
    if (getItemLocalStorage("accessToken")) {
      refreshTokenCall();
    }
  }, []);

  // refresh tokenresult
  useSelector(state => {
    refreshTokenResult = state.authReducer.loginData; //refresh token
    if (refreshTokenResult) {
      if (refreshTokenResult?.data?.code == 200) {
        setItemLocalStorage(
          "accessToken",
          refreshTokenResult?.data?.data?.access_token
        );


      } else if (refreshTokenResult?.data?.code == 500) {
        history.push(SIGN_IN);
      }
    }
  });
  const refreshTokenCall = () => {
    const interval = setInterval(
      () =>
        dispatch(
          refreshTokenAction({
            refresh_token: getItemLocalStorage("refresh_token")
          })
        ),
      100000
    );
  };
  // get first name
  const userData = useSelector(state => state.authReducer?.getPersonalDetailData);
  useEffect(() => {
    if (userData?.data?.data) {
      setFirstName(userData?.data?.data?.first_name);
      setLastName(userData?.data?.data?.last_name);
    }
  }, [userData]);

  useEffect(() => {
    if (refreshTokenResult?.data?.data?.access_token) {
      setFirstName(refreshTokenResult.data.data.user.first_name);
      setLastName(refreshTokenResult.data.data.user.last_name);
    }
    getDetails()

  }, [refreshTokenResult])
  useEffect(() => {
    getRefreshDetails()
  }, [])
  //getDetail
  const getDetails = async () => {
    try {
      const response = await dispatch(getPersonalDetailAction());
      const list = response?.payload?.data?.data
      if (list) {
        setFirstName(list.first_name)
        setLastName(list.last_name)
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        history.push('/')
      }
    }
  }

  const getRefreshDetails = async () => {
    try {
      dispatch(
        refreshTokenAction({
          refresh_token: getItemLocalStorage("refresh_token")
        })
      )
      const response = await dispatch(getPersonalDetailAction());
      const list = response?.payload?.data?.data
      if (list) {
        setFirstName(list.first_name)
        setLastName(list.last_name)
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        history.push('/')
      }
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="" className="navbarNew">
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <h1 className="d-md-none d-inline-block logoNav"> LOGO </h1>
          <Nav className="ml-auto">
            <Nav.Link href="#" className="d-md-inline-block d-none marginTop">
              <img src={Chat} className="pr-4 pt-2" alt="Image" />
            </Nav.Link>
            <Nav.Link href="#" className="d-md-inline-block d-none marginTop">
              <img src={Notification} className="pr-4 pt-1" alt="Image" />
            </Nav.Link>
            <Nav.Link eventKey={2} href="#" className="pr-5 pr-md-0 leftBorder">
              <Dropdown> 
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="btnnone mr-md-3 mr-0"
                >
                  {first_name}&nbsp;{last_name}
                </Dropdown.Toggle>
                <img src={Avatar} className="pr-md-3 pr-0" alt="Image" />

                <Dropdown.Menu>
                  <Dropdown.Item href="javascript:;">
                    <Link className="" to={"/profile"}>
                      My Profile
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item href="javascript:;">
                    <Link className="" to={"/appsetting"}>
                      App Settings
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item href="javascript:;">
                    <Link className="" to={"/password"}>
                      Change Password
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => handleOnClick()}>
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
