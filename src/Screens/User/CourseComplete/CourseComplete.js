import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./CourseComplete.css";
import swal from "sweetalert";
import { Header } from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getReceiptAction } from "../../../Redux/Actions";
import Form from "react-bootstrap/Form";
import { Modal } from "react-bootstrap";
import { updateUserSurveyAction,socketDisconnectAction,logoutUserAction,userPaymentStatusCheckAction } from "../../../Redux/Actions";

 
const CourseComplete = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let params = useParams();
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const [courseShow, setCourseShow] = useState(false);
  const handleCourseClose = () => setCourseShow(false);
  const handleCourseShow = () => setCourseShow(true);
  const [surveyResponse, setSurveyResponse] = useState({})

  const handleSurveyInput = (e) =>{
    let newResponse = {...surveyResponse};
    const name = e.target.name
    const value = e.target.value
    newResponse[name]= value;
    if(name == "convenience_of_location_choice" || 
    name == "convenience_of_time_choice"|| 
    name == "cost_choice" ||
    name == "availability_choice"
    ) 
    {
      if (value == 'false'){
        newResponse[name]= false;
      }
      if (value =='true'){
        newResponse[name]= true;
      }
    }

    if (name == "other_choice_reason" ){
      if (value == ''){
        newResponse['other_choice']= false;
        delete newResponse['other_choice_reason']
      } else {
        newResponse['other_choice']= true;
      }
    }
    
    setSurveyResponse(newResponse)

  }

  useEffect(() => {
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

  const handleSurveyUpdate = async (e) => {
    try{
     
      const data = {
        "course_id": params.course_id,
       ...surveyResponse
      }

      e.preventDefault() 
      let response  = await dispatch(updateUserSurveyAction(data))
      response  = response?.payload;
      if(response) {
        if(response?.data) {
          if(response?.data?.code == 200) {
            swal("Thanks for sharing your feedback!",{
              // title: "Thanks for sharing your feedback!",
              // text: response.data.message,
              icon: "success",
              timer: 3000,
              button: false,
            });
            handleCourseClose()
            setTimeout( async function(){ 
              history.push(`/user/dashboard/${params.course_id}`)
            }, 2000);
          } else {
            // error message
            swal({
              title: "Error!",
              text: response.data.message,
              icon: "error",
              timer: 6000
            });
          }
        }
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
  


  return (
    <div>
       {/* <Header></Header> */}

      <div className="mainSection marginmainTop mt-3 pb-4">
        <Container>
          <Row>
              <Col md={12} className="text-center payment_container success_content">
                  <h5>Congratulations!!!</h5>
                  <h4>You have successfully completed the course.</h4>
                  {/* <p>Order ID : 000-12-922-0999 | Transaction ID: 123545</p> */}
                  <Button variant="primary" className="btnSign mt-4" onClick={handleCourseShow}>
                  Please share Your Feedback
                  </Button>
              </Col>
          </Row>
          
        </Container>
 
        <Modal
                className="thankyou_modal course_complete"
                show={courseShow}
                onHide={handleCourseClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Course completed successfully!!!</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={handleSurveyUpdate}  onChange={handleSurveyInput} >
                  <Modal.Body className="pl-0 pr-0">
                    <Row>
                      <Col md={12}>
                        <h5>
                          How would you rate your overall experience so far?
                        </h5>
                        <div className="rating star-rating">
                          <input type="radio" name="delivery_satisfaction_rating" value="1" className="fa fa-star-o mr-3 checked"  /><i></i>
                            <input type="radio" name="delivery_satisfaction_rating" value="2"/><i></i>
                            <input type="radio" name="delivery_satisfaction_rating" value="3"/><i></i>
                            <input type="radio" name="delivery_satisfaction_rating" value="4"/><i></i>
                            <input type="radio" name="delivery_satisfaction_rating" value="5"/><i></i>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <h5>
                        How likely are you to recommend our site to others?
                        </h5>
                        <div className="rating star-rating">
                            <input type="radio" name="participant_interest_rating" value="1" className="fa fa-star-o mr-3 checked"  /><i></i>
                            <input type="radio" name="participant_interest_rating" value="2"/><i></i>
                            <input type="radio" name="participant_interest_rating" value="3"/><i></i>
                            <input type="radio" name="participant_interest_rating" value="4"/><i></i>
                            <input type="radio" name="participant_interest_rating" value="5"/><i></i>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <h5>
                        How would you rate for the usefulness of the information provided in this course?
                        </h5>
                        <div className="rating star-rating">
                            <input type="radio" name="information_usefulness_rating" value="1" className="fa fa-star-o mr-3 checked"  /><i></i>
                            <input type="radio" name="information_usefulness_rating" value="2"/><i></i>
                            <input type="radio" name="information_usefulness_rating" value="3"/><i></i>
                            <input type="radio" name="information_usefulness_rating" value="4"/><i></i>
                            <input type="radio" name="information_usefulness_rating" value="5"/><i></i>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <h5>
                        Was the whole process of taking course easy for you?
                        </h5>
                        <div className="rating star-rating">
                            <input type="radio" name="ease_of_use_rating" value="1" className="fa fa-star-o mr-3 checked"  /><i></i>
                            <input type="radio" name="ease_of_use_rating" value="2"/><i></i>
                            <input type="radio" name="ease_of_use_rating" value="3"/><i></i>
                            <input type="radio" name="ease_of_use_rating" value="4"/><i></i>
                            <input type="radio" name="ease_of_use_rating" value="5"/><i></i>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <h5>
                        Were you able to choose the location of your choice?
                        </h5>
                        <div className="starno_rate">
                            <input type="radio" name="convenience_of_location_choice" value={true} className="mr-3 checked"  id='convenience_of_location_choice' /><i></i>
                            <label className="custom-radio" htmlFor='convenience_of_location_choice' >True </label>
                            <input type="radio" name="convenience_of_location_choice" value={false} id='convenience_of_location_choice' className="ml-3"/><i></i>
                            <label className="custom-radio pl-2" htmlFor='convenience_of_location_choice' >False </label>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <h5>
                        Was the time duration and availability of the course convenient for you?
                        </h5>
                        <div className="rating">
                            <input type="radio" name="convenience_of_time_choice" value={true} className=" mr-3 checked"  /><i></i>
                            <label className="custom-radio" htmlFor='convenience_of_time_choice' >True </label>
                            <input type="radio" name="convenience_of_time_choice" className="ml-3" value={false}/><i></i>
                            <label className="custom-radio pl-2" htmlFor='convenience_of_time_choice' >False </label>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <h5>
                        Did you find the cost of the course worth paying?
                        </h5>
                        <div className="rating">
                            <input type="radio" name="cost_choice" value={true} className="mr-3 checked"  /><i></i>
                            <label className="custom-radio" htmlFor='cost_choice' >True </label>
                            <input type="radio" name="cost_choice" className="ml-3" value={false}/><i></i>
                            <label className="custom-radio pl-2" htmlFor='cost_choice' >False </label>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col md={12}>
                        <h5>
                        How would you rate the availability of the course?
                        </h5>
                        <div className="rating">
                            <input type="radio" name="availability_choice" value={true} className="mr-3 checked"  /><i></i>
                            <label className="custom-radio" htmlFor='availability_choice' >True </label>
                            <input type="radio" name="availability_choice" className="ml-3" value={false}/><i></i>
                            <label className="custom-radio pl-2" htmlFor='availability_choice' >False </label>
                        </div>
                      </Col>
                    </Row>

                    <Form.Group className="mt-3">
                      <Form.Label>Additional Feedback</Form.Label>
                      <Form.Control as="textarea" name='other_choice_reason' rows={3} />
                    </Form.Group>

                    <Button variant="primary" className="btnSign btn_modal" type="submit">
                            Submit
                          </Button>
                     
                  </Modal.Body>
                </Form>
              </Modal>
      </div>
    </div>


  );
};

export default CourseComplete;