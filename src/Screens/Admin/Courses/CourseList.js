import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Delete from "../../../Images/delete.svg";
import Edit from "../../../Images/edit.svg";
import Eye from "../../../Images/eye.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Table from "react-bootstrap/Table";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import "./CourseList.css";
import { COURSE_PERMISSION, FULL, READ, EDIT } from '../../../Utils/PermissionConstant'
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getCourseListAllAction, courseDetailAction, deleteCourseAction } from "../../../Redux/Actions/CourseAction";

export const CourseList = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [courseList, setCourseList] = useState([]);
  const [pageNo, setPageno] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(1);
  const [permission, setPermission] = useState('');

  useEffect(() => {
    getCourseList(pageNo, perPage)
  }, [])

  const getCourseList = async (pageNo, perPage) => {
    try {
      setPageno(pageNo)
      const response = await dispatch(getCourseListAllAction(pageNo, perPage));
      const allCoursResponse = response?.payload;
      // Check this once component object saved in db is finalized 
      if (allCoursResponse) {
        if (allCoursResponse.data) {
          if (allCoursResponse.data.code == 200) {
            const arrange = allCoursResponse?.data?.data?.rows?.sort((a, b) => { return a.created_at - b.created_at })
            setCourseList(arrange)
            if (allCoursResponse?.data?.data?.count) {
              setCount(allCoursResponse?.data?.data?.count)
            } else {
              setCount([])
            }
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

  const handleEdit = (id) => {
   
    const response = dispatch(courseDetailAction(id));
    const success = response?.payload;
    if (success) {
      if (success.data) {
        if (success.data.code == 200) {
          history.push('/courses/coursecreation')
        }
      }
    }
  }

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete course ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          const response = await dispatch(deleteCourseAction(id));
          const deleteCourseResponse = response?.payload;
          if (deleteCourseResponse) {
            if (deleteCourseResponse.data) {
              if (deleteCourseResponse.data.code == 200) {
                swal({
                  title: "Success!",
                  text: deleteCourseResponse.data.message,
                  icon: "success",
                  timer: 3000
                });
                getCourseList(pageNo, perPage);
              } else {
                swal({
                  title: "Error!",
                  text: deleteCourseResponse.data.message,
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

  // pagination
  const pageHandler = (page_no, offset) => {
    setPageno({ page_no: page_no })
    setPerPage(offset)
    getCourseList(page_no, offset);
  }

  // view data
  const getCourseDetailByIdView = async id => {
    const response = dispatch(courseDetailAction(id));
    const success = response?.payload;
    if (success) {
      if (success.data) {
        if (success.data.code == 200) {
          history.push('/courses/coursecreation?view')
        }
      }
    }
  };

  // check permission or not
  const loginState = useSelector(state => state.authReducer?.loginData);
  useEffect(() => {
    if (loginState?.data?.data?.access_token) {
      if (loginState?.data?.data?.user?.role?.policies.length) {
        let list = loginState?.data?.data?.user?.role?.policies
        list.map((val, i) => {
          if (COURSE_PERMISSION == val.name && val.scope != "none") {
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
          if (COURSE_PERMISSION == val.name && val.scope != "none") {
            setPermission(val.scope)
          }
        })
      }
    }
  }, [refreshTokenResult])
  const copyCodeToClipboard = (id) => {
    swal({
      title: "Success!",
      text: 'Copied',
      icon: "success",
      timer: 3000
    });
  }
  return (
    <>
      <div className="tabbing_container pt-4 pl-lg-5 pr-lg-5 pl-3 pr-3 pb-4 mb-4 courselistsection">
        <Row>
          <Col xl={6} lg={6} md={6} sm={12}>
            <h1 className="d-md-inline-block d-block mb-3">All courses</h1>
          </Col>
          {/* <Col xl={6} lg={6} md={6} sm={12} className="text-md-right">
            <div>
              <Form>
                <Form.Group className="has-search">
                  <span className="fa fa-search form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search courses here..."
                  />
                </Form.Group>


                <Form.Group className="has-select ml-md-3 ml-2">
                  <Form.Control as="select">
                    <option>Filter</option>
                    <option>Filter</option>
                    <option>Filter</option>
                  </Form.Control>
                </Form.Group>

              </Form>
            </div>
          </Col> */}
        </Row>

        <div>
          <Table responsive className="table table-borderless user_table">
            <thead className="thead-light">
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Course Id </th>
                <th>Created by</th>
                <th>Status</th>
                {permission == FULL || permission == READ || permission == EDIT ? <th className="pl-4">Action</th> : ''}
              </tr>
            </thead>
            <tbody>
              {courseList ?
                courseList.map((course, i) => {
                  return (
                    <tr key={`coursList-${i}`}>
                      <td>{i + 1 + ((pageNo - 1) * perPage)}</td>
                      {/* <td>{course.id}  &nbsp; <button
                        className="btn btn-primary" onClick={() => copyCodeToClipboard(course.id)}>
                        Copy
                      </button></td> */}
                      <td className="width_data">{course.course_title || 'Introduction to the course'}</td>
                      <td>
                        {course.id}  &nbsp;
                        <CopyToClipboard text={course.id}
                        >
                          <button className="btn rem" onClick={() => copyCodeToClipboard(course.id)}><i className="fa fa-clone" aria-hidden="true"></i>
                          </button>
                        </CopyToClipboard> 
                      </td>
                      <td>{course.createdBy?.first_name}&nbsp;{course.createdBy?.last_name}</td>
                      <td className="active">Active</td>
                      <td>
                        <span>
                          {permission == READ ? <img src={Eye} className="pr-2" onClick={() => getCourseDetailByIdView(course.id)} alt="Image" /> : ""}
                          {permission == EDIT ? <> <img src={Eye} className="pr-2" onClick={() => getCourseDetailByIdView(course.id)} alt="Image" />   <img src={Edit} onClick={() => handleEdit(course.id)} className="table_icon" alt="Image" /></> : ""}
                          {permission == FULL ? <><img src={Eye} className="pr-2" onClick={() => getCourseDetailByIdView(course.id)} alt="Image" /> <img src={Edit} onClick={() => handleEdit(course.id)} className="table_icon" alt="Image" />  <img src={Delete} onClick={() => handleDelete(course.id)} className="delete_icon" alt="Image" /></> : ""}
                        </span>
                      </td>
                    </tr>
                  )
                }) : null}
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

export default CourseList;
