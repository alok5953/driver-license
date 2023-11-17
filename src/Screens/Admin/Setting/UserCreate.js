import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import deleteIcon from "../../../Images/delete.svg";
import resetIcon from "../../../Images/svg/reset.png";
import edit from "../../../Images/edit.svg";
import resend_email_image from "../../../Images/resend_email.png"
import "./Setting.css";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import {
    getAllRoleActionForAdmin, registerAdminAction, updateAdminDetailAction,
    getAllAdminList, deleteAdminAction, resetAdminUserAction,resendVerificationMailAdminUserByIdAction
} from '../../../Redux/Actions'
import swal from 'sweetalert';
import { USER_ADD_ADMIN_PERMISSION, FULL, READ, EDIT } from '../../../Utils/PermissionConstant'

export const UserCreate = (props) => {
    let history = useHistory();
    const [allAdminDetailList, setAllAdminDetailList] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState('');
    const [update_firstname, setUpdateFirstName] = useState('');
    const [update_lastname, setUpdateLastName] = useState('');
    const [update_email, setUpdateEmail] = useState('');
    const [update_role_id, setUpdateRoleId] = useState('');
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [updateValidated, setUpdateValidated] = useState(false);
    const [rolesDetailList, setRoleList] = useState([]);
    const [adminId, setAdminId] = useState('');
    const [permission, setPermission] = useState('');
    // updated pop modal open
    const [updateModelshow, setUpdateShow] = useState(false);
    const handleUpdateClose = () => setUpdateShow(false);
    const [login_user_role_define, set_login_user_role_define] = useState('');


    useEffect(
        () => {
            getAllDetails();
        }, []
    );

    const handleSubmit = async (e) => {
        try {
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            setValidated(true)
            if (form.checkValidity()) {
                e.preventDefault();
                let values = { 'first_name': firstname, "last_name": lastname, 'email': email, "role_id": role_id }

                handleClose(false)
                const response = await dispatch(registerAdminAction(values))
                const adminSuccessData = response?.payload;
                if (adminSuccessData) {
                    if (adminSuccessData.data) {
                        if (adminSuccessData.data.code == 201) {

                            swal({
                                title: "Success!",
                                text: adminSuccessData.data.message,
                                icon: "success",
                                timer: 3000
                            });
                            setValidated(false);
                            setRoleId('')
                            getAllDetails()
                        } else {
                            swal({
                                title: "Error!",
                                text: adminSuccessData.data.message,
                                icon: "error",
                                timer: 3000
                            });
                            setValidated(false);
                            setRoleId('')
                            getAllDetails()
                        }
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
                history.push('/')
            }
        }
    }

    const getAllDetails = async () => {
        try {
            const allAdminListResponse = await dispatch(getAllAdminList());
            allAdminListResponse?.payload?.data?.data?.length && setAllAdminDetailList(allAdminListResponse.payload.data.data)
            const allRolesResponse = await dispatch(getAllRoleActionForAdmin());
            allRolesResponse?.payload?.data?.data?.length && setRoleList(allRolesResponse.payload.data.data)
        }
        catch (err) {
            if (err?.response?.data?.code === 401) {
                swal({
                    title: "Error!",
                    text: err.response.data.err,
                    icon: "error",
                    timer: 5000
                });
                history.push('/dashboard')
            }
        }
    }

    //delete funcationality
    const deleteAdmin = (id) => {

        swal({
            title: "Are you sure?",
            text: "you want to delete admin!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {

                if (willDelete) {
                    const deleteResponse = await dispatch(deleteAdminAction(id));
                    const deleteAdminResponse = deleteResponse.payload;
                    if (deleteAdminResponse) {
                        if (deleteAdminResponse.data) {
                            if (deleteAdminResponse.data.code == 200) {
                                swal({
                                    title: "Success!",
                                    text: deleteAdminResponse.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                getAllDetails()
                            } else if (deleteAdminResponse.data.code == 401) {
                                swal({
                                    title: "Success!",
                                    text: deleteAdminResponse.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                history.push('/dashboard');
                                getAllDetails()
                            } else {
                                swal({
                                    title: "Error!",
                                    text: deleteAdminResponse.data.message,
                                    icon: "error",
                                    timer: 3000
                                });
                            }

                        }
                    }
                }
            })
            .catch(function (err) {
                if (err?.response?.data?.code === 401) {
                    swal({
                        title: "Error!",
                        text: err.response.data.err,
                        icon: "error",
                        timer: 5000
                    });
                    history.push('/')
                }
            })


    }

    const getAdminDetail = async (adminDetails) => {
        setUpdateFirstName(adminDetails.first_name);
        setUpdateLastName(adminDetails.last_name);
        setUpdateEmail(adminDetails.email);
        setUpdateRoleId(adminDetails.role_id);
        setUpdateShow(true)
        setAdminId(adminDetails.id)
    }

    // update admin detail 
    const updateAdminDetail = async (e) => {
        try {
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }
            setUpdateValidated(true)
            if (form.checkValidity()) {
                e.preventDefault();
                //'first_name': firstname, "last_name": lastname, 'email': email,
                let values = { "first_name": update_firstname, "last_name": update_lastname, "role_id": update_role_id }
                handleUpdateClose(false)
                const response = await dispatch(updateAdminDetailAction(adminId, values))
                const adminUpdateSuccessData = response?.payload;
                if (adminUpdateSuccessData) {
                    if (adminUpdateSuccessData.data) {
                        if (adminUpdateSuccessData.data.code == 200) {
                            swal({
                                title: "Success!",
                                text: adminUpdateSuccessData.data.message,
                                icon: "success",
                                timer: 3000
                            });
                            setUpdateValidated(false);
                            setUpdateRoleId('')
                            getAllDetails()
                        } else {
                            swal({
                                title: "Error!",
                                text: adminUpdateSuccessData.data.message,
                                icon: "error",
                                timer: 3000
                            });
                            setUpdateValidated(false);
                            setUpdateRoleId('')
                            getAllDetails()
                        }
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
                history.push('/')
            }
        }
    }
    // check permission or not
    const loginState = useSelector(state => state.authReducer?.loginData);
    useEffect(() => {
        if (loginState?.data?.data?.access_token) {
            set_login_user_role_define(loginState?.data?.data?.user?.role?.slug)
            if (loginState?.data?.data?.user?.role?.policies.length) {
                let list = loginState?.data?.data?.user?.role?.policies
                list.map((val, i) => {
                    if (USER_ADD_ADMIN_PERMISSION == val.name && val.scope != "none") {

                        setPermission(val.scope)
                    }
                })
            }
        }
    }, [loginState]);
    // refresh tokenresult
    const refreshTokenResult = useSelector(state =>
        state.authReducer.loginData
    );
    // get role when role save 
    const roleListState = useSelector(state => state.settingReducer?.getRoleListForAdmin);

    useEffect(() => {
        if (refreshTokenResult?.data?.data?.access_token) {
            set_login_user_role_define(refreshTokenResult?.data?.data?.user?.role?.slug)
            if (refreshTokenResult?.data?.data?.user?.role?.policies.length) {
                let list = loginState?.data?.data?.user?.role?.policies
                list.map((val, i) => {
                    if (USER_ADD_ADMIN_PERMISSION == val.name && val.scope != "none") {
                        setPermission(val.scope)
                    }
                })
            }
        }
        if (roleListState) {
            roleListState?.data?.data?.length && setRoleList(roleListState.data.data)
        }
    }, [refreshTokenResult, roleListState]);

    //reset funcationality
    const resetAdminUser = (id) => {

        swal({
            title: "Are you sure?",
            text: "you want to restore admin user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {

                if (willDelete) {
                    const resetResponse = await dispatch(resetAdminUserAction(id));
                    const resetAdminResponse = resetResponse.payload;
                    if (resetAdminResponse) {
                        if (resetAdminResponse.data) {
                            if (resetAdminResponse.data.code == 200) {
                                swal({
                                    title: "Success!",
                                    text: resetAdminResponse.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                getAllDetails()
                            } else if (resetAdminResponse.data.code == 401) {
                                swal({
                                    title: "Success!",
                                    text: resetAdminResponse.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                history.push('/dashboard');
                                getAllDetails()
                            } else {
                                swal({
                                    title: "Error!",
                                    text: resetAdminResponse.data.message,
                                    icon: "error",
                                    timer: 3000
                                });
                            }

                        }
                    }
                }
            })
            .catch(function (err) {
                if (err?.response?.data?.code === 401) {
                    swal({
                        title: "Error!",
                        text: err.response.data.err,
                        icon: "error",
                        timer: 5000
                    });
                    history.push('/')
                }
            })
    }

    // RESEND EMAIL 
    const resendVerificationMailAdminUserById =async (id) => {
        try {
            const resetResponse = await dispatch(resendVerificationMailAdminUserByIdAction({id:id}));
            const resetAdminResponse = resetResponse.payload;
            if (resetAdminResponse) {
                if (resetAdminResponse.data) {
                    if (resetAdminResponse.data.code == 201) {
                        swal({
                            title: "Success!",
                            text: resetAdminResponse.data.message,
                            icon: "success",
                            timer: 3000
                        });
                        getAllDetails()
                    } else if (resetAdminResponse.data.code == 401) {
                        swal({
                            title: "Success!",
                            text: resetAdminResponse.data.message,
                            icon: "success",
                            timer: 3000
                        });
                        history.push('/dashboard');
                        getAllDetails()
                    } else {
                        swal({
                            title: "Error!",
                            text: resetAdminResponse.data.message,
                            icon: "error",
                            timer: 3000
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
                history.push('/')
            }
        }
    }


    return (
        <>
            <div className="">
                <div className="admin_user">
                    <h3>Admin Users</h3>
                    {permission == FULL ?
                        <Button
                            variant="primary"
                            onClick={handleShow}
                            className="btnSame mt-4 add_user"
                            type="submit"
                        >
                            Add Users
                        </Button>
                        : ''}
                </div>
                <div>
                    <Table responsive className="table table-borderless user_table">
                        <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Role</th>
                                <th>Added by</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                allAdminDetailList.map((val, i) => {
                                    let status = "", created_by = "", action_Edit = '', delete_html = '',resend_email='';
                                    if (val.is_active) {
                                        status = "Active"
                                    } else {
                                        status = "Inactive"
                                        resend_email = <img src={resend_email_image} className="active_icon" onClick={e => resendVerificationMailAdminUserById(val.id)} alt="Image" />
                                    }
                                    if (val.created_by) {
                                        action_Edit = <img src={edit} onClick={e => getAdminDetail(val)} className="table_icon" alt="Image" />
                                        if (!val.is_deleted) {
                                            delete_html = <img src={deleteIcon} onClick={e => deleteAdmin(val.id)} className="delete_icon" alt="Image" />
                                        } else {
                                            if (login_user_role_define === "super_admin") {
                                                delete_html = <img src={resetIcon} onClick={e => resetAdminUser(val.id)} className="delete_icon" alt="Image" />
                                            } 
                                        }
                                    }
                                    return (

                                        <tr key={`user-${i}`} value={i}>
                                            <td>{i + 1}</td>
                                            <td>{val.first_name} &nbsp;{val.last_name}</td>
                                            <td>{val.email}</td>
                                            <td>{val.admin_role?.name}</td>
                                            <td>{val.createdBy?.first_name}&nbsp;{val.createdBy?.last_name}</td>
                                            <td className="active">{status}&nbsp;&nbsp;&nbsp;  {resend_email}</td>
                                            <td>
                                                {permission == FULL ?
                                                    <>{action_Edit}
                                                        {delete_html}</>
                                                    : ''
                                                }
                                                {permission == EDIT || permission == READ ?
                                                    action_Edit
                                                    : ''
                                                }
                                               
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </Table>
                </div>
            </div>
            {/* add admin modal */}
            <Modal className="add_usermodal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Admin user</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="First Name"
                                        onChange={(e) => setFirstName(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Last Name"
                                        onChange={(e) => setLastName(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" required placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                            </Col>
                            {/*<Col md={6}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="password" placeholder="Password" />
                                <p className="generate_pass">Generate Password</p>
                            </Form.Group>
    </Col>*/}
                            <Col md={6}>
                                <div className="select_input">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control required as="select" value={role_id} type="select" onChange={(e) => setRoleId(e.target.value)}>
                                            <option value="">Select Role</option>

                                            {rolesDetailList.map((val, i) => <option key={`rolesDetailList-${i}`} value={val.id}>{val.name}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            className="btnSame mt-4 add_user"
                            type="submit"

                        >
                            Add
                        </Button>
                        <Button
                            className="cancel_btn"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* update admin modal */}
            <Modal className="add_usermodal" show={updateModelshow} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Admin user</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={updateValidated} onSubmit={updateAdminDetail}>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="First Name"
                                        onChange={(e) => setUpdateFirstName(e.target.value)} value={update_firstname} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Last Name"
                                        onChange={(e) => setUpdateLastName(e.target.value)} value={update_lastname} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="email" disabled required placeholder="Email Address" onChange={(e) => setUpdateEmail(e.target.value)} value={update_email} />
                                </Form.Group>
                            </Col>
                            {/*<Col md={6}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="password" placeholder="Password" />
                                <p className="generate_pass">Generate Password</p>
                            </Form.Group>
    </Col>*/}
                            <Col md={6}>
                                <div className="select_input">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Control required as="select" value={update_role_id} defaultValue={update_role_id} type="select" onChange={(e) => setUpdateRoleId(e.target.value)} >
                                            <option value="">Select Role</option>

                                            {rolesDetailList.map((val, i) => <option key={`roleList-${i}`} value={val.id}>{val.name}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        {permission == EDIT || permission == FULL ?
                            <Button
                                variant="primary"
                                className="btnSame mt-4 add_user"
                                type="submit"

                            >
                                Update
                            </Button>
                            : ''}
                        <Button
                            className="cancel_btn"
                            variant="secondary"
                            onClick={handleUpdateClose}
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};