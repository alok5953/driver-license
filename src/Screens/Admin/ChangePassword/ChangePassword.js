import { useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Setting/Setting.css";
import { changePasswordAction } from '../../../Redux/Actions'
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import info from '../../../Images/info_icon.svg';

const ChangePassword = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [errors, setError] = useState(false);
  const dispatch = useDispatch();
  //varibale declare
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      let regex =/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        if (!old_password) {
          swal({
            title: "Error!",
            text: 'Please enter old password.',
            icon: "error",
            timer: 3000
          });
          return false
        }
        else {
          if (regex.exec(old_password) == null) {
            swal({
              title: "Error!",
              text: 'Old password pattern does not match.',
              icon: "error",
              timer: 3000
            });
            return false
          }
        }
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
        e.preventDefault();
        let value = {
          "old_password": old_password,
          "new_password": new_password,
          "confirm_password": confirm_password
        }
        if(new_password!==confirm_password){
          swal({
            title: "Error!",
            text: 'New password and confirm password does not match.',
            icon: "error",
            timer: 3000
          });
          return false;
        }
        const response = await dispatch(changePasswordAction(value))
        const changePasswordSuccessData = response?.payload;
        if (changePasswordSuccessData) {
          if (changePasswordSuccessData.data) {
            if (changePasswordSuccessData.data.code === 200) {
              setOldPassword('')
              setNewPassword('');
              setConfirmPassword('');
              swal({
                title: "Success!",
                text: changePasswordSuccessData.data.message,
                icon: "success",
                timer: 3000
              });
              setValidated(false);
            } else {
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
    catch(err){
      if(err?.response?.data?.code===401){
        swal({
          title: "Error!",
          text: err.response.data.err,
          icon: "error",
          timer: 5000
        });
        history.push('/')
      }
    }
  }

  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12}>
            <h1 className="d-md-inline-block d-block mb-3">Reset Password</h1>
          </Col>
        </Row>

        <div className="sectionBorder"></div>

        <div className="text-left admin-section pl-lg-3 pl-3 pr-3 mt-4">
          <h4>Change Password</h4>
          <div className="mt-4">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} xl="3" lg="4" md="6" className="eyeinput eyeinput1">
                  <Form.Label>enter current password</Form.Label>
                  <Form.Control type="password" placeholder="" value={old_password} onChange={e => (setOldPassword(e.target.value))} />

                  <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
                  </span>

                </Form.Group>
              </Form.Row> 

              <Form.Row>
                <Form.Group as={Col} xl="3" lg="4" md="6" className="eyeinput eyeinput1">
                  <Form.Label>enter new password</Form.Label>
                  <Form.Control type="password" required placeholder="" value={new_password}  onChange={e => (setNewPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"/>

                  <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" />
                  </span>

                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} xl="3" lg="4" md="6" className="eyeinput eyeinput1">
                  <Form.Label>Re-type new password</Form.Label>
                  <Form.Control type="password" required placeholder="" value={confirm_password} onChange={e => (setConfirmPassword(e.target.value))} pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"/>

                  <span className="eyeImage">
                    <img src={info} className="eyeIcon" alt="close_icon" title="Must consist of at least 8 characters and includes a combination of uppercase and lowercase letters, numbers, and symbols" required pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" />
                  </span>
                </Form.Group>
              </Form.Row>

              <Button variant="primary" className="btnSame mt-4" type="submit">
                Save
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;