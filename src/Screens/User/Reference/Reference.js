import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Reference.css";
import swal from "sweetalert";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from "react-redux";
import { getReferenceUrlAction, sendInvitationByEmailAction, socketDisconnectAction, logoutUserAction,userPaymentStatusCheckAction } from "../../../Redux/Actions";
import Form from "react-bootstrap/Form";
import People from "../../../Images/people.svg";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import ListGroup from 'react-bootstrap/ListGroup'
import {
    FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton, LinkedinIcon, LinkedinShareButton,
    RedditIcon, RedditShareButton, EmailIcon, EmailShareButton
} from "react-share";

const Reference = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let params = useParams();
    const [courseId, setCourseId] = useState(params.course_id);
    const [email, setEmail] = useState('');
    const [referenceUrl, setReferenceUrl] = useState('');
    const socket = useSelector(state => { return state.userSocketioReducer?.socketConnectSuccess?.socketInstance })
    const copyCodeToClipboard = () => {
        swal({
            title: "Success!",
            text: 'Copied',
            icon: "success",
            timer: 3000
        });
    }

    useEffect(() => {
        getReferenceUrl()
       
        paymentStatusCheck()
    }, []);

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

    const getReferenceUrl = async () => {
        try {
            let response = await dispatch(getReferenceUrlAction())
            response = response?.payload;
            if (response) {
                if (response?.data) {
                    if (response?.data?.code == 200) {
                        setReferenceUrl(response?.data?.message)

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

    const sendInvitation = async () => {
        try {
            if (!email) {
                swal({
                    title: "Error!",
                    text: 'Please insert email Id.',
                    icon: "error",
                    timer: 3000
                });
                return false;
            }
            let response = await dispatch(sendInvitationByEmailAction({ email: email }))
            response = response?.payload;
            if (response) {
                if (response?.data) {
                    if (response?.data?.code == 200) {

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
            <div className="mainSection marginmainTop invite_section mt-md-5 mt-0 pb-5">
                <Container>
                    <Form>
                        <Row>
                            <Col md={12} className="text-center">
                                <img src={People} alt="Image" />
                                <h1 className="mt-3">
                                    Invite a friend and you will get $5 cashback
                                </h1>
                            </Col>
                        </Row>

                        <div className="input_url text-center mt-3">
                            <Row>
                                <Col md={{ span: 5, offset: 3 }} sm={{ span: 7, offset: 1 }} xs={12}>
                                    <Form.Row className="w-100 d-block">
                                        <Form.Group>
                                            <Form.Control type="text" value={referenceUrl} placeholder="https://www.lipsum.com/" required readOnly />
                                        </Form.Group>
                                    </Form.Row>
                                </Col>
                                <Col md={3} sm={4} xs={12} className="text-md-left text-sm-left pl-md-0 pl-sm-0">
                                    <CopyToClipboard text={referenceUrl}
                                    >
                                        <Button className="copy_btn" onClick={() => copyCodeToClipboard()}>
                                            <FileCopyOutlinedIcon className="mr-2" /> Copy
                                        </Button>
                                    </CopyToClipboard>

                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col lg={5} md={4} sm={6} xs={12} className="text-md-right">
                                    <p className="pt-2">
                                        Share the link on
                                    </p>
                                </Col>
                                <Col lg={7} md={8} sm={6} xs={12} className="text-md-left">
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <TwitterShareButton url={referenceUrl} >
                                                <TwitterIcon round={true} size={40} alt="Image" />
                                            </TwitterShareButton>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <FacebookShareButton url={referenceUrl}>
                                                <FacebookIcon round={true} size={40} alt="Image" />
                                            </FacebookShareButton>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <WhatsappShareButton url={referenceUrl}>
                                                <WhatsappIcon round={true} size={40} alt="Image" />
                                            </WhatsappShareButton>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <LinkedinShareButton url={referenceUrl}>
                                                <LinkedinIcon round={true} size={40} alt="Image" />
                                            </LinkedinShareButton>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <RedditShareButton url={referenceUrl}>
                                                <RedditIcon round={true} size={40} alt="Image" />
                                            </RedditShareButton>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <EmailShareButton url={referenceUrl}>
                                                <EmailIcon round={true} size={40} alt="Image" />
                                            </EmailShareButton>
                                        </ListGroup.Item>


                                    </ListGroup>
                                </Col>
                            </Row>
                        </div>

                        {/* <div className="divider_border mt-4 mb-4"></div>

                        <div className="more_ways text-center">
                            <p>
                                More ways to invite your friends
                            </p>
                            <Row>
                                    <Col md={{ span: 6, offset: 2 }} sm={7} xs={12} className="pl-md-2 pl-4">
                                        <Form.Row className="w-100 d-block">
                                            <Form.Group>
                                                <Form.Control type="email" placeholder="Enter Email Addresses" required />
                                            </Form.Group>
                                        </Form.Row>
                                    </Col>
                                    <Col md={3} sm={5} xs={12} className="text-left pl-md-0">
                                        <Button className="send_invite_btn" onClick={sendInvitation}>
                                            Send Invite
                                        </Button>
                                    </Col>
                            </Row>
                        </div> */}

                    </Form>
                </Container>
            </div>
        </div>

    );
};

export default Reference;