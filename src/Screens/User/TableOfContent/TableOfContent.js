import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./TableOfContent.css";
import swal from "sweetalert";
import Accordion from 'react-bootstrap/Accordion'
import ProgressBar from "react-bootstrap/ProgressBar";
import licensingimg from "../../../Images/licensingimg.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTableofContentCourseInfoAction, getTableofContentListAction, socketEmitResetAllAction, tableofContentDetailAction, tableofContentListAction, tableofContentQuizDetailAction, tableofContentSecurityDetailAction, getUserDetailByTokenAction, checkUserSecurityQuestionDoneOrNotAction, checkUserAction, typing_dna_session_verified_userAction,socketDisconnectAction,logoutUserAction,userPaymentStatusCheckAction } from "../../../Redux/Actions";

const TableOfContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
 
  const course_id = params?.course_id

  const [tableofContentList, setTableofContentList] = useState([]);
  const [courseDetail, setCourseDetail] = useState([])
  const [courseTitle, setCourseTitle] = useState('');
  const [exp_date, set_exp_date] = useState("");
  const [progress_percentage, set_progress_percentage] = useState('')
  const [video_file_path, set_video_file_path] = useState('');
  const [activeId, setActiveId] = useState("");
  const [isActive, setActiveStatus] = useState(false);
  const [resumeId, setResumeId] = useState('');
  const [resumeModule, setResumeModule] = useState({});

  const [open_the_quiz_status, set_open_the_quize_status] = useState(false);
  const [course_module_status, set_course_module_status] = useState('')

  const toggleActive = (id) => {
    // console.log(id)
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [setuser, setusershow] = useState(false);
  const userhandleClose = () => setusershow(false);
  const userhandleShow = () => setusershow(true);

  const [status_check, set_status_check] = useState('started')

  useEffect(() => {
    if (course_id) {
      getTableofContent(course_id)
      getTableofContentCourseInfo(course_id)
    }
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
      dispatch(socketDisconnectAction(socket))
      dispatch(logoutUserAction())
      history.push(`/user/signin/${course_id}`)
    }
  }



  const getTableofContent = async (id) => {
    try {
      const response = await dispatch(getTableofContentListAction(id))
      const getTableofContentListSuccess = response?.payload;

      if (getTableofContentListSuccess) {
        if (getTableofContentListSuccess.data) {
          if (getTableofContentListSuccess.data.code == 200) {
            //   setCourseList(getTableofContentListSuccess.data.data?.rows )
            setTableofContentList(getTableofContentListSuccess.data.data?.rows)
            checkLastCompletedGrapesModule(getTableofContentListSuccess.data.data?.rows)
            dispatch(tableofContentListAction(getTableofContentListSuccess.data.data?.rows))
            //check status all the module
            let array_list = [], count = 0;
            getTableofContentListSuccess?.data.data?.rows?.map((tb, index) => {
              count = count + 1;
              if (tb?.users.length == 0) {
              } else if (tb?.users[0]?.user_course_module?.status == 'IN_PROGRESS') {
                array_list.push('IN_PROGRESS')
              } else if (tb?.users[0]?.user_course_module?.status == 'COMPLETED') {
                array_list.push('COMPLETED')
              }
              if (count >= getTableofContentListSuccess?.data.data?.rows.length) {
                if (array_list.length == 0) {
                  set_status_check('started')
                } else {
                  var numOfTrue = array_list.filter(x => x === "COMPLETED").length;
                  if (numOfTrue == getTableofContentListSuccess?.data.data?.rows.length) {
                    set_status_check('copleted')
                  } else {
                    set_status_check('inprogress')
                  }
                }
              }

            })
          } else {
            // error message
            swal({
              title: "Error!",
              text: getTableofContentListSuccess.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
      }
    } catch (err) {
      if (err?.response?.data?.code === 401) {
        console.log(err)
        swal({
          title: "Error!",
          text: err?.response?.data?.err,
          icon: "error",
          timer: 5000
        });
        dispatch(socketDisconnectAction(socket))
        dispatch(logoutUserAction())
        history.push(`/user/signin/${course_id}`)
      }
    }
  }
  const checkModuleInProgress = (array) => {
    let newArr = [...array]
    let id, index, module
    let reverseArr = newArr.reverse()
    index = reverseArr.findIndex((mod) => {
      if (mod?.users[0]) {
        if (mod?.users[0]?.user_course_module) {
          let status = mod?.users[0]?.user_course_module?.status
          if (status == 'IN_PROGRESS') {
            return mod
          }
        }
      }
    })
  }

  const checkLastCompletedGrapesModule = async (array) => {
    let newArr = [...array]
    let id, index, module
    let reverseArr = newArr.reverse()
    const response = await checkModuleInProgress(reverseArr)


    index = reverseArr.findIndex((mod) => {
      if (mod?.module_type == 'quiz' || mod?.module_type == 'security_questions' || mod?.module_type == 'typing_dna') {
        if (mod?.users[0]) {
          if (mod?.users[0]?.user_course_module) {
            let status = mod?.users[0]?.user_course_module?.status
            if (status == 'IN_PROGRESS') {
              return mod
            }
          }
        }
      } else if (mod?.module_type == 'grapejs') {
        if (mod?.users[0]) {
          if (mod?.users[0]?.user_course_module) {
            let status = mod?.users[0]?.user_course_module?.status
            if (status == 'IN_PROGRESS' || status == 'COMPLETED') {

              return mod
            }
          }
        }
      }
    })
    if (index > -1) {
      if (reverseArr[index]?.module_type == 'quiz') {
        if (reverseArr[index + 1]?.module_type == 'grapejs') {
          id = reverseArr[index + 1].id
          module = reverseArr[index + 1]
        } else {
          id = reverseArr[index].id
          module = reverseArr[index]
        }
      } else {
        id = reverseArr[index].id
        module = reverseArr[index]
      }

      setResumeId(id)
      setResumeModule(module)
    } else {
      id = array[0].id
      module = array[0]
      setResumeId(id)
      setResumeModule(module)
    }

  }

  const getTableofContentCourseInfo = async (id) => {
    try {
      const response = await dispatch(getTableofContentCourseInfoAction(id))
      const getTableofContentListSuccess = response?.payload;

      if (getTableofContentListSuccess) {
        if (getTableofContentListSuccess.data) {
          if (getTableofContentListSuccess.data.code == 200) {

            setCourseDetail(getTableofContentListSuccess.data.data)
            const { course_title, video_file_path, users } = getTableofContentListSuccess.data.data;
            setCourseTitle(course_title)
            set_video_file_path(video_file_path)

            if (users?.length > 0) {
              let exp_date;
              let progress_percent;
              if (users[0]?.user_course) {
                const { course_status, expires_in, progress_percentage } = users[0]?.user_course;
                progress_percent = progress_percentage;
                if (expires_in) {
                  exp_date = new Date(expires_in).toLocaleDateString('en-US');
                }
              }
              set_progress_percentage(progress_percent);
              set_exp_date(exp_date)
            }
          } else {
            // error message
            swal({
              title: "Error!",
              text: getTableofContentListSuccess.data.message,
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
        history.push(`/user/signin/${course_id}`)
      }
    }
  }


  const handleModuleNavigation = (module_id, sub_id, module_type) => {
    dispatch(tableofContentDetailAction(module_id))
    if (module_type == 'grapejs') {
      history.push(`/user/module/${course_id}/${module_id}`)
    }

  }

  const handleResume = () => {
    let new_module_id = resumeModule?.id;
    let module_type = resumeModule?.module_type;
    let sub_module_id = resumeModule?.sub_module_id
    dispatch(tableofContentDetailAction(new_module_id))
    dispatch(tableofContentQuizDetailAction(sub_module_id))
    dispatch(tableofContentSecurityDetailAction(sub_module_id))

    if (module_type == 'quiz') {
      history.push(`/user/userquiz/${course_id}/${new_module_id}/${sub_module_id}`)
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
      {/* <Header></Header> */}

      <div className="mainSection maintableSection mt-3 pb-4">
        <Container>
          <h5 className="licensing_text pretextheading">{courseTitle ? courseTitle : 'Course Title'}</h5>
          <Row>
            <Col xl={8} lg={8} md={8} sm={12}>
              <div className="courseDescription mt-3">

                <div className="accordion_divcontainer">
                  <p className="table_of_content">Table of content</p>
                  <Accordion>

                    {tableofContentList ? tableofContentList.map((tb, index) => {
                      let status, ischecked, isModuleOpen, isResume;
                      if (tb.module_type !== 'typing_dna' && tb.module_type !== 'security_questions') {
                        // Checked status 
                        if (tb?.users[0]?.user_course_module?.status) {
                          status = tb?.users[0]?.user_course_module?.status
                        } else {
                          status = ''
                        }
                        if (status == 'COMPLETED') {
                          ischecked = true
                        } else {
                          ischecked = false
                        }
                        // handle click on
                        if (tb.module_type !== 'quiz') {
                          if (tableofContentList[index - 1]?.users[0]?.user_course_module?.status) {
                            let _prevstatus = tableofContentList[index - 1]?.users[0]?.user_course_module?.status
                            if (status == 'COMPLETED' || _prevstatus == 'COMPLETED') {
                              isModuleOpen = true
                            } else if (_prevstatus == 'IN_PROGRESS') {
                              isResume = true
                            } else {
                              isModuleOpen = false
                            }
                          }
                          if (index == 0) {
                            isModuleOpen = true
                          }
                        }

                        return (
                          <>

                            <Card key={`tobqw-${index}`} className="QuizCollapse" >
                              <Accordion.Toggle as={Card.Header} eventKey={`${index}`} onClick={(e) => { if (isModuleOpen) { handleModuleNavigation(tb.id, tb.sub_module_id, tb.module_type) } else if (isResume) { handleResume() } }} className="quizTabs pt-4 pb-4">
                                <h3>
                                  <Form.Group
                                    as={Col}
                                    className="samecheckbox nopadd accordian_maincontainer"
                                  >
                                    <div className="custom-control custom-checkbox text-left">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                        disabled
                                        checked={ischecked}
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="customCheck1"
                                      >{tb.name ? tb.name : "Module Name"}</label>
                                    </div>
                                  </Form.Group>
                                </h3>
                                {/* <span className="accordionDownIcon"></span> */}
                              </Accordion.Toggle>
                             
                            </Card>

                          </>
                        )
                      }
                    }) : null}
                  </Accordion>
                </div>
              </div>
            </Col>

            <Col xl={4} lg={4} md={4} sm={12} className="pl-lg-5">
              {/* <div className="stickyRight enrollBar mt-3 nopadd licensing_container"> */}
              <div className=" enrollBar mt-3 nopadd licensing_container">

                <div className="embed-responsive embed-responsive-16by9">
                  {video_file_path ?
                    <video
                      width="355"
                      height="200"
                      controls
                      frameBorder="0"
                      controlslist="nodownload"
                    // poster=""
                    >
                      <source src={video_file_path} type="video/mp4" />
                      <p>Your browser doesn't support HTML5 video. Here is
                        a <a href="myVideo.mp4">link to the video</a> instead.</p>
                    </video>
                    :
                    <video
                      width="355"
                      height="200"
                      controls
                      frameBorder="0"
                      controlsList="nodownload"
                    // poster=""
                    >
                      <p>Your browser doesn't support HTML5 video. Here is
                        a <a >link to the video</a> instead.</p>
                    </video>
                  }
                </div>
                <div className="card_licensing_text">
                  <h5 className="licensing_text">{courseTitle ? courseTitle : 'Course Title'}</h5>
                  {/* <h6 className="Transaction_text">Order ID : 000-12-922-0999 | Transaction ID: 123545</h6> */}
                  <h6 className="Expiry_text">{exp_date ? `Expiry Date: ${exp_date}` : 'Expiry Date'}</h6>
                  <div className="progressBar">
                    <p className="d-inline-block mb-1"> In progress</p>
                    <span> {progress_percentage ? progress_percentage : 0}% Completed</span>
                    <ProgressBar variant="success" now={progress_percentage ? progress_percentage : 0} />
                  </div>

                  {status_check == 'started' ? <Button variant="primary" disabled={(tableofContentList.length == 0 ? true : false)} className="w-100 btnSign mt-4" onClick={handleResume} >
                    Start
                  </Button> : status_check == 'inprogress' ? <Button variant="primary" className="w-100 btnSign mt-4" onClick={handleResume} >
                    Resume Now
                  </Button> : <Button variant="primary" className="w-100 btnSign mt-4" disabled>
                    Completed
                  </Button>}

                </div>
              </div>
              <div className=" enrollBar mt-3 nopadd licensing_container" >
                <div className="card_licensing_text chat_box_text" >
                  <img src={licensingimg} className="licensingimg pb-3 pt-3" />
                  <p className="mb-3">If you are facing any issue related to our course. our technical support team is always ready to help you.</p>
                  <p className="mb-3">Phone: 240-567-0708</p>
                  <p>Email: info@technical.com</p>
                  {/* <Button variant="primary" className="w-100 btnSign mt-4">
                        <img src={user} className="livechat_img" />
                        <Link to={"/user/signin"}>Live chat</Link>
                      </Button> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TableOfContent;