import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Download from "../../../Images/download.svg";
import Filter from "../../../Images/filter.svg";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { CSVDownload } from "react-csv";
import Form from "react-bootstrap/Form";
import {
  getUserDetailListAction, auditLogsCSVDownloadAction, getCourseListAllAction,updateCourseExpiryDateAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import "./UserList.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const UserList = () => {
  const [showFilter, showFilterAlert] = useState(false);
  // const onClick = () => showFilterAlert(!showFilter);
  const onFilterButton = () => showFilterAlert(!showFilter);
  const [permission, setPermission] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageNo, setPageno] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(1);
  const [from, setFromDate] = useState('');
  const [to, setToDate] = useState('');
  const [course_id, setCourse] = useState('');
  const [userList, setUserList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [search, setSearch] = useState('')
  const [csvData, setcsvData] = useState([]);
  useEffect(() => {
    getCourseList()
    getAllDetails(pageNo, perPage, course_id, search, from, to);

  }, []);

  const getAllDetails = async (pageNo, perPage, course_id, search, from, to) => {
    try {
      setPageno(pageNo)
      const response = await dispatch(getUserDetailListAction(pageNo, perPage, course_id, search, from, to));
      if (response?.payload?.data?.data?.rows?.length) {
        setUserList(response.payload?.data.data?.rows)
      } else {
        setUserList([])
      }
      if (response?.payload?.data?.data?.count != 0) {
        setCount(response?.payload?.data?.data?.count)
      } else {
        setCount(0)
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
  // pagination
  const pageHandler = (page_no, offset) => {
    setPageno({ page_no: page_no })
    setPerPage(offset)
    
    getAllDetails(page_no, offset, course_id, search, from, to);
  }

  const downloadAuditLogs = async (user_id) => {
    try {
      let response = await dispatch(auditLogsCSVDownloadAction(user_id, ""));
      response = response?.payload;
      let list = []
      window.open(
        response?.data, "_blank");
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

  const getCourseList = async () => {
    try {
      const response = await dispatch(getCourseListAllAction(1, 1000));
      const allCoursResponse = response?.payload;
      // Check this once component object saved in db is finalized 
      if (allCoursResponse) {
        if (allCoursResponse.data) {
          if (allCoursResponse.data.code == 200) {
            const arrange = allCoursResponse?.data?.data?.rows?.sort((a, b) => { return a.created_at - b.created_at })
            setCourseList(arrange)
          } else {
            swal({
              title: "Error!",
              text: allCoursResponse.data.message,
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
        history.push('/')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fromDate, toDate;

    if (from) {
      if (!to) {
        swal({
          title: "Error!",
          text: "Please enter to date.",
          icon: "error",
          timer: 5000
        });
        return false
      }
    }
    if (to) {
      if (!from) {
        swal({
          title: "Error!",
          text: "Please enter from date.",
          icon: "error",
          timer: 5000
        });
        return false
      }
    }
    if (from && to) {
      fromDate = new Date(from)
      fromDate = fromDate.toISOString();
      toDate = new Date(to)
      toDate = toDate.toISOString();
    } 

    try {
      setPageno(1)
      const response = await dispatch(getUserDetailListAction(1, perPage, course_id, search, fromDate, toDate));
      if (response?.payload?.data?.data?.rows?.length) {
        setUserList(response.payload?.data.data?.rows)
      } else {
        setUserList([])
      }
      if (response?.payload?.data?.data?.count) {
        setCount(response?.payload?.data?.data?.count)
      } else {
        setCount([])
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

  const loginState = useSelector(state => state.authReducer?.loginData);

  const nameFilter = (name) => {
    setSearch(name)
    getAllDetails(1, perPage, course_id, name, from, to);
  }
  const resetButton = () =>{
    setCourse('');
    setToDate('');
    setFromDate('');
    getAllDetails(1, perPage, '', search, '', '');
  }
  const updateExpiryDate = (id,e,index,courseId) =>{
    const userListIndex = index
    let dateconvert = new Date(e)
    dateconvert = dateconvert.toISOString();
    swal({
      title: "Are you sure?",
      text: "You want to update expiry date!",
      icon: "warning",
      buttons: true,
      dangerMode: true, 
    })
      .then(async (willUpdate) => {
        if (willUpdate) {
          let course_status =''
          if(userList[userListIndex]?.payments[0]?.user_course==null){}else{
            course_status =  userList[userListIndex]?.payments[0]?.user_course?.course_status
          }
          let date_update = {course_status:course_status,expires_in:dateconvert}
           let newArray = [...userList];
          let obj = {
            ...userList[userListIndex]?.payments[0],
            user_course:date_update
          }
          newArray[userListIndex] = { ...newArray[userListIndex],payments:[obj]  };
          setUserList(newArray)
        
          let data = {
            "role_id": loginState?.data?.data?.user?.role?.id,
            "course_id":courseId,
            "expires_in":dateconvert
        }
          var updateResponse = await dispatch(updateCourseExpiryDateAction(id,data));
          updateResponse = updateResponse.payload;
          if (updateResponse) {
            if (updateResponse.data) {
              if (updateResponse.data.code == 200) {
                swal({
                  title: "Success!",
                  text: updateResponse.data.message,
                  icon: "success",
                  timer: 3000
                });
                getAllDetails(1, perPage, course_id, search, from, to);
              } else {
                swal({
                  title: "Error!",
                  text: updateResponse.data.message,
                  icon: "error",
                  timer: 3000
                });
              }
            }
          }
        }
      
    }).catch (function(err) {
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
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={4} lg={4} md={4} sm={12} xs={4}>
            <h1 className="d-md-inline-block d-block mb-3">Users</h1>
          </Col>
          <Col xl={8} lg={8} md={8} sm={12} xs={8} className="text-right">
            <div>
              <div className="filter_form">
                {/* <img src={Download} className="mr-4" alt="Image" /> */}
                <Form.Group className="has-search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control" onChange={(e => nameFilter(e.target.value))}
                    placeholder="Search users here..."
                  />
                </Form.Group>
                <a onClick={onFilterButton} >
                  <img
                    src={Filter}
                    className="mr-3 ml-3"
                    alt="Image"
                  />
                </a>
                {showFilter ? (
                  <div className="filter_modal">
                    <Form noValidate onSubmit={handleSubmit}>
                      <div className="select_input">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Select course</Form.Label>
                          <Form.Control as="select" type="select" value={course_id} onChange={(e) => setCourse(e.target.value)}>
                            <option value="">Select Course</option>
                            {courseList.map((val, ii) => <option key={`couruser-${ii}`}value={val.id}>{val.course_title}</option>)}
                          </Form.Control>
                        </Form.Group>
                      </div>
                      <Row>
                        <Col md={6} sm={6} xs={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>From</Form.Label>
                            {/* <Form.Control type="date" placeholder="02-02-2021" onChange={(e) => setFromDate(e.target.value)} /> */}
                            <DatePicker selected={from} maxDate ={to}
                              onChange={(e) => setFromDate(e)}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={6} xs={6} className="right_picker">
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>To</Form.Label>
                            {/* <Form.Control type="date" placeholder="02-02-2021" onChange={(e) => setToDate(e.target.value)} /> */}
                            <DatePicker selected={to} minDate={from}
                              onChange={(e) => setToDate(e)}
                              className="form-control"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        variant="primary"
                        className="btnSame save_btn"
                        type="submit"
                      >
                        save
                      </Button>
                      <Button
                        className="cancel_btn"
                        variant="secondary"
                        onClick={resetButton}
                      >
                        Reset
                      </Button>
                      <Button
                        className="cancel_btn"
                        variant="secondary"
                        onClick={onFilterButton}
                      >
                        Cancel
                      </Button>
                    </Form>
                    
                  </div>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>

        <div>
          <Table responsive className="table table-borderless user_table">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>DMV Id Number</th>
                <th>Payment Status</th>
                <th>Email Address</th>
                <th>Course opted Date</th>
                <th>Course Status</th>
                <th>Course Name</th>
                <th colSpan="2">Expiry Date</th>
                <th>Audit Logs</th>
              </tr>
            </thead>
            <tbody> 
              {
                userList.map((val, i) => {
                  let date = new Date(val?.payments[0]?.paid_on);
                  let expiry_date = '';
                  if(val?.payments[0]?.user_course==null){}else{
                    expiry_date = val?.payments[0]?.user_course?.expires_in
                  }
                  date = date.toLocaleDateString('en-US');
                  return (<tr key={`usershow-${i}`}>
                    <td >{i + 1 + ((pageNo - 1) * perPage)}</td>
                    <td>{val.user_name}</td>
                    <td>{val.dmv_id}</td>
                    <td className="active">{val?.payments[0]?.payment_status}</td>
                    <td>{val.email}</td>
                    <td>{date}</td>
                    <td className="active">{val?.payments[0]?.user_course?.course_status}</td>
                    <td>{val?.payments[0]?.course?.course_title}</td>
                    <td colSpan="2"> <DatePicker selected={expiry_date?new Date (expiry_date):''} disabled={val?.payments[0]?.payment_status==='PENDING' ? true: false}
                              onChange={(e) => updateExpiryDate(val?.id,e,i,val?.payments[0]?.course?.id)}
                            /></td>
                    <td className="download_css"> <img src={Download} onClick={() => downloadAuditLogs(val.id)} className="mr-4" alt="Image" /></td>
                  </tr>)
                })
              }
            </tbody>
          </Table>
        </div>
        <div className="mt-3 text-right pageBottom">
          {
            count > pageNo ?

              (<Pagination total={count} onChange={pageHandler} />)
              : (<></>)
          }

        </div>
      </div>
      {csvData?.length > 0 ? <CSVDownload data={csvData} target="_blank" /> : ''}
    </>
  );
};

export default UserList;