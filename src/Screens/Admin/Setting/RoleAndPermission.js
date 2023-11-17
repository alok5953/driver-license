import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import deleteIcon from "../../../Images/delete.svg";
import resetIcon from "../../../Images/svg/reset.png";
import edit from "../../../Images/edit.svg";
import "./Setting.css";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
 
import {
  addRoleDetailAction,
  getAllRoleAction,
  getAllPolicies,
  deleteRolePermissionAction,
  getRoleDetailByIdAction, getAllRoleActionForAdmin,
  updateRoleDetailAction,
  resetRoleAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import  {ROLE_PERMISSION,FULL,READ,EDIT} from '../../../Utils/PermissionConstant'

var policyChecked = [];
export const RoleAndPermission = () => {
  let history = useHistory();
  const [addRoleShow, setAddRoleShow] = useState(false);
  const handleAddRoleClose = () => setAddRoleShow(false);
  const handleAddRoleShow = () => setAddRoleShow(true);
  const [updateRoleShow, setUpdateRoleShow] = useState(false);
  const handleUpdateRoleClose = () => setUpdateRoleShow(false);
  const [roleId, setRoleId] = useState("");
  const [role_name, setRoleName] = useState("");
  const [update_role_name, setUpdateRoleName] = useState("");
  const [validated, setRoleValidated] = useState(false);
  const [updateValidated, setUpdateRoleValidated] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [policiesList, setPoliciesList] = useState([]);
  const [updatePolicyList, setUpdatePolicyList] = useState([]);
  const dispatch = useDispatch();
  const [permission, setPermission] = useState('');
  const [login_user_role_define, set_login_user_role_define] = useState('');

  const handleSubmit = async e => {
    try{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      } 
      setRoleValidated(true);
      if (form.checkValidity()) {
        e.preventDefault();
        let policyArray=[];
        policiesList.map((val)=>{
          policyArray.push({"name":val.name,"scope":val.scope})
        })
        let values = {
          name: role_name,
          policies: policyArray,
          description: "fghgf"
        };
        const response = await dispatch(addRoleDetailAction(values));
        const addRoleDetailList = response?.payload;
        // value assign in varible
        if (addRoleDetailList) {
          if (addRoleDetailList.data) {
            if (addRoleDetailList.data.code == 200) {
              swal({
                title: "Success!",
                text: addRoleDetailList.data.message,
                icon: "success",
                timer: 3000
              });
              getAllUsers();
              setRoleValidated(false);
              dispatch(getAllRoleActionForAdmin());
            } else if (addRoleDetailList.data.code == 401) {
              swal({
                title: "Success!",
                text: addRoleDetailList.data.message,
                icon: "success",
                timer: 3000
              });
              history.push('/dashboard');
              setRoleValidated(false);
            }else {
              swal({
                title: "Error!",
                text: addRoleDetailList.data.message,
                icon: "error",
                timer: 3000
              });
              setRoleValidated(false);
            }
          }
        }
        setAddRoleShow(false);
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
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try{
      const allRolesResponse = await dispatch(getAllRoleAction());
      if (allRolesResponse.code == 401) {
        history.push('/dashboard');
      }
      allRolesResponse?.payload?.data?.data?.length &&
        setRoleList(allRolesResponse.payload.data.data);
      const allPoliciesResponse = await dispatch(getAllPolicies());
      
      // allPoliciesResponse?.payload?.data?.length && setPoliciesList(allPoliciesResponse.payload.data);
      policyChecked = [];
      allPoliciesResponse?.payload?.data?.sort((a,b )=> {return(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)})
      const policyResult = await policyList(allPoliciesResponse.payload.data);
      setPoliciesList(policyResult);
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
  };

  const policyList = list => {
    list.map((key, value) => {
      policyChecked.push({ name: key.name, scope: "none",module_name:key.module_name });
    });
    return policyChecked;
  };

  const policiesCheck = (val, policy_name) => {
    policiesList.map((key, index) => {
      if (key.name === val) {
        policiesList[index].scope = policy_name;
      }
    });
  };

  // delete role by id
  const deleteRoleById = id => {
    
      swal({
        title: "Are you sure?",
        text: "You want to disable role and permission!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(async willDelete => {
        if (willDelete) {
          const deleteResponse = await dispatch(deleteRolePermissionAction(id));
          const deleteRoleResponse = deleteResponse.payload;
          if (deleteRoleResponse) {
            if (deleteRoleResponse.data) {
              if (deleteRoleResponse.data.code == 200) {
                swal({
                  title: "Success!",
                  text: deleteRoleResponse.data.message,
                  icon: "success",
                  timer: 3000
                });
                getAllUsers();
                dispatch(getAllRoleActionForAdmin());
              } else {
                swal({
                  title: "Error!",
                  text: deleteRoleResponse.data.message,
                  icon: "error",
                  timer: 3000
                });
              }
            }
          }
        }
      })
      .catch (function(err) {
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
   
  };

  // get role detail by id
  const getRoleDetailById = async id => {
    try{
      const getResponse = await dispatch(getRoleDetailByIdAction(id));
      const roleResponse = getResponse?.payload?.data;
      setRoleId(id);
      if (roleResponse.code == 200) {
        if (roleResponse.data) {
          setUpdateRoleName(roleResponse.data.name);
          policiesList.map((val,index)=>{
            roleResponse.data.policies.map((ele,indx)=>{
              if(ele.name == 'audit_logs'){
                delete roleResponse.data.policies[indx];
              }
              if(ele.name == 'customers'){
                delete roleResponse.data.policies[indx];
              }
              if(ele.name===val.name){
                roleResponse.data.policies[indx].module_name=val.module_name
              }
            })
          })
          const arrange = roleResponse?.data?.policies?.sort((a,b )=> {return(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)})
         
          setUpdatePolicyList(arrange);
          setUpdateRoleShow(true);
        }
      }
    }
    catch (err) {
        if (err.response.data.code === 401) {
            swal({
                title: "Error!",
                text: err.response.data.err,
                icon: "error",
                timer: 5000
            });
            history.push('/')
        }
    }  
  };
  // update role policies
  const updatPolicyChecked = (e, policy_name) => {
    updatePolicyList.map((key, index) => {
      if (key.name === e.currentTarget.value) {
        updatePolicyList[index].scope = policy_name;
      }
    });
    setUpdatePolicyList([...updatePolicyList]);
  };
  // update role and permission
  const updateRoleAndPolicies = async e => {
    try{
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setUpdateRoleValidated(true);
      if (form.checkValidity()) {
        e.preventDefault();
        setUpdateRoleShow(false);
        // remove id from policy list array
        let role_policy_list = [];
        updatePolicyList.map((ele, indx) => {
          role_policy_list.push({ name: ele.name, scope: ele.scope });
        });
        let values = { name: update_role_name, policies: role_policy_list };

        const response = await dispatch(updateRoleDetailAction(roleId, values));
        const updateRoleDetailList = response?.payload;
        // value assign in varible
        if (updateRoleDetailList) {
          if (updateRoleDetailList.data) {
            if (updateRoleDetailList.data.code == 200) {
              swal({
                title: "Success!",
                text: updateRoleDetailList.data.message,
                icon: "success",
                timer: 3000
              });
              getAllUsers();
              dispatch(getAllRoleActionForAdmin());
              setUpdateRoleValidated(false);
            } else {
              swal({
                title: "Error!",
                text: updateRoleDetailList.data.message,
                icon: "error",
                timer: 3000
              });
              setUpdateRoleValidated(false);
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
  };
  // check permission or not
  const loginState = useSelector(state => state.authReducer?.loginData);
  useEffect(() => {
    if (loginState?.data?.data?.access_token) {
      set_login_user_role_define(loginState?.data?.data?.user?.role?.slug)
      if (loginState?.data?.data?.user?.role?.policies.length) {
          let list = loginState?.data?.data?.user?.role?.policies
          list.map((val,i)=>{
            if(ROLE_PERMISSION==val.name && val.scope!="none"){
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
  useEffect(() => {
   
    if (refreshTokenResult?.data?.data?.access_token) {
      if (refreshTokenResult?.data?.data?.user?.role?.policies.length) {
        let list = loginState?.data?.data?.user?.role?.policies
        list.map((val,i)=>{
          if(ROLE_PERMISSION==val.name && val.scope!="none"){
              setPermission(val.scope)
          }
        })
      }
    } 
  }, [refreshTokenResult]);



      //reset funcationality
      const resetRoleById = (id) => {

        swal({
            title: "Are you sure?",
            text: "you want to restore role!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {

                if (willDelete) {
                    const resetResponse = await dispatch(resetRoleAction(id));
                    const resetRoleResponse = resetResponse.payload;
                    if (resetRoleResponse) {
                        if (resetRoleResponse.data) {
                            if (resetRoleResponse.data.code == 200) {
                                swal({
                                    title: "Success!",
                                    text: resetRoleResponse.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                getAllUsers();
                            } else if (resetRoleResponse.data.code == 401) {
                                swal({
                                    title: "Success!",
                                    text: resetRoleResponse.data.message,
                                    icon: "success",
                                    timer: 3000
                                });
                                history.push('/dashboard');
                                getAllUsers();
                            } else {
                                swal({
                                    title: "Error!",
                                    text: resetRoleResponse.data.message,
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
  
  return (
    <>
      <div className="">
        <div className="admin_user">
          <h3>Roles and Permission</h3>
          { permission ==FULL ?
          <Button
            variant="primary"
            className="btnSame mt-4 add_user"
            type="submit"
            onClick={handleAddRoleShow}
          >
            Add Role
          </Button>
          :''
  }
        </div>
        <div className="table-responsive">
          <table className="table table-borderless user_table">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Role Name</th>
                <th>Created by</th>
                <th>Total No of Users</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roleList.map((val, i) => {
                 
                let status = "",
                  created_by = "",
                  action_Edit = "",
                  delete_html = "";
                if (val.is_active) {
                  status = "Active";
                } else {
                  status = "Inactive";
                }
                if (val.created_by) {
                  action_Edit = (
                    <img
                      src={edit}
                      onClick={e => getRoleDetailById(val.id)}
                      className="table_icon"
                      alt="Image"
                    />
                  );
                  // delete_html = (
                  //   <img
                  //     src={deleteIcon}
                  //     onClick={e => deleteRoleById(val.id)}
                  //     className="delete_icon"
                  //     alt="Image"
                  //   />
                  // );
                  if (!val.is_deleted) {
                    delete_html = <img src={deleteIcon} onClick={e => deleteRoleById(val.id)} className="delete_icon" alt="Image" />
                } else {
                    if(login_user_role_define === "super_admin"){
                        delete_html = <img src={resetIcon} onClick={e => resetRoleById(val.id)} className="delete_icon" alt="Image" />
                    }
                }
                }

                return (
                  <tr  key={`role-${i}`} value={i}>
                    <td>{i + 1}</td>
                    <td>{val.name}</td>
                    <td>
                      {val.createdBy?.first_name}&nbsp;
                      {val.createdBy?.last_name}
                    </td>
                    <td>{val.total_users}</td>
                    <td>
                    { permission ==FULL ?
                      <>{action_Edit}
                      {delete_html}</>
                      :''
                    }
                    { permission ==EDIT  || permission ==READ?
                     action_Edit
                      :''
                    }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/*add  Role */}
      <Modal
        className="add_usermodal"
        show={addRoleShow}
        onHide={handleAddRoleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add role</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    required
                    placeholder="Role Name"
                    onChange={e => setRoleName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Table responsive borderless className="roletable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Read</th>
                      <th>Edit</th>
                      <th>Full</th>
                      <th>None</th>
                    </tr>
                  </thead>
                  <tbody className="custom-radio-wrap1">
                    {policiesList.map((val, i) => {
                     
                      return (
                        <tr key={`policies-${i}`}>
                          <td className="fontUpdate">{val.module_name}</td>
                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => policiesCheck(val.name, "read")}
                                type="radio"
                                name={val.name}
                                id={`read${i}`}
                              />
                              <label
                                className="custom-radio"
                                htmlFor={`read${i}`}
                                onChange={e => policiesCheck(val.name, "read")}
                              ></label>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => policiesCheck(val.name, "write")}
                                type="radio"
                                name={val.name}
                                id={`write${i}`}
                              />
                              <label
                                className="custom-radio"
                                htmlFor={`write${i}`}
                              ></label>
                            </div>
                          </td>

                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => policiesCheck(val.name, "full")}
                                type="radio"
                                name={val.name}
                                id={`full${i}`}
                              />
                              <label
                                className="custom-radio"
                                htmlFor={`full${i}`}
                              ></label>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => policiesCheck(val.name, "none")}
                                type="radio"
                                name={val.name}
                                id={`none${i}`}
                                defaultChecked
                              />
                              <label
                                className="custom-radio"
                                htmlFor={`none${i}`}
                              ></label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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
              onClick={handleAddRoleClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/*update  Role */}
      <Modal
        className="add_usermodal"
        show={updateRoleShow}
        onHide={handleUpdateRoleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update role</Modal.Title>
        </Modal.Header>
        <Form
          noValidate
          validated={updateValidated}
          onSubmit={updateRoleAndPolicies}
        >
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    required
                    value={update_role_name}
                    placeholder="Role Name"
                    onChange={e => setUpdateRoleName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Table responsive borderless className="roletable">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Read</th>
                      <th>Edit</th>
                      <th>Full</th>
                      <th>None</th>
                    </tr>
                  </thead>
                  <tbody className="custom-radio-wrap1">
                    {updatePolicyList.map((val, i) => {
                      return (
                        <tr key={`updatepolicy-${i}`}>
                          <td className="fontUpdate">{val.module_name}</td>
                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => updatPolicyChecked(e, "read")}
                                type="radio"
                                name={val.name}
                                id={`read${i}${i}`}
                                checked={val.scope == "read"}
                                value={val.name}
                              />
                              <label
                                className="custom-radio"
                                htmlFor={`read${i}${i}`}
                              ></label>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => updatPolicyChecked(e, "write")}
                                type="radio"
                                name={val.name}
                                id={`write${i}${i}`}
                                checked={val.scope == "write"}
                                value={val.name}
                              /> 
                              <label
                                className="custom-radio"
                                htmlFor={`write${i}${i}`}
                              ></label>
                            </div>
                          </td>

                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => updatPolicyChecked(e, "full")}
                                type="radio"
                                name={val.name}
                                id={`full${i}${i}`}
                                checked={val.scope == "full"}
                                value={val.name}
                              />
                              <label
                                className="custom-radio"
                                htmlFor={`full${i}${i}`}
                              ></label>
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="form-group">
                              <input
                                onChange={e => updatPolicyChecked(e, "none")}
                                type="radio"
                                name={val.name}
                                id={`none${i}${i}`}
                                checked={val.scope == "none"}
                                value={val.name}
                              />
                              <label
                                className="custom-radio"
                                htmlFor={`none${i}${i}`}
                              ></label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
          { permission ==EDIT || permission ==FULL?
            <Button
              variant="primary"
              className="btnSame mt-4 add_user"
              type="submit"
            >
              Update
            </Button>
            :''
}
            <Button
              className="cancel_btn"
              variant="secondary"
              onClick={handleUpdateRoleClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
