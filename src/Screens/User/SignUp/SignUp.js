import React, { useState, useEffect } from "react";
import { useHistory ,useParams,Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import {countryList} from '../../../Utils/CountryList';
import swal from 'sweetalert';
import {
  userSignUpAction, getUserDetailByEmailOrUserAction
} from "../../../Redux/Actions";
import "./SignUp.css";
import { TopBar } from "../TopBar";
import { Header } from "../Header/Header";
 

export const SignUp = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [validated, setValidated] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail]= useState("");
  const [confirmEmail,setConfirmEmail]= useState("");
  const [date_of_birth,setDOB]= useState("");
  const [country,setCountry]= useState("United States");

  const handleSubmit = async (e) => {
   
    try{
      const form = e.currentTarget;
      console.log('___',form.checkValidity())
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        let regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
       
        if (!password) {
          swal({
            title: "Error!",
            text: 'Please enter password.',
            icon: "error",
            timer: 3000
          });
          return false
        }
        else {
          if (regex.exec(password) == null) {
            swal({
              title: "Error!",
              text: 'Password pattern does not match.',
              icon: "error",
              timer: 3000
            });
            return false
          }
        }
      }

      setValidated(true)
      if (form.checkValidity()) {
        e.preventDefault();
        if(email!==confirmEmail){
          swal({
            title: "Error!",
            text: 'Email or Validate Email does not match.',
            icon: "error",
            timer: 5000
          });
          return false;
        }
        let value = {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "user_name": user_name,
          "password": password,
          "date_of_birth": date_of_birth,
          "country": country?country:"United States"
        } 
        let userDetailResponse = await dispatch(getUserDetailByEmailOrUserAction(email,user_name))
        userDetailResponse = userDetailResponse?.payload
        if (userDetailResponse) {
          if (userDetailResponse?.data?.code == 200) {
            swal({
              title: "Error!",
              text: userDetailResponse?.data?.message,
              icon: "error",
              timer: 3000
            });
          } else if (userDetailResponse?.data?.code == 404) {
            console.log(value)
            let response = await dispatch(userSignUpAction(value))
            response = response?.payload
            setValidated(false);
            if (response) {
              if (response?.data?.code == 200) {
                swal({
                  title: "success!",
                  text: response?.data?.message,
                  icon: "success",
                  timer: 3000
                });
                  // if (!userData.Address_Line_1 || !userData.Address_Line_2 || !userData.class_of_permit_driving_card || !userData.first_name || !userData.last_name || !userData.user_name || !userData.email ||
                  //   !userData.date_of_birth || !userData.country || !userData.Address_Line_1 || !userData.Address_Line_2 || !userData.shipping_country || !userData.shipping_state ||
                  //   !userData.shipping_zipcode || !userData.full_name_driving_card || !userData.date_of_birth_driving_card || !userData.class_of_permit_driving_card || !userData.expiry_date_driving_card || !userData.client_id_driving_card || !userData.document_no_driving_card) {
                     
                history.push("/user/signin");
              } else{
                swal({
                  title: "Error!",
                  text: response?.data?.err,
                  icon: "error",
                  timer: 3000
                });
              }

            } else if (response?.data?.code == 401) {
              swal({
                title: "Error!",
                text: response?.data?.message,
                icon: "error",
                timer: 3000
              });

            } else {
              swal({
                title: "Error!",
                text: response?.data?.err,
                icon: "error",
                timer: 3000
              });
            }
          }
        }
        
       }
    }
    catch(err){
      console.log(err)
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
    }
  }

  // back to show value
  const signup_detail = useSelector(state => {
    return state.userAuthReducer.userSignUpdetailList;
  });
  useEffect(() => {
    if (signup_detail) {
       setFirstName(signup_detail.first_name); setLastName(signup_detail.last_name)
       setUserName(signup_detail.user_name); setPassword(signup_detail.password)
       setEmail(signup_detail.email); setConfirmEmail(signup_detail.email);
       setDOB(signup_detail.date_of_birth); setCountry(signup_detail.country)
    }
  }, [signup_detail]);
  
  return (
    <div>
      {/* <Header></Header> */}

      <div className="breadcrumbBg breadcrumbHeader">
        <h1 className="mb-0 mt-2">Student Registration</h1>
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home </Breadcrumb.Item>
          <Breadcrumb.Item active> Sign Up</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="mainSection mt-3 pb-4">
        <Container>
              <Form noValidate validated={validated} onSubmit={e=>{handleSubmit(e); console.log('submit')}}>
          <Row>
            <Col xl={7} lg={7} md={7} sm={12}>
              <h5 className="mb-3">Create Sign In Detail</h5>
                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="7" lg="7" md="9" sm="12">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={user_name} placeholder="" required onChange={e => (setUserName(e.target.value))}/>
                  </Form.Group>
                </Form.Row> 

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="7" lg="7" md="9" sm="12">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} placeholder="" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" placeholder="" onChange={e => (setPassword(e.target.value))}/>
                  </Form.Group>
                </Form.Row>

                <h5 className="mb-3 mt-3">Add student Information</h5>

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={first_name} placeholder="" required onChange={e => (setFirstName(e.target.value))}/>
                  </Form.Group>
 
                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={last_name} placeholder="" required onChange={e => (setLastName(e.target.value))}/>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Country</Form.Label>
                    <div className="select_input" >
                      <Form.Control as="select" value={country} required onChange={e => (setCountry(e.target.value))}>
                        <option value="">Please select country</option>
                        {countryList.map(val => <option value={val.name}>{val.name}</option>)}
                      </Form.Control>
                    </div>
                  </Form.Group>

                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" value={date_of_birth} data-date-format="MM-DD-YYYY" placeholder="" required onChange={e => (setDOB(e.target.value))}/>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" value={email} placeholder="" required onChange={e => (setEmail(e.target.value))}/>
                  </Form.Group>

                  <Form.Group as={Col} xl="6" lg="6" md="6" sm="12">
                    <Form.Label>Validate Email Address</Form.Label>
                    <Form.Control type="email" value={confirmEmail} placeholder="" required onChange={e => (setConfirmEmail(e.target.value))}/>
                  </Form.Group>
                </Form.Row>

                <p className="signPara">
                  Please type the text below (typos allowed), in order to Sign
                  Up.
                </p>

                <p className="signparaItalic mb-3">
                  First, it will highlight all of the medium and lower-frequency
                  words in your text and create lists of these words that you
                  can use offline. This frequency data can help language
                  learners focus on new words.First, it will highlight all of
                  the medium and lower-frequency words in your text and create
                  lists of these words that you can use offline. This frequency
                  data can help language learners focus on new words,
                </p>

                <Form.Row className="mb-3">
                  <Form.Group as={Col} xl="7" lg="7" md="9" sm="12">
                    <Form.Label>Type the above text here</Form.Label>
                    <Form.Control as="textarea" rows={3} col={4} />
                  </Form.Group>
                </Form.Row>

                <Form.Row className="mt-3">
                  <Form.Group as={Col} xl="12" className="w-100 samecheckbox">
                    <div className="custom-control custom-checkbox text-left">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        for="customCheck1"
                      >
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                      </label>
                    </div>
                  </Form.Group>
                </Form.Row>
             
            </Col>

            <Col xl={5} lg={5} md={5} sm={12} className="pl-lg-5">
              <div className="stickyRight mt-3">
                <h3>Summary</h3>
                <ul className="topSummary mt-3 p-0">
                  <li>
                    <span> Pre- licensing course </span>
                    <span className="price"> $200.00</span>
                  </li>
                </ul>

                <ul className="totalSummary mt-3 p-0 mb-3">
                  <li>
                    <span> Total</span>
                    <span className="price"> $200.00</span>
                  </li>
                </ul>

                <p>
                  By completing your purchase you agree to these{" "}
                  <Link to={"#"}> Terms of Service.</Link>
                </p>

                <Button variant="primary" type="submit" className="w-100 btnSign mt-4">
                  Checkout
                </Button>
              </div>
            </Col>
          </Row>
            </Form>
        </Container>
      </div>
    </div>
  );
};
