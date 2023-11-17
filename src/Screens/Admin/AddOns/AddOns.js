import  { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Delete from "../../../Images/delete.svg";
import Edit from "../../../Images/edit.svg";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import "./AddOns.css";
import {
  getAddOnsDetailAction, saveAddOnsAction, getAddOnsByIdAction, deleteAddOnsAction, updateAddOnsAction, logoutAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import { ADD_ONS, FULL, READ, EDIT } from '../../../Utils/PermissionConstant'

const AddOns = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [addOnsList, setAddOnsList] = useState([]);
  const [add_ons_title, set_add_ons_title] = useState();
  const [price, setPrice] = useState();
  const [update_add_ons_title, set_update_add_ons_title] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const [addonsShow, setAddOnsShow] = useState(false);
  const handleAddOnsClose = () => setAddOnsShow(false);
  const handleAddOnsShow = () => setAddOnsShow(true);
  const [updateAddOnsModelShow, setUpdateAddOnsModelShow] = useState(false);
  const updateAddOnsModelClose = () => setUpdateAddOnsModelShow(false);
  const updateAddOnspopModelShow = () => setUpdateAddOnsModelShow(true);
  const [addOnsId, setAddOnsId] = useState('');
  const [pageNo, setPageno] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(1);
  const [validated, setAddOnsValidated] = useState(false);
  const [permission, setPermission] = useState('');
  useEffect(() => {
    getAllDetails(pageNo,perPage);

  }, []);
  const getAllDetails = async (pageNo,perPage) => {
    try {
      setPageno(pageNo)
      const allAddOnsResponse = await dispatch(getAddOnsDetailAction(pageNo, perPage));
      allAddOnsResponse?.payload?.data?.data?.rows?.length && setAddOnsList(allAddOnsResponse.payload.data.data.rows)
      if (allAddOnsResponse?.payload?.data?.data?.count) {
        setCount(allAddOnsResponse?.payload?.data?.data?.count)
      }
    }
    catch (err) {
       dispatch(logoutAction({},'LOGOUT'));
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
 
  // get add-ons detail by id
  const getAddOnsDetailById = async id => {
    try {
      const getResponse = await dispatch(getAddOnsByIdAction(id));
      const addOnsResponse = getResponse?.payload?.data;
      setAddOnsId(id);
      if (addOnsResponse.code === 200) {
        if (addOnsResponse.data) {
          set_update_add_ons_title(addOnsResponse.data.add_ons_title)
          setUpdatePrice(addOnsResponse.data.price)
          setUpdateAddOnsModelShow(true)
        }
      }
    }
    catch (err) {
      dispatch(logoutAction({},'LOGOUT'));
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

  const deleteAddOnsById = id => {
    
      swal({
        title: "Are you sure?",
        text: "You want to delete add-ons!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {

            const deleteResponse = await dispatch(deleteAddOnsAction(id));
            const deleteAddOnsResponse = deleteResponse.payload;
            if (deleteAddOnsResponse) {
              if (deleteAddOnsResponse.data) {
                if (deleteAddOnsResponse.data.code === 200) {
                  swal({
                    title: "Success!",
                    text: deleteAddOnsResponse.data.message,
                    icon: "success",
                    timer: 3000
                  });
                  setPageno(1)
                  getAllDetails(1, perPage)
                  pageHandler(1,perPage)
                } else {
                  swal({
                    title: "Error!",
                    text: deleteAddOnsResponse.data.message,
                    icon: "error",
                    timer: 3000
                  });
                }

              }
            }
          }

        }).catch (function(err) {
          dispatch(logoutAction({},'LOGOUT'));
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

  // save add-ons question
  const handleSubmit = async e => {
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setAddOnsValidated(true);
      if (form.checkValidity()) {
        e.preventDefault();
        if (!addOnsId) {
          let values;
          values = {
            "add_ons_title": add_ons_title,
            "price": price
          }
          const response = await dispatch(saveAddOnsAction(values))
          const resAddOnsDetailList = response?.payload;
          // value assign in varible
          if (resAddOnsDetailList) {
            if (resAddOnsDetailList.data) {
              if (resAddOnsDetailList.data.code === 200) {
                swal({
                  title: "Success!",
                  text: resAddOnsDetailList.data.message,
                  icon: "success",
                  timer: 3000
                });
                getAllDetails(pageNo, perPage)
                setAddOnsValidated(false)
                setAddOnsShow(false)
              } else {
                swal({
                  title: "Error!",
                  text: resAddOnsDetailList.data.message,
                  icon: "error",
                  timer: 3000
                });
                setAddOnsValidated(false);
              }
            }
          }
        } else {
          let values;
          values = {
            "add_ons_title": update_add_ons_title,
            "price": updatePrice
          }
          const response = await dispatch(updateAddOnsAction(addOnsId, values))
          const resAddOnsDetailList = response?.payload;
          // value assign in varible
          if (resAddOnsDetailList) {
            if (resAddOnsDetailList.data) {
              if (resAddOnsDetailList.data.code === 200) {
                swal({
                  title: "Success!",
                  text: resAddOnsDetailList.data.message,
                  icon: "success",
                  timer: 3000
                });
                getAllDetails(pageNo, perPage)
                setAddOnsValidated(false)
                setUpdateAddOnsModelShow(false)
                setAddOnsId('');
              } else {
                swal({
                  title: "Error!",
                  text: resAddOnsDetailList.data.message,
                  icon: "error",
                  timer: 3000
                });
                setAddOnsValidated(false);
              }
            }
          }
        }
      }
    }
    catch (err) {
      dispatch(logoutAction({},'LOGOUT'));
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

  // pagination
  const pageHandler = (page_no,offset) => {
    setPageno({ page_no: page_no })
    setPerPage(offset)
    getAllDetails(page_no, offset);
  }
  // check permission or not
  const loginState = useSelector(state => state.authReducer?.loginData);
  useEffect(() => {
    if (loginState?.data?.data?.access_token) {
      if (loginState?.data?.data?.user?.role?.policies.length) {
        let list = loginState?.data?.data?.user?.role?.policies
        list.map((val, i) => {
          if (ADD_ONS === val.name && val.scope != "none") {
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
        list.map((val, i) => {
          if (ADD_ONS === val.name && val.scope != "none") {
            setPermission(val.scope)
          }
        })
      }
    }
  }, [refreshTokenResult])

  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={4} lg={4} md={4} sm={12} xs={6}>
            <h1 className="d-md-inline-block d-block mb-3">Add-ons</h1>
          </Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={6} className="text-md-right">
            <div className="">
              {/* <h3>Admin Users</h3> */}
              { permission ===FULL ?
              <Button
                variant="primary"
                className="btnSame add_user addmore"
                type="submit"
                onClick={handleAddOnsShow}
              >
                Add More
              </Button>
              :''}
            </div>
          </Col>
        </Row>

        <div>
          <Table responsive className="table table-borderless user_table">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Add on Name</th>
                <th>Price</th>
                <th>Created by</th>
                <th>Created on</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                addOnsList.map((val, i) => {
                  let action_Edit = '', delete_html = '';
                  let date = new Date(val?.created_at)
                  date = date.toLocaleDateString('en-US');
                  action_Edit = <img src={Edit} onClick={e => getAddOnsDetailById(val.id)} className="table_icon" />
                  delete_html = <img src={Delete} onClick={e => deleteAddOnsById(val.id)} className="delete_icon" />

                  return (<tr key={`addOns-${i}`}>

                    <td>{i + 1 + ((pageNo - 1) * perPage)}</td>
                    <td className="width_data">{val.add_ons_title}</td>
                    <td>${val.price}</td>
                    <td>{val.createdBy?.first_name}&nbsp;{val.createdBy?.last_name}</td>
                    <td>{date}</td>
                    <td>
                    {  permission ===FULL ?
                      <>{action_Edit}
                      {delete_html}</>
                      :''
                    }
                    { permission ===EDIT  || permission ===READ?
                     action_Edit
                      :''
                    }
                    </td>
                  </tr>)
                })
              }


            </tbody>
          </Table>
          <div className="mt-3 text-right pageBottom">
            {
              count > pageNo ?

                (<Pagination total={count} onChange={pageHandler} />)
                : (<></>)
            }

          </div>
        </div>

        {/* Add-ons */}
        <Modal
          className="add_usermodal"
          show={addonsShow}
          onHide={handleAddOnsClose}
        >
          <Modal.Header closeButton> 
            <Modal.Title>Add Add-ons</Modal.Title>
          </Modal.Header>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" onChange={(e) => set_add_ons_title(e.target.value)} required placeholder="Add-On Name" />
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" pattern="^[0-9]*$" onChange={(e) => setPrice(e.target.value)} required placeholder="Price" />
                  </Form.Group>
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
                onClick={handleAddOnsClose}
              >
                Cancel
            </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Add-ons  update*/}
        <Modal
          className="add_usermodal"
          show={updateAddOnsModelShow}
          onHide={updateAddOnsModelClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Add-ons</Modal.Title>
          </Modal.Header>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" value={update_add_ons_title} onChange={(e) => set_update_add_ons_title(e.target.value)} required placeholder="Add-On Name" />
                  </Form.Group>
                </Col>
                <Col md={8}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" value={updatePrice} pattern="^[0-9]*$" onChange={(e) => setUpdatePrice(e.target.value)} required placeholder="Price" />
                  </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
            { permission === EDIT || permission === FULL?
              <Button
                variant="primary"
                className="btnSame mt-4 add_user"
                type="submit"
              > 
                Update
            </Button>:''}
              <Button
                className="cancel_btn"
                variant="secondary"
                onClick={updateAddOnsModelClose}
              >
                Cancel
            </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AddOns;
