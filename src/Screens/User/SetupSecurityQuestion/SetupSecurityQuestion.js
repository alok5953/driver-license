import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./SetupSecurityQuestion.css";
import { getSecurityQuestionDetailAction, getUserDetailByTokenAction, saveSecurityQuestionAnswerAction, checkUserSecurityQuestionDoneOrNotAction, socketDisconnectAction, logoutUserAction, userPaymentStatusCheckAction } from "../../../Redux/Actions";
import swal from "sweetalert";

const SetupSecurityQuestion = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let params = useParams();
  const [securityQuestionList, setSecurityQuestionList] = useState([]);
  const [answerList, setAnswerList] = useState([]);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  useEffect(() => {

    checkSecurityQuestion()
    getSecurityQuestionList()
    paymentStatusCheck()
  }, [])
  const [validated, setSecurityQuestionValidated] = useState(false);
  // get Security Questions 
  const getSecurityQuestionList = async () => {
    try {
      var response = await dispatch(getSecurityQuestionDetailAction(1, 100))
      response?.payload?.data?.data?.rows?.length && setSecurityQuestionList(response.payload.data.data.rows)
    }
    catch (err) {
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
  }

  const paymentStatusCheck = async () => {
    var paymentResponse = await dispatch(userPaymentStatusCheckAction(params?.course_id))
    paymentResponse = paymentResponse?.payload;
    if (paymentResponse?.data?.data?.is_paid) {
    } else {
      swal({
        title: "Error!",
        text: 'Your payment is due.',
        icon: "error",
        timer: 5000
      });

      dispatch(logoutUserAction())
      history.push(`/user/signin/${params.course_id}`)
    }
  }
  // check security question
  const checkSecurityQuestion = async () => {
    try {
      let userDetailResponse = await dispatch(getUserDetailByTokenAction())
      userDetailResponse = userDetailResponse?.payload;
      userDetailResponse = userDetailResponse?.data?.data
      if (userDetailResponse.is_active) {
        if (!userDetailResponse.address_line_1 || !userDetailResponse.first_name || !userDetailResponse.last_name || !userDetailResponse.user_name || !userDetailResponse.email ||
          !userDetailResponse.date_of_birth || !userDetailResponse.country || !userDetailResponse.mobile_number || !userDetailResponse.state ||
          !userDetailResponse.zipcode || !userDetailResponse.permit_first_name || !userDetailResponse.permit_last_name || !userDetailResponse.permit_suffix || !userDetailResponse.class_of_permit || !userDetailResponse.permit_expiration_date || !userDetailResponse.dmv_id || !userDetailResponse.document_no) {
          history.push(`/user/profile/${params.course_id}`);
        } else {
          var securityQuestionResponse = await dispatch(checkUserSecurityQuestionDoneOrNotAction())
          securityQuestionResponse = securityQuestionResponse?.payload;
          if (securityQuestionResponse?.data?.data?.isDone) {
            history.push(`/user/dashboard/${params.course_id}`)
            return false
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
  }

  //handle multiple_choice questions
  const handleMultipleChoice = (question_id, answer) => {

    if (answerList.some(id => id.security_question_id == question_id)) {
      let newResponse = [...answerList];

      let qu_index = newResponse.findIndex(id => id.security_question_id == question_id);
      newResponse[qu_index] = { ...newResponse[qu_index], answer: answer }
      setAnswerList(newResponse)

    }
    else {
      let responseObj = { security_question_id: question_id, answer: answer };
      answerList.push(responseObj);
    }
  }

  // handle custom_answer questions
  const handleCustomAnswer = (e, question_id) => {
    e.preventDefault()
    const answer = e.target.value;
    if (answerList.some(id => id.security_question_id == question_id)) {
      let newResponse = [...answerList];

      let qu_index = newResponse.findIndex(id => id.security_question_id == question_id);
      newResponse[qu_index] = { ...newResponse[qu_index], answer: answer }
      setAnswerList(newResponse)
    }
    else {
      let responseObj = { security_question_id: question_id, answer: answer };
      answerList.push(responseObj);
    }

  }

  // handle truth_or_false questions
  const handleTruthFalse = (e, question_id) => {
    const name = e.target.name;
    const answer = e.target.value;
    if (answerList.some(id => id.security_question_id == question_id)) {
      let newResponse = [...answerList];
      let qu_index = newResponse.findIndex(id => id.security_question_id == question_id);
      newResponse[qu_index] = { ...newResponse[qu_index], answer: answer }
      setAnswerList(newResponse)
    }
    else {
      let responseObj = { security_question_id: question_id, answer: answer };
      answerList.push(responseObj);
    }
  }

  const handleSubmit = async e => {
    try {

      e.preventDefault();
      let status = false;
      answerList.map((val, indx) => {
        if (!val.answer) {
          swal({
            title: "Error!",
            text: 'Please select all the question.',
            icon: "error",
            timer: 3000
          });
          status = true;
        }
      })

      if (status) {
        return false
      }
      if (answerList.length !== securityQuestionList.length) {
        swal({
          title: "Error!",
          text: 'Please select all the question.',
          icon: "error",
          timer: 3000
        });
        return false;
      }
      const response = await dispatch(saveSecurityQuestionAnswerAction({ 'answers': answerList }))
      const resDetailList = response?.payload;
      // value assign in varible
      if (resDetailList.data) {
        if (resDetailList?.data?.code == 200) {
          swal({
            title: "Success!",
            text: resDetailList.data.message,
            icon: "success",
            timer: 3000
          });
          history.push(`/user/typingdna/${params.course_id}`)
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


  return (
    <div>
      <div className="noHeaderTop welcomeScreen">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3 quiz_questioncontainer">
          <h5 className="licensing_text mb-4">Setup Security Questions</h5>

          {/* <p>Setup Security Questions</p> */}
          <p>Please answer all of the following questions with correct Personal information</p>
          <Row className="">
            <Col xl={12} lg={12} md={12} sm={12}>
              <div className="UserSecurityQuestion_container container_form_group">
                <form noValidate  onSubmit={handleSubmit}>
                  <Row>
                    {securityQuestionList ? securityQuestionList.map((secu, index) => {
                      if (secu.type == 'multiple_choice') {
                        return (
                          <>
                            <Col key={`setupsecurityquestion-${index}`} xl={12} lg={12} md={12} sm={12}>
                              <div >
                                <h5> Q{index + 1}. {secu.question ? secu.question : 'Security Question'}</h5>
                                <div className="custom-radio-wrap">
                                  <form>
                                    {secu.options ? secu.options.map((opt, index) => {
                                      return (
                                        <>
                                          <div className="form-group" key={`setupsecurityquestionoption-${index}`}>
                                            <input id={`${opt.id}_${index}`} type="radio" name="custom-radio-btn" onChange={(e) => { handleMultipleChoice(secu.id, opt.id) }} />
                                            <label className="custom-radio" htmlFor={`${opt.id}_${index}`} ></label>
                                            <span className="label-text">{opt.option}</span>
                                          </div>
                                        </>
                                      )
                                    }) : null}
                                  </form>
                                </div>
                              </div>
                            </Col>
                          </>
                        )
                      }
                      if (secu.type == 'custom_answer') {
                        return (
                          <>
                            <Col key={`setupsecurityquestioncustom-${index}`} xl={7} lg={7} md={8} sm={12}>
                              <div >
                                <h5>  Q{index + 1}. {secu.question ? secu.question : 'Security Question'}</h5>
                                <div className="custom-radio-wrap">
                                  <Form className="mt-3">
                                    <Form.Row>
                                      <Form.Group as={Col}>
                                        {/* <Form.Label>Type the above text here</Form.Label> */}

                                        <Form.Control type="text" className="inputDisplay" placeholder="Please answer this question here" onChange={(e) => { handleCustomAnswer(e, secu.id) }} />
                                      </Form.Group>
                                    </Form.Row>
                                  </Form>
                                </div>
                              </div>
                            </Col>
                          </>
                        )
                      }
                      if (secu.type == 'truth_or_false') {
                        return (
                          <>
                            <Col key={`setupsecurityquestiontruth_false-${index}`} xl={12} lg={12} md={12} sm={12}>
                              <div >
                                <h5>  Q{index + 1}. {secu.question ? secu.question : 'Security Question'}</h5>
                                <div className="custom-radio-wrap">
                                  <form  >
                                    <div className="form-group">
                                      <input id={`${secu.id}_true`} type="radio" name="custom-radio-btn" value={true} onChange={(e) => { handleTruthFalse(e, secu.id) }} />
                                      <label className="custom-radio" htmlFor={`${secu.id}_true`}></label>
                                      <span className="label-text">True</span>
                                    </div>
                                    <div className="form-group">
                                      <input id={`${secu.id}_false`} type="radio" name="custom-radio-btn" value={false} onChange={(e) => { handleTruthFalse(e, secu.id) }} />
                                      <label className="custom-radio" htmlFor={`${secu.id}_false`}></label>
                                      <span className="label-text">False</span>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </Col>
                          </>
                        )
                      }
                    })

                      : null}
                    <div className="col-md-12">
                      <Button variant="primary" className="btnSign mt-4 questionsubmitbtn" name="next" type="submit" style={{
                        height: 54,
                        width: 118
                      }}>
                        Submit
                      </Button>
                    </div>
                  </Row>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SetupSecurityQuestion;