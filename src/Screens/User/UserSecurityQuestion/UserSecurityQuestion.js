import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./UserSecurityQuestion.css";
import {
  tableofContentDetailAction, tableofContentQuizDetailAction, tableofContentSecurityDetailAction, userForgotPasswordAction, getModuleByIdAction, getSecurityModuleByIdAction, securityQuestionAnswerVerifyAction, logoutUserAction, socketEmitStopModuleAction,
  socketEmitStartModuleAction, getUserDetailByTokenAction, checkUserSecurityQuestionDoneOrNotAction, checkUserAction, socketEmitResetAllAction, userPaymentStatusCheckAction, socketMarkModuleComplete, socketDisconnectAction, typing_dna_session_verified_userAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import time_clock from "../../../Images/time_clock.svg";
import { secondToMinuteOrHourConvert } from "../../../Utils/Util";

const UserSecurityQuestion = (props) => {
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () { window.history.go(1) };
  window.document.onkeydown = function (event) {
    if (event.keyCode == 116) {
      event.preventDefault();
    }
    if (event.metaKey && event.keyCode == 82) {
      event.preventDefault();
    }
    if (event.metaKey && event.keyCode == 87) {
      event.preventDefault();
    }
  }
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation()
  const params = useParams()
  //varibale declare
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const module_time_obj = useSelector(state => { return state.userSocketioReducer?.socketTimerSuccessResponse })
  const module_time = useSelector(state => { return state.userSocketioReducer?.socketTimerSuccessResponse?.time })
  const module_id = params?.module_id;
  const course_id = params?.course_id;
  const module_list = useSelector(state => { return state.tableofContentReducer?.tableofContentDetailList?.data });


  const [last_module_check, set_last_module_check] = useState(false);
  const [current_module_index, set_current_module_index] = useState('');
  const [content_id, set_content_id] = useState('');
  const [module_status, set_module_status] = useState('')
  const [timer_started, set_timer_started] = useState(false)

  const [securityDetail, SetSecurityDetail] = useState({})
  const [questionGroup, setQuestionGroup] = useState([]);


  useEffect(() => {
    getCheckDetails()
    paymentStatusCheck()
  }, [])

  const getCheckDetails = async () => {
    try {
      // check other detail pending or not
      let userDetailResponse = await dispatch(getUserDetailByTokenAction())
      userDetailResponse = userDetailResponse?.payload;
      userDetailResponse = userDetailResponse?.data?.data
      if (userDetailResponse.is_active) {
        if (!userDetailResponse.address_line_1 || !userDetailResponse.first_name || !userDetailResponse.last_name || !userDetailResponse.user_name || !userDetailResponse.email ||
          !userDetailResponse.date_of_birth || !userDetailResponse.country || !userDetailResponse.mobile_number || !userDetailResponse.state ||
          !userDetailResponse.zipcode || !userDetailResponse.permit_first_name || !userDetailResponse.permit_last_name || !userDetailResponse.permit_suffix || !userDetailResponse.class_of_permit || !userDetailResponse.permit_expiration_date || !userDetailResponse.dmv_id || !userDetailResponse.document_no) {
          history.push(`/user/profile/${params?.course_id}`);
        } else {
          var securityQuestionResponse = await dispatch(checkUserSecurityQuestionDoneOrNotAction())
          securityQuestionResponse = securityQuestionResponse?.payload;
          if (!securityQuestionResponse?.data?.data?.isDone) {
            history.push(`/user/setupsecurityquestion/${params?.course_id}`)
            return false
          } else {
            var typingDnaResponse = await dispatch(checkUserAction())
            typingDnaResponse = typingDnaResponse?.payload;
            if (typingDnaResponse?.data?.count < 2) {
              history.push(`/user/typingdna/${params?.course_id}`)
              return false
            } else {
              var typingDnaAuthUserResponse = await dispatch(typing_dna_session_verified_userAction())
              typingDnaAuthUserResponse = typingDnaAuthUserResponse?.payload;
              if (!typingDnaAuthUserResponse?.data?.is_typingDNA_verified) {
                history.push(`/user/verify/${params?.course_id}`)
                return false
              }
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

        history.push(`/user/signin/${params?.course_id}`)
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        return false
      }
    }
    catch (err) {
      swal({
        title: "Error!",
        text: err.response.data.err,
        icon: "error",
        timer: 5000
      });

      history.push(`/user/signin/${params?.course_id}`)
      dispatch(socketDisconnectAction(socket))
      dispatch(logoutUserAction())
      return false;
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

  const [userResponse, setUserResponse] = useState([]);
  const [verificationResponse, setVerificationResponse] = useState([]);
  const [userResult, setUserResult] = useState('fail');
  const [validated, setValidated] = useState(false);
  const [answered_all, set_answered_all] = useState(false);
  const [answered_number, set_answered_number] = useState(0);
  const [send_answer_once, set_send_answer_once] = useState(0)

  const [name, set_name] = useState('');


  useEffect(() => {
    if (timer_started) {
      testsample()
    }
  }, [module_time_obj])

  const testsample = () => {

    if (send_answer_once == 0) {

      if (module_time_obj.module_id == module_id && module_time_obj.time <= 0) {

        let newArr = []
        if (userResponse !== []) {
          newArr = [...userResponse]
          questionGroup.forEach((q, i) => {
            let responseObj = { security_question_id: q.id, answer: ' ' };
            if (newArr.some((qu) => { return qu.security_question_id == q.id })) {
              return false
            } else {
              newArr.push(responseObj)
            }

          })
        } else {
          newArr = []
          questionGroup.forEach((quest, i) => {
            let responseObj = { security_question_id: quest.id, answer: ' ' };
            newArr.push(responseObj);
          })
        }
        setUserResponse(newArr)
        handleResponseSubmitApi(newArr)
        set_send_answer_once(1)
      }
    }
  }

  useEffect(() => {  
    if(sessionStorage.getItem('userAccessToken')){
      if (params.module_id) {
        getUserSecurityQuestion(params.module_id)
      }
    }
  }, [params, socket])

  useEffect(() => {
    let length = userResponse.length;
    set_answered_number(length);
  }, [userResponse])



  const getUserSecurityQuestion = async (id) => {
    try {
      const response = await dispatch(getSecurityModuleByIdAction(id))
      const securityDetail = response?.payload;
      if (securityDetail) {
        if (securityDetail.data) {
          if (securityDetail.data.code == 200) {

            const { completion_time, module_type, name, users, course_id } = securityDetail.data.data
            set_name(name)
            setQuestionGroup(securityDetail.data.data?.questions_group?.questions)
            SetSecurityDetail(securityDetail.data.data)
            if (users[0]?.user_course_module?.status) {
              let status = users[0]?.user_course_module?.status
              set_module_status(status)
              if (status == 'IN_PROGRESS') {
                dispatch(socketEmitStartModuleAction(socket, id))
                set_timer_started(true)
              }
            } else {

              dispatch(socketEmitStartModuleAction(socket, id))
              set_timer_started(true)
            }
          } else {
            swal({
              title: "Error!",
              text: securityDetail.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    } catch (err) {
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });

        history.push(`/user/signin/${params?.course_id}`)
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        return false;
      }
    }
  }

  //  handle multiple_choice questions
  const handleMultipleChoice = (question_id, option) => {
    if (userResponse.some(id => id.security_question_id == question_id)) {
      let newResponse = [...userResponse];

      let qu_index = newResponse.findIndex(id => id.security_question_id == question_id);
      newResponse[qu_index] = { ...newResponse[qu_index], answer: option }
      setUserResponse(newResponse)

    }
    else {
      let responseObj = { security_question_id: question_id, answer: option, };
      userResponse.push(responseObj);
    }
  }

  // handle custom_answer questions
  const handleCustomAnswer = (e, question_id, type) => {
    e.preventDefault()
    const customAns = e.target.value;
    if (userResponse.some(id => id.security_question_id == question_id)) {
      let newResponse = [...userResponse];
      let qu_index = newResponse.findIndex(id => id.security_question_id == question_id);
      newResponse[qu_index] = { ...newResponse[qu_index], answer: customAns }
      setUserResponse(newResponse)
    }
    else {
      let responseObj = { security_question_id: question_id, answer: customAns };
      userResponse.push(responseObj);
    }
  }

  // handle truth_or_false questions
  const handleTruthFalse = (e, question_id, type) => {
    const name = e.target.name;
    const value = e.target.value;

    let answer = value;

    if (userResponse.some(id => id.security_question_id == question_id)) {
      let newResponse = [...userResponse];

      let qu_index = newResponse.findIndex(id => id.security_question_id == question_id);
      newResponse[qu_index] = { ...newResponse[qu_index], answer: answer }
      setUserResponse(newResponse)
    }
    else {
      let responseObj = { security_question_id: question_id, answer: answer };
      userResponse.push(responseObj);
    }
  }

  // handle Response
  const handleResponseSubmit = async (e) => {

    if (true) {
      let errorMsg = '';
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        errorMsg = 'Answer all questions.'
        swal({
          title: "Error!",
          text: errorMsg,
          icon: "error",
          timer: 6000
        });
      }
      setValidated(true);
      if (form.checkValidity()) {
        e.preventDefault();

        if (questionGroup?.length > userResponse?.length) {
          set_answered_all(false)
          errorMsg = 'Answer all questions.'
          swal({
            title: "Error!",
            text: errorMsg,
            icon: "error",
            timer: 6000
          });
        }

        if (errorMsg == '') {
          set_answered_all(true)
          swal("Are you sure to submit your response?", {
            buttons: {
              cancel: 'Cancel',
              button: {
                text: 'Submit',
                value: true,
              }
            },
            timer: 5000,
            icon: 'info',
          })
            .then(value => {
              if (value) {
                handleResponseSubmitApi(userResponse)
              }
            })

        }
      }
    }

  }

  const handleResponseSubmitApi = async (userresponse) => {
    try {
      let user_response = {
        "module_id": module_id,
        "answers": [...userresponse]
      };
      const response = await dispatch(securityQuestionAnswerVerifyAction(user_response))
      const verificationResponse = response?.payload;
      if (verificationResponse) {
        if (verificationResponse.data) {
          if (verificationResponse.data.code == 200) {
            const { verified } = verificationResponse.data.data;
            setVerificationResponse(verificationResponse.data.data)
            if (verified) {

              if (timer_started) {
                dispatch(socketMarkModuleComplete(socket, module_id))
                dispatch(socketEmitStopModuleAction(socket, module_id))
              }
              swal({
                title: "Verified Successfully",
                text: verificationResponse.data.message,
                icon: "success",
                timer: 5000
              }).then(() => {
                handleModuleNavigation('next')
              })
            }
          } else if (verificationResponse.data.code == 400) {
            if (timer_started) {
              dispatch(socketEmitStopModuleAction(socket, module_id))
            }
            dispatch(socketDisconnectAction(socket))
            dispatch(logoutUserAction())
            history.push(`/user/signin/${params?.course_id}`)
            swal({
              title: "Error!",
              text: verificationResponse.data.message,
              icon: "error",
              timer: 5000
            });
            return false
          }
        }
      }
    } catch (err) {
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        history.push(`/user/signin/${params?.course_id}`)
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        return false
      }
    }
  }

  const handleModuleNavigation = (e) => {
    if (module_list) {
      var list = [...module_list];
      // find index of module
      var index = list.findIndex(obj => { if (obj.id == module_id) { return obj } })
      set_current_module_index(index)

      // check if last module in list 
      var lastModule = list.length - index;
      if (lastModule == 1) {
        set_last_module_check(true);
      } else {
        set_last_module_check(false)
      }

      // if index is true 
      if (index > -1) {

        if (e?.target?.name) {
          const name = e.target.name
          if (name == 'next') {
            var newIndex = index + 1;
          }
          if (name == 'back') {
            var newIndex = index - 1;
          }
        } else if (e) {
          const name = e;
          if (name == 'next') {
            var newIndex = index + 1;
          }
          if (name == 'back') {
            var newIndex = index - 1;
          }
        }
      }
      const getNewDetail = (list, newIndex) => {
        var new_module_id = list[newIndex]?.id;
        var module_type = list[newIndex]?.module_type;
        var sub_module_id = list[newIndex]?.sub_module_id;
        var iscomplete = list[newIndex]?.users[0]?.user_course_module?.status;
        // return new_module_id, module_type, sub_module_id, iscomplete
        if (new_module_id) {
          if (module_type == 'quiz' || module_type == 'security_questions' || module_type == "typing_dna") {
            if (iscomplete == 'COMPLETED') {
              getNewDetail(list, newIndex + 1)
            } else {
              set_content_id('')
              dispatch(tableofContentDetailAction(new_module_id))
              handleNavigation(sub_module_id, module_type, new_module_id)
            }
          } else {
            set_content_id('')
            dispatch(tableofContentDetailAction(new_module_id))
            handleNavigation(sub_module_id, module_type, new_module_id)
          }
        } else {
          history.push(`/user/CourseComplete/${params?.course_id}`)
        }
      }
      getNewDetail(list, newIndex)
    }
  }

  const handleNavigation = (sub_id, module_type, new_module_id) => {
    dispatch(tableofContentQuizDetailAction(sub_id))
    dispatch(tableofContentSecurityDetailAction(sub_id))

    if (module_type == 'quiz') {
      history.push(`/user/userquiz/${course_id}/${new_module_id}/${sub_id}`)
    }
    else if (module_type == 'grapejs') {
      history.push(`/user/module/${course_id}/${new_module_id}`)
    }
    else if (module_type == 'security_questions') {
      history.push(`/user/usersecurityquestion/${course_id}/${new_module_id}`)
    }
    else if (module_type == 'typing_dna') {
      history.push(`/user/typingDnaAuthenticUserCheck/${course_id}/${new_module_id}`)
    }
  }
  return (
    <div>
      <div className="noHeaderTop welcomeScreen mt-md-5 mt-0">

        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3 quiz_questioncontainer w-100">
          <Row className="justify-content-md-center d-row-flex">

            <Col xl={3} lg={3} md={4} sm={12} xs={4}>
              <h1 className="mb-md-3 mb-4 mt-lg-3">Security Question</h1>
              </Col>

            <Col xl={2} lg={4} md={5} sm={12} xs={8} className="md-right time">
              <div className="timeDiv">
                <span> Time Remaining </span>
                <p>
                  <img src={time_clock} className="pr-2" />
                  {module_time_obj.module_id == module_id ? secondToMinuteOrHourConvert(module_time) : `0 hr 0 min 0 sec `}
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <Form noValidate validated={validated} onSubmit={handleResponseSubmit}>
            <Row className="justify-content-md-center">
              <Col xl={5} lg={7} md={8} sm={12}>
                <div className="UserSecurityQuestion_container">
                  <p>You have {module_time ? secondToMinuteOrHourConvert(module_time) : `0 hr 0 min 0 sec `} to answer the following Question correctly</p>
                  <div className="progressBar">
                  </div>

                  {questionGroup ? questionGroup.map((que, index) => {

                    if (que.type == 'multiple_choice') {
                      return (
                        <>
                          <div key={`multi_choice-${index}`}>
                            <h5>{que.question ? que.question : 'Security Question'}</h5>
                            <div className="custom-radio-wrap">
                              <form>
                                {que.options ? que.options.map((opt, index) => {
                                  return (
                                    <>
                                      <div key={`mutil_sceuity-${index}`} className="form-group" >
                                        <input id={`${que.id}_${opt.id}_${index}`} type="radio" name="custom-radio-btn" onChange={(e) => { handleMultipleChoice(que.id, opt.id) }} />
                                        <label className="custom-radio" htmlFor={`${que.id}_${opt.id}_${index}`} ></label>
                                        <span className="label-text">{opt.option}</span>
                                      </div>
                                    </>
                                  )
                                }) : null}
                              </form>
                            </div>
                          </div>
                        </>
                      )
                    }
                    if (que.type == 'custom_answer') {
                      return (
                        <>
                          <div key={`custom_answer-${index}`}>
                            <h5>{que.question ? que.question : 'Security Question'}</h5>
                            <div className="custom-radio-wrap">
                              {/* <Form className="mt-3" > */}
                              <Form.Row>
                                <Form.Group as={Col}>
                                  {/* <Form.Label>Type the above text here</Form.Label> */}
                                  <Form.Control as="input" required placeholder="your answer will be here" rows={3} col={4} onChange={(e) => { handleCustomAnswer(e, que.id, que.type) }} />
                                </Form.Group>
                              </Form.Row>
                              {/* </Form> */}
                            </div>
                          </div>
                        </>
                      )
                    }
                    if (que.type == 'truth_or_false') {
                      return (
                        <>
                          <div key={`truth_false-${index}`}>
                            <h5>{que.question ? que.question : 'Security Question'}</h5>
                            <div className="custom-radio-wrap">
                              <form  >
                                <div className="form-group">
                                  <input id={`${que.id}_true`} type="radio" name="custom-radio-btn" value={true} onChange={(e) => { handleTruthFalse(e, que.id, que.type) }} />
                                  <label className="custom-radio" htmlFor={`${que.id}_true`}></label>
                                  <span className="label-text">True</span>
                                </div>
                                <div className="form-group">
                                  <input id={`${que.id}_false`} type="radio" name="custom-radio-btn" value={false} onChange={(e) => { handleTruthFalse(e, que.id, que.type) }} />
                                  <label className="custom-radio" htmlFor={`${que.id}_false`}></label>
                                  <span className="label-text">False</span>
                                </div>
                              </form>
                            </div>
                          </div>
                        </>
                      )
                    }

                  }) : null}

                </div>
              </Col>
            </Row>
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={12}
                className="text-center"
              >

                <Button
                  variant="primary"
                  className="btnSign mt-4 mb-3 pl-5 pr-5 pt-1 pb-1"
                  type="submit"
                  name="next"
                // onClick={testsample}            
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>

      </div>
    </div>
  );
};

export default UserSecurityQuestion;