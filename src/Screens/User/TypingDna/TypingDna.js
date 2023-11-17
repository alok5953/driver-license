import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./TypingDna.css";
import swal from 'sweetalert';
import { getQuotesAction, typingDnaSaveAction, checkUserAction, getUserDetailByTokenAction, checkUserSecurityQuestionDoneOrNotAction, logoutUserAction, socketDisconnectAction } from "../../../Redux/Actions";
let tt = new window.TypingDNA();
tt.addTarget('inputtextbox');
let visualizer = new window.TypingVisualizer();
var count = 1;

const TypingDna = () => {
  visualizer.addTarget(['inputtextbox']);
  document.getElementById('inputtextbox')
  const dispatch = useDispatch();
  let history = useHistory();
  const params = useParams();
  const [quote, setQuotes] = useState("");
  const [description, set_description] = useState("");
  const [validated, setValidated] = useState(false);
  const [viewStatus, setViewStatus] = useState(false);

  useEffect(() => {
    checkTypingDnaStatus()
  }, []);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const getQuotes = async () => {
    try {
      const result = await dispatch(getQuotesAction(120, 160));
      setQuotes(result?.payload?.data?.quote)
    }
    catch (err) {
      if (err.response.data.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  }

  const checkTypingDnaStatus = async () => {
    try {
      let userDetailResponse = await dispatch(getUserDetailByTokenAction())
      userDetailResponse = userDetailResponse?.payload;
      userDetailResponse = userDetailResponse?.data?.data
      if (userDetailResponse.is_active) {
        if (!userDetailResponse.address_line_1 || !userDetailResponse.first_name || !userDetailResponse.last_name || !userDetailResponse.user_name || !userDetailResponse.email ||
          !userDetailResponse.date_of_birth || !userDetailResponse.country || !userDetailResponse.mobile_number || !userDetailResponse.state ||
          !userDetailResponse.zipcode || !userDetailResponse.permit_first_name || !userDetailResponse.permit_last_name || !userDetailResponse.permit_suffix || !userDetailResponse.class_of_permit || !userDetailResponse.permit_expiration_date || !userDetailResponse.dmv_id || !userDetailResponse.document_no) {
          history.push(`/user/profile/${params?.course_id}`);

          return false
        } else {
          var securityQuestionResponse = await dispatch(checkUserSecurityQuestionDoneOrNotAction())
          securityQuestionResponse = securityQuestionResponse?.payload;
          if (!securityQuestionResponse?.data?.data?.isDone) {
            history.push(`/user/setupsecurityquestion/${params.course_id}`)
            return false
          } else {
            var typingDnaResponse = await dispatch(checkUserAction())
            typingDnaResponse = typingDnaResponse?.payload;
            if (typingDnaResponse?.data?.count >= 2) {
              history.push(`/user/dashboard/${params.course_id}`)
              return false
            } else {
              getQuotes()
            }
          }
        }
      } else {
        swal({
          title: "Error!",
          text: 'Please verify your account',
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
    catch (err) {
      if (err.response.data.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  }

  const fastCompareTexts = (t1, t2) => {
    var dt1 = t1.split(' ');
    var dt2 = t2.split(' ');
    var total2 = 0;
    var total1 = 0;
    for (var i in dt2) {
      total2 += (dt1.indexOf(dt2[i]) > -1) ? 1 : 0;
    }
    for (var i in dt1) {
      total1 += (dt2.indexOf(dt1[i]) > -1) ? 1 : 0;
    }
    var total = (total1 < total2) ? total1 : total2;
    var length = (dt1.length > dt2.length) ? dt1.length : dt2.length;
    /** returns a number between 0 (completely different texts) and 1 (identical texts) */
    return total / length;
  }
  const handleSubmit = async e => {
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true)
      if (form.checkValidity()) {
        e.preventDefault();
        if (fastCompareTexts(document.getElementById('inputtextbox').value, quote) > 0.7) {
          let pattern;
          pattern = tt.getTypingPattern({ type: 0, length: 160 })
          const response = await dispatch(typingDnaSaveAction({ "typing_pattern": pattern }))
          const resDetailList = response?.payload;
          // value assign in varible
          if (resDetailList) {
            if (resDetailList.data) {
              if (resDetailList?.data?.statusCode == 200) {
                count = count + 1;
                var typingDnaResponse = await dispatch(checkUserAction())
                typingDnaResponse = typingDnaResponse?.payload;
                if (typingDnaResponse?.data?.count >= 2) {
                  history.push(`/user/dashboard/${params.course_id}`)
                  return false
                } else {
                  getQuotes()
                }
                setValidated(false);
                set_description('')
              } else {
                swal({
                  title: "Error!",
                  text: resDetailList.data.message,
                  icon: "error",
                  timer: 3000
                });
              }
            }
          }
        } else {
          swal({
            title: "Error!",
            text: 'Too many typos, please re-type OR at least 70% of the words should be typed correctly',
            icon: "error",
            timer: 5000
          });
          return false;
        }
      }
    }
    catch (err) {
      console.log('*****err', err.response)
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="noHeaderTop welcomeScreen mt-5">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <h5 className="licensing_text mb-4">Registration Biometric Authentication</h5>
          <Row className="justify-content-md-center">
            <Col xl={5} lg={7} md={8} sm={12}>
              <Card className="p-xl-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5">
                <Card.Body>
                  {/* <Card.Title className="text-center mb-0">
                    Welcome Back!
                  </Card.Title> */}
                  <h5 className="licensing_text mb-4">Registration Step {count} / 2</h5>
                  <Row>
                    <Col xl={11} lg={11} md={12} sm={12}>
                      <Card.Text className="text-left mt-3 typingPara">
                        Please type the text below (typos allowed), in order to
                        Sign In.
                      </Card.Text>

                      <Card.Text className="text-left mt-3 typingPara1">
                        {quote}
                      </Card.Text>

                      <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                          <Form.Group as={Col}>
                            <Form.Label>Type the above text here</Form.Label>
                            <Form.Control as="textarea" required id="inputtextbox" onCut={handleChange}
                              onCopy={handleChange}
                              onPaste={handleChange} value={description} onChange={(e) => set_description(e.target.value)} rows={3} col={4} />
                          </Form.Group>
                        </Form.Row>

                        <Button
                          variant="primary"
                          className="w-100 btnSign mt-4"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TypingDna;