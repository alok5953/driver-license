import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import info from '../../../Images/info_icon.svg';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  userPasswordResetAction,  forgotPassworForOTPldAction,forgotPassworForEmaildAction, socketDisconnectAction, logoutUserAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card"; 
import "./CreateNewPassword.css"; 
import { Loader } from "../../../Containers/Loader";
 
const CreateNewPassword = (props) => {
  const [otp, setOTP] = useState("");
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  //varibale declare
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const  resultEmail =useSelector(state =>  state.commonReducer?.email?.data); 
  const  resultOtp =useSelector(state =>  state.commonReducer?.otp?.data); 
  const [courseId, setCourseId] =  useState(props?.match?.params?.course_id);
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  useEffect(() => {
   
      if(resultEmail?.code==200){
        setEmail(resultEmail.email)
      } else{
        history.push(`/user/otp/${courseId}`)
      }
      if(resultOtp?.code==200){
        setOTP(resultOtp.otp)
      } else{
        history.push(`/user/otp/${courseId}`)
      }
  }, [resultEmail,resultOtp]);

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        let regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
       
        if (!new_password) {
          swal({
            title: "Error!",
            text: 'Please enter new password.',
            icon: "error",
            timer: 3000
          });
          return false
        }
        else {
          if (regex.exec(new_password) == null) {
            swal({
              title: "Error!",
              text: 'New password pattern does not match.',
              icon: "error",
              timer: 3000
            });
            return false
          }
        }
        if (!confirm_password) {
          swal({
            title: "Error!",
            text: 'Please enter confirm password.',
            icon: "error",
            timer: 3000
          });
          return false
        }
        else {
          if (regex.exec(confirm_password) == null) {
            swal({
              title: "Error!",
              text: 'Confirm password pattern does not match.',
              icon: "error",
              timer: 3000
            });
            return false
          }
        }

      }
      setValidated(true)
      if (form.checkValidity()) {
        let value = {
          "email":email,
          "otp":otp,
          "new_password": new_password,
          "confirm_password": confirm_password,
          "course_id": courseId
        }
        if(new_password!==confirm_password){
          swal({
            title: "Error!",
            text: 'New password and confirm password does not match',
            icon: "error",
            timer: 3000
          });
          return false
        }
       
        const response = await dispatch(userPasswordResetAction(value))
        const changePasswordSuccessData = response?.payload;
        
        if (changePasswordSuccessData) {
          if (changePasswordSuccessData.data) {
            if (changePasswordSuccessData.data.code == 200) {
              setNewPassword('');
              setConfirmPassword('');
              swal({ 
                title: "Success!",
                text: changePasswordSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              setValidated(false);
              history.push(`/user/signin/${courseId}`)
              dispatch(socketDisconnectAction(socket))
              dispatch(logoutUserAction())
              dispatch(forgotPassworForEmaildAction({}))
              dispatch(forgotPassworForOTPldAction({}))
            } else  if (changePasswordSuccessData.data.code == 500) {
              swal({
                title: "Error!",
                text: changePasswordSuccessData.data.message,
                icon: "error",
                timer: 6000
              });
              dispatch(socketDisconnectAction(socket))
              dispatch(logoutUserAction())
              history.push(`/user/signin/${courseId}`)
              setValidated(false);

            } else{
              swal({
                title: "Error!",
                text: changePasswordSuccessData.data.message,
                icon: "error",
                timer: 6000
              });
              
              setValidated(false);
            }
          }
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
        history.push(`/user/signin/${courseId}`)
      }
    }
  }
  return (
    <div>
      <div className="noHeaderTop welcomeScreen mt-5">
        <Container fluid className="pl-md-5 pr-md-5 pt-3 pb-3">
          <Row className="justify-content-md-center">
            <Col xl={5} lg={7} md={8} sm={12}>
              <Card className="p-xl-5 pt-lg-5 pb-lg-5 pt-md-5 pb-md-5 pt-5 pb-5">
                <Card.Body>
                  <Card.Title className="text-center mb-0">
                    Create a New Password
                  </Card.Title>

                  <Row className="justify-content-md-center">
                    <Col xl={8} lg={9} md={10} sm={12}>
                      <Card.Text className="text-center mt-3">
                        Enter New Password for your Account
                      </Card.Text>
                    </Col>
                  </Row>

                  <Form className="mt-5 pl-md-4 pr-md-4" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                      <Form.Group as={Col} className="eyeinput eyeinput1">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" 
                              placeholder=""
                              value={new_password} required onChange={e => (setNewPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"  />

                  <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
                  </span>
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} className="eyeinput eyeinput1">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"placeholder=""
                              required placeholder=""  onChange={e => (setConfirmPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
                             <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
                  </span>
                      </Form.Group>
                    </Form.Row>

                    <Button
                      variant="primary"
                      className="w-100 btnSign mt-4 mb-3" type="submit"
                    >
                     Change Password
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Loader/>
    </div>
  );
};

export default CreateNewPassword;