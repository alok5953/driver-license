import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getReceiptAction, socketDisconnectAction, logoutUserAction } from "../../../Redux/Actions";

// import Logo from "../../../Images/svg/logo.svg";
 
import "./Profile.css";
import { TopBar } from "../TopBar";

export const PaymentHistory = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();
  const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
  const [url, setUrl] = useState('');
  useEffect(() => {
    getReceipt(params.course_id)
  }, []);

  const getReceipt = async (courseId) => {
    try {

      let response = await dispatch(getReceiptAction(courseId))
      response = response?.payload;

      if (response) {
        if (response?.data) {
          if (response?.data?.code == 200) {
            setUrl(response?.data?.data?.url);
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
  const receiptDownload = async () => {
    try {

      let response = await dispatch(getReceiptAction(params.course_id))
      response = response?.payload;
      if (response) {
        if (response?.data) {
          if (response?.data?.code == 200) {
            window.open(response?.data?.data?.url);
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
    <>
      <div className="admin_user mt-5">
        <div className="row">
          <div className="col-sm-10">
            <iframe src={url} height="800" width="100%" title="description"></iframe>
          </div>
          <div className="col-sm-2">
            <Button variant="outline-primary" onClick={receiptDownload}>
              Receipt Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
