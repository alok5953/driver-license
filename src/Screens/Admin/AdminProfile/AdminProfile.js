import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./AdminProfile.css";
import "../Setting/Setting.css";
import {
  getPersonalDetailAction,
  personalDetailUpdate, logoutAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

 const AdminProfile = () => {
  let history = useHistory();
  //varibale declare
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [contact_no, setContactNo] = useState("");
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    getDetails()
  }, []); 

  // form submit
  const handleSubmit = async (e) => {
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true)
      if (form.checkValidity()) {
        e.preventDefault();
        
        if (contact_no.length !== 11) {
          swal({
              title: "Error!",
              text: 'Phone number must be 11 digit including code.',
              icon: "error",
              timer: 3000
          });
          return false
      }
      if(contact_no.charAt(0)!=1){
        swal({
          title: "Error!",
          text: 'USA code is 1, Please enter correct code.',
          icon: "error",
          timer: 3000
      });
      return false
      }
        let values = { 'first_name': first_name, "last_name": last_name, "contact_no": contact_no }
        const response = await dispatch(personalDetailUpdate(values))
        const updateSuccessData = response?.payload;
        if (updateSuccessData) {
          if (updateSuccessData.data) {
            if (updateSuccessData.data.code === 200) {
              swal({
                title: "Success!",
                text: updateSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              setValidated(false);
              getDetails()
            } else if (updateSuccessData.data.code === 401) {
              swal({
                title: "Success!",
                text: updateSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              setValidated(false);
              getDetails()
            } else {
              swal({
                title: "Error!",
                text: updateSuccessData.data.message,
                icon: "error",
                timer: 3000
              });
              setValidated(false);
              getDetails()
            }
          }
        }
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        dispatch(logoutAction({}, 'LOGOUT'));
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  };

  //getDetail
  const getDetails = async () => {
    try {
      const response = await dispatch(getPersonalDetailAction());
      const list = response?.payload?.data?.data
      if (list) {
        setFirstName(list.first_name)
        setEmail(list.email)
        setLastName(list.last_name)
        setContactNo(list.contact_no)
      }
    }
    catch (err) {
      if (err?.response?.data?.code === 401) {
        dispatch(logoutAction({}, 'LOGOUT'));
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  }

  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <h1 className="d-md-inline-block d-block mb-3">Profile</h1>
          </Col>
        </Row>

        <div className="sectionBorder"></div>

        <div className="text-left admin-section pl-lg-3 pl-3 pr-3 mt-4">
          <h4>Basic details</h4>
          <div className="mt-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} xl="3" lg="4" md="6">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter first name"
                    value={first_name}
                    required
                    onChange={e => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} xl="3" lg="4" md="6" className="ml-lg-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter last name"
                    value={last_name}
                    required
                    onChange={e => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row className="mt-3">
                <Form.Group as={Col} xl="3" lg="4" md="6">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Please enter email"
                    disabled
                    value={email}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} xl="3" lg="4" md="6" className="ml-lg-3 eyeinput eyeinput1">
                  <Form.Label>Phone number</Form.Label>
                  {/* <Form.Control
                    type="text"
                    placeholder="Please enter contact number"
                    value={contact_no}
                    pattern="[0-9].{9,9}"
                    required
                    onChange={e => setContactNo(e.target.value)}
                  /> */}
                  <PhoneInput
                    onlyCountries={['us']}
                     country ={'us'}
                    
                    onChange={value => setContactNo(value)}
                    name="phone"
                    value={contact_no}
                    inputExtraProps={{
                      name: 'tel',
                      required: true,
                      autoFocus: true
                    }}
                  />

                  {/* <span className="eyeImage">
                    <img src={eye} className="eyeIcon" alt="close_icon" title="phone number must be numeric only and length must be 10 digit." />
                  </span> */}

                </Form.Group>
              </Form.Row>
              <Button variant="primary" className="btnSame mt-4" type="submit">
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;