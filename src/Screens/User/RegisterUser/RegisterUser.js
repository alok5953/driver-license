import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-date-picker";
import "./RegisterUser.css";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { PUBLISH_KEY } from '../../../Utils/StripeConstant'
import { Header } from "../Header/Header";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import info from '../../../Images/info_icon.svg';
import {
  userSignUpAction, createCheckoutSessionAction, getCourseNameandaAmountAction
} from "../../../Redux/Actions";
import { countryList } from '../../../Utils/CountryList';
import { setItemLocalStorage } from "../../../Utils/Util";
import { loadStripe } from '@stripe/stripe-js';
import shipping from "../../../Images/checkout/awesome-shipping-fast.svg";
import addition from "../../../Images/checkout/awesome-gift.svg";
import narrations from "../../../Images/checkout/curved-microphone.svg";
import shippingwhite from "../../../Images/checkout/shippingwhite.svg";
import additionwhite from "../../../Images/checkout/awesome-giftwhite.svg";
import narrationswhite from "../../../Images/checkout/curved-microphonewhite.svg";
import { createTrue } from "typescript";
// Make sure to call `loadStripe` outside of a component’s render to avoid

// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(PUBLISH_KEY)

const RegisterUser = (props) => {

  useEffect(() => {
    setCourseId(props.match.params.course_id);
    sessionStorage.setItem('courseId', props.match.params.course_id)
    getCourseNameandPayment(props.match.params.course_id);

  }, []);

  const [verifyShow, setVerifyShow] = useState(false);
  const handleVerifyClose = () => setVerifyShow(false);
  const handleVerifyShow = () => setVerifyShow(true);

  const dispatch = useDispatch();
  let history = useHistory();
  const [validated, setValidated] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [date_of_birth, setDOB] = useState("");
  const [country, setCountry] = useState("United States");
  const [disableDate, setDisbleDate] = useState("")
  const [coupon_id, setCoupon_id] = useState(props?.location?.search?.slice(11));
  const [courseId, setCourseId] = useState("");
  const [type_agree, set_type_agree] = useState('');
  const [courseName, setCourseName] = useState('');
  const [coursePayment, setCoursePayment] = useState('')

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!courseId) {
        swal({
          title: "Error!",
          text: 'Signup url is not correct.',
          icon: "error",
          timer: 3000
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
        "country": country ? country : "United States",
        course_id: courseId
      }
      let response = await dispatch(userSignUpAction(value))
      response = response?.payload
      setValidated(false);
      if (response) {
        if (response?.data?.code == 200) {

          sessionStorage.setItem("userAccessToken", response?.data?.data?.access_token);
          sessionStorage.setItem(
            "refresh_token",
            response?.data?.data?.refresh_token
          );

          handleVerifyShow()
          setTimeout(async function () {
            let responseStripe = await dispatch(createCheckoutSessionAction({
              "course_id": courseId,
              "coupon_id": coupon_id
            }))
            responseStripe = responseStripe?.payload
            if (responseStripe?.data?.code == 400) {
              swal({
                title: "Error!",
                text: responseStripe?.data?.message,
                icon: "error",
                timer: 3000
              });
            }
            if (responseStripe) {
              const stripe = await stripePromise;
              const result = await stripe.redirectToCheckout({
                sessionId: responseStripe?.data?.session_id,
              });
              if (result.error) {
              }
            }
          }, 4000);

        } else {
          if (typeof response?.data?.data == 'object') {
            swal({
              title: "Error!",
              text: response?.data?.err,
              icon: "error",
              timer: 3000
            });
          } else {
            swal({
              title: "Error!",
              text: response?.data?.message,
              icon: "error",
              timer: 3000
            });
          }
        }

      } else if (response?.data?.code == 401) {
        swal({
          title: "Error!",
          text: response?.data?.message,
          icon: "error",
          timer: 3000
        });
      }
    }
    catch (err) {
      console.log(err)
      swal({
        title: "Error!",
        text: err.response.data.message,
        icon: "error",
        timer: 5000
      });
    }
  }

  useEffect(() => {
    getdate()
  }, []);

  const getdate = () => {
    let d = new Date();
    let pastYear = d.setFullYear(d.getFullYear() - 18);
    pastYear = new Date(pastYear).toISOString()
    setDisbleDate(pastYear)
  }

  const getCourseNameandPayment = async (courseId) => {
    try {
      let response = await dispatch(getCourseNameandaAmountAction(courseId))
      response = response?.payload;
      response = response?.data?.data
      setCourseName(response.course_title); setCoursePayment(response.enrolement_fees);
    }
    catch (err) {
      console.log(err)
      swal({
        title: "Error!",
        text: err.response.data.message,
        icon: "error",
        timer: 5000
      });
    }
  }

  return (
    <div>
      {/* <Header></Header> */}
      <div className="breadcrumbBg ">
        <h1 className="mb-0 mt-2">Student Registration</h1>
        {/* <Breadcrumb>
          <Breadcrumb.Item href="javascript:;">Home /<span> Sign Up</span></Breadcrumb.Item>
        </Breadcrumb> */}
      </div>

      <div className="mainSection marginmainTop mt-3 pb-4">
        <Container>
          <form onSubmit={handleSubmit}>
            <Row>

              <Col xl={8} lg={8} md={8} sm={12}>
                <div className="signindetail">
                  <p className="formbelowtextres">* Per NYSDMV requirement, students completing the 5-hour pre-licensing course online
                    must be 18 or older and have a valid photo learner permit.</p>
                  <h5 className="pretextheading usersignin">Create Sign In Detail</h5>
                  <div className="courseDescription mt-3 registerformcontainer">
                    <Form.Row>
                      <Form.Group as={Col} xl="7" lg="8" md="8">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={user_name} placeholder="" required onChange={e => (setUserName(e.target.value))} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xl="7" lg="8" md="8" className="eyeinput">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" title="Password must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols." pattern="/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/" value={password} placeholder="" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" placeholder="" onChange={e => (setPassword(e.target.value))} />
                        <span className="eyeImage eyeSign">
                          <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
                        </span>
                      </Form.Group>
                    </Form.Row>
                  </div>
                </div>
                <div className="studentinformation">
                  <h5 className="pretextheading usersignin">Add student Information</h5>
                  <div className="courseDescription mt-3 registerformcontainer">
                    <Form.Row>
                      <Form.Group as={Col} xl="6" lg="6" md="6">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={first_name} placeholder="" required onChange={e => (setFirstName(e.target.value))} />
                      </Form.Group>
                      <Form.Group as={Col} xl="6" lg="6" md="6">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={last_name} placeholder="" required onChange={e => (setLastName(e.target.value))} />
                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xl="6" lg="6" md="6" className="allselectSame country_select">
                        <Form.Label>Country</Form.Label>
                        <div className="select_input" >
                          <Form.Control as="select" value={country} required onChange={e => (setCountry(e.target.value))}>
                            <option value="">Please select country</option>
                            {countryList.map((val,i) => <option key={`county-${i}`} value={val.name}>{val.name}</option>)}
                          </Form.Control>
                        </div>
                      </Form.Group>
                      <Form.Group as={Col} xl="6" lg="6" md="6" className="date_section" >
                        <Form.Label className="d-block">Date of birth</Form.Label>

                        <DatePicker className="date_input_css form-control pl-0" format="MM/dd/yyyy" required maxDate={new Date(disableDate)}
                          value={date_of_birth} onChange={date => { setDOB(date) }}
                        />

                      </Form.Group>
                    </Form.Row>
                    <Form.Row>
                      <Form.Group as={Col} xl="6" lg="6" md="6">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="" required onChange={e => (setEmail(e.target.value))} />
                      </Form.Group>
                      <Form.Group as={Col} xl="6" lg="6" md="6">
                        <Form.Label>Validate Email Address</Form.Label>
                        <Form.Control type="email" value={confirmEmail} pattern={`${email}`} title="Please validate your email." required onChange={e => (setConfirmEmail(e.target.value))} />
                      </Form.Group>
                    </Form.Row>
                    {/* <Form.Row>
                      <Form.Group as={Col} xl="6" lg="6" md="6">
                        <Form.Label>Promo Code</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={e => (setCoupon_id(e.target.value))} />
                      </Form.Group>
                    </Form.Row> */}
                    {/* <p className="formbelowtext">Please type the text below (typos allowed), in order to Sign Up.</p>
                    <p className="formbelowtextres">First, it will highlight all of the medium and lower-frequency words in your text and create lists of these words that you can use offline. This frequency data can help language learners focus on new words.First, it will highlight all of the medium and lower-frequency words in your text and create lists of these words that you can use offline. This frequency data can help language learners focus on new words,</p>
                    <Form.Row>
                        <Form.Group as={Col} xl="7" lg="8" md="8">
                            <Form.Label>Type the above text here</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                    </Form.Row> */}
                    <Form.Group
                      as={Col}
                      xl="12"
                      className="w-100 samecheckbox"
                    >
                      <div className="custom-control custom-checkbox pl-0">
                        <input required
                          type="checkbox"
                          name="checkbox"
                          className="custom-control-input"
                          id="customCheck14" />

                        <label
                          className="custom-control-label"
                          htmlFor="customCheck14"
                        >
                          You are required to have your Class D or M photo permit prior to registering for this course. Check here to
                          attest that you have received your Class D or M photo permit from the New York State DMV.
                          Class DJ and MJ permits are not accepted."
                        </label>
                      </div>
                    </Form.Group>

                    <div className="progressBar userlicensingtext terms_box">
                      <h5 className="pretextheading usersignin">Terms and Conditions</h5>
                    </div>
                    <Form.Row>
                      <Form.Group as={Col} xl="12" lg="12" md="12" className="mb-0">
                        <Form.Label>Type <strong>I Agree</strong> <strong style={{ color: "red" }}>*</strong></Form.Label>
                      </Form.Group>
                      <Form.Group as={Col} xl="6" lg="6" md="6" xs={12} className="pr-0 mb-0">
                        <Form.Control type="text" value={type_agree} pattern="^I Agree$|^i Agree$|^i agree$|^I agree$" title="Please Type I Agree" placeholder="" required onChange={e => (set_type_agree(e.target.value))} />
                      </Form.Group>
                      {/* pattern="^I Agree$|^i Agree$|^i agree$|^I agree$"  */}
                      <Form.Group as={Col} xl="6" lg="6" md="6" xs={12} className="pl-md-0">
                        <span className="terms_link pt-md-3 pt-3">
                          View terms and Conditions
                        </span>
                      </Form.Group>
                    </Form.Row>
                  </div>
                </div>
                {/* <div className="signindetail">
                  <h5 className="pretextheading usersignin">Add ons</h5>
                  <div className="courseDescription mt-3 registerformcontainer">
                    <Row>
                      <Col md={4}>
                        <Button variant="primary" className="w-100 btnSign Shippingbtntext">
                          <img src={shipping} className="usershippingimg" />
                          <img src={shippingwhite} className="usershippingimgwhite" />
                          <Link to={"/user/signin"}>Shipping Options</Link>
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button variant="primary" className="w-100 btnSign Shippingbtntext">
                          <img src={addition} className="usershippingimg" />
                          <img src={additionwhite} className="usershippingimgwhite" />
                          <Link to={"/user/signin"}>+ Additional Bonus</Link>
                        </Button>
                      </Col>
                      <Col md={4}>
                        <Button variant="primary" className="w-100 btnSign Shippingbtntext">
                          <img src={narrations} className="usershippingimg" />
                          <img src={narrationswhite} className="usershippingimgwhite" />
                          <Link to={"/user/signin"}>+ Narrations Audio</Link>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div> */}
              </Col>

              <Col xl={4} lg={4} md={4} sm={12} className="pl-lg-5">
                <div className="stickyRight enrollBar nopadd usersignright_container">


                  <div className="card_licensing_text">
                    <h5 className="">Summary</h5>
                    <div className="progressBar userlicensingtext">
                      <p className="d-inline-block mb-1">{courseName}</p>
                      <span>${coursePayment}</span>
                    </div>
                    <div className="progressBar userlicensingtotal">
                      <p className="d-inline-block mb-1">Total</p>
                      <span>${coursePayment}</span>
                    </div>
                    {/* <p className="purchasetext">By completing your purchase you agree to these <span>Terms of Service.</span></p> */}

                    <Button variant="primary" className="w-100 btnSign mt-4" type="submit">
                      Checkout
                    </Button>
                    <p className="w-100 btn_register">
                      Already have an account?  <Link to={`/user/signin/${courseId}`}> Login</Link>
                    </p>
                  </div>

                </div>

              </Col>

            </Row>
          </form>
        </Container>
      </div>
      <Modal
        className="thankyou_modal"
        show={verifyShow}
        onHide={handleVerifyClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Verify Your Email Address</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body className="pt-4 pl-2 pr-2">

            <p className="m-0">
              We've sent an account verification link to your email address. Please click on the link given in the email to verify your account.
            </p>

          </Modal.Body>
          <Modal.Footer className="mt-3 text-center d-block">

            <Button variant="primary" className="w-50 btnSign mt-4" onClick={handleVerifyClose}>
              OK
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterUser;
