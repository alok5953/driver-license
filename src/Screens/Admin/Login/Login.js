import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Cookies from "js-cookie";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { loginAction } from "../../../Redux/Actions";
import { LOGIN } from "../../../Redux/Actions/ActionTypes/ActionTypes";
import "./Login.css";
import { Loader } from "../../../Containers/Loader";
import { setItemLocalStorage } from "../../../Utils/Util";
import { NONE, ROLE_PERMISSION, USER_ADD_ADMIN_PERMISSION, SECURITY_QUESTION_PERMISSION, DASHBOARD_PERMISSION, H5P_PERMISSION, QUIZE_PERMISSION, COURSE_PERMISSION, COUPON_PERMISSION, PAYMENT_PERMISSION, USER_PERMISSION, ADD_ONS } from "../../../Utils/PermissionConstant";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import info from '../../../Images/info_icon.svg';

  const Login = props => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
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
  }, []);

  const onSubmit = async (data, e) => {
    if (remember_me === true) {
      Cookies.set("email", values.email);
      Cookies.set("password", values.password);
      Cookies.set("remember_me", remember_me);
    }
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (emailRegex.exec(values.email) == null) {
      swal({
        title: "Error!",
        text: 'Email Id pattern does not match.',
        icon: "error",
        timer: 3000
      });
      return false
    }
    const response = await dispatch(loginAction(values, LOGIN));
    const loginData = response?.payload;
    if (loginData) {
      if (loginData?.data?.code == 200) {
        setItemLocalStorage("accessToken", loginData?.data?.data?.access_token);
        setItemLocalStorage(
          "refresh_token",
          loginData?.data?.data?.refresh_token
        );
        let route_url = "";
        if(loginData?.data?.data?.user?.role?.slug==="super_admin"){
          history.push('/dashboard');
        } else{
        const arrange = loginData?.data?.data?.user?.role?.policies?.sort((a, b) => { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) })
          arrange.map((e, inx) => {
            if (e.name === DASHBOARD_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/dashboard"; }
            }
            if (e.name === H5P_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/h5pinteractive" }
            }
            if (e.name === COURSE_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/courses/courselist" }
            }
            if (e.name === ADD_ONS && e.scope !== NONE) {
              if (!route_url) { route_url = "/addons" }
            }
            if (e.name === ROLE_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/setting" }
            }
            if (e.name === USER_ADD_ADMIN_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/setting" }
            }
            if (e.name === SECURITY_QUESTION_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/security" }
            }
            if (e.name === QUIZE_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/quizlist" }
            }
            if (e.name === COUPON_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/coupon" }
            }
            if (e.name === PAYMENT_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/payment" }
            }
            if (e.name === USER_PERMISSION && e.scope !== NONE) {
              if (!route_url) { route_url = "/userlist" }
            }
          })
          if (route_url) {
            history.push(route_url);
            return false
          }
        }
      } else if (loginData?.data?.code == 400) {
        swal({
          title: "Error!",
          text: loginData?.data?.message,
          icon: "error",
          timer: 3000
        });
      } else if (loginData?.data?.code == 401) {
        swal({
          title: "Error!",
          text: loginData?.data?.message,
          icon: "error",
          timer: 3000
        });
      } else {
        swal({
          title: "Error!",
          text: loginData?.data?.message,
          icon: "error",
          timer: 3000
        });
      }
    }
  };

  //varibale declare
  const [values, setValues] = useState({
    email: Cookies.get("email"),
    password: Cookies.get("password")
  });
  const [remember_me, setRemberMe] = useState(false);
  const HandleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="login">
        <Container fluid className="">
          <Row className="nopadd">
            <Col md={6} className="nopadd login_imgcontainer">
              <img src="/assets/Images/login.png" width="633" height="732" alt="Image" />
              <div className="img_containertext">
                <h4 className="welcome_text">Welcome to</h4>
                <h3 className="traffic_safety">Online Traffic Safety</h3>
              </div>
            </Col> 
            <Col md={6}>
              <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                <h1>LOGO</h1>
                <p>Welcome back! Please login to your account.</p>
                <div className="form-group input_form">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Username"
                    required
                    onChange={HandleChange}
                    value={values.email}
                  />
                </div>
                <div className="form-group input_form eyeinput">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
                    onChange={HandleChange} title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols"
                    value={values.password}
                  />
                  <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" />
                  </span>
                </div>
                <div className="checkbox loginform_checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="remember_me"
                      onChange={event => setRemberMe(event.target.checked)}
                    />{" "}
                    Remember me
                  </label>
                  <p>
                    <Link to={"/forgotpassword"}>Forgot Password</Link>
                  </p>
                </div>
                <div className="form-group">
                  <button className="login_btn">Login</button>
                </div>
                <h6 className="privacy_policy">Term of use. Privacy policy</h6>
              </form>
            </Col>
          </Row>
        </Container>
        <Loader />
      </div>
    </>
  );
};

export default Login;