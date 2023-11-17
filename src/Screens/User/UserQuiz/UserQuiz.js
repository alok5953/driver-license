import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./UserQuiz.css";
import { getUserQuizByIdAction, quizQuestionAnswerVerifyAction, securityQuestionAnswerVerifyAction, tableofContentDetailAction, tableofContentQuizDetailAction, tableofContentSecurityDetailAction, userForgotPasswordAction, getUserQuizModuleByIdAction, socketStartModuleAction, socketEmitStopModuleAction, socketEmitStartModuleAction, getUserDetailByTokenAction, checkUserSecurityQuestionDoneOrNotAction, checkUserAction, logoutUserAction, socketDisconnectAction, userPaymentStatusCheckAction, socketMarkModuleComplete, typing_dna_session_verified_userAction } from "../../../Redux/Actions";
import swal from "sweetalert";
import time_clock from "../../../Images/time_clock.svg";
import { secondToMinuteOrHourConvert } from "../../../Utils/Util";

const UserQuiz = () => {
  useEffect(() => {

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () { window.history.go(1) }
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
  }, [])


  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation()
  const params = useParams();


  const beforeUnload = (e) => {
    dispatch(logoutUserAction())
    history.push(`/user/signin/${course_id}`)
    var confirmationMessage = 'You are not allowed to refresh';
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc
  }

  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const module_time_obj = useSelector(state => { return state.userSocketioReducer?.socketTimerSuccessResponse })
  const quiz_time = useSelector(state => { return state.userSocketioReducer?.socketTimerSuccessResponse?.time })
  const quiz_timer_id = useSelector(state => { return state.userSocketioReducer?.socketTimerSuccessResponse?.module_id })
  const quiz_id = useSelector(state => { return state.tableofContentReducer?.tableofContentDetailQuizId?.data?.id });
  // const module_id = useSelector(state => { return state.tableofContentReducer?.tableofContentDetailId?.data?.id });
  const module_id = params?.module_id;
  const course_id = params?.course_id;
  const module_list = useSelector(state => { return state.tableofContentReducer?.tableofContentDetailList?.data });
  const [last_module_check, set_last_module_check] = useState(false);
  const [current_module_index, set_current_module_index] = useState('');
  const [content_id, set_content_id] = useState('');

  const [userId, setUserId] = useState('4234234dasda');

  //varibale declare
  const [quizQuestionList, setQuizQuestionList] = useState([]);
  //  User Response Data 
  const [userResponse, setUserResponse] = useState([]);
  const [verificationResponse, setVerificationResponse] = useState({})
  const [userResult, setUserResult] = useState('fail');
  const [answered_number, set_answered_number] = useState(0);
  const [send_ans_once, set_send_ans_once] = useState(0)
  const [resultShow, setResultShow] = useState(false);
  const handleResultShow = () => setResultShow(true);
  const handleResulthide = () => setResultShow(false);
  const [total_answered, set_total_answered] = useState(0);
  const [total_correct_ans, set_total_correct_ans] = useState(0);
  const [answer_percentage, set_answer_percentage] = useState('');
  const [attemptes_remaining, set_attempts_remaining] = useState(0);

  // from the question list 
  const [attempts_and_re_attempts, set_attempts_and_re_attempts] = useState('');
  const [after_completion_of_attempts, set_after_completion_of_attempts] = useState('');
  const [button_name, set_button_name] = useState('');
  const [grade_to_pass, set_grade_to_pass] = useState('');
  const [time_limit, set_time_limit] = useState('');
  const [title, set_title] = useState('');
  const [grade_category, set_grade_category] = useState('');
  const [availablity, set_availablity] = useState('');
  const [quiz_type, set_quiz_type] = useState('');
  const [module_name, set_module_name] = useState('');
  const [module_status, set_module_status] = useState('')
  const [timer_started, set_timer_started] = useState(false)


  useEffect(() => {
    getCheckDetails()
    paymentStatusCheck()
  }, [])

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
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${course_id}`)
      }
    }
    catch (err) {
      swal({
        title: "Error!",
        text: err.response.data.err,
        icon: "error",
        timer: 5000
      });
      history.push(`/user/signin/${course_id}`)
      dispatch(socketDisconnectAction(socket))
      dispatch(logoutUserAction())
    }
  }

  useEffect(() => {
    if(sessionStorage.getItem('userAccessToken')){
      if (params.module_id) {
        getUserQuizQuestion(params.quiz_id)
        getQuizModuleDetail(params.module_id)
      }
    }
  }, [params, socket])

  useEffect(() => {
    let length = userResponse?.length;
    set_answered_number(length);
  }, [userResponse])

  useEffect(() => {
    if (timer_started) {
      testsample()
    }
  }, [module_time_obj])


  const testsample = () => {

    if (send_ans_once == 0) {
      if (module_time_obj.module_id == module_id && module_time_obj.time <= 0) {

        let newArr = []
        if (userResponse !== []) {
          newArr = [...userResponse]
          quizQuestionList.forEach((q, i) => {
            let responseObj = { question_id: q.id, answer_ids: [] };
            if (newArr.some((qu) => { return qu.question_id == q.id })) {
              return false
            } else {
              newArr.push(responseObj)
            }
          })
        } else {
          newArr = []
          quizQuestionList.forEach((quest, i) => {
            let responseObj = { question_id: quest.id, answer_ids: [] };
            newArr.push(responseObj);
          })
        }
        setUserResponse(newArr)
        handleResponseSubmitApi(newArr)
        set_send_ans_once(1)
      }
      // }
    }
  }


  const [email, setEmail] = useState('');
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    try {
      const response = await dispatch(userForgotPasswordAction({ email: email }));
      const forgetPasswordData = response?.payload;

      if (forgetPasswordData) {
        if (forgetPasswordData?.data?.code == 200) {
          swal({
            title: "success!",
            text: forgetPasswordData?.data?.message,
            icon: "success",
            timer: 3000
          });

        } else if (forgetPasswordData?.data?.code == 401) {
          swal({
            title: "Error!",
            text: forgetPasswordData?.data?.message,
            icon: "error",
            timer: 3000
          });
        } else {
          swal({
            title: "Error!",
            text: forgetPasswordData?.data?.message,
            icon: "error",
            timer: 3000
          });
        }
      }
    }
    catch (err) {
      swal({
        title: "Error!",
        text: err.response.data.err,
        icon: "error",
        timer: 5000
      });
    }
  };



  const getUserQuizQuestion = async (id) => {
    try {
      const response = await dispatch(getUserQuizByIdAction(id))
      const quizDetail = response?.payload;
      if (quizDetail) {
        if (quizDetail.data) {
          if (quizDetail.data.code == 200) {

            const { attempts_and_re_attempts, after_completion_of_attempts, grade_category, grade_to_pass, title, availablity, quiz_type, time_limit, time_limit_status, } = quizDetail.data.data
            set_attempts_remaining(attempts_and_re_attempts);
            set_attempts_and_re_attempts(attempts_and_re_attempts);
            set_after_completion_of_attempts(after_completion_of_attempts);
            set_grade_to_pass(grade_to_pass);
            set_title(title);
            set_grade_category(grade_category);
            set_availablity(availablity);
            set_quiz_type(quiz_type)
            setQuizQuestionList(quizDetail.data.data?.questions)
            if (quizDetail.data.data?.questions) {
              let quizLIst = quizDetail.data.data.questions
              let newArr = []
              quizLIst.forEach((quest, i) => {
                let responseObj = { question_id: quest.id, answer_ids: [] };
                newArr.push(responseObj);
              })
              setUserResponse(newArr)
            }
            handleResulthide()
            set_total_answered(0)
            set_total_correct_ans(0)
            set_answer_percentage('')

          } else {
            swal({
              title: "Error!",
              text: quizDetail.data.message,
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
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        history.push(`/user/signin/${course_id}`)
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())

      }
    }
  }

  const getQuizModuleDetail = async (id) => {
    try {
      const response = await dispatch(getUserQuizModuleByIdAction(id))
      const quizModuleDetail = response?.payload;

      if (quizModuleDetail) {
        if (quizModuleDetail.data) {
          if (quizModuleDetail.data.code == 200) {
            const { completion_time, module_type, name, users, course_id } = quizModuleDetail.data.data
            set_module_name(name)
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
              text: quizModuleDetail.data.message,
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
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        history.push(`/user/signin/${course_id}`)
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())

      }
    }
  }
  // save input 
  const handleUserInput = (question_id, option_id, e, type) => {

    if (type == 'multiple_choice_question') {
      let newResponse = [...userResponse];
      let quiz_index = newResponse.findIndex(id => id.question_id == question_id);
      let responseObj = { question_id: question_id, answer_ids: [option_id] };

      if (e.target.checked) {
        if (userResponse.some(id => id.question_id == question_id)) {
          let new_ans_ids = [...newResponse[quiz_index]?.answer_ids]
          newResponse[quiz_index] = { ...newResponse[quiz_index], answer_ids: [...new_ans_ids, option_id] }
          setUserResponse(newResponse)
        }
        else {
          userResponse.push(responseObj);
        }
      } else {
        let new_ans_ids = [...newResponse[quiz_index]?.answer_ids]
        if (new_ans_ids) {
          var index_ = new_ans_ids.findIndex(function (o) { return o === option_id; })

          if (index_ !== -1) { new_ans_ids.splice(index_, 1) };
          newResponse[quiz_index] = { ...newResponse[quiz_index], answer_ids: [...new_ans_ids] }
          setUserResponse(newResponse)
        }
      }
    }
    if (type == 'single_choice_question') {
      let responseObj = { question_id: question_id, answer_ids: [option_id] };
      if (userResponse.some(id => id.question_id == question_id)) {
        let newResponse = [...userResponse];
        let quiz_index = newResponse.findIndex(id => id.question_id == question_id);
        newResponse[quiz_index] = { ...newResponse[quiz_index], answer_ids: [option_id] }
        setUserResponse(newResponse)
      }
      else {
        userResponse.push(responseObj);
      }
    }
  }


  //  check all questions are answered
  const handleResponseSubmit = () => {
    if (attemptes_remaining > 0) {
      let errorMsg = '';
      if (errorMsg == '') {
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

  const handleResponseSubmitApi = async (userresponse) => {
    try {

      let user_response = {
        "module_id": module_id,
        "answers": [...userresponse]
      };


      const response = await dispatch(quizQuestionAnswerVerifyAction(user_response))
      const resultResponse = response?.payload;
      if (resultResponse) {
        if (resultResponse.data) {
          if (resultResponse.data.code == 200) {

            const { pass, percentage } = resultResponse.data.data;
            setVerificationResponse(resultResponse.data.data)
            if (pass) {
              handleResultShow()
              set_answer_percentage(percentage.toString())
              setUserResult('pass')
              swal({
                title: "Passed",
                text: resultResponse.data.message,
                icon: "success",
                timer: 6000
              })
              if (timer_started) {
                dispatch(socketMarkModuleComplete(socket, module_id))
                dispatch(socketEmitStopModuleAction(socket, module_id))
              }
            }
            //  data received ??
          } else if (resultResponse.data.code == 400) {
            const { pass, percentage } = resultResponse.data.data;
            handleResultShow()
            setUserResult('fail')
            let attemptsRemaining;
            attemptsRemaining = attemptes_remaining - 1;
            set_attempts_remaining(attemptsRemaining)

            if (quiz_timer_id == module_id && quiz_time <= 0) {
              if (timer_started) {
                dispatch(socketEmitStopModuleAction(socket, module_id))
              }

              swal({
                title: "Fail!",
                text: `Time up. You have scored ${percentage}%`,
                icon: "error",
                timer: 6000
              }).then(() => {

                handleModuleNavigation('back')
              })

            } else if (attemptsRemaining == 0) {
              if (timer_started) {
                dispatch(socketEmitStopModuleAction(socket, module_id))
              }
              swal({
                title: "Fail!",
                text: 'Maximum attempts reached',
                icon: "error",
                timer: 6000
              }).then(() => {

                handleModuleNavigation('back')
              })
            } else {
              swal({
                title: "Error!",
                text: resultResponse.data.message,
                icon: "error",
                timer: 6000
              });
            }
          }
        }
      }
    } catch (err) {
      if (timer_started) {
        dispatch(socketEmitStopModuleAction(socket, module_id))
      }
      if (err?.response?.data?.code === 401) {
        swal({
          title: "Error!",
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        history.push(`/user/signin/${course_id}`)
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())

      }
    }
  }


  const handleModuleNavigation = (e, after_completion) => {
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

        const newModuleNav = () => {
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

              //history.push('/user/tableofcontent')
              history.push(`/user/CourseComplete/${course_id}`)
            }

          }
          getNewDetail(list, newIndex)
        }
        if (after_completion) {
          if (after_completion == 'restart_module_again') {
            history.push(`/user/tableofcontent/${course_id}`)
          } else if (after_completion == 'restart_quiz_again') {
            window.location.reload()
          } else if (after_completion == 'continue_to_next_module') {
            newModuleNav()
          } else {
            window.location.reload()
          }

        } else {
          newModuleNav()
        }

      }
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

      <div className="noHeaderTop welcomeScreen">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3 quiz_questioncontainer w-100">
          <Row className="justify-content-md-center d-row-flex">
            <Col xl={9} lg={9} md={10} sm={12} xs={12}>

              <Row className="d-row-flex">
                <Col xl={9} lg={8} md={7} sm={12} xs={4}><h1> {module_name.charAt(0).toUpperCase() + module_name.slice(1)} </h1> </Col>

                <Col xl={3} lg={4} md={5} sm={12} xs={8} className="md-right time">
                  <div className="timeDiv">
                    <span> Time Remaining </span>
                    <p>
                      <img src={time_clock} className="pr-2" />
                      {module_time_obj.module_id == module_id ? secondToMinuteOrHourConvert(quiz_time) : `0 hr 0 min 0 sec `}
                    </p>
                  </div>
                </Col>

               
              </Row>
              {resultShow && userResult == 'pass' ?
                <div className="Correct_answerscontainer">
                  <p><span>{`${answer_percentage}%`}    </span>Correct Answers</p>
                  <p>Congratulations, You have successfully Passed this Quiz.</p>
                </div> : null}

              {resultShow && userResult == 'fail' ?
                <div className="failed_answerscontainer">
                  <h5>Failed! Try Again!</h5>
                  <p>You have not achieved minimum grade for passing this Quiz</p>
                </div> : null}


              <Col xl={12} lg={12} md={12} sm={12}>
                <div className="UserSecurityQuestion_container">
                  {quizQuestionList ? quizQuestionList.map((quiz, index) => {
                    let _is_disabled = false
                    if ((userResult == 'fail' && attemptes_remaining == 0) || (userResult == 'pass')) {
                      _is_disabled = true
                    }
                    if (quiz_type == 'single_choice_question') {
                      return (
                        <div key={`single_choice_question-${index}`} className="question" >
                          <h5>Q.{index + 1}. {quiz.question ? quiz.question : 'Quiz Question ?'}</h5>
                          <div className="custom-radio-wrap">
                            <form>
                              {quiz.options ? quiz.options.map((opt, i) => {

                                return (<>
                                  <div className="form-group" key={`quiz_toption-${i}`}>
                                    <input id={`${opt.id}_${i}`} type="radio" name="custom-radio-btn" disabled={_is_disabled} onChange={(e) => handleUserInput(quiz.id, opt.id, e, quiz_type)} />
                                    <label className="custom-radio" htmlFor={`${opt.id}_${i}`}></label>
                                    <span className="label-text">{opt.option ? opt.option : `option ${i + 1}`}</span>
                                  </div>
                                </>)
                              }) : null
                              }
                            </form>
                          </div>
                        </div>
                      )
                    }
                    if (quiz_type == 'multiple_choice_question') {
                      return (
                        <div key={`multiple_choice_question9-${index}`} className="question" >
                          <h5>Q.{index + 1}. {quiz.question ? quiz.question : 'Quiz Question ?'}</h5>
                          <div className="custom-radio-wrap">
                            <form>
                              {quiz.options ? quiz.options.map((opt, i) => {

                                return (<>
                                  <div className="form-group" key={`multiple_choice_question9_answer-${i}`}>
                                    <input id={`${opt.id}_${i}`} type="checkbox" name="custom-radio-btn" disabled={_is_disabled} onChange={(e) => handleUserInput(quiz.id, opt.id, e, quiz_type)} />
                                    <label className="custom-radio" htmlFor={`${opt.id}_${i}`}></label>
                                    <span className="label-text">{opt.option ? opt.option : `option ${i + 1}`}</span>
                                  </div>
                                </>)
                              }) : null
                              }
                            </form>
                          </div>
                        </div>
                      )
                    }
                  }) : null}

                  {
                    userResult == "pass" ?
                      <Button variant="primary" className="btnSign mt-4 questionsubmitbtn" name="next" onClick={(e) => handleModuleNavigation(e)}>
                        Next
                      </Button> : null
                  }
                  {
                    userResult == 'fail' && attemptes_remaining !== 0 ?
                      <Button variant="primary" className="btnSign mt-4 questionsubmitbtn" onClick={(e) => handleResponseSubmit(e)}>
                        Submit
                      </Button> : null
                  }
                  {
                    userResult == 'fail' && attemptes_remaining == 0 ?
                      <Button variant="primary" className="btnSign mt-4 questionsubmitbtn" name="back" onClick={(e) => handleModuleNavigation(e, after_completion_of_attempts)}>
                        {/* {button_name} */}
                        {(() => {
                          switch (after_completion_of_attempts) {
                            case "restart_module_again": return "Back";
                            case "restart_quiz_again": return "Restart";
                            case "continue_to_next_module": return "Continue";
                            default: return "Restart";
                          }
                        })()}
                      </Button> : null
                  }
                
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserQuiz;