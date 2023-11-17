import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Download from "../../../Images/download.svg";
import Filter from "../../../Images/filter.svg";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import "./Payment.css";
import {
  getPaymentDetailListAction, getCourseListAllAction
} from "../../../Redux/Actions";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
 
const Payment = () => {
  const [showFilter, showFilterAlert] = useState(false);
  const onFilterButton = () => showFilterAlert(!showFilter);
  const [permission, setPermission] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageNo, setPageno] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(1);
  const [paymentList, setPaymentList] = useState([]);
  const [from, setFromDate] = useState('');
  const [to, setToDate] = useState('');
  const [course_id, setCourse] = useState('');
  const [search, setSearch] = useState('')
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getAllDetails(pageNo, perPage, course_id, search, from, to);
    getCourseList()
  }, []);

  const getAllDetails = async (pageNo, perPage, course_id, search, from, to) => {
    try {
      setPageno(pageNo)
      const response = await dispatch(getPaymentDetailListAction(pageNo, perPage, course_id, search, from, to));
      if (response?.payload?.data?.data?.rows?.length) {
        setPaymentList(response.payload?.data.data?.rows)
      } else {
        setPaymentList([])
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
        history.push('/dashboard')
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
      const response = await dispatch(getPaymentDetailListAction(1, perPage, course_id, search, fromDate, toDate));
      if (response?.payload?.data?.data?.rows?.length) {
        setPaymentList(response.payload?.data.data?.rows)
      } else {
        setPaymentList([])
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
  const nameFilter = (name) => {
    setSearch(name)
    getAllDetails(pageNo, perPage, course_id, name, from, to);
  }
  const resetButton = () => {
    setCourse('');
    setToDate('');
    setFromDate('');
    getAllDetails(pageNo, perPage, '', search, '', '');
  }
  return (
    <>
      <div className="tabbing_container pt-4 pl-md-5 pr-md-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={4} lg={4} md={4} sm={12} xs={4}>
            <h1 className="d-md-inline-block d-block mb-3">Payment and fees</h1>
          </Col>
          <Col xl={8} lg={8} md={8} sm={12}  xs={8} className="text-right">
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
                            {courseList.map((val, ii) => <option key={`payCourseList-${ii}`}value={val.id}>{val.course_title}</option>)}
                          </Form.Control>
                        </Form.Group>
                      </div>
                      <Row>
                        <Col md={6} sm={6} xs={6}>
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>From</Form.Label>
                            {/* <Form.Control type="date" placeholder="02-02-2021" onChange={(e) => setFromDate(e.target.value)} /> */}
                            <DatePicker selected={from} maxDate={to}
                              onChange={(e) => setFromDate(e
                              )}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6} sm={6} xs={6} className="right_picker">
                          <Form.Group controlId="formBasicEmail">
                            <Form.Label>To</Form.Label>
                            {/* <Form.Control type="date" placeholder="02-02-2021" onChange={(e) => setToDate(e.target.value)} /> */}
                            <DatePicker selected={to} minDate={from}
                              onChange={(e) => setToDate(e)}
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
                <th>Course Name</th>
                <th>User Name</th>
                <th>Purchase Date</th>
                {/* <th>Payment Menthod</th> */}
                <th>Price</th>
                <th>Status</th>
                {/* <th>Lead Status</th> */}
              </tr>
            </thead>
            <tbody>
              {
                paymentList.map((val, i) => {
                  let date = new Date(val?.paid_on)
                  date = date.toLocaleDateString('en-US');
                  return (<tr key={`paymentLis-${i}`}>
                    <td >{i + 1 + ((pageNo - 1) * perPage)}</td>
                    <td>{val.course?.course_title}</td>
                    <td>{val.user?.user_name}</td>
                    <td>{date}</td>
                    {/* <td>Credit card</td> */}
                    <td>$ {val?.course?.enrolement_fees} </td>
                    <td className="active">{val.payment_status}</td>
                   
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
    </>
  );
};

export default Payment;