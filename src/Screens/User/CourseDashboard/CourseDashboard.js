import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";

import ProgressBar from "react-bootstrap/ProgressBar";
// import Logo from "../../../Images/svg/logo.svg";

import "./CourseDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { courseDetailAction, socketConnectAction, logoutUserAction, getUserDetailByTokenAction, checkUserSecurityQuestionDoneOrNotAction, checkUserAction, typing_dna_session_verified_userAction, getTableofContentListAction, getUserCourseListAction, tableofContentDetailAction, tableofContentListAction, userPaymentStatusCheckAction, socketDisconnectAction, userCourseDetailAction } from "../../../Redux/Actions";



const CourseDashboard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const course_id = params?.course_id
  const [courseList, setCourseList] = useState([]);
  const today = new Date()
  useEffect(() => {
    getCourseList()
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
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })

  const getCourseList = async () => {
    try {
      // check other detail pending or not
      let userDetailResponse = await dispatch(getUserDetailByTokenAction())
      userDetailResponse = userDetailResponse?.payload;
      userDetailResponse = userDetailResponse?.data?.data
      if (userDetailResponse.is_active) {
        if (!userDetailResponse.address_line_1 || !userDetailResponse.first_name || !userDetailResponse.last_name || !userDetailResponse.user_name || !userDetailResponse.email ||
          !userDetailResponse.date_of_birth || !userDetailResponse.country || !userDetailResponse.mobile_number || !userDetailResponse.state ||
          !userDetailResponse.zipcode || !userDetailResponse.permit_first_name || !userDetailResponse.permit_last_name || !userDetailResponse.permit_suffix || !userDetailResponse.class_of_permit || !userDetailResponse.permit_expiration_date || !userDetailResponse.dmv_id || !userDetailResponse.document_no) {
            swal({
              title: "Error!",
              text: 'Please complete your registration process first.',
              icon: "error",
              timer: 3000
            });
            history.push(`/user/profile/${params.course_id}`);
        } else {
          var securityQuestionResponse = await dispatch(checkUserSecurityQuestionDoneOrNotAction())
          securityQuestionResponse = securityQuestionResponse?.payload;
          if (!securityQuestionResponse?.data?.data?.isDone) {
            swal({
              title: "Error!",
              text: 'Please complete your registration process first.',
              icon: "error",
              timer: 3000
            });
            history.push('/user/setupsecurityquestion')
            return false
          } else {
            var typingDnaResponse = await dispatch(checkUserAction())
            typingDnaResponse = typingDnaResponse?.payload;
            if (typingDnaResponse?.data?.count < 2) {
              swal({
                title: "Error!",
                text: 'Please complete your registration process first.',
                icon: "error",
                timer: 3000
              });
              history.push('/user/typingdna')
              return false
            } else {
              var typingDnaAuthUserResponse = await dispatch(typing_dna_session_verified_userAction())
              typingDnaAuthUserResponse = typingDnaAuthUserResponse?.payload;
              if (!typingDnaAuthUserResponse?.data?.is_typingDNA_verified) {
                history.push(`/user/verify/${params?.course_id}`)
              } else {
                const response = await dispatch(getUserCourseListAction())
                const getCourseListSuccess = response?.payload;

                if (getCourseListSuccess) {
                  if (getCourseListSuccess.data) {
                    if (getCourseListSuccess.data.code == 200) {

                      setCourseList(getCourseListSuccess.data.data?.rows)
                    } else {
                      // error message
                      swal({
                        title: "Error!",
                        text: getCourseListSuccess.data.message,
                        icon: "error",
                        timer: 6000
                      });
                    }
                  }
                }
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
        history.push(`/user/signin/${course_id}`)
      }
    }
  }

  const handleStartCourse = (id) => {
    try {
      var course_id = id
      const response = dispatch(userCourseDetailAction(course_id));
      const responseSuccess = response?.payload;

      if (responseSuccess) {
        if (responseSuccess.data) {
          if (responseSuccess.data.code == 200) {
            history.push(`/user/tableofcontent/${course_id}`)
          }
        }
      }
    } catch (err) {
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
        history.push(`/user/signin/${course_id}`)
      }
    }

  }



  return (
    <div>
      <div className="breadcrumbBg">
        <h1 className="mb-md-0 mt-2">My Course Dashboard</h1>
        {/* <Breadcrumb>
          <Breadcrumb.Item href="javascript:;">All courses </Breadcrumb.Item>
        </Breadcrumb> */}
      </div>

      <div className="mainSection marginmainTop mt-3 pb-4">
        <div className="allCourses">
          <Container>
            <Row>
              {
                courseList ? courseList.map((course, i) => {
                  let exp_date,expr_date,curren_date ;
                  let progress_percent;
                  if (course?.users[0]?.user_course) {
                    const { course_status, expires_in, progress_percentage } = course?.users[0]?.user_course;
                    progress_percent = progress_percentage;
                    expr_date = new Date(expires_in);
                    curren_date  = new Date();
                    if (expires_in) {
                      exp_date = new Date(expires_in).toLocaleDateString('en-US');
                    }
                  }

                  return (
                    <>
                      <Col kye={i} xl={4} lg={4} md={6} sm={12} key={`userdashboard-${i}`} >
                        <Card>
                          <div className="embed-responsive embed-responsive-16by9">
                            {/* <iframe
                      width="355"
                      height="200"
                      src=''
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe> */}
                            <video
                              width="355"
                              height="200"
                              controls
                              frameBorder="0"
                              controlslist="nodownload "
                            // poster=""
                            >
                              <source src={course.video_file_path} type="video/mp4" />

                              <p>Your browser doesn't support HTML5 video. Here is
                                a <a href="myVideo.mp4">link to the video</a> instead.</p>
                            </video>
                          </div>
                          <Card.Body className="pt-0 pb-4 pl-2 pr-2">
                            <Row>
                              <Col xl={7} lg={7} md={7} sm={6} xs={6}>
                                <Card.Title>{course.course_title ? course.course_title : 'Course Title'}</Card.Title>
                              </Col>
                              <Col xl={5} lg={5} md={5} sm={6} xs={6}>
                                {/* <span className="orderId">
                          Order ID : 000-12-922-0999
                        </span> */}
                              </Col>
                            </Row>

                            <Row>
                              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                                <div className="progressBar">
                                  <p className="d-inline-block mb-1"> In progress</p>
                                  <span> {progress_percent ? progress_percent : 0}% Completed</span>
                                  <ProgressBar variant="success" now={progress_percent ? progress_percent : 0} />
                                </div>
                              </Col>
                            </Row>

                            <Row className="mt-4 mb-3">
                              <Col xl={7} lg={7} md={7} sm={6} xs={6}>
                              {expr_date >= curren_date? <Button variant="primary" 
                                className="btnSign" onClick={(e) => handleStartCourse(course.id)}>
                                  Start Course
                                </Button>:<Button variant="primary" 
                                className="btnSign" disabled={true}>
                                 Locked Course
                                </Button>}
                              </Col>
                              <Col xl={5} lg={5} md={5} sm={6} xs={6}>
                                <span className="expiryDate mt-1">
                                  {exp_date ? `Expiry Date: ${exp_date}` : 'Expiry Date'}
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </>
                  )
                }) : null
              }

            </Row>
          </Container>
        </div>


        {/* <Button
                variant="primary"
                className="btnSame add_user addmore"
                type="submit"
                onClick={handleCourseShow}
              >
                Add More
              </Button> */}

        {/* thank you */}

      </div>
    </div>
  );
};

export default CourseDashboard;