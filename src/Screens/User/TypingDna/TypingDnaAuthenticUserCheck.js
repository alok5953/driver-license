import { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./TypingDna.css";
import swal from 'sweetalert';
import {
  getQuotesAction, typingDnaVerifyAction, tableofContentDetailAction, tableofContentQuizDetailAction, tableofContentSecurityDetailAction, typingDnaAutoAction, logoutUserAction,
  getUserDetailByTokenAction, checkUserSecurityQuestionDoneOrNotAction, checkUserAction, socketEmitStartModuleAction, getUserQuizModuleByIdAction, socketMarkModuleComplete, socketEmitStopModuleAction, typing_dna_session_verified_userAction, socketDisconnectAction,userPaymentStatusCheckAction
} from "../../../Redux/Actions";
let tt = new window.TypingDNA();
tt.addTarget('inputtextbox');
let visualizer = new window.TypingVisualizer();
var count = 0;

const TypingDnaAuthenticUserCheck = () => {
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

  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation()
  const params = useParams();
  //varibale declare
  // const module_id = useSelector(state => { return state.tableofContentReducer?.tableofContentDetailId?.data?.id });
  //const socket = useSelector(state=>{return state.userSocketioReducer?.socketConnectSuccess?.socketInstance})
  const module_id = params?.module_id;
  const course_id = params?.course_id;
  const module_list = useSelector(state => { return state.tableofContentReducer?.tableofContentDetailList?.data });

  const [last_module_check, set_last_module_check] = useState(false);
  const [current_module_index, set_current_module_index] = useState('');
  const [content_id, set_content_id] = useState('');

  const [module_name, set_module_name] = useState('');
  const [module_status, set_module_status] = useState('');
  const [timer_started, set_timer_started] = useState(false)

  visualizer.addTarget(['inputtextbox']);
  document.getElementById('inputtextbox')
  const [quote, setQuotes] = useState("");
  const [description, set_description] = useState("");
  const [validated, setValidated] = useState(false);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })



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
            history.push(`/user/setupsecurityquestion/${params.course_id}`)
            return false
          } else {
            var typingDnaResponse = await dispatch(checkUserAction())
            typingDnaResponse = typingDnaResponse?.payload;
            if (typingDnaResponse?.data?.count < 2) {
              history.push(`/user/typingdna/${params.course_id}`)
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
        history.push(`/user/signin/${params.course_id}`)
      }
    }
    catch (err) {
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




  useEffect(() => {

    getQuotes()
    getTypingDNAModuleDetail(module_id)
  }, [params, socket]);

  const getTypingDNAModuleDetail = async (id) => {
    try {
      const response = await dispatch(getUserQuizModuleByIdAction(id)) // the api is calling module by id only not quiz 
      const typingModuleDetail = response?.payload;

      if (typingModuleDetail) {
        if (typingModuleDetail.data) {
          if (typingModuleDetail.data.code == 200) {
            const { module_type, name, users, course_id } = typingModuleDetail.data.data
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
              text: typingModuleDetail.data.message,
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
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${params.course_id}`)

      }
    }
  }

  const getQuotes = async () => {
    try {
      const result = await dispatch(getQuotesAction(120, 160));
      setQuotes(result?.payload?.data?.quote)
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
          let quality = Math.round(tt.getQuality(pattern));
          const response = await dispatch(typingDnaVerifyAction({ "typing_pattern": pattern, quality: quality, module_id: module_id }))
          const resDetailList = response?.payload;

          //value assign in varible
          if (resDetailList) {
            if (resDetailList.data) {
              if (resDetailList.data.statusCode == 200) {
                if (resDetailList.data.result == 1) {
                  swal({
                    title: "Success!",
                    text: resDetailList.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  if (timer_started) {
                    dispatch(socketMarkModuleComplete(socket, module_id))
                    dispatch(socketEmitStopModuleAction(socket, module_id))
                  }
                  handleModuleNavigation('next')
                } else {
                  swal({
                    title: "Fail!",
                    text: 'You failed. Try Again',
                    icon: "error",
                    timer: 3000
                  });
                }
                count = count + 1;

                if (count == 3) {

                  swal({
                    title: "Error!",
                    text: 'You are unauthorised user.',
                    icon: "error",
                    timer: 5000
                  });
                  history.push(`/user/signin/${params.course_id}`)
                  if (timer_started) {
                    dispatch(socketEmitStopModuleAction(socket, module_id))
                  }
                  history.push(`/user/signin/${params.course_id}`)
                  setTimeout(() => {
                    if (timer_started) {
                      dispatch(socketEmitStopModuleAction(socket, module_id))
                    }
                    dispatch(socketDisconnectAction(socket))
                    dispatch(logoutUserAction())
                  }, 2000)

                }
                getQuotes()
                setValidated(false);
                set_description('')
              } else {
                swal({
                  title: "Error!",
                  text: resDetailList.data.message,
                  icon: "error",
                  timer: 3000
                });
                getQuotes()
                setValidated(false);
                set_description('')
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
  };

  const handleChange = (e) => {
    e.preventDefault();
  };



  // navigation 
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
            history.push(`/user/CourseComplete/${course_id}`)
          }

        }
        getNewDetail(list, newIndex)

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
      <div className="noHeaderTop welcomeScreen mt-5">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <h5 className="licensing_text mb-4">Biometric Authentication</h5>
          <Row className="justify-content-md-center">
            <Col xl={5} lg={7} md={8} sm={12}>
              <Card className="p-xl-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5">
                <Card.Body>
                  {/* <Card.Title className="text-center mb-0">
                    Welcome Back!
                  </Card.Title> */}
                  <h5 className="licensing_text mb-4">Authenticate Step {count + 1} / 3</h5>
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
          <Row>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              className="text-md-left text-center"
            >
              {/* <Button
              name="back"
              variant="primary"
              className="btnSame btnPadding btnBorder mt-4"
              onClick={e=>handleModuleNavigation(e)}
            >
              Back
            </Button> */}

            </Col>
            <Col
              xl={6}
              lg={6}
              md={6}
              sm={12}
              className="text-md-right text-center"
            >
              {/* <Button
              variant="primary"
              className="btnSign mt-4 mb-3 pl-5 pr-5 pt-1 pb-1"
              type="submit"
              name="next"
              onClick={e=>handleModuleNavigation(e)}   
            >
              Continue
            </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TypingDnaAuthenticUserCheck;